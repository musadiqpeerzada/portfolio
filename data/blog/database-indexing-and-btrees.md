---
title: Database Indexing and B-Trees
date: 2024-12-05
tags:
  - design
  - databases
  - indexing
  - mongo
  - B Tree
draft: false
summary: 'Boosting Database Performance: The Power of Indexing and B-Trees'
images:
  - /static/blogs/indexing_in_database.png
authors:
  - default
---

The performance of a database largely relies on its response to queries. There are two primary functionalities of a database: - to store data and, - to effectively present the stored data when queried later. To efficiently locate the data queried for, a database needs a data structure known as an index. Indexes act like a roadmap, guiding the query processor to the exact location of the requested data without scanning the entire database. This optimization is key to handling large datasets and ensuring fast, responsive queries. In this blog, we’ll dive into how indexing works along with disk io and B-Trees to enhance the performance of databases.

## How data is stored on disk?

    Since data is ultimately stored in physical disks, before diving into B-Tree and indexing, let’s first understand how data is stored and retrieved from a disk. There are few fundamental concepts in the organization of data on magnetic disks (HDDs) or other types of storage devices. These describe how data is physically arranged on the surface of a disk.
    - **Track**: A track is a circular path on the disk surface. Each track is divided into smaller sections called sectors.
    - **Sector**: A sector is the smallest unit of data storage on a disk. The data in each sector can be read or written in one operation.
    - **Offset**: When accessing data within a sector, the system uses an offset to locate the exact byte position. The offset tells the system where to start within the sector.
    - **Block**: A block is a logical unit of storage, typically composed of one or more sectors. It’s the smallest amount of data that can be read or written from a disk in a single operation. A block is managed by the operating system and file system, while a sector represents the physical storage unit on the disk.

    To access any piece of data on the disk, the system must know the specific track and sector where the data is located. The exact byte location within the sector is determined using an offset value, which indicates the position of the byte within that sector.

    While traditional HDDs rely heavily on mechanical movement to access tracks and sectors, modern SSDs use flash memory, which allows faster random access. However, the principles of disk access remain similar across storage types.

    Let’s take a very basic example to understand how a table is stored on a disk. If we have to store student data where each row has a size of 128 bytes.
    | Field  | Storage Size     |
    | ---------| -------- |
    | _id      | 10 bytes |
    | name     | 60 bytes |
    | gender   | 4 bytes  |
    | phone    | 16 bytes |
    | age      | 10 bytes |
    | section  | 8 bytes  |
    | class    | 10 bytes |
    | marks    | 10 bytes |

    If the block size is 512 bytes, 4 (512/ 128) rows can be stored in a single block. Students 1 - 4 will be stored in Block 1, 5 - 8 in Block 2 and so on.

    | _id   | name         | gender | phone       | age  | section | class | marks |**BLOCK**  |
    | ----- | ------------ | ------ | ----------- | ---- | ------- | ----- | ----- | --------- |
    |     1 | John Doe     | Male   | 1234567890  | 20   | A       | 10    | 85    |**BLOCK 1**|
    |     2 | Jane Smith   | Female | 0987654321  | 22   | B       | 12    | 92    |**BLOCK 1**|
    |     3 | Alice Brown  | Female | 1122334455  | 21   | A       | 11    | 78    |**BLOCK 1**|
    |     4 | Bob White    | Male   | 2233445566  | 23   | C       | 10    | 88    |**BLOCK 1**|
    |     5 | Carol Green  | Female | 3344556677  | 20   | B       | 12    | 91    |**BLOCK 2**|

     Now if the number of students increase to 10,000, a total of 2,500 blocks on the disk will be utilized. Let's say a particular student record needs to fetched from the database, 2,500 blocks would be scanned. This would be an issue, when the number of students increase, the number blocks also increase and hence the search time.

     This is where indexing comes into picture. We can add an index on top of our database, to reduce the number of blocks that we need to scan to fetch a particular student.

## What is Indexing?

    Indexing is a technique used to optimize the speed and efficiency of data retrieval. It involves creating a data structure that allows the database to locate and retrieve records faster without scanning the entire table.

    Index is a pointer to data in a table. The pointer helps the storage engines to locate data with a reduced latency. Any kind of index usually slows down writes, because the index also needs to be updated every time data is inserted. Therefore, it is an important trade-off in storage systems to identify the required indexes for a dataset.

    Think of an index in a book. Instead of reading every page to find a topic, we refer to the index, which points us directly to the correct page. Similarly, in a database, an index acts as a reference guide to find data quickly.

    Coming back to the above example where we needed to scan 2,500 blocks to find a particular student. If we create another table index that will only have id and the pointer to the actual record on the disk, although indexes are also stored on the disk, but they are fast compared to the matching data from the student table itself. If each index takes 16 bytes (10 for id and 6 for pointer) of memory. 32 rows of index can be stored in 1 block. Since we have 10,000 students, we need 313 blocks to store the index table. Now to find a particular student from database we first need to scan the 313 blocks of index and then the actual block where student data is stored. This brings the access time from 2,500 blocks to 314 (313 + 1) blocks.

    ![json-to-bson](/static/blogs/single_index.png)

    Now if the data size grows and reaches 1 million records. The number of blocks needed to store the index will be 31,250 (1000000/ 32). So to find a particular student, we need to scan 31,251 blocks which is huge. We can add another level of index that stores the pointer to block of the first-level index.

    In our initial index, 32 rows of index were stored in a single block, so in our next level of index, we do not need to store all the ids, we can store initial id of each block in our initial index. This is because block is the smallest unit of data that can be read and hence we already have final data pointers of first 32 students(1 - 31) even if we fetch the index pointer of id 1. So that total number of blocks needed to store the top level index will be
    977. Seems like a lot to digest, check the diagram below.

    ![json-to-bson](/static/blogs/multi_level_index.png)

    Now even in 1 million students, to find a particular student, we first need to scan 977 blocks of top level index, 1 block of second level index and 1 block of actual data reducing it from 31,251 to 979 blocks only.

    While single-level indexing improves query performance, it struggles as datasets grow. Multi-level indexing helps but adds complexity and more lookups. This is where B-Trees come in. By maintaining a balanced hierarchy and sorting keys, B-Trees optimize disk utilization and reduce both lookup depth and disk I/O operations. Most databases use B-Trees for indexing, ensuring fast record access even at scale

## What is a B-Tree?

    A B-Tree is a self-balancing tree data structure that stores data in sorted order. It enables efficient operations like searching, inserting, and deleting data. B-Trees are commonly used in databases because they handle large datasets efficiently.

    Unlike binary trees, where each node has at most two children, B-Trees allow multiple children per node. This reduces the tree’s height and minimizes disk I/O operations, making it ideal for systems with large amounts of data.


    ### Properties of a B-Tree:
    - 	**Balanced Structure**: All leaf nodes are at the same depth, ensuring consistent access times.
    -	**Sorted Keys**: Keys in each node are stored in sorted order for efficient searching.
    -	**Multiple Children**: Each node can have more than two children, reducing the tree height.
    -	**Dynamic Size**: The tree adjusts as data is added or removed, keeping operations efficient.
    -	**Efficient Disk Usage**: Nodes fit neatly into disk blocks, optimizing read and write performance.
    -   **Minimum Degree ( t )**: Defines the range of keys a node can have, ensuring balance and efficient operations in the B-Tree.


    ### Types of nodes:
        B-Trees have three types of nodes:
            1.	**Root Node**:
                -	The topmost node in the tree.
                -	Can have fewer than `t - 1` keys but must have at least one key unless the tree is empty.
            2.	**Internal Nodes**:
                -	Nodes between the root and leaf nodes.
                -	Have both keys and child pointers.
                -	Must have at least  `t - 1`  keys and at most  `2t - 1`  keys, with  `t  to  2t`  child pointers.

            3.	**Leaf Nodes**:
                -	The bottommost nodes with no children.
                -	Contain only keys, with the number of keys ranging from  `t - 1  to  2t - 1` .

    ### How a B-Tree Works?

        -   **Searching**:
                1. Start at the root and compare the key to search for.
                2. Navigate to the correct child node based on the comparison.
                3. Repeat until the key is found or a leaf is reached.

        -   **Insertion**:
                1. Insert the key in the appropriate leaf node.
                2. If the node exceeds the maximum number of allowed keys, split the node into two and promote the middle key up to the parent.
                3. Repeat splitting if necessary, balancing the tree.

        -   **Deletion**:
                1. Remove the key from the appropriate node.
                2. If the node falls below the minimum number of keys, merge with a neighboring node or borrow a key from a sibling node.
                3. Adjust the tree to maintain balance..

        Although searching is pretty fast in B-Tree, they introduce an overhead on writes. Each insert, update, or delete operation may require the B-Tree to be rebalanced, which can impact performance in write-heavy applications.

    ### Creation of a B-Tree
        Let’s try to create a B-Tree and understand its practically how it works For this example, we’ll have minimum degree t = 4 and data will be keys = 10,20,40,50,65,80,90,25,30

        1. Since each node can have t-1 keys and t children. so we can store 3 keys in a node and 4 child pointers. so we can add first three keys

                ```
                [10, 20, 40]
                ```
        2. Adding 50

            The current node can no longer hold any more keys. As a result, it is split into two nodes, with the middle value (40) promoted to the root. This ensures the tree remains balanced.
            ```
                [40]
                /  \
            [10,20] [50]
            ```
        3. Adding 65
             ```
                [40]
                /  \
            [10,20] [50, 65]
            ```
        4. Adding 80
             ```
                 [40]
                 /   \
            [10,20] [50, 65, 80]
            ```
        5. Adding 90

            Here, when we try to add 90 in the right node of root , we observe that we have reached the limit and no more keys can be added , so we need to split the node and create new node.
             ```
                   [40, 80  ]
                   /    |    \
            [10,20] [50, 65] [90]
            ```

        6. Adding 25
            ```
                      [40, 80   ]
                     /     |      \
            [10,20,25] [50, 65, 80] [90]
                ```
        7. Adding 30

            As, 30 is less than root, we need to add that to the left node of root, but as left node is also reached its limit of 3 keys, we need to split the node, promote a root and create new node.
            ```
                    [25, 40, 80   ]
                    /     |    |       \
                [10,20] [30] [50, 65] [90]
                ```
        This is how B-Tree construction takes place.

## B-Trees in MongoDB: Optimizing Performance

    MongoDB, like many modern database systems, uses B+ Trees (a variant of B-Trees) to optimize query performance, especially when dealing with large datasets. MongoDB’s indexing mechanism is one of its core strengths, and B-Trees play a crucial role in this.

    While both B-Trees and B+ Trees offer logarithmic time complexity for searches, MongoDB uses B+ trees because B+ trees store all data pointers at the leaf level, making range queries and full scans faster. Moreover B+ trees have higher fan-out, which means more keys are stored per node, leading to better cache utilization and fewer disk I/O operations.

    ### How MongoDB Uses B-Trees

        In MongoDB, indexes are implemented using B+ trees, which are a variant of B-Trees. The primary difference is that in B+ trees, only leaf nodes contain data pointers, while internal nodes store only keys to guide the search. This ensures that all data retrievals are efficient and happen at the leaf level, reducing the height of the tree and the number of I/O operations required for searching.

        Remember above example of 1 million documents representing student records. Without an index, database would have to scan every document(block) to find a specific student, which is slow, especially as the dataset grows. However, after creating an index on the id field, MongoDB constructs a B+ tree structure for fast lookup.

        - **Insertion**:
        When new documents are added to the collection, the B+ tree is updated to maintain its balanced structure. If a new student record is inserted, the tree may split a node, but this process is optimized for speed and minimizes the impact on query performance.
        - **Search**: When querying for a specific student by id, MongoDB can traverse the B+ tree to find the correct leaf node. Since the tree is balanced and sorted, this process is much faster than scanning every document.

    ### Benefits of B-Trees in MongoDB

        -   **Efficient Reads**: B-Trees reduce the number of comparisons needed during a search. Because they are balanced and sorted, the query processor can quickly zero in on the right leaf node, even in large collections.
        -   **Low Disk I/O**: Because MongoDB stores its B+ trees in a way that minimizes the height of the tree, fewer disk reads are required to locate data. This reduces the overall disk I/O during query execution.
        -   **Range Queries**: MongoDB also takes advantage of B+ trees for range queries. Since the tree nodes are sorted, querying a range of student_id values (e.g., finding all students with IDs between 100 and 500) can be done by efficiently traversing the leaf nodes, avoiding a full collection scan.
        -   **Scalability**: As your data grows, MongoDB can continue to scale by adjusting the B+ tree’s structure. This means queries remain fast, even with millions of documents.

Want to know more about how MongoDB stores data, check [Decoding MongoDB](/blog/decoding-mongodb) and [MongoDB indexing](/blog/indexing-in-mongodb).
