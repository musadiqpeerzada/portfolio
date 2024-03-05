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

Bounded Context is crucial for designing software systems that accurately reflect the real-world domains. It involves drawing a boundary around a specific area within a larger system where certain terms, rules, and concepts apply. It helps to define clear boundaries and rules for different parts of a system, allowing them to operate independently without interfering with each other

For instance, consider an app in the finance domain offering both banking and investment services. Each service represents a separate subdomain with its own Bounded Context. In the banking context, terms such as "account," "deposit," and "withdrawal" are common. Here, the focus is on managing customer accounts, tracking transactions, and calculating balances. Conversely, in the investments context, terms like "portfolio," "stock," and "trade" are often encountered, dealing with managing portfolios, executing trades, and monitoring market activity.

However, a challenge arises when certain terms, such as "transaction," exist in both subdomains but carry different meanings. In the banking context, a "transaction" refers to actions like depositing or withdrawing funds, while in the investments context, it pertains to buying or selling stocks or bonds.

By establishing these Bounded Contexts, each with its unique set of terms, rules, and constraints, clarity is ensured and confusion is prevented. While terms may have differing interpretations across contexts, within each context, they possess a clear and consistent definition.

Each context has its own rules and vocabulary, making it easier to understand and manage. By clearly defining these boundaries, one ensures that each part of the system works independently without interfering with the other. Moreover, it helps everyone involved understand exactly what's happening in each area, leading to better communication and a more effective software system.

### Entities and Value Objects

#### Entities

Entities are objects within a software system that have a distinct identity and lifecycle. They represent things in the domain that are unique and can be individually identified and tracked. In simpler terms, entities are the "nouns" in the problem domain.

Consider a bank account. Each bank account is unique and has its own attributes, such as an account number, account holder's name, and balance. In the system, each bank account is an entity and can be identified and manipulated individually, such as depositing money into a specific account or transferring funds between accounts.

#### Value Objects

Value Objects, on the other hand, are objects within the system that are defined by their attributes rather than their identity. They represent concepts in the domain that are immutable and interchangeable. In simpler terms, value objects are the "adjectives" or "descriptors" in the problem domain.

Consider a currency amount, like 100 INR. This amount is defined by its numerical value and currency type (INR). However, unlike a bank account, a specific amount of money doesn't have a unique identity, it is interchangeable with other amounts of the same value and currency. In the system, currency amounts would be represented as value objects. Operations like adding or subtracting amounts can be performed on it, but each individual amount is not tracked as a distinct entity.

Overall, entities represent unique objects with identities, while value objects represent immutable concepts defined by their attributes. In the finance domain, entities could include bank accounts, customers, or transactions, while value objects could include currency amounts, dates, or addresses. These concepts help to accurately model the domain and design effective systems.

### Aggregates

### Repositories

### Domain Events
