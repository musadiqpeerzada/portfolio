---
title: Clean Code
date: '2024-02-10'
tags:
  - clean code
draft: true
summary: Takeaway from Clean Code by Uncle Bob.
images:
  - /static/blogs/clean-code.png
authors:
  - default
---

This blog is a summary of book "Clean Code: A Handbook of Agile Software Craftsmanship" by Robert C. Martin, popularly known as Uncle Bob.
In this book, Bob emphasizes the importance of writing clean, understandable, and maintainable code. The book is targeted at software engineers, developers, and anyone involved in the software development process. Uncle Bob portrays his decades of experience in software engineering to present a set of principles, techniques, and practices for writing clean code. This book has 17 chapters touching across various areas of software development. You can find the chapter wise takeaways.

## Chapter 1: Clean Code

Maintaining code quality is our duty. A doctor won't skip sanitizing his work tools before surgery even if the patient wants him to because it would be unethical and illegal for the surgeon to, given the risk it brings to the patient. Similarly, it's unprofessional for us to succumb to demands from those who don't understand the effects of poor code quality and the headaches it brings to our peers when they try to go through it for whatever reason. The temptation to just wrap it up to meet deadlines is real. However, the only path to efficiency is maintaining clean code at all times.

### Why does bad code happen?

- Deadlines are looming.
- Rush to deliver features.
- Not enough time allocated for quality work.
- Tired of working on the same piece of code.
- Pressure to complete tasks quickly.
  These reasons majorly lead to code that is chaotic.
  We often promise to _fix it later_ but then never gets addressed. We have all seen TODOs in code added years ago, but were never picked up and that is what LeBlanc's Law states: `Later equals never.`

### What Defines Clean Code?

Clean code is subjective, with each developer having their own definition. However, the crux of clean code is readability and maintainability. It reflects the care put into it. This blog highlights certain practices and principles of Clean Code. Following these guidelines can help us write code that's both clean and professional. However this approach isn't the only one and learning from multiple sources can help develop the skill of clean code.

### The Boy Scout Rule

Just writing clean code isn't enough; apart from clearing the debt of bad code, the code also needs to be actively maintained. We've all witnessed code degrade over time. To overcome this, we must adopt a [Boy Scout Rule](https://wiki.c2.com/?BoyScoutRule) which implies that "Leave the campground cleaner than you found it."

## Chapter 2: Meaningful Names

Code is full of names and identifiers. From variables and functions to files are directories all have a name and mastering this art of naming is crucial to write clean code.

### Use Intention-Revealing Names

The importance of naming lies in its ability to convey purpose. Selecting descriptive name may take time but pays off by reducing future efforts. A well-chosen name answers critical questions about its role: its reason for being, its purpose and its usage. If we need to add a comment to a name to describe it, we have not named it well and should think more about what it's name should be.

```python
d = 7
days_in_a_week = 7
```

What do we get from the above variables? Although the value is same but `days_in_a_week` clearly indicates what it is, what will it be used for but `d` does not.

```python
def get(l):
    return [a for a in l if a % 2 == 0]
```

Although this snippet is simple, we need to go through it to understand what it is doing, only then we understand that l is a list of numbers and the function returns even numbers.

```python
def get_even_numbers(number_list):
    return [number for number in number_list if number % 2 == 0]
```

Now even if we see the name of the function, we know what it is doing. If we see it being called anywhere, we know the purpose without even checking the implementation of the function.

### Avoid Disinformation

It is important to choose names that are clear and don't give the wrong idea. We must avoid using technical terms in a way that doesn't match their real meaning.
For example, don't call something an "number_list" if it's not actually a list. Using the word "List" might make others think it's a specific type of data structure when it's not.
Also we must be cautious with names that are very similar and may take some time to differentiate them. For example it's hard distinguishing between `numbers_divisible_by_four_and_even` and `numbers_divisible_by_five_and_even` unless we go through the whole names with all our senses. These words almost have the similar shape and can lead of confusion and misinterpretation.

### Make Meaningful Distinctions

We often introduce unnecessary complexity by trying to overcome language constraints, like naming variables too similarly or using unconventional spellings to differentiate them, like using "listt" because "list" is a keyword. Even sometimes if we need two different things in our code to have different names but run out of ideas, we might end up slightly changing one name in a way that doesn't make sense, like misspelling it on purpose. This can lead to weird situations where fixing the spelling stops the code from working. It's not enough to just add random numbers or extra words to make the names different for the computer; the names should also clearly show how they're different to anyone reading the code.
Using names like "a1", "a2", etc., doesn't help at all because they don't tell anything about what the variable is for. It's much clearer if we use names which give information about the variable or function.
Apart from this, adding words that don't help distinguish, like "Info" or "Data" to a name, don't help either. It's like adding "the" or "an" to apple but it is still the same apple. Functions named "get_active_users", "get_active_users_data", and "get_active_users_info" don't tell anything about what each one does differently.

### Use Pronounceable Names

We must use names that we or others can say out. Human brain is really good with words because a big part of it is all about language. Words are meant to be spoken out loud, so it's smart to pick names that we can actually say. If a name is hard to pronounce, talking about it can feel awkward. Imagine trying to discuss something called "bc3cnt" in a meeting. It would sound strange, like "bee-see-three-see-en-tee," and may not be able to even convey what we meant or maybe just say it wrong and no one is able to understand it. Using names like "genymdhms" (to mean the generate date with year, month, day, hour, minute) sounds like "gen-why-emm-dee-ah-em-ess" when people tried to say it, the heart stopped for a split second.
Clearer names, ease the communication about the code. We can say things like, "Hey, check out this customer record. The date it was created is set for tomorrow. How is that possible?" This way, names in our code help rather than hinder communication.

### Use Searchable Names

We almost everyday search for specific files or variables in our code. So we must choose names that can ease this process of searching or at minimum be searchable. Using single-letter names or just numbers can make it hard to search them later. For example, if we try to find where we used a specific number, like 7, we might get a lot of results because that number appears in many places. It's much easier to search for something like `NUMBER_OF_DAYS_IN_A_WEEK` because it's unique and descriptive. This is especially true for long numbers, where someone might accidentally mix up the digits and create a hard-to-find bug.
Generally, longer names are better because they're easier to find with a search. The idea is to use names that make sense and are easy to search for, especially if they are going to be used in many places in code.
Here's an example of how using descriptive names can make a difference:

```python
s += (24 * 60* 60 * 5)
```

```python
working_days_in_week = 5
seconds_in_a_minute = 60
minutes_in_an_hour = 60
hours_in_a_day = 24
seconds_in_working_days +=  (hours_in_a_day * minutes_in_an_hour * seconds_in_a_minute * working_days_in_week)
```

Both these snippets operate in a same way just that in the second snippet,not only are the names more meaningful, but they're also easier to search for. This makes it easier to find where working_days_in_week is used compared to just looking for every instance of the number 5.

### Avoid Encodings

We already deal with a lot of complex information. Adding extra codes or symbols to names, like hints about the type of data or where it's used, just makes things more complicated. It's not fair to expect someone new to learn all these special encoding "languages" on top of understanding the actual code they need to work with. This just adds unnecessary stress when trying to figure out a problem. Plus, names with these extra codes can be hard to say out loud and easy to type wrong.

### Avoid Mental Mapping

When naming things in code, make sure the names are straightforward so that others don't have to guess what they mean. Never underestimate their imagination. The goal is to write code that is easy to understand for anyone who might read it, not just for oneself.

### Class Names

Name classes with nouns or noun phrases like Customer, Account, PaymentService. Avoid words like Manager, Processor, Data, or Info. Class names should describe what they are, not what they do, and definitely not just the kind of data they handle.

### Method Names

Methods should be named with verbs or verb phrases that clearly state what they do, like postPayment, delete, or save. For getters and setters, use prefixes like get, set. If we have multiple constructors with different purposes, consider using static factory methods with descriptive names, and make the constructors private to guide their usage.

### Don't Be Cute

Don't use "funny" names in code; it might seem humorous at the moment, but it can make the code harder to understand and maintain. For example, use clear names like deleteItems instead of holyHandGrenade, or abort instead of eatMyShorts.

### Pick One Word per Concept

Choose one word for one concept and stick with it throughout the code. It's confusing if one class uses fetch, another uses retrieve, and another uses get to do essentially the same thing.

### Add Meaningful Context

Code will mostly be read by other programmers, so it's okay to use technical terms, algorithm names, or other specialized language when it fits.

### Use Problem Domain Names

If there's no technical term that fits what we're trying to do, prefer names from the problem domain working in. That way, even if someone doesn't understand the code, they can ask an expert in the field for help.

### Add Meaningful Context

Not every name makes sense on its own. Sometimes we need to give more context, either by grouping related names together in a class or namespace or by using prefixes (though this should be a last resort). For example, if we have variables like firstName, lastName, and street, it's clear they're part of an address. If we need to use one of these variables on its own, like state, providing some context, like addressState, can help clarify its role.

### Don’t Add Gratuitous Context

Adding too much context, especially unnecessary or repetitive context, can make names longer without making them clearer. For example, in an application called "PaymentService," we don't need to start every class name with PS.

## Chapter 3: Functions

Functions are the first line of organization in any code.

### Small

Functions should always be as small as possible. Code inside conditional statements or loops should just be one line, often just a call to another function. This approach helps to keep the main function small and code easier to understand. Functions should be straightforward enough that they don't need many levels of nested structures, like loops inside if statements inside other loops. Ideally, function shouldn't be indented more than once or twice, this make it simpler and more readable.

### Do One Thing

**FUNCTIONS SHOULD DO ONE THING. THEY SHOULD DO IT WELL. THEY SHOULD DO IT ONLY.**
Being said that the challenge often lies in defining what that "one thing" is. A good way to check is if all the steps in the function contribute directly to the high-level goal its name suggests, without introducing unrelated tasks or details, then the function is well-focused. Functions that mix different levels of abstraction typically are doing more than one thing and could be simplified or broken down.

#### Sections within Functions

If a function is divided into sections like declarations, initializations, and so on, it's a sign that the function might be doing more than one thing. Each function should be focused enough that it doesn't need such divisions, as every part of the function should contribute to the single task it's designed to perform.

### One Level of Abstraction per Function

Ensuring that functions stick to "doing one thing" involves maintaining a consistent level of abstraction throughout the function.

#### Reading Code from Top to Bottom: The Stepdown Rule

The code should be readable like a top-down narrative. Every function should be followed by those at the next level of abstraction so that the program can be read, descending one level of abstraction at a time as we read down the list of functions.

### Switch Statements

Switch statements make functions large and complex, especially when they cover multiple cases. Switch statements have following issues:

- Violate Single Responsibility Principle and Open/Closed Principle.
- Grows with each new case added, leading to bloated code.
- Does more than one thing, making it harder to understand and maintain.
- Often leads to duplicate code.
  To address these issues, we can encapsulate the switch statement within an abstract factory. This hides the complexity and ensures the switch statement is used only to create instances of objects in a polymorphic manner.
  It is not always possible to get rid of switch statements, following are some general rules to make switch statements more manageable:
- Should appear only once
- Used to create polymorphic objects
- Hidden behind an inheritance relationship, making them invisible to the rest of the system
  This approach aligns with the principles of good software design by keeping functions focused and adhering to SRP and OCP, while also leveraging polymorphism to handle varying behaviors based on object types.

### Use Descriptive Names

Naming functions thoughtfully is crucial for writing clean and understandable code. A well-chosen name communicates what a function does, making the code easier to read and maintain. Here are some key points:

- **Descriptive Names:** Choose names that clearly describe what the function does.
- **Length of Names:** It is ok to have longer names if they are more descriptive. A longer, clear name is better than a short, vague one.
- **Spend Time on Naming:** Don't rush naming, take time to find the most descriptive name. Try different names and see how they fit within the context of code.
- **Consistency:** Use consistent naming conventions across code. This helps in understanding the code's flow and its various components.

### Function Arguments Simplified

Function arguments can add complexity to the code. Here are some guidelines to manage them:

- **Fewer Arguments:** Aim for fewer arguments in functions. The ideal is having none, but one or two arguments are acceptable. More than three should be avoided.
- **Testing Complexity:** More arguments mean more combinations to test, which can complicate the testing process.
- **Argument Objects:** If a function requires many arguments, consider grouping some of these arguments into a class. For example, instead of passing multiple parts of address separately, pass a `Address` object.
- **Variable Arguments:** Functions accepting variable arguments should still adhere to the rule of keeping arguments to a minimum. Treat them as if they were a single list argument.
- **Verbs and Keywords in Names:** Use verbs for functions that perform actions and ensure that the function names and arguments form meaningful phrases. This helps in understanding what the function does and what the arguments represent.

### Have No Side Effects

Side effects in functions lead to unpredictable behavior and difficult-to-track bugs. A function should do exactly what its name suggests and no more. Here are the key points to consider:

- **Transparent:** When a function does something not clearly communicated by its name or its obvious purpose, it introduces a side effect. These hidden actions can affect the state of the application in unexpected ways.
- **Clarity in Naming:** If a function must perform additional actions, its name should reflect all its effects to avoid surprises. However, this often leads to functions that do more than one thing, which is also not advisable.
- **Mutating Arguments:** Mutating arguments can be confusing because it suggests a function is modifying something passed to it, rather than operating on its own state or returning a new value. This can lead to code that's hard to understand and maintain.
- **Object-Oriented Solutions:** In object-oriented programming, many needs for output arguments are eliminated. Methods should operate on the state of their own object, making the effects of calling a method clearer and keeping the code more encapsulated.

### Command Query Separation

Functions should either perform an action or provide information, but not both. This principle, known as Command-Query Separation, enhances clarity and prevents confusion.
A command changes the state of an object (e.g., setting a value), while a query returns information about an object without changing its state (e.g., checking a value).

### Prefer Exceptions to Returning Error Codes

Using error codes for command functions can complicate code, leading to nested structures and immediate error handling requirements. Exceptions and isolating try/catch blocks into different functions allow for separating error handling from the main logic, making the code cleaner and more readable. A function should focus on a single responsibility. If a function deals with error handling, it should not perform other tasks.

### Don't Repeat Yourself

The "Don't Repeat Yourself" (DRY) principle is the crux of functions, aiming to minimize redundancy in code. This principle suggests that every piece of knowledge or logic should be unique, singular, and authoritative within a system.
Duplication leads to certain issues, such as:

- Increased Maintenance: Duplication means any change needs to be made in multiple places, increasing the effort required for updates and the risk of inconsistencies.
- Error Propagation: Repeated code segments increase the chances of errors being replicated across the system.
- Readability and Clarity: Reducing duplication often enhances the readability and understandability of the code.
  To avoid duplication in our code we can use various methods like:
- **Abstraction:** Grouping similar logic into functions, classes, or modules to avoid repeating the same code.
- **Object-Oriented Principles:** Techniques like inheritance and polymorphism help to reduce code duplication by sharing common logic among related classes.
- **Design Patterns:** Many design patterns, such as Factory or Strategy, can help organize code to minimize duplication.

### Structured Programming

While structured programming principles, such as having a single entry and exit point in functions, aim to improve code quality, they are most beneficial in larger functions. In small, well-refactored functions, adhering too strictly to these principles might not provide significant value.

### How Do You Write Functions Like This?

Creating effective functions is similar to writing in general: start with a draft and iteratively refine it for clarity, conciseness, and effectiveness. This process involves not just mechanical changes but also thoughtful consideration of how each part of the code contributes to the whole, ensuring adherence to principles like DRY, and making the code express its purpose clearly.

## Chapter 4: Comments

**"Don't comment bad code—rewrite it"** ~ Brian W. Kernighan and P. J. Plaugher.
Comments can indeed provide clarity or explain complex logic, but they're not inherently beneficial and can sometimes do more harm than good. Their value depends on context and accuracy. If the code could perfectly express the programmer's intent, comments might be unnecessary. Comments compensate for our inability to express something clearly through code, which is often a shortcoming on our end.
The issue with comments is that:

- Can become outdated as the code evolves, leading to misinformation.
- Require maintenance, yet frequently neglected during code updates, leading to discrepancies between the code and its comments.
- Are not reliable source of truth about what code exactly does.
  Hence, we must aim to write code that's self-explanatory, reducing the reliance on comments to convey intent or logic. When writing a comment seems the only option, consider if there's a way to refactor the code to make the comment unnecessary.

### Comments Do Not Make Up for Bad Code

No comments are better that misleading comments. Code that expresses itself does not need comments. It is better to spend time on cleaning the mess than on writing comments to explain the it.

### Explain Yourself in Code

```python
# Check to see if the number is even and divisible by 5
if (number % 2 == 0) & (number % 5 == 0)
```

```python
if (is_even_and_divisible_by_5(number))
```

The second snippet expresses itself and does not need any comments.

### Good Comments

Some comments can't be avoided. The only truly good comment is the comment we could not find a way to write in code.

#### Legal Comments

Certain comments for legal reasons like copyright and authorship can't be expressed in code and are necessary and reasonable to put into a comment.

#### Explanation of Intent

Sometimes a comment may give useful information about the implementation and give the intent behind a decision.

#### Clarification

Sometimes it is helpful to translate the meaning of some obscure argument or return value into something that's readable. Although it is better to find a way to make that argument or return value clear in its own right; but when its part of the standard library, or in code that we cannot alter, then a helpful clarifying comment can be useful.

#### Warning of consequences

Sometimes it is useful to warn about certain consequences.

```python
# takes time to run
def time_consuming_task():
    time.sleep(10000000)
```

### TODO Comments

It may sometimes be reasonable to leave “To do” notes in the form of #TODO comments. TODOs are tasks that the we think should be done, but for some reason can’t do at the moment. It might be a reminder to delete a deprecated feature or a request for someone else to look at a problem. Whatever else a TODO might be, it is not an excuse to leave bad code in the system and we should regularly scan the code and try to remove the ones we can.

### Bad Comments

Most comments are bad. They are excuses for poor code or justifications for not so good decisions.

#### Mumbling

When adding a comment, make sure it's clear and adds real value. For example, instead of adding a comment "Handle the exception" just handle the exception. This way, the code effectively expresses itself without causing confusion.

#### Redundant Comments

Redundant comments are the comments for code that already clearly communicates, adding no additional value or insight. Effective comments should offer context, explanations, or clarifications that are not immediately obvious from the code itself.

#### Misleading comments

Sometimes, with all the best intentions, we make a statement in comments that isn't precise enough to be accurate. Our peers ought to trust the comment and the downfall of everything going wrong begins.

#### Mandated Comments

Having comments for each function like return value and arguments are not necessary if we name the function and the arguments in a prompt and accurate manner. These comments need unnecessary overhead to manage.

#### Journal Comments

Version Control Systems (like git, svn) serve their purpose very well, hence we don't need to add journal comments of who did what and what changed when.

#### Noise Comments

Comments for code that is clearly obvious are nothing but redundant and noise. Comments like these don't serve purpose and should be removed when encountered.

#### Position Markers

Comments like certain piece of code starts from here or for closing braces to indicate which block ends here don't serve any purpose. Modern IDEs are good enough to help with that. Moreover if the function or operation is too long to loose track of blocks, one should consider breaking down the function.

#### Commented-Out Code

Commented out code gathers like mud over the time at the bottom of dusty water. We comment it, others feel it is there for a reason and hence don't remove it and it keep bloating over time.

#### Nonlocal Information

If adding comment is unavoidable, it should be appear near the code it describes. Adding system wide information in the context of a local comment can lie hidden and undiscovered.

#### Too Much Information

If adding context is necessary to understand the code, add a reference like a link or some identifier (like RFC number) not the full content of it. Don't put interesting historical discussions or irrelevant descriptions of details into comments.

#### Inobvious Connection

The connection between a comment and the code it describes should be obvious. The reader should easily understand why the comment was added to the code and what does it refer to in the code.

#### Function Headers

Short functions don’t need much description. A well-chosen name for a small function that does one thing is usually better than a comment header.

## Chapter 5: Formatting

Good code formatting is crucial not just for aesthetics but also for maintaining professionalism and ensuring readability. It reflects our attention to detail. Adopting consistent formatting rules, especially in a team setting, is key to creating a unified codebase that's easy to maintain and extend. Well-formatted code communicates effectively, making it easier for others to understand and work with.

### Vertical Formatting

Effective vertical formatting in code is similar to the layout of a well-organized newspaper, guiding the reader through the content in a logical flow from high-level concepts to detailed implementations. Source files(Code) should not be excessively long, with a preference for keeping them under a few hundred lines to enhance readability and maintainability. Key principles include:

- **File Size:** Aim for manageable source file sizes. It is said that significant systems can be built with files typically around 200 lines, with a maximum of around 500 lines being desirable.

- **Newspaper Metaphor:** The top of the file should introduce the main concepts, much like a headline and introductory paragraph of a newspaper article, with details unfolding as the reader progresses down the file.

- **Vertical Openness:** Use blank lines to separate concepts within the code, enhancing readability by signaling shifts in thought or logic.

- **Vertical Density:** Related lines of code should be grouped closely together to indicate their tight association.

- **Vertical Distance:** Related concepts should be kept vertically close to minimize navigation through the code. This includes placing variable declarations near their usage and ensuring functions that call each other are located near one another in the source file.

- **Conceptual Affinity:** Code segments that share conceptual themes or perform related tasks should be placed near each other, even if they don't directly interact.

- **Vertical Ordering:** Arrange the code so that higher-level abstractions are at the top of the file, and the more detailed implementations are further down, mirroring the flow of reading a narrative or story, and allowing for an easy overview of the code's purpose and functionality.

### Horizontal Formatting

Effective horizontal formatting in code focuses on line length, whitespace usage, and alignment to enhance readability and comprehension:

- **Line Length:** Prefer shorter lines, ideally not exceeding 120 characters, to improve readability and avoid the need for horizontal scrolling.

- **Whitespace Usage:** Use horizontal whitespace strategically to highlight operator precedence and separate logical groupings within lines of code. For example, surrounding assignment operators with space can make assignments stand out, whereas function arguments might be closely placed to their function calls to indicate their tight association.

- **Horizontal Alignment:** Avoid excessive alignment (like aligning variable names or assignment operators across multiple lines) as it can distract from the code's intent and make maintenance harder, especially when automatic formatting tools are used.

- **Indentation:** Proper indentation is crucial to reflect the hierarchical structure of the code, making it easier to understand the scope and structure of classes, methods, and blocks.

### Team Rules

In a team, it's crucial for all members to follow common coding style to ensure the codebase appears as if written by a single entity, not a collection of individuals. This enhances readability, maintainability, and overall quality of the software. Establishing and following team-agreed formatting rules, possibly codified into an IDE's formatter, helps maintain consistency across the project. While individual preferences may vary, the collective decision on coding style takes precedence in a team environment, contributing to a professional and coherent codebase.

## Chapter 6: Objects and Data Structures

### Data Abstraction

Abstraction is not just putting a layer of functions between the variables. Abstraction is about hiding implementation. A class should not simply push its variables out through getters and setters. Rather it exposes abstract interfaces that allow its users to manipulate the essence of the data, without having to know its implementation.

### Data/Object Anti-Symmetry

- **Objects** encapsulate data and the operations that can be performed on that data. They hide their internal data and expose functionality. This encapsulation allows for more flexibility in changing the implementation without affecting the code that uses the object.
- **Data Structures**, on the other hand, expose their data and have little to no meaningful functions. This makes it easier to add new functions but harder to add new data structures without modifying existing functions.
  This distinction is crucial in deciding whether to use an object-oriented or a procedural approach.

### Law of Demeter

The Law of Demeter is a design guideline that suggests an object should only call methods on:

- Itself
- Objects passed to it as a parameter
- Objects it creates
- Its direct component objects

This law aims to reduce the dependencies between components, leading to a more modular and maintainable codebase.

### Data Transfer Objects

These are simple containers for data to be transferred between software components or layers, without any business logic. They should be used judiciously, as overuse can lead to anemic domain models that lack encapsulated behavior.
DTOs are very useful structures, especially when communicating with databases or parsing messages from sockets, and so on. They often become the first in a series of translation stages that convert raw data in a database into objects in the application code.

## Chapter 7: Error Handling

Error handling is crucial for maintaining clean, robust, and readable code. Proper error management ensures that the code can gracefully handle unexpected situations without compromising the clarity of main logic.

### Use Exceptions Rather Than Return Codes

Using exceptions rather than return codes for error handling can make the code cleaner and more readable. It separates error handling from the main logic.

### Write Your Try-Catch-Finally Statement First

Start with a try-catch-finally block when writing code that might throw exceptions. This approach helps in defining the error handling scope from the beginning, making code more robust and predictable.

### Use Unchecked Exceptions

The consensus has shifted towards using unchecked exceptions. Checked exceptions can lead to verbose code and tight coupling, as they need to be declared or handled at every level of the call stack.

### Provide Context with Exceptions

Always include relevant context information with exceptions to help diagnose issues. This might include the operation that failed and the reasons for failure.

### Don't Return Null

Returning null from methods can lead to null pointer exceptions and generally requires additional null checks by the callers. Return empty collections or use the Optional class (in languages that support it) instead.

### Don't Pass Null

Avoid passing null as arguments to methods. This practice can lead to unexpected errors and complicates error handling. Consider using default objects or optional parameters instead.

### Define Exception Classes Based on Caller's Needs

Design exception hierarchy and classes based on what is useful for the caller, not just based on where the error occurred or its type.

### Define the Normal Flow

Use patterns like SPECIAL CASE to handle exceptional cases without cluttering the main logic with error handling. This makes the code's normal path clear and straightforward.

## Chapter 8: Boundaries

We don't always control all the software in our systems. We often use third-party packages or libraries. We even depend on our peers for certain components. We need to cleanly integrate this foreign code with our own.

### Using Third-Party Code

When integrating third-party code, it's crucial to manage its influence on our code. Directly using external APIs like can lead to unnecessary complexity and tight coupling with the third-party code.
Encapsulating external APIs inside our own classes allows us to control their exposure and tailor their functionality for our specific needs. For instance, creating a domain-specific wrapper like a `Sensors` class can simplify the usage of these APIs by only exposing necessary functionalities and hiding implementation details. This approach not only enhances type safety with the prudent use of generics but also ensures that our rules and constraints are upheld within these wrappers. Moreover, by confining third-party code to specific areas, we minimize the ripple effect of changes, making application more resilient to alterations in external libraries. This strategy leads to a cleaner, more maintainable codebase that elegantly integrates third-party functionalities without being tightly coupled to them.

### Exploring and Learning Boundaries

When using third-party code, it's beneficial to write learning tests to understand its behavior. It's a good idea write some test for learn and understand how to use a third-party code. Newkirk calls such tests learning tests. These tests help us explore the API in isolation, ensuring we know how to configure and use it correctly before integrating it with the application. This approach reduces trial-and-error coding, clarifies the third-party code's functionality, and keeps the main codebase clean and focused on business logic.

### Learning Tests Are Better Than Free

Learning tests for third-party APIs are essentially an investment with no net cost, as they are part of the necessary learning process. They offer precise insights into the API, enhancing understanding without additional expense. Their value extends beyond initial learning; they serve as a safeguard for future updates to the third-party code, quickly highlighting any changes or incompatibilities. This proactive approach ensures that the application remains robust against external changes, making learning tests not just cost-effective but beneficial for maintaining and updating software dependencies.

### Using Code That Does Not Yet Exist

When facing an undefined external API while developing a software component, it's strategic to design own interface based on our current understanding and needs. This approach not only prevents our progress from being blocked but also ensures the code remains focused and expressive. By encapsulating the interaction with the future API through an adapter, we create a single point of modification, maintaining clean code and easing future integration. This method also facilitates testing by providing clear boundaries within the system, allowing for the use of mock implementations and ensuring the usage of the eventual API remains correct.

### Clean Boundaries

Effectively managing software boundaries, especially with third-party code, is vital for maintaining a flexible and maintainable system. Clear separation and thorough testing are key to setting expectations. Minimizing direct dependencies on external code helps avoid being constrained by it. Using patterns like wrappers or adapters to interface with third-party libraries ensures our code remains clear, consistent, and adaptable to changes.

## Chapter 9: Unit Tests

The evolution of testing practices in software development has seen significant progress, particularly with the advent of Test Driven Development (TDD). In the past, unit tests were often an afterthought, created as temporary checks to ensure code functionality. Today, the approach is much more disciplined, with TDD guiding us to write tests before the actual code, ensuring thorough coverage and integration of tests with the production code.

### The Three Laws of TDD

- **First Law:** Write a failing unit test before any production code.
- **Second Law:** Write just enough of a unit test to fail.
- **Third Law:** writing only the necessary production code to pass the failing test.

### Keeping Tests Clean

Maintaining clean tests is crucial for the sustainability of the test suite. Clean tests are readable, understandable, and maintainable. Here are some guidelines to ensure tests remain clean:

### One Assert Per Test

Keeping a single assert per test simplifies the test and makes it clear what is being tested. When a test fails, we know exactly what went wrong without sifting through multiple assertions.

### Single Concept Per Test

Each test should focus on a single concept. This approach not only keeps the tests concise but also makes it easier to identify and isolate issues when a test fails.

#### F.I.R.S.T Principles:

- **Fast**: Tests should run quickly to encourage developers to run them frequently.
- **Independent**: Tests should not depend on each other. Each test should be able to run alone and in any order.
- **Repeatable**: Tests should produce the same results regardless of the environment they are run in.
- **Self-Validating**: Tests should clearly show whether they passed or failed, eliminating the need for manual interpretation of results.
- **Timely**: Tests should be written just before the production code they test. Writing tests after the fact can lead to harder-to-test code and less thorough testing.

## Chapter 10: Classes

### Class Organization

In a class, start with public static constants, followed by private static variables, and then private instance variables. Public variables are generally discouraged. After variables, list public functions, with private helper functions immediately after their corresponding public function, adhering to a logical flow. While encapsulation is important, flexibility for testing might require protected or package-scope access to certain elements, though this should be considered a last resort.

### Classes Should Be Small

Classes should prioritize being small and focused, with their size determined not by line count but by the number of responsibilities they have. A class like SuperDashboard, which has numerous public methods, can be considered overly large and potentially a "God class." Effective class naming and description should clearly reflect its single responsibility, without reliance on vague or broad terms. If a class name or its description uses conjunctions such as "and" or "but," it likely indicates multiple responsibilities, which contradicts the principle of having classes with a singular focus.

### Single Responsibility Principle

The Single Responsibility Principle (SRP) asserts that a class or module should have only one reason to change, emphasizing the importance of having a single responsibility. This principle guides class size and design, advocating for small, focused classes. SRP aids in creating better abstractions by encouraging the separation of concerns, leading to a system composed of many small, single-purpose classes. This approach facilitates understanding and managing complexity, ensuring each class addresses a specific part of the functionality and has a clear reason for change.

### Cohesion

Cohesion within classes is about ensuring that all methods and variables are closely related and serve a common purpose. High cohesion means that a class is focused on what it's supposed to be doing, with each method interacting with most or all of the class's variables. This concept often leads to many small, focused classes rather than fewer, larger ones, as the process of decomposing larger functions into smaller ones naturally reveals distinct responsibilities that can be encapsulated in separate classes. This approach not only makes the code more manageable but also enhances its maintainability and readability.

### Organizing for Change

Classes should be organized to accommodate change with minimal risk, adhering to principles like the Single Responsibility Principle (SRP) and the Open-Closed Principle (OCP). SRP suggests a class should have one reason to change, meaning it should fulfill a single responsibility. OCP states that classes should be open for extension but closed for modification, allowing new functionalities to be added without altering existing code. This approach minimizes the risk of introducing errors when the system evolves.
To reduce dependencies on concrete implementations, which can lead to rigid and fragile systems, it's beneficial to rely on abstractions such as interfaces. This practice is in line with the Dependency Inversion Principle (DIP), which advocates for dependencies on abstractions rather than concrete classes. Such an organization not only makes the system more adaptable to change but also facilitates testing by allowing for easier substitution of implementations, for example, using stubs or mocks in tests instead of real dependencies.

## Chapter 11: Systems

“Complexity kills. It sucks the life out of developers, it makes products difficult to plan, build, and test.” ~Ray Ozzie, CTO, Microsoft Corporation

### Separate Constructing a System from Using It

Software systems benefit from separating the construction process from the runtime logic, allowing for cleaner organization and reduced risk during changes. This can be achieved through various design patterns and principles:

- **Separation of Main**: The construction of objects and the wiring of dependencies are handled in the `main` function or modules called by `main`. The rest of the system operates under the assumption that all necessary objects are already constructed and connected, promoting a clear separation between construction and usage.
- **Factories**: In scenarios where the application must control the creation of objects, the Abstract Factory pattern can be utilized. It allows the application to determine when objects are created while keeping the construction details separate from the application code, thus maintaining a clean separation.
- **Dependency Injection(DI)**: It is an process for separating construction from use, applying the Inversion of Control (IoC) principle to dependency management. In DI, objects do not instantiate their dependencies; instead, dependencies are "injected" into them, typically by a DI container or framework. This approach further decouples the construction process from the application logic, enabling more flexible and manageable code.

### Scaling Up

Software systems, like cities, evolve over time from simple to complex structures. This growth necessitates a flexible design to accommodate changes without significant rework. Effective software design separates concerns, ensuring that the system's architecture can grow incrementally. This approach contrasts with rigid architectures which tightly coupled business logic to the application container, making testing difficult and hindered reuse and object-oriented principles. Addressing cross-cutting concerns, such as persistence and security, in a modular way is crucial. Aspect-Oriented Programming (AOP) offers a solution by allowing behavior modifications through declarative means, enhancing modularity and maintainability.

### Test Drive the System Architecture

Test-driving the system architecture involves developing it incrementally, just as we would with test-driven development (TDD) at the code level. Starting with a simple but well-decoupled architecture allows for rapid delivery of working features, with the flexibility to incorporate more sophisticated technologies as needed. This approach avoids the pitfalls of Big Design Up Front (BDUF) by allowing architecture to evolve in response to actual requirements and feedback, rather than speculation.

### Optimize Decision Making

In large systems or projects, decision-making should be decentralized and informed by the most current information. Postponing decisions until the last responsible moment allows for choices to be made with the fullest understanding, benefiting from the latest customer feedback and project insights. This approach reduces the risk of premature decisions based on incomplete information, leading to more effective and adaptable solutions.

### Use Standards Wisely, When They Add Demonstrable Value

While standards can facilitate interoperability, knowledge transfer, and component reuse, they should be adopted with caution. The allure of using a standard just because it is a standard can lead to unnecessary complexity if the standard is not well-aligned with the project's actual needs. It's crucial to evaluate whether a standard genuinely adds value to the project and to remain flexible in our architectural choices, ensuring they serve the project's goals and not just compliance with a standard.

### Systems Need Domain-Specific Languages

Domain-Specific Languages (DSLs) allow for expressing domain logic in a way that closely mirrors the domain experts' understanding, reducing the translation gap between domain concepts and their implementation. A well-crafted DSL can make the code more readable and maintainable by encapsulating complex logic in a form that is both accessible to domain experts and executable by the system. DSLs elevate the level of abstraction, allowing us to focus on expressing business rules and policies directly, fostering clearer communication and more precise implementations of domain logic.

## Chapter 12: Emergence

### Getting Clean via Emergent Design

Emergent design is a concept where the design of a system evolves over time, becoming more refined and clear as development progresses. This approach relies on the iterative improvement of the codebase, guided by a set of principles that promote good design. Kent Beck's four rules of Simple Design provide a framework for achieving clean, well-designed software through emergent design:

- Runs all the tests
- Contains no duplication
- Expresses the intent of the programmer
- Minimizes the number of classes and methods

### Simple Design Rule 1: Runs All the Tests

A well-designed system must be testable and pass all tests consistently. Testability leads to better designs by encouraging smaller, single-purpose classes and reducing coupling. Continuous testing ensures the system functions as intended and adheres to object-oriented principles like low coupling and high cohesion.

### Simple Design Rules 2–4: Refactoring

With a comprehensive suite of tests, we can refactor code with confidence. Refactoring involves cleaning and improving the code without changing its functionality. This process is supported by tests that ensure changes do not introduce new bugs. Refactoring aims to increase cohesion, decrease coupling, separate concerns, modularize, simplify functions and classes, choose better names, eliminate duplication, ensure expressiveness, and minimize the number of classes and methods.

### No Duplication

Duplication is a significant enemy of good design, leading to extra work, risk, and complexity. It can be obvious, like identical lines of code, or less apparent, like similar code structures that can be refactored. Eliminating duplication, even in small amounts, can lead to cleaner, more maintainable code. This might involve extracting common functionalities into separate methods or classes, which can then be reused, thus reducing system complexity.

### Expressiveness

The code should clearly communicate its purpose to facilitate understanding and reduce maintenance costs. It is crucial because the majority of a software project's expenses come from long-term maintenance. Clear code minimizes misunderstandings and defects. Techniques for enhancing expressiveness include using meaningful names, keeping functions and classes small, and adopting standard nomenclature, such as design pattern names, to quickly convey design intentions. Well-crafted unit tests also serve as practical documentation, offering insights into a class's functionality.

### Minimal Classes and Methods

While maintaining simplicity and clarity, we should avoid over-fragmentation. The pursuit of small, single-purpose classes and methods leads to an inflated number of both. It criticizes dogmatic approaches, like mandating interfaces for every class or rigidly separating data from behavior, advocating instead for pragmatism. The overarching aim is to balance the need for concise, understandable code units with the goal of keeping the overall system compact. This principle is considered the least critical among the four discussed, with the priority being on maintaining a comprehensive test suite, eliminating code duplication, and ensuring code expressiveness.
