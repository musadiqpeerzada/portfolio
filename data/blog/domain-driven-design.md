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

Ubiquitous Language is not a programming language, it is just a vocabulary. It is like having a common language that everyone involved in a project understands and uses consistently. People from different backgrounds work closely on any project. For example while working on a project in finance domain, there are certain stakeholders: engineers, financial analysts, and business managers. Each group has its own jargon and terminology.
To ensure smooth communication and understanding among all the teams from varying backgrounds, all must agree to use a single, shared vocabulary, this shared vocabulary is the Ubiquitous Language. It includes terms that accurately describe concepts in the problem domain and are understood by everyone involved.

For example, let's consider the term _transaction_. A transaction could mean different things to different people:

- To an engineer, it might refer to a database operation.
- To a financial analyst, it could mean buying or selling stocks or bonds.
- To a business manager, it might represent any exchange of money within the company.

This would lead to miscommunication within the stakeholders. In such scenario, establishing a Ubiquitous Language means agreeing on a precise definition for "transaction" that encompasses all these perspectives. So, whenever anyone talks about a "transaction" in the context of the project, everyone understands it in the same way.

It is advisable to use terminology that aligns with the problem domain, it ensures clarity and understanding among all stakeholders involved in the project. When the language used in the software closely resembles the language used by domain experts, it becomes much easier for engineers, business analysts, domain experts, and other team members to communicate effectively. This alignment reduces the chances of misinterpretation and enhances collaboration throughout the development process.

### Bounded Context

### Entities and Value Objects

### Aggregates

### Repositories

### Domain Events
