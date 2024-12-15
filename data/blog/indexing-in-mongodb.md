---
title: 'Behind the Scenes: MongoDB Indexing on Disk'
date: 2024-12-06
tags:
  - mongodb
  - indexing
  - database
  - database performance
  - b-trees
  - wiredtiger
  - disk i/o
  - storage engine
  - query optimization
  - database internals
draft: true
summary: Explore into the inner workings of MongoDB indexing to understand how data is structured, optimized, and stored on disk, enabling lightning-fast queries and seamless performance.
images:
  - /static/blogs/mongo_db.png
authors:
  - default
---

Curiosity has always been my driving force. While working with MongoDB, I couldn’t help but wonder how do indexes actually work under the hood? Sure, I knew the basics: indexes improve query performance and are built on B-trees, as I discussed in my blogs on [Database Indexing and B-Trees](/blog/database-indexing-and-btrees) and [Decoding MongoDB](/blog/decoding-mongodb). But what really happens at the disk level?

This question led me down the rabbit hole of MongoDB’s storage engine and indexing mechanics and it fascinating: the delicate balance between speed, efficiency, and disk optimization.

## A Quick Recap

- Indexes enhance query performance by maintaining a sorted data structure.
- They eliminate the need for full collection scans, reducing query time.
- Example: Querying `{ age: { $gt: 19 } }` with an index on age directly accesses the relevant range of values.
- MongoDB uses B+ trees for indexing.
- B+ trees store the values in leaf nodes, enabling efficient range queries.
- B+ trees provide logarithmic time complexity O(log n) for search, insert, and delete operations.
- B+ trees optimize the disk I/O by grouping related keys and pointers in compact structures.

## Why Understanding Disk-Level Mechanics Matters?

    Understanding how MongoDB handles indexing at the disk level is crucial for several reasons.
    - **Optimizing Query Performance**

        It ensures indexes are designed to fully leverage the underlying storage system, reducing query times.

    - **Informed Scaling Decisions**

        As data grows, disk I/O can become a bottleneck. Understanding disk-level operations helps make better decisions when scaling databases.

    - **Troubleshooting and Fine-Tuning**

        Knowledge of low-level mechanics helps in identifying inefficiencies, such as excessive disk reads or poorly designed indexing strategies, and improves system performance.

    Knowing these mechanics, one can design, optimize, and maintain a high-performance MongoDB instance more effectively.

## WiredTiger: The Storage Engine Behind MongoDB

    Before diving into the details, it’s essential to understand WiredTiger,**MongoDB’s default storage engine**. [WiredTiger](https://github.com/wiredtiger/wiredtiger) is responsible for managing how data and indexes are stored, retrieved, and updated on disk, providing a balance between performance, scalability, and data integrity. WiredTiger is designed to handle disk I/O operations efficiently, especially when dealing with indexes, which are critical for query performance. Here’s how WiredTiger works with disk:

    - **Data and Index Storage**

        WiredTiger uses a document-level concurrency control model, meaning each document can be modified independently without locking the entire collection. This makes MongoDB highly efficient for high-concurrency operations. Both the document data and indexes are stored in separate disk files, with WiredTiger handling the interaction between memory and disk.

    - **In-Memory Caching**

        WiredTiger utilizes an in-memory cache to store frequently accessed data and index pages. By caching data in memory, MongoDB can reduce disk I/O operations and improve performance, especially for read-heavy workloads. When an index is queried or updated, WiredTiger first checks the in-memory cache before accessing the disk, ensuring faster query execution.

    - **Write-Ahead Logging (WAL)**

        To ensure durability, WiredTiger uses write-ahead logging (WAL). All changes to data and indexes are first written to a transaction log before being applied to disk. This log helps MongoDB recover to a consistent state in case of a crash or system failure.

    - **Page Management and Compression**

        Both data and index entries are stored in pages on disk. WiredTiger manages these pages efficiently, minimizing the impact of frequent read and write operations. WiredTiger also supports compression for data and indexes, reducing the disk space required for storage without sacrificing performance.

    - **Checkpointing**

        Periodically, WiredTiger creates checkpoints, which are snapshots of the data at a particular point in time. This allows MongoDB to recover quickly by replaying the WAL and ensuring that the data is consistent and durable even after a crash.

## What Happens During an Insert?

    When a document is inserted into a MongoDB collection, the process involves several steps from handling the document itself to updating the relevant indexes on disk. Here’s a breakdown of what happens under the hood:

    1. **Document Insertion Request**

        The client application sends an insert request to the MongoDB server. The document (data) to be inserted is included in this request.

    2. **Validation**

        MongoDB validates the document to ensure that it complies with any defined schema (if applicable) and constraints (such as unique indexes). If validation fails, the insert operation is aborted, and an error is returned to the client.

    3. **In-Memory Staging** (Write Buffer)

        Once validated, MongoDB stores the document in an in-memory write buffer temporarily. This step ensures that the data is safely queued for eventual disk write and minimizes I/O operations for multiple inserts. At this stage, Write-Ahead Logging (WAL) is used to record the operation in the transaction log to maintain durability.

    4. **Write to Data Files** (Document Storage)

        The document is written to MongoDB’s data files. These files represent collections and store the actual data. Each document is stored along with metadata that helps in efficient retrieval later. MongoDB uses a BSON (Binary JSON) format to store data, which includes both the document fields and the metadata.

    5. **Index Updates**
        If the document contains values for any indexed fields, MongoDB must update the corresponding indexes. Steps involved in index updates:

        a. **Locate the Correct Position in the B+ Tree**:
            MongoDB uses B+ trees to store indexes. When a document is inserted, the system navigates the index B+ tree to locate the correct position for the new index entry. This is done by comparing the indexed field value (e.g., age) with the existing values in the tree.

        b. **Insert the Index Entry**:
            Once the correct position is found, the document’s index entry is inserted into the tree. The index entry consists of the indexed field value (e.g., age: 25) and a pointer to the document’s location in the data files (a disk address).

        c. **Balancing the B+ Tree**:
            If the insertion causes an index node to exceed its capacity, the B+ tree may require a page split to maintain balance. This split ensures the tree remains optimized for efficient query operations.

        d. **Updating Parent Nodes**:
            After a page split, the parent nodes of the B+ tree are updated to reflect the changes in the index structure. This maintains the hierarchical integrity of the tree.

    6. **Index Write to Disk**

        After the index has been updated in memory, the changes are written to disk in the index files. MongoDB uses WiredTiger to manage the interaction between in-memory data and disk. WiredTiger writes the updated index pages to disk, ensuring durability and efficient storage.

    7. **In-Memory Caching**

        To optimize performance, frequently accessed documents and index pages are cached in memory by WiredTiger. The cache reduces disk I/O, enabling faster read operations in future queries. The data and indexes stay in memory until memory limits are reached, at which point older, less frequently used pages may be evicted to disk.

    8. **Transaction Commit**

        Once the document and index updates have been written to both memory and disk, the transaction is committed. This makes the changes permanent and visible to other operations. If there are any additional updates to the document or its indexes, they are queued up for future writes.


    9. **Completion of Insert Operation**

        MongoDB sends an acknowledgment back to the client, signaling the success of the insert operation. The document is now fully inserted, and both the data and indexes are stored on disk and available for future queries.

    10. **Checkpointing and Durability**

        MongoDB periodically creates checkpoints to snapshot the database’s state. In case of a crash, these checkpoints allow MongoDB to recover the database to its last consistent state by replaying the transaction logs (WAL). If the insert operation involved index updates, these are also included in the checkpoint to ensure that index data is consistent after a restart.

    These steps represent the complete flow of an insert operation in MongoDB, with each phase ensuring that data is efficiently stored, indexed, and made durable. This process combines high-performance disk I/O management, in-memory caching, and robust durability guarantees through Write-Ahead Logging and checkpointing.

## Handling Updates and Upserts

    MongoDB provides robust support for updates and upserts, but these operations pose unique challenges in ensuring data integrity and index consistency. An upsert, which updates a matching document or inserts a new one if none exists, requires MongoDB to handle both read and write phases seamlessly. This involves conditional execution, where the database queries the collection, often using an index, to locate a match; if none is found, the operation transitions into an insert, necessitating new index entries. Index maintenance during updates requires modifying or removing outdated entries and creating new ones for changed indexed fields, while upserts resulting in inserts demand precise navigation of the B+ tree to place new entries efficiently. Concurrent operations in multi-user environments can lead to duplicate inserts or inconsistent index states, requiring MongoDB to implement fine-grained locking and transaction mechanisms. Additionally, frequent updates to indexed fields can make index modifications disk-intensive, a challenge MongoDB addresses by optimizing disk writes and caching index pages to reduce I/O operations.

    Whether performing an update or an upsert, MongoDB follows a structured process to ensure data and index changes are applied consistently:

    - **Locate the Document**

        For an update, MongoDB first locates the document using either the _id or another indexed field. For an upsert, the search determines whether the operation will modify an existing document or insert a new one.

    - **Modify Data in Memory**

        Updates modify the document in memory, adhering to the specified update operators (e.g., $set, $inc). If the update changes an indexed field, MongoDB prepares to update the corresponding index entries.

    - **Apply Index Changes**

        If an indexed field is modified, MongoDB removes the outdated index entry and inserts a new one reflecting the updated value. For upserts resulting in an insert, new index entries are created for all indexed fields.

    - **Transactional Logging**

        All changes to data and indexes are recorded in MongoDB’s write-ahead log (WiredTiger journal). This ensures durability and allows MongoDB to recover in the event of a failure.

    - **Commit to Disk**

        Once changes are logged, MongoDB writes the updates to disk. This includes both the modified document and any updated index pages.

    - **Concurrency and Locking**:

        MongoDB uses fine-grained concurrency control to ensure that multiple updates or upserts do not conflict. At the document level, WiredTiger applies locks to coordinate changes, preventing race conditions while minimizing contention.

    By carefully coordinating data and index changes, MongoDB ensures that updates and upserts remain efficient and reliable, even under high concurrency. This approach allows developers to use these powerful operations without worrying about data or index inconsistencies.

## Optimizing Disk I/O for Indexes

    MongoDB relies heavily on its disk I/O to maintain efficient performance when managing large datasets and handling complex queries. Optimizing disk I/O, especially for index management, is essential for reducing query latency and improving overall throughput. MongoDB optimizes disk I/O for indexes using several key strategies that improve the efficiency of query execution and data storage. Here’s how it achieves this:

    -  **B-Tree Index Structure**

        MongoDB uses B-trees for indexes, which allow efficient data lookups, inserts, updates, and deletions. B-trees keep related data (keys and values) close together in memory and on disk, reducing the number of disk reads required during searches. As B-trees are balanced, MongoDB ensures predictable performance for queries, even as data grows.

    - **Write-Ahead Logging (WiredTiger)**

        MongoDB’s default storage engine, WiredTiger, uses a write-ahead log to minimize the number of disk writes. Changes to indexes and data are first written to memory and logged before being flushed to disk in batches, reducing random writes.

    - **Compression**

        WiredTiger compresses both data and indexes. This reduces the size of the index on disk, lowering the number of disk pages that need to be read into memory during queries.

    -  **Memory Mapping and Cache Management**
        MongoDB uses memory-mapped files for disk I/O, allowing the operating system’s virtual memory manager to manage caching. Frequently accessed portions of indexes are cached in memory, reducing the need for repeated disk reads.

    - **Prefetching and Sequential Access**

        MongoDB prefetches data into memory in chunks when it anticipates sequential access patterns. This is especially useful during range queries where consecutive parts of an index are read.

    - **Minimized Page Splits**

        MongoDB minimizes the overhead of B-tree page splits by optimizing how new keys are inserted. Keys are distributed efficiently, reducing fragmentation and ensuring fewer disk writes.

    - **Asynchronous Disk I/O**

        Disk operations for writing index changes are performed asynchronously to avoid blocking queries. This allows MongoDB to maintain high throughput while managing disk I/O in the background.

    - **Background Index Building**

        When creating indexes, MongoDB can build them in the background, reducing the load on disk and allowing other operations to continue with minimal interruption.

    - **Hot Data Optimization**

        MongoDB keeps recently or frequently accessed index data (hot data) in memory. This reduces the need to read from disk for common queries.

    Using these strategies, MongoDB effectively balances memory and disk usage, reducing the frequency and cost of disk I/O operations, and ensuring that indexes remain fast and efficient even as the dataset scales.

## Concurrency and Performance

    In multi-user environments, MongoDB ensures efficient operations while maintaining consistency through its sophisticated concurrency control mechanisms, primarily managed by the WiredTiger storage engine. Here’s how it strikes a balance between supporting simultaneous operations and maintaining high performance:

    ### How WiredTiger Ensures Multi-User Efficiency

    WiredTiger uses fine-grained concurrency controls to allow multiple users to perform read and write operations concurrently without conflicts or bottlenecks:

    - **Document-Level Locking**

        MongoDB applies locks at the document level, enabling parallel operations on different documents within the same collection. This minimizes contention compared to collection- or database-level locking.

    - **Optimistic Concurrency Control**

        WiredTiger uses techniques like write-ahead logging (WAL) to record changes in a journal before applying them. This ensures durability while allowing concurrent reads to proceed without waiting for writes to complete.

    - **Snapshot Isolation**

        For read operations, WiredTiger provides a consistent view of the data using MVCC (Multiversion Concurrency Control). This means readers can access an unchanging snapshot of the data even as writers modify the underlying documents.

    ### Balancing Write Operations and Index Updates

    Write-heavy operations can strain the system, especially when they involve updates to indexes. MongoDB employs several strategies to balance these workloads efficiently:

    - **Batching Index Changes**

        When multiple writes occur in quick succession, MongoDB batches the corresponding index updates to reduce the number of disk I/O operations.

    - **Dirty Page Management**

        Modified index pages are kept in memory until it’s efficient to flush them to disk, ensuring frequently accessed pages remain cached.

    - **Asynchronous Disk Writes**

        To minimize latency, WiredTiger asynchronously writes index changes to the journal and checkpoints them periodically, allowing the system to process additional operations without waiting for disk I/O to complete.

    **Adaptive Throttling**

        MongoDB dynamically adjusts write throughput to balance workloads, preventing situations where index updates overwhelm disk capacity or memory resources.

    By combining document-level locking, snapshot isolation, and efficient batching of index updates, MongoDB ensures high performance and concurrency, even in demanding, write-intensive environments.

## Common Scenarios and Disk-Level Behavior

    ### High-Frequency Inserts and Their Impact on Indexes

    When dealing with high-frequency inserts, MongoDB must carefully manage index updates to prevent performance bottlenecks:


    - **Frequent B+ Tree Modifications**

        Each insert may trigger updates to multiple B+ tree nodes, potentially requiring page splits or rebalancing, which can increase disk I/O.

    - **Write Caching**

        MongoDB mitigates these challenges by using in-memory buffers to batch index changes, reducing the frequency of direct disk writes.

    - **Checkpointing and Journaling**

        Changes are first recorded in the journal and later flushed to disk during checkpoints, ensuring durability without overwhelming disk resources.

    ### Large Collections: Scaling Index Performance

    For large collections, indexes must handle vast amounts of data while maintaining query efficiency:
    - **Sparse vs. Dense Indexes**

        Using sparse indexes can save disk space and improve performance by only indexing documents with non-null values in specific fields.

    - **Sharding**

        MongoDB distributes data and indexes across shards in a cluster, allowing horizontal scaling and ensuring that no single node becomes a bottleneck.

    - **Index Partitioning**

        To optimize performance, MongoDB strategically places related B+ tree nodes together on disk, minimizing random disk reads during queries.

## Best Practices for MongoDB Index Design

    ### Designing for Query Optimization

    To ensure efficient queries, design indexes that align with your query patterns:
    - **Compound Indexes**

        Combine multiple fields into a single index to support complex queries efficiently. For example, an index on `{ age: 1, location: 1 }` can optimize queries that filter or sort by both age and location.

    - **Index Prefixes**

        Use index prefixes in compound indexes to reuse the same index for multiple query patterns.

    - **Index Cardinality**

        Prioritize indexing fields with high cardinality (many unique values) to improve selectivity and reduce the size of scanned data.

    ### Avoiding Index Bloat and Write Amplification

    Over-indexing can lead to larger index files and increased disk I/O during writes:
    - **Selective Indexing**

        Only index fields frequently used in queries or sorts. Avoid creating indexes on rarely queried fields.

    - **TTL Indexes**:

        For time-sensitive data, use TTL (Time-to-Live) indexes to automatically delete expired documents, reducing the burden on indexes.

    - **Periodic Index Review**

        Regularly review and drop unused indexes to free up resources.
    - **Minimizing Write Amplification**

        Write amplification occurs when a single write operation triggers multiple disk writes (e.g., for indexes). Batch writes and reduce the frequency of updates to indexed fields to minimize this effect.

    By understanding disk-level behaviors and adopting thoughtful index design strategies, MongoDB users can achieve efficient, scalable, and reliable performance.

## Further Reading and Resources

    To deepen your understanding of MongoDB indexing and its internal mechanics, explore these helpful resources:
    - [MongoDB Documentation](https://www.mongodb.com/docs/manual/indexes/)
    - [MongoDB University](https://learn.mongodb.com/)
    - “Designing Data-Intensive Applications” by Martin Kleppmann

        By diving into these resources, you can further solidify your understanding of MongoDB’s indexing and storage intricacies, empowering you to design efficient and scalable solutions.
