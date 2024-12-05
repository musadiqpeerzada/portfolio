---
title: B-Trees and Indexing
date: 2024-12-05
tags:
  - design
  - databases
  - indexing
  - mongo
  - B Tree
draft: false
summary: How B-trees in MongoDB indexing boost performance by making data retrieval as fast as flipping to the right page in a book?
images:
  - /static/blogs/indexing_in_database.png
authors:
  - default
---

The performance of a database largely relies on its response to queries. There are two primary functionalities of a database: - to store data and, when queried later, - to effectively present the stored data. To efficiently locate the data queried for, a database needs a data structure known as an index. Indexes act like a roadmap, guiding the query processor to the exact location of the requested data without scanning the entire database. This optimization is key to handling large datasets and ensuring fast, responsive queries. In this blog, we’ll dive into how indexing works along with disk io and B-Trees to enhance the performance of databases.

## How data is stored on disk?

    Since data is ultimately stored in physical disks, before diving into B-Tree and indexing, let’s first understand how data is stored and retrieved from a disk. There are two fundamental concepts in the organization of data on magnetic disks (HDDs) or other types of storage devices. These describe how data is physically arranged on the surface of a disk.
    - **Track**: A track is a circular path on the disk surface. Each track is divided into smaller sections called sectors.
    - **Sector**: A sector is the smallest unit of data storage on a disk, typically 512 bytes or 4 KB in size. The data in each sector can be read or written in one operation.

    To access any piece of data on the disk, the system must know the specific track and sector where the data is located. The exact byte location within the sector is determined using an offset value, which indicates the position of the byte within that sector.

    In addition, blocks are the units in which data is read or written to the disk. A block consists of one or more sectors, and it’s the smallest amount of data that can be read from or written to the disk in a single operation. Typically, a block size is 512 bytes or 4 KB.

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

     Now if we need to store 10,000 students, a total of 2,500 blocks on the disk will be utilized. Let's say we need to fetch a particular student from the database, we need to scan 2,500 blocks. This would be an issue, when the number of students increase, the number blocks also increase and hence the search time.

     This is where indexing comes into picture. We can add an index on top of our database, to reduce the number of blocks that we need to scan to fetch a particular student.

## What is Indexing?

    Indexing is a technique used to optimize the speed and efficiency of data retrieval. It involves creating a data structure that allows the database to locate and retrieve records faster without scanning the entire table.

    Index is a pointer to data in a table. The pointer helps the storage engines to locate data with a reduced latency. Any kind of index usually slows down writes, because the index also needs to be updated every time data is inserted. Therefore, it is an important trade-off in storage systems to identify the required indexes for a dataset.

    Think of an index in a book. Instead of reading every page to find a topic, you refer to the index, which points you directly to the correct page. Similarly, in a database, an index acts as a reference guide to find data quickly.

    Coming back to the above example where we needed to scan 2,500 blocks to find a particular student. If we create another table index that will only have id and the pointer to the actual record on the disk, although indexes are also stored on the disk, but they are fast compared to the matching data from the emp_table itself. If each index takes 16 bytes (10 for id and 6 for pointer) of memory. 32 rows of index can be stored in 1 block. Since we have 10,000 students, we need 313 blocks to store the index table. Now to find a particular student from database we first need to scan the 313 blocks of index and then the actual block where student data is stored. This brings the access time from 2,500 blocks to 314 (313 + 1) blocks.

    ![json-to-bson](/static/blogs/single_index.png)

    Now if the data size grows and reaches 1 million records. The number of blocks needed to store the index will be 31,250 (1000000/ 32). So to find a particular student, we need to scan 31,251 blocks which is huge. We can add another level of index that stores the pointer to block of the first-level index.

    In our initial index, 32 rows of index were stored in a single block, so in our next level of index, we do not need to store all the ids, we can store initial id of each block in our initial index. This is because block is the smallest unit of data that can be read and hence we already have final data pointers of first 32 students(1 - 31) even if we fetch the index pointer of id 1. So that total number of blocks needed to store the top level index will be
    977. Seems like a lot to digest, check the diagram below.

    ![json-to-bson](/static/blogs/multi_level_index.png)

    Now even in 1 million students, to find a particular student, we first need to scan 977 blocks of top level index, 1 block of second level index and 1 block of actual data reducing it from 31,251 to 979 blocks only.

    While single-level indexing improves query performance, it struggles as datasets grow. Multi-level indexing helps but adds complexity and more lookups. This is where B-Trees come in. By maintaining a balanced hierarchy and sorting keys, B-Trees optimize disk utilization and reduce both lookup depth and disk I/O operations. Most databases use B-Trees for indexing, ensuring fast record access even at scale

## What is a B-Tree?

    A B-Tree is a versatile data structure that stores data in sorted order, enabling efficient searches, sequential access, insertions, and deletions. It is ideal for systems dealing with large blocks of data, such as databases like MongoDB. Unlike binary search trees, which have up to two children per node, B-Trees allow nodes to have multiple children, optimizing the structure.

    This multi-branching design helps minimize disk I/O operations, crucial for handling large datasets. By maintaining a balanced tree and ensuring all leaf nodes are at the same depth, B-Trees provide predictable and fast data retrieval.


    ### Properties of a B-Tree:
        - 	**Root Node**: The root node can have a minimum of 2 children, ensuring a balanced structure.
        - 	**Leaf Nodes at Same Level**: All leaf nodes must be at the same level, maintaining uniform access times.
        -	**Minimum Children per Node**: Each node should have at least ￼ children, where ￼ is the `minimum degree` of the tree. This ensures the tree remains balanced and efficient.
        -	**Balanced Structure**: All leaf nodes are at the same depth, ensuring consistent search times across the tree.
        -	**Sorted Keys**: Keys within each node are stored in sorted order, enabling efficient searching and quick navigation.
        -	**Multiple Children**: Each node can have more than two children, unlike binary trees. This reduces the tree height and minimizes disk I/O operations.
        -	**Dynamic Size**: The tree grows or shrinks as keys are inserted or deleted, ensuring efficient handling of data over time.
        -	**Efficient Disk Usage**: Nodes are designed to fit into disk blocks, optimizing read and write operations, particularly for large datasets.

    ### How a B-Tree Works?

        -   **Searching**:
                1. Start at the root node.
                2. Compare the search key with the keys in the node.
                3. Depending on the comparison, move to the left or right minimum degree child repeating the process until the key is found or a leaf node is reached.
        -   **Insertion**:
                1. Insert the key in the appropriate leaf node.
                2. If the node overflows (exceeds the maximum number of allowed keys), split the node into two and promote a key to the parent.
                3. This process may propagate up the tree if the parent node also overflows.
        -   **Deletion**:
                1. Remove the key from the appropriate node.
                2. If the node falls below the minimum number of keys, merge with a neighboring node or borrow a key from a sibling node.
                3. This may also require adjustments up the tree to maintain balance.

    ### Creation of a B-Tre
        Let’s try to create a B-tree and understand its practically how it works For this example, we’ll have minimum degree t = 4 and data will be keys = 10,20,40,50,65,80,90,25,30

        1. Since each node can have t-1 keys and t children. so we can store 3 keys in a node and 4 child pointers. so we can add first three keys

                ```
                [10, 20, 40]
                ```
        2. Adding 50

            Now, we need to add 50, but we have reached our keys limit (i.e-3). So at this point, we need to split. We need to create another node and split the current node so that we have the balance between our nodes and we need to promote a root.
            ```
                [40]
                /  \
            [10,20] [40]
            ```
        3. Adding 65
             ```
                [40]
                /  \
            [10,20] [40, 65]
            ```
        4. Adding 80
             ```
                [40]
                /  \
            [10,20] [40, 65, 80]
            ```
        5. Adding 90

            Here, when we try to add 90 in the right node of root , we observe that we have reached the limit and no more keys can be added , so we need to split the node and create new node.
             ```
                   [40, 80   ]
                   /    |     \
            [10,20] [40, 65, 80] [90]
            ```

        6. Adding 25
            ```
                    [40, 80   ]
                    /      |       \
            [10,20,25] [40, 65, 80] [90]
                ```
        7. Adding 30

            As, 30 is less than root, we need to add that to the left node of root, but as left node is also reached its limit of 3 keys, we need to split the node, promote a root and create new node.
            ```
                    [25, 40, 80   ]
                    /     |    |       \
                [10,20] [30] [40, 65] [90]
                ```
        This is how b-tree construction takes place.

    ### Querying a B-Tree
        When a query is made to a B-tree, the tree is searched for the requested data in a similar way as a binary search tree. The process typically starts at the root node of the tree and compares the value of the requested data with the keys stored in the current node. If the requested data is less than the key value, the search continues on the left child of the current node. If the requested data is greater than the key value, the search continues on the right child of the current node. This process is repeated recursively until the requested data is found, or it is determined that the data is not present in the tree.

        In B-tree, the search process can be faster because of the large number of children at each node, which allows for more efficient storage of data

    In conclusion, B-Trees play a crucial role in optimizing the performance of databases, especially when dealing with large datasets. By providing a sorted, balanced, and efficient structure for indexing, B-Trees reduce the number of disk I/O operations required to retrieve data, ultimately leading to faster query performance. Whether it’s MongoDB, MySQL, or other database systems, B-Trees (and their variants) are indispensable tools for ensuring quick and scalable data retrieval, making them a foundational concept in the design of modern databases.
