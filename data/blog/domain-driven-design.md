---
title: Domain-Driven Design
date: 2024-02-29
tags:
  - design
draft: true
summary: Building Softwares that Speaks the Business Language.
images:
  - /static/blogs/domain-driven-design.png
authors:
  - default
---

Consider working on finance app where users can manage their investments. We get a list of features to develop and jump straight into implementation without fully understanding the complexities of the finance domain. The happy flows work fine but since we don't know much about the domain, we don't know all the scenarios that can arise. This leads to frequent errors and inaccurate data. Now we ask some friend with good knowledge of finance for help but although we know many computer languages, but we have no idea about the financial language. We will have a hard time communicating with our friend and he/she won't understand the code. Moreover there would be potential delays in project delivery, increased development costs due to rework, and even loss of customer trust if the application consistently delivers inaccurate financial data.

## What is Domain Driven Design?

Domain-Driven Design (DDD) is an approach in software development that emphasizes on the importance of understanding and modeling the domain of the project as a central aspect of the development process. It was introduced by Eric Evans in his book "Domain-Driven Design: Tackling Complexity in the Heart of Software," published in 2003.

At its core, it advocates for aligning the software model closely with the real-world domain it represents, focusing on the business or problem space rather than technical considerations. This approach helps software engineers and domain experts to collaborate effectively and create software that reflects the complexities and nuances of the domain.

## Key Concepts:

### Ubiquitous Language

### Bounded Context

### Entities and Value Objects

### Aggregates

### Repositories

### Domain Events
