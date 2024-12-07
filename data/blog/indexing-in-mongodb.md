---
title: 'Behind the Scenes: How MongoDB Indexing Works on Disk?'
date: 2024-12-06
tags:
  - mongo
  - indexing
  - nosql
  - disk io
  - database
draft: true
summary: Exploring the Mechanics of Indexing and Data Optimization in MongoDB
images:
  - /static/blogs/mongo_db.png
authors:
  - default
---

Curiosity has always been my driving force. While working with MongoDB, I couldn’t help but wonder how do indexes actually work under the hood? Sure, I knew the basics: indexes improve query performance and are built on B-trees, as I discussed in my blogs on [Database Indexing and B-Trees](/blog/database-indexing-and-btrees) and [Decoding MongoDB](/blog/decoding-mongodb). But what really happens at the disk level?

This question led me down the rabbit hole of MongoDB’s storage engine and indexing mechanics. What I discovered was fascinating: the delicate balance between speed, efficiency, and disk optimization. The above blogs explained the basics of indexing, B-trees, and MongoDB’s high-level features. The idea here is to focus on the internal drive-level mechanics of how indexing is implemented and maintained, such as how storage engines (e.g., WiredTiger) interact with disk systems. It dives into disk I/O patterns, B-tree node storage, and operational nuances like journaling, page splits, and checkpointing, bridging the gap between conceptual understanding and low-level implementation.

## Storage Engine and Disk Interaction

    •	How storage engines like WiredTiger manage on-disk data structures.
    •	Interaction between indexes and file systems (blocks and pages).

## Index Update Workflow

    •	How indexes are modified during inserts, updates, and deletes.
    •	Write-ahead logging (WAL) and maintaining consistency.

## B-Tree in Action (Drive-Level)

    •	Disk I/O optimization with B-trees: reading/writing nodes and balancing.
    •	Fragmentation and page splits.

## MongoDB-Specific Insights

    •	WiredTiger’s approach to managing indexes on disk.
    •	Journaling, checkpointing, and index durability.

6. Optimization and Challenges

   • Compression techniques in WiredTiger.
   • Managing large datasets with limited memory.
   • Disk-related bottlenecks for index-heavy workloads.

7. Conclusion

   • Recap of drive-level mechanics of indexing.
   • Emphasis on its relevance to database optimization.

Let me know if you’d like refinements!
