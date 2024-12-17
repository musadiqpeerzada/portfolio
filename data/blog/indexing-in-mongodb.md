---
title: 'Behind the Scenes: MongoDB Indexing'
date: 2024-12-17
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
draft: false
summary: Explore MongoDB indexing to see how data is structured and optimized for fast queries. With WiredTiger, indexes use B-tree structures and efficient caching to minimize disk reads and boost performance.
images:
  - /static/blogs/mongodb_indexing.png
authors:
  - default
---

Curiosity has always been my driving force. While working with MongoDB, I couldn't help but wonder how do indexes actually work under the hood? Sure, I knew the basics: indexes improve query performance and are built on B+ trees, as discussed in [Database Indexing and B-Trees](/blog/database-indexing-and-btrees) and [Decoding MongoDB](/blog/decoding-mongodb). But what really happens at the disk level?

This question led me down the rabbit hole of MongoDB's storage engine and indexing mechanics, and it is fascinating- the delicate balance between speed, efficiency, and disk optimization.

## A Quick Recap

    - Indexes enhance query performance by maintaining a sorted data structure.
    - Indexes eliminate the need for full collection scans, reducing query time.
    - MongoDB uses B+ trees for indexing.
    - B+ trees store the values in leaf nodes, enabling efficient range queries.
    - B+ trees provide logarithmic time complexity O(log n) for search, insert, and delete operations.
    - B+ trees optimize the disk I/O by grouping related keys and pointers in compact structures.

    For a deeper understanding of how these principles work in practice, let's explore MongoDB's default storage engine, WiredTiger, and how it manages indexing and disk I/O.

## Why Understanding Disk-Level Mechanics Matters

    Understanding how MongoDB handles indexing at the disk level is crucial for several reasons:

    - **Optimizing Query Performance**

        Well-designed indexes utilize storage systems efficiently, minimizing disk I/O.

    - **Informed Scaling Decisions**

        Understanding disk operations helps mitigate bottlenecks as data grows.

    - **Troubleshooting and Fine-Tuning**

        Low-level mechanics help diagnose inefficiencies, such as excessive reads or poorly structured indexes.

    With this understanding, one can design, optimize, and maintain a high-performance MongoDB instance more effectively.

## WiredTiger: The Storage Engine Behind MongoDB

    [WiredTiger](https://github.com/wiredtiger/wiredtiger) is MongoDB's default storage engine, designed for efficient disk I/O and optimized for high-concurrency operations. It manages how data and indexes are stored, retrieved, and updated, ensuring a balance between performance, scalability, and data integrity. Here's how WiredTiger works with disk:

    - **Data and Index Storage**

        WiredTiger uses a document-level concurrency model, enabling independent modifications without locking the entire collection. It stores document data and indexes in separate files, seamlessly managing memory-disk interactions for efficiency. For example, a high-concurrency update operation on a collection with an index on age modifies only the relevant documents and their indexed value, without affecting unrelated queries or updates.

    - **In-Memory Caching**

        WiredTiger utilizes an in-memory cache to store frequently accessed data and index pages. By caching data in memory, disk I/O operations are reduced, improving performance for read-heavy workloads. When an index is queried or updated, WiredTiger checks the in-memory cache first before accessing the disk, ensuring faster query execution.

    - **Write-Ahead Logging (WAL)**

        Before applying changes to disk, WiredTiger logs them in a transaction log, ensuring data durability. This journaling mechanism, based on Write-Ahead Logging, ensures that if a crash occurs, MongoDB can replay the log to restore consistency without data loss.

    - **Page Management and Compression**

        Data and index entries are stored in disk pages. WiredTiger optimizes page management to balance performance with minimal read/write overhead. It applies compression (e.g., Snappy, Zlib) to both data and indexes, reducing the amount of data stored and read from disk, thus improving storage efficiency and lowering I/O overhead.

    - **Checkpointing**

        Checkpoints act as periodic snapshots of data, allowing MongoDB to recover quickly by replaying the WAL to the last checkpoint. This ensures both durability and consistency even after unexpected failures.

## What Happens During an Insert?

    Inserting a document into MongoDB is a multi-step process involving validation, data storage, and index updates. Each step ensures data durability, efficient storage, and quick retrieval. Here's a breakdown of what happens under the hood:

    1. **Document Insertion Request**

        The client application sends an insert request to the MongoDB server. The request includes the document and the metadata like collection name.

    2. **Validation**

        MongoDB validates the document against defined schema (if applicable) and constraints. If a unique index exists on email, for example, inserting a duplicate email value would fail. If validation fails, the insert operation is aborted, and an error is returned to the client.

    3. **In-Memory Staging**

        Validated documents are placed in an in-memory write buffer for efficient batch writes to disk.  MongoDB also logs the operation in the WAL, ensuring recoverability before data hits disk.

    4. **Write to Data Files**

        The document is written to data files in BSON format, storing fields and metadata.

    5. **Index Updates**

        If the document contains values for any indexed fields,  MongoDB updates the corresponding B+ tree indexes:

        a. **Locate the Correct Position in the B+ Tree**:
            Find the correct position in the B+ tree.

        b. **Insert the Index Entry**:
            Add the field value and a pointer to the document.

        c. **Balancing the B+ Tree**:
            If an index node is over capacity, it splits into smaller nodes, maintaining balance.

        d. **Updating Parent Nodes**:
            The splits propagate upward, parent nodes are adjusted to reflect the new structure after splits.

    6. **Index Write to Disk**

        Once in-memory index updates are complete, WiredTiger writes them to disk.

    7. **In-Memory Caching**

        Frequently accessed documents and index pages remain cached in memory.

    8. **Transaction Commit**

        After writing changes to memory and disk, MongoDB commits the transaction, ensuring data is permanent and visible to other operations.

    9. **Completion of Insert Operation**

       MongoDB returns an acknowledgment to the client, indicating success.

    10. **Checkpointing and Durability**

        Periodic checkpoints snapshot the database's state. On recovery, MongoDB replays the WAL from the last checkpoint to restore recent changes.

    This flow represents the complete insert operation in MongoDB, ensuring data is efficiently stored, indexed, and made durable. Combining disk I/O management, in-memory caching, and mechanisms like Write-Ahead Logging and checkpointing, MongoDB optimizes for both speed and reliability.

## Handling Updates and Upserts

    Updates and upserts require careful coordination of data and index modifications. An upsert updates a document if it exists or inserts a new one if not.

    ### Challenges in Updates and Upserts
    - **Index Maintenance**

        Updating indexed fields requires removing outdated entries and inserting new ones. Upserts add new entries efficiently into the B+ tree.

    - **Concurrency Handling**

        In multi-user environments, MongoDB uses locking and transactional mechanisms to prevent duplicate inserts or inconsistent index states.

    - **Disk-Intensive Operations**

       Frequent indexed field updates can lead to high disk I/O. MongoDB optimizes writes and caches index pages to reduce overhead.

    ### The Process of Updates and Upserts

    1. **Locate the Document**

        MongoDB queries the collection. For upserts, it checks if a match exists; otherwise, it prepares to insert.

    2. **Modify Data in Memory**

        Updates modify the document according to the update operators (e.g., $set, $inc). If an indexed field changes, MongoDB prepares to update the index.

    3. **Update Indexes**

        Old index entries are removed, new ones are inserted. For upserts, new index entries are created for all indexed fields.

    4. **Transactional Logging**

        Changes are logged in the write-ahead log (WiredTiger journal).

    5. **Commit to Disk**

        Modified documents and updated index pages are committed to disk.

    6. **Concurrency and Locking**:

        WiredTiger applies locks at the document level to coordinate changes, preventing race conditions while minimizing contention.

    By coordinating data and index changes efficiently, MongoDB ensures that updates and upserts remain consistent, reliable, and performant even under high-concurrency workloads.

## Optimizing Disk I/O for Indexes

    MongoDB optimizes disk I/O to maintain performance with large datasets and complex queries. Efficient index management reduces query latency and enhances overall throughput. Here's how MongoDB achieves this:

    -  **B-Tree Index Structure**

    By keeping related data close together on disk, B+ trees reduce disk reads and ensure predictable performance.

    - **Write-Ahead Logging (WiredTiger)**

        Changes are first logged in memory and flushed in batches, reducing random I/O.

    - **Compression**

        Data and index compression shrinks storage size and reduces I/O.

    -  **Caching and Reduced Reliance on Memory-Mapped Files**
        WiredTiger relies on its own internal cache and filesystem-level I/O rather than traditional memory-mapped files, granting more granular control over memory usage and reducing unnecessary disk access.

    - **Prefetching and Sequential Access**

        For range queries or sequential access patterns, MongoDB prefetches chunks of data into memory, reducing I/O overhead.

    - **Minimized Page Splits**

        MongoDB minimizes the overhead of B-tree page splits by optimizing how new keys are inserted. Keys are distributed efficiently, reducing fragmentation and ensuring fewer disk writes.

    - **Asynchronous Disk I/O**

        Index updates are written to disk asynchronously, ensuring queries remain non-blocking and throughput stays high.

    - **Background Index Building**

        Indexes can be built in the background, minimizing disruptions.

    - **Hot Data Optimization**

        Frequently accessed "hot" index data stays in memory, speeding up common queries.

    These strategies help MongoDB optimize memory and disk usage, reducing disk I/O and ensuring indexes remain fast and efficient as the dataset grows.

## Concurrency Control and Performance Optimization

    In multi-user environments, MongoDB ensures consistent and efficient operations through concurrency control mechanisms, primarily managed by the WiredTiger storage engine. Here's how MongoDB balances simultaneous operations and high performance:

    ### How WiredTiger Ensures Multi-User Efficiency

    WiredTiger's concurrency controls allow multiple users to perform read and write operations concurrently without conflicts or bottlenecks:

    - **Document-Level Locking**

        MongoDB applies locks at the document level, enabling parallel operations on different documents within the same collection. This minimizes contention compared to collection- or database-level locking.

    - **Optimistic Concurrency Control**

        Write-Ahead Logging (WAL) enables to record changes before applying them, ensuring durability while allowing concurrent reads to proceed without waiting for writes to finish.

    - **Snapshot Isolation**

        WiredTiger provides a consistent view of the data using MVCC (Multiversion Concurrency Control), allowing readers to access an unchanging snapshot of the data while writers modify the documents.

    While these mechanisms ensure multi-user efficiency, handling write-heavy operations requires additional optimizations for indexing.

    ### Balancing Write Operations and Index Updates

    Write-heavy operations, particularly those involving index updates, can strain system resources. MongoDB employs following strategies to efficiently handle these workloads:

    - **Batching Index Changes**

        When multiple writes occur in quick succession, MongoDB batches the corresponding index updates to reduce the number of disk I/O operations.

    - **Dirty Page Management**

        Modified index pages remain in memory until efficiently flushed to disk.

    - **Asynchronous Disk Writes**

        Index changes are written to the journal asynchronously, minimizing latency and enabling the system to continue processing operations while managing disk writes in the background.

    **Adaptive Throttling**

        MongoDB dynamically manages write throughput, preventing index updates from overwhelming disk or memory resources.

    Combining document-level locking, snapshot isolation, and efficient batching of index updates, MongoDB ensures high performance and concurrency, even in write-intensive environments.

## Scaling Index Performance

    When working with large collections, efficient index management becomes paramount for ensuring performance. Here's how MongoDB handles disk-level optimizations:

    - **Sparse vs. Dense Indexes**

        Sparse indexes help save disk space and improve performance by indexing only non-null values, which can be particularly useful for large datasets with many optional fields.

    - **Sharding**

        MongoDB can distribute data and indexes across multiple shards in a cluster, allowing horizontal scaling to improve performance. Sharding not only optimizes query execution but also ensures that no single node is overwhelmed with data storage or query requests.

    - **Index Partitioning**

        To further optimize query performance, MongoDB places related B+ tree nodes together on disk, reducing the number of random reads necessary during query execution.

## Best Practices for MongoDB Index Design

    Efficient index design is essential for optimizing query performance and minimizing resource overhead. Follow these best practices to ensure a balanced and effective indexing strategy:

    ### Optimizing Query Performance

    To ensure efficient queries, design indexes that align with your query patterns:
    - **Compound Indexes**

        Multiple fields can be combined into a single index to support complex queries efficiently. For example, an index on `{ age: 1, location: 1 }` can optimize queries that filter or sort by both age and location.

    - **Index Prefixes**

        Compound index prefixes can be leveraged to support multiple query patterns with a single index, avoiding redundant index creation.

    - **Index Cardinality**

        Prioritize indexing fields with high cardinality (many unique values) to improve selectivity and reduce the size of scanned data.

    ### Managing Index Overhead

    Over-indexing can lead to larger index files and increased disk I/O during writes. Following approaches can be utilized to avoid these pitfalls:

    - **Selective Indexing**

        Only index fields frequently used in queries or sorts. Creating indexes on rarely queried fields can be avoided.

    - **TTL Indexes**:

        For time-sensitive data, TTL (Time-to-Live) indexes can be created to automatically delete expired documents, reducing storage requirements and keeping indexes lean.

    - **Index Maintenance**

        Regular reviews and dropping of unused or redundant indexes can be done to free up disk space and improve write performance.

    - **Minimizing Write Amplification**

        Write amplification occurs when a single write triggers multiple disk writes, such as for updating indexes. Batch writes and limit updates to indexed fields to reduce this overhead.

    Understanding disk-level behaviors and adopting thoughtful index design strategies, ensure an efficient, scalable, and reliable database.

## Further Reading and Resources

    To deepen your understanding of MongoDB indexing and its internal mechanics, explore these helpful resources:
    - [MongoDB Documentation](https://www.mongodb.com/docs/manual/indexes/)
    - [MongoDB University](https://learn.mongodb.com/)
    - “Designing Data-Intensive Applications” by Martin Kleppmann
