---
title: MongoDB Basics
date: 2024-11-23
tags:
  - mongo
  - json
  - nosql
  - design
  - database
draft: false
summary: Understanding Basics of MongoDB storage and Scalability.

images:
  - /static/blogs/mongo_db.png
authors:
  - default
---

When deciding between SQL and NoSQL databases, many factors come into play, such as scalability, flexibility, and data structure. MongoDB, a NoSQL database, stands out for its unique design tailored to modern application needs. In this article, we’ll explore how MongoDB stores data and why it uses BSON instead of JSON, along with the performance and handling benefits this choice brings.

Understanding MongoDB’s design provides insights into leveraging its document-oriented model for optimal data handling. Knowing how data is stored and processed internally helps in making better architectural choices, enhancing query performance, and building applications that scale seamlessly.

## Why was MongoDB created?

Relational databases are great—until they aren’t. Relational databases struggle to keep up with the demands of modern applications, especially when it comes to managing diverse, unpredictable data.

Here comes MongoDB, the rebel of the database world. Born to break free from rigid schemas, it embraces a flexible document-based model with dynamic schemas, allowing data to grow and evolve naturally—no shoehorning required. MongoDB wasn’t just about storing data; it was about doing it at a massive scale while keeping things fast, reliable, and developer-friendly. It was also designed to handle large-scale, distributed systems with built-in features for high availability and scalability, catering to the needs of modern applications and big data.

## Why JSON?

MongoDB chose to use JSON as its foundational data format because of its ease of use and compatibility with modern web technologies. JSON’s human-readable format and its native support in JavaScript made it an attractive choice for MongoDB’s document model. This alignment allows for straightforward interaction between MongoDB and web applications, facilitating seamless data interchange and manipulation. Additionally, JSON’s flexibility and hierarchical structure fits well with NoSQL's schema-less design, that works with complex data structures efficiently. JSON’s integration with JavaScript and its simplicity made it a natural fit for MongoDB’s objectives of providing a scalable, developer-friendly database solution.

## Why BSON Over JSON?

While JSON and MongoDB might seem like a perfect match at first, JSON does have its limitations. It supports only a limited set of data types, lacks native support for binary data, and doesn’t include metadata for efficient indexing. These shortcomings can hinder performance and flexibility in a database.

BSON’s binary format is a game-changer—it allows for more efficient storage and faster parsing compared to JSON’s text-based format. This means MongoDB can handle data faster and more efficiently, making it ideal for high-performance applications.

BSON (Binary JSON) supports a richer set of data types, including Date, ObjectId, Binary, and Decimal128—types that JSON simply can’t handle. BSON’s compact design optimizes both performance and storage. It reduces the overall size of the data, lowering storage costs while speeding up data retrieval. Plus, it makes MongoDB more efficient when handling large datasets or complex, deeply nested documents—something that would make JSON cringe!

JSON’s text format adds overhead when creating and maintaining indexes, which can slow down queries. BSON, on the other hand, provides a more efficient structure that supports faster indexing and querying, even with large datasets.
And let’s not forget BSON’s future-proof nature. It’s extensible, allowing MongoDB to add new data types as needed without disrupting its core structure, making it a database that can grow and evolve with your data needs.

| Feature         | JSON                                          | BSON                                                                   |
| --------------- | --------------------------------------------- | ---------------------------------------------------------------------- |
| **Format**      | Text-based, human-readable                    | Binary format, not human-readable                                      |
| **Data Types**  | Limited (e.g., strings, numbers, booleans)    | Richer (e.g., Date, ObjectId, Binary, Decimal128)                      |
| **Size**        | Larger, as it stores data in plain text       | Smaller, as it uses binary encoding                                    |
| **Storage**     | Less efficient for complex structures         | More efficient for storage and retrieval                               |
| **Performance** | Slower to parse and handle large data         | Faster parsing and better performance, especially with large data sets |
| **Indexing**    | Less efficient for indexing                   | More efficient indexing support                                        |
| **Use Case**    | Ideal for web APIs and external communication | Optimized for internal storage and handling complex data types         |

## JSON to BSON: How MongoDB Bridges the Gap?

While JSON is great for external communication, it falls short when it comes to more complex data structures and performance. BSON was introduced to address these shortcomings, offering a more efficient and flexible solution for internal data storage in MongoDB.

To bridge the gap between these two formats, MongoDB stores data internally in BSON but interacts with applications through JSON. This allows MongoDB to leverage the simplicity and compatibility of JSON for communication with external systems, while taking advantage of the enhanced performance and richer data types offered by BSON.

Following are some example JSON objects and their corresponding Binary JSON representations.

```json
  {"hello": "world"} →
  \x16\x00\x00\x00           // total document size
  \x02                       // 0x02 = type String
  hello\x00                  // field name
  \x06\x00\x00\x00world\x00  // field value
  \x00                       // 0x00 = type EOO ('end of object')

  {"BSON": ["awesome", 5.05, 1986]} →
  \x31\x00\x00\x00
  \x04BSON\x00
  \x26\x00\x00\x00
  \x02\x30\x00\x08\x00\x00\x00awesome\x00
  \x01\x31\x00\x33\x33\x33\x33\x33\x33\x14\x40
  \x10\x32\x00\xc2\x07\x00\x00
  \x00
  \x00
```

To manage the conversion between these two formats, MongoDB uses drivers and client libraries. When data is sent to MongoDB, the driver or client library converts JSON data into BSON before it is stored. Conversely, when data is retrieved from MongoDB, it is initially in BSON format and is converted back into JSON by the driver or client library.

### How Does the Conversion Work?

    ![json-to-bson](/static/blogs/json_2_bson.png)

    The conversion from JSON to BSON happens in three steps:

    1. **Parsing JSON**:
      When data is sent from an application,the driver parses this JSON data into its internal  structure. This process involves breaking down the JSON’s key-value pairs and identifying the types of data being passed (such as strings, numbers, arrays, etc.).
      2.	**Data Type Mapping**:
      During the conversion, MongoDB maps the data types in JSON to those supported in BSON. This step ensures that the data retains its integrity when converted to BSON and back.
      3.	**Binary Encoding**:
      After mapping the data types, BSON encodes the data into a binary format. This encoding is more efficient than JSON’s text-based structure, allowing MongoDB to store and retrieve data faster, especially for larger datasets. This binary format also includes metadata like the length of each element, which helps MongoDB efficiently locate and index data.

## How is MongoDB Scalable?

MongoDB is designed for horizontal scalability, meaning it can handle growing data and traffic by distributing the load across multiple servers. Here’s how it scales:

1. **Sharding**:
   Sharding is MongoDB’s method for distributing data across multiple servers, or shards. Each shard is a separate database that contains a portion of the data. This allows MongoDB to spread out large datasets and queries across multiple machines, ensuring better performance and scalability as data grows. - _Shard Key_: MongoDB uses a shard key to determine how to distribute data across shards. This key is crucial for ensuring that data is distributed evenly.

   - _Automatic Balancing_: MongoDB automatically balances data across shards redistributing documents when necessary to avoid hot spots.

2. **Replication**:
   Replication in MongoDB involves creating copies of data across multiple servers. Each replica set contains a primary node that handles write operations and secondary nodes that replicate the data from the primary.

   - _Fault Tolerance_: If the primary node fails, one of the secondaries can be promoted to primary, ensuring high availability.
   - _Read Scalability_: Applications can distribute read requests across secondary nodes, improving performance in read-heavy scenarios.

3. **Data Localization**:
   With sharding, MongoDB can place data close to where it’s being used. This reduces latency by keeping data closer to the application, especially for global applications with distributed users.

By leveraging sharding, replication, and Data Localization, MongoDB can handle both large data volumes and high traffic, making it suitable for modern applications that need to scale quickly.

## Why Cursor?

A cursor in MongoDB is essentially a pointer to the result set of a query. Think of it like a bookmark in a book—you don’t need to read the entire page at once, just what’s relevant to you. Cursor plays a significant role in handling query results efficiently. When a query is executed, MongoDB doesn’t return all matching documents immediately. Instead, it creates a cursor, which points to the result set and retrieves data in small chunks. This approach offers several advantages:

1. **Memory Efficiency**:
   Without cursors, returning a large number of documents all at once would flood the system with excessive memory usage and network bandwidth, much like trying to gulp an entire bottle of water in one go. By using cursors, MongoDB can process and transmit data in manageable chunks, avoiding resource bottlenecks and keeping applications responsive. It’s like sipping water instead of gulping it down.
2. **Lazy Loading**:
   Cursors operate with lazy loading, meaning data is fetched only when it’s needed. This enables applications to begin processing results incrementally, without waiting for the entire result set to be transferred first. It’s especially useful for queries that return large datasets, as the application can start working with the first few results while the rest are still being loaded. Think of it as reading a book chapter-by-chapter, instead of reading it all at once and then trying to remember everything.
3. **Pagination Support**:
   Instead of loading everything at once, data is split across pages. Cursors simplify this process, making it easy to implement pagination using methods like `skip()` and `limit()`. This allows users to smoothly navigate through large datasets, enhancing the user experience. Imagine scrolling through a feed and effortlessly moving to the next set of results without any lag.
4. **Streaming Large Datasets**:
   In some applications, especially those that deal with extensive datasets (such as logs, large collections of records, or real-time data), loading all the data into memory at once could be catastrophic. Cursors allow for data streaming—fetching and processing data incrementally. This avoids overwhelming the system and allows for better scalability and performance. It’s like watching a movie in real-time, where the next scene starts streaming as soon as you finish the current one, instead of downloading the whole movie at once.

## Considerations and Limitations?

While MongoDB is a powerful and flexible NoSQL database that excels in many use cases, there are several considerations and limitations that should be taken into account when deciding whether to use it for a particular application. Here are some key points to consider:

1. **No Schema Enforcement**:
   MongoDB’s flexible schema is advantageous but can lead to data inconsistencies. Without a predefined schema, data integrity is harder to enforce.
2. **Lack of Joins**:
   MongoDB doesn’t support joins natively, which can make complex queries more difficult and less efficient. Though the `$lookup` operator provides join-like functionality, it’s not as fast as SQL joins.
3. **Data Duplication**:
   MongoDB encourages denormalization, which can lead to data duplication across documents. While this boosts performance, it can lead to data inconsistency if updates are not handled carefully.
4. **Memory Usage**:
   MongoDB stores large working sets in memory for performance. If the data exceeds available RAM, performance can degrade, and disk I/O may become a bottleneck.
5. **Sharding Complexity**:
   Sharding helps MongoDB scale horizontally, but it adds complexity. Poor shard key selection can lead to uneven distribution of data and inefficient queries.
6. **Consistency**:
   MongoDB prioritizes availability over consistency in its distributed system, meaning data might not always be immediately consistent across nodes. For some use cases, this can lead to consistency issues.
7. **Indexing Overhead**:
   While indexes boost query performance, they also consume resources. More indexes can slow down write operations, requiring careful balancing.
