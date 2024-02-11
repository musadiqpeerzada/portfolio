---
title: Solid Principles
date: 2024-02-07
tags:
  - clean code
  - solid principles
draft: false
summary: Embracing the SOLID Principles in Software Engineering.
images:
  - /static/blogs/solid_principles.png
authors:
  - default
---

Ever felt like changing one small thing in code ends up being a huge headache? Or adding a new feature feels like trying to fit a ball into a cuboidal cavity. We all have been there and it's totally normal. But we must also ensure that the next person stepping into this war doesn't have to endure the same battles.

That's where **SOLID** principles come in. Think of them as a mantra for making our code easy to handle, change, and grow. These principles were shared by Robert C. Martin, also known as _Uncle Bob_. He gave us these five key ideas that help our code stay clean and flexible:

- **Single Responsibility Principle**: It's about sticking to what you're meant for, like a knife is for chopping. Use it as a screwdriver or to open bottles, and you might break it. Keep it simple and focused.

- **Open/Closed Principle**: It's like that engineering saying, "If it works, don't touch it." Keep the core intact but allow for changes, like updates or additions, without disrupting what already works well.

- **Liskov Substitution Principle**: It is all about trust and reliability. It's like saying, "If I make a promise, I'll keep it, no matter where you put me or how you use me."

- **Interface Segregation Principle**: This one's about not getting burdened with stuff we don't need. I wouldn't carry around the whole toolbox if I know I will only need a screwdriver.

- **Dependency Inversion Principle**: It's like creating a universal charger that can power all your devices. This way, your setup is adaptable to various gadgets, not tied to just one.

By sticking to these principles, we can make our coding projects a lot smoother and our coder lives a bit easier. Let's dive in and see how we can apply these cool ideas to our work!

## Single Responsibility Principle

Single Responsibility Principle aims to make software systems more understandable, flexible, and maintainable. It states that a class should have one and only one reason to change, meaning it _should only have a single responsibility_ or functionality. This principle encourages us to separate concerns by encapsulating different functionalities in different classes, ensuring that each class addresses a single aspect of the overall functionality.

### Advantages

- **Maintainability**: Classes with a single responsibility are easier to understand and modify. When a code change is required, our time should go in making the change not looking for the place where code needs to be changed.
- **Testability**: Since classes have a single responsibility, they are smaller and hence easier to test, as there are fewer potential test cases and interactions to consider.
- **Reusability**: Classes are more likely to be reusable because they do not carry unnecessary dependencies and functionalities that aren't needed in new contexts.
- **Reduced Coupling**: As each class is focused on a single responsibility, classes are compact and hence intersect less, reducing their interdependency.

### Example

Let's take an example to understand more, consider we need to create an app that signs up users, saves them in database and notifies user about successful sign up

```python
class User:
    def __init__(self, name, email, phone):
        self.name = name
        self.email = email
        self.phone = phone

    def save_user(self):
        print(f"User {self.name} saved to DB.")

    def notify(self, subject, message):
        print(f"Sending sms to {self.phone} - Hii {self.name} Thanks for signing up")
```

Would work for now.
But now there can be more than one reasons to change this class, maybe before saving we need to check if user already exists or maybe we need to send sms instead of mail. Now in this case our User class will need to change. The User class needs to be changed since it is tightly coupled with saving the user in database and notifying the user. So, we break it down into classes based on their primary role.

```python
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email

class UserModel:
   def save_user(self, user):
        print(f"Saving {user} to the database.")

class UserNotify:
    def notify(self, user):
        print(f"Sending sms to {user.phone} - Hii {user.name} Thanks for signing up")
```

Now every class has a defined role. Let's say we are now asked to change the notification media to email, we know which class is responsible for it and where do we need to make the changes. Moreover, we just need to test Notify class.

### Steps to apply

To make our code adhere to Single Responsibility Principle, we can follow the following steps:

- **Clarify Requirements**: Understand the system we are supposed to build, what functionalities it should perform. We must be aware of all use cases the system needs to handle.
- **Identify Tasks**: Based on the functionalities our system needs to perform, break down each functionality into smaller tasks. This will help in recognizing the various operations our classes need to manage.
- **Group Tasks**: Combine tasks that logically fit together. These might be tasks that operate on the same data or contribute to a same feature. Each group should reflect a single responsibility.
- **Define Responsibilities**: Each task group identified in the previous step represents a responsibility. Ensure these responsibilities are distinct and focused, with a clear purpose.
- **Design Classes**: For every responsibility, design a class. The class name should clearly indicate its responsibility, making the system's structure intuitive and easy to navigate.

### Conclusion

The Single Responsibility Principle is like giving each piece of our code a single task, making our software easier to understand and change. This approach keeps things simple, reduces bugs, and makes it easier to add new features later. It's like organizing tools so each has its own place, streamlining both minor fixes and major updates, leading to more reliable and flexible software.

## Open/Closed Principle

Open/Closed Principle states that software entities (classes, modules, functions, etc.) should be _open for extension but closed for modification_. This means that we should be able to add new functionality to an entity without changing its existing code. So, it implies two things:

- **Open for Extension**: We should be able to add new features without altering the existing code. This is typically achieved by using interfaces, abstract classes, or inheritance, allowing the entity to adopt new behaviors.
- **Closed for Modification**: The existing code of the entity should remain unchanged when we add new features. This reduces the risk of introducing new bugs into existing functionality and promotes code stability and reusability.
  So, the principle encourages us to write code that doesn't need to be changed every time the requirements change but can be extended by adding new code. This leads to a more modular, scalable, and maintainable codebase.

### Advantages

- **Enhanced Flexibility and Scalability**: Our system is designed in a way that it can adapt to new functionalities with minimal changes to existing code. This makes our system more flexible and easier to scale, as it can grow and evolve with new requirements.
- **Reduced Risk of Bugs**: Since existing code remains unchanged when new features are added, the likelihood of introducing bugs into the already tested and working code is significantly reduced. This leads to a more stable and reliable system.
- **Increased Reusability**: Components designed to be open for extension are more likely to be reusable in different parts of the system or even in different projects, as they can be extended to fit new contexts without modification.
- **Easier Maintenance**: Our code becomes more organized, modular and easy to understand, maintain, and debug. When changes are required, they can often be made at a higher level (such as adding new subclasses or implementing new interfaces), without needing to dive deep into the internals of existing components.
- **Promotes the Use of Interfaces and Abstraction**: OCP encourages us to think in terms of abstractions and interfaces, which leads to cleaner and more abstract designs. This reduces dependencies on concrete implementations, making the system more flexible and easier to adapt or extend.
- **Better Testing and Integration**: Components designed to be open for extension but closed for modification are often easier to test and integrate. Since new functionality can be added in a way that doesn't interfere with existing behavior, tests for existing functionality are valid and reliable forever.

### Example

Consider working on filter functionality of an e-commerce app. We need to filter Items based on color. A working and good to code may look like this.

```python
class Item:
    def __init__(self, name, color, size):
        self.name = name
        self.color = color
        self.size = size

class Filter:
    def by_color(self, items, color):
        return [item for item in items if item.color == color]
```

But if you notice this, although it is open for extension but it is not closed for modifications. If say we need a add filter based on size, since a single class is handling all the filtering, we need to change the Filter class. To adhere to Open/Closed Principle, we create an interface Property and all other properties like color, size, type implement it. Now the filter, or the BetterFilter takes a list of items and a property object and returns items matching property.

```python
class Property:
    def is_satisfied(self, item):
        pass

class Color(Property):
    def __init__(self, color):
        self.color = color

    def is_satisfied(self, item):
        return item.color == self.color

class BetterFilter:
    def filter(self, items, property):
        return [item for item in items if property.is_satisfied(item)]
```

To add filtering by size, all we need to do is add a Size class that implements Property and we are good to go. It is as simple as:

```python
class Size(Property):
      def __init__(self, size):
        self.size = size

    def is_satisfied(self, item):
        return item.size == self.size
```

Now our app has size filter and the existing code is not modified at all. This brings down the development time, testing time ensuring faster and quality releases

### Steps to apply

To adhere to the Open/Closed Principle (OCP), we can follow these simplified steps:

- **Define Clear Abstractions**: We first need to identify the core functionalities and entities in our application (such as items, filters, and properties like color and size in our case). Define abstract representations for these entities so that they can be extended without modification.
- **Identify Extension Points**: We need to determine the aspects of our application that are most likely to change or expand in the future. This could include functionality, data entities, algorithms, etc.
- **Define Abstractions**: For each extension point identified, we need to define a high-level abstraction (such as an interface or an abstract class). This abstraction should capture the essence of the functionality without tying it to any specific implementations.
- **Implement Abstractions**: We can then create concrete implementations of these abstractions for our current requirements. Just like we had an property abstraction for filtering, we implemented it for the color.
- **Leverage Polymorphism**: We can use polymorphism to allow for different implementations of the same abstraction to be used interchangeably. This is key in allowing new extensions to be added without changing the code that uses the abstraction.
  By following these steps, we'll be build a system that is both extendable with new features and closed for modifications to existing code, hence making it robust, maintainable, and scalable.

### Conclusion

Open/Closed Principle guides us in designing software that is adaptable to change without requiring modifications to existing code. By adhering to this principle, we create a development environment where extending functionality is straightforward and safe, minimizing the risk of bugs in existing features. This approach not only makes our codebase more robust and maintainable but also enhances its ability to evolve with new requirements, ensuring long-term sustainability and efficiency in the software development process.

## Liskov Substitution Principle

Liskov Substitution Principle states that objects of a subclass should be able to replace objects of the super class without affecting the correctness of the program. If we have a Square and a Circle (sub)class both extending Shape (super)class, we should be able to use circle object wherever we have square object without breaking things. It makes the code reliable and ensures that inheritance relationships in our code are well-designed and maintain the expected behavior.

### Advantages

- **Behavioral Consistency:** When derived classes maintain a consistent behavior with their base classes, we won't be surprised, we can rely on the same expected behavior. Hence our code will be more predictable and less error-prone.
- **Code Reusability:** Since our code is generic, it can be reused for all sub classes saving a lot of development time and efforts.
- **Polymorphism:** It enables polymorphism and hence our code works with objects of different classes in a uniform way, which makes the code more flexible and extensible.
- **Maintainability:** Since changes to derived classes no longer affect code that use the base class. This separation makes it easier to maintain and modify code without introducing unexpected issues.
- **Design Clarity:** The class hierarchy becomes clear and structured, improving the overall design of the code. It helps to create a well-defined relationship between base and derived classes, making code easier to understand and maintain.
- **Testing:** Sub classes can be tested in isolation, without needing to consider the specifics of derived classes. This simplifies the testing process and makes it easier to identify and fix issues.

### Example

Consider an app where we need to create birds.

```python
class Bird:
    def walk(self):
        print('It walks')

    def fly(self):
        print('It flies')

class Eagle(Bird):
        pass

    def fly(self):
        pass

class Ostrich(Bird):
    def fly(self):
        print("But it can't fly")
```

Although it seems pretty workable, but it violates Liskov Substitution Principle since the behavior of ostrich is not similar to that of eagle and hence can't be substituted. `Eagle.fly()` gives `It flies` but `Ostrich.fly()` gives `But it can't fly`.
To make it adhere to LSP, we need to further break down birds into FlyingBirds and WalkingBirds.

```python
class FlyingBird:
    def fly(self):
      print('It flies')

class WalkingBird:
    def walk(self):
        print('It walks')

class Parrot(FlyingBird, WalkingBird):
    pass

class Ostrich(WalkingBird):
    pass
```

Now we can substitute Ostrich or Parrot in place of WalkingBird and Parrot in place of FlyingBird without being surprised.

### Steps to apply

To make our system adhere to LSP, we can follow the following general steps:

- **Define Clear Contracts**: Ensure that each class has a clear and concise contract(methods and properties). This includes pre-conditions, post-conditions, and invariants that the class must adhere to.
- **Use Substitution Mindset**: When designing subclasses, think about whether they can truly substitute the parent class. Any method in a subclass should be able to work as a drop-in replacement for the same method in the parent class without altering the desirable properties of the program (correctness, task performed, etc.).
- **Ensure Behavioral Compatibility**: Subclasses should not only adhere to the structure of the superclass but also to its behavior. This means that subclasses should not alter the expected behavior of the superclass. For example, if a method in the superclass returns an integer within a certain range, the subclass method should adhere to the same constraints.
- **Substitute Exceptions Carefully**: If a method in the superclass does not declare or throw certain exceptions, the subclass method should avoid introducing new checked exceptions, as this would alter the expected behavior and potentially break client code that uses the superclass.
- **Use Composition Over Inheritance**: When in doubt, prefer composition over inheritance. If a subclass cannot fully adhere to the contract of the superclass, it might be better to use composition to reuse the functionality instead of inheritance.

### Conclusion

Liskov Substitution Principle ensures that subclasses can be used interchangeably with their parent class without affecting the correctness of code. It emphasizes the importance of designing subclasses that fulfill the contracts and behaviors of their parent classes. Adhering to LSP enhances code reusability, maintainability, and ensures a robust class hierarchy in object-oriented programming. Ultimately, LSP guides us in creating more flexible and scalable systems.

## Interface Segregation Principle

Interface Segregation Principle (ISP) states that client should not be forced to depend upon interfaces that they don’t use. It can be rephrased as no code should be forced to depend on methods it does not use. This means that larger interfaces should be split into smaller, more specific ones so that implementing classes only need to be concerned with the methods that are relevant to them, rather than being forced to implement methods they will never use. This principle aims to reduce the side effects and frequency of required changes by minimizing the dependencies between classes.

### Advantages

Interface Segregation Principle offers several advantages in software design and development:

- **Increased Modularity**: Having more specific interfaces, systems become more modular. This modularity allows for parts of the system to be updated or changed with minimal impact on other parts.
- **Enhanced Code Reusability**: Smaller, well-defined interfaces can be more easily reused across different parts of a system or in different projects, as they are less likely to contain unnecessary methods that aren't needed everywhere.
- **Easier Maintenance and Evolution**: Systems become easier to maintain and evolve since changes to one part of the system are less likely to require changes to unrelated parts. This is because the interfaces are more focused and decoupled.
- **Reduced Side Effects**: Implementing classes are less affected by changes in unrelated methods, reducing the risk of side effects from changes in the interface they implement.
- **Improved Understandability**: Smaller, focused interfaces are easier to understand than large, monolithic ones. Developers can quickly grasp what they need to implement without wading through irrelevant methods.
- **Better Testing**: Smaller interfaces make it easier to write tests, as each test can focus on a smaller set of functionalities. This leads to more comprehensive and easier-to-manage test suites.
- **Flexibility**: Developers have the flexibility to implement only the interfaces their classes need, promoting a more flexible and dynamic approach to design.
- **Encourages Single Responsibility Principle**: ISP naturally encourages adherence to the Single Responsibility Principle by ensuring that interfaces are only responsible for one particular set of functionalities, making the system more cohesive.

By applying ISP, software developers can create systems that are easier to understand, maintain, and extend, leading to higher quality software and more efficient development processes.

### Example

Consider an ed-tech app that acts differently for adults and children. It let's adults borrow books or read online but to reduce screen time in children it lets them only borrow books. A simple implementation can be

```python
from abc import ABC, abstractmethod
class EdTech:
   @abstractmethod
    def borrow_book(self, book):
        pass

   @abstractmethod
    def read_book(self):
        pass

class AdultUser(EdTech):
    def borrow_book(self, book):
        print(f"Borrowing book: {book}")

    def read_book(self):
        print("Reading Book")

class ChildUser(EdTech):
    def borrow_books(self, book):
        print(f"Borrowing book: {book}")

    def read_book(self):
        raise NotImplementedError("Internet access not allowed for children")
```

In this implementation, ChildUser is forced to implement read_book, which it doesn't need (and shouldn't have access to), and hence violates ISP.
To adhere to ISP, we split EdTech into two separate interfaces: one for borrowing books and another for reading the book online.

```python
from abc import ABC, abstractmethod
class BookBorrowingService:
    @abstractmethod
    def borrow_books(self, book):
        pass

class BookReadingService:
    @abstractmethod
    def read_book(self):
       pass

class AdultUser(BookBorrowingService, BookReadingService):
    def borrow_books(self, book):
        print(f"Borrowing book: {book}")

    def read_book(self):
        print("Browsing the Internet")

class ChildUser(BookBorrowingService):
    def borrow_books(self, book):
        print(f"Borrowing book: {book}")
```

Now the ChildUser is not forced to implement read_book and adheres to ISP.

### Steps to apply

Following steps can be helpful in making our code adhere to ISP:

- **Identify Actors and Use Cases**: We can start by identifying the different actors (clients) that will interact with our system and the use cases they will perform. Understanding the specific needs and roles of each actor helps in defining interfaces that are relevant to each actor.
- **Define Smaller Interfaces**: Create specific, compact interfaces for single capabilities or closely related actions, avoiding large, general-purpose interfaces to ensure classes implement only relevant methods.
- **Segregate Interfaces Based on Functionality**: Organize interfaces by distinct functionalities or responsibilities, like separating file operation interfaces into reading, writing, and modifying.
- **Implement Interface Inheritance Where Appropriate**: Use base interfaces for common methods across multiple interfaces, ensuring not to force clients to depend on unused methods, thus adhering to ISP principles.

### Conclusion

Interface Segregation Principle is about understanding the needs of clients and designing interfaces in a way that they only contain what is necessary for each client. This leads to codebase that is easier to navigate, understand, and change, which is essential for long-term software quality and sustainability.

## Dependency Inversion Principle

Dependency Inversion Principle (DIP) states that the high-level module must not depend on the low-level module, but they should depend on abstractions. It aims to reduce the coupling between different parts of a system, making it more flexible and easier to maintain. By depending on interfaces or abstract classes rather than concrete implementations, systems become more modular, allowing for easier changes and testing.

### Advantages

- **Reduced Coupling**: Depending on abstractions rather than concrete implementations, the coupling between different modules or classes is reduces. It makes each component more independent and easier to manage.
- **Increased Flexibility**: Changes to specific implementations of an abstraction require minimal to no changes in the high-level modules that depend on these abstractions making it more flexible.
- **Enhanced Testability**: It facilitates unit testing by allowing easy substitution of real dependencies with mock objects, since components depend on abstractions that can be implemented by both real objects and test doubles.
- **Improved Code Maintenance**: Since dependencies are abstracted, maintaining and updating the system becomes more straightforward. Changes in one part of the system have limited impact on others, reducing the risk of unintended consequences when modifying code.
- **Better Code Organization**: With clear separation between high-level policies and low-level implementation details, the code is organized in a better way and leads to a more readable and understandable codebase.
- **Scalability**: New functionalities or modules that adhere to the existing abstractions can be added easily, without altering the core high-level policies or logic, enhancing the scalability.

### Example

Consider working on logger for an app, a simple file logger can look like

```python
class FileLogger:
    def log(self, message):
        print(f"Logging to a file: {message}")

class ReportGenerator:
    def __init__(self):
        self.logger = FileLogger()

    def generate_report(self, data):
        self.logger.log("Report generated.")
```

But now if we want to add a new type of logger like stdout or a web logger, we need to update the ReportGenerator as well even though logging is a different concern altogether.
We can create an interface Logger and then all types of loggers implement it, now even if we add a new type of logger, our ReportGenerator code does not change.

```python
from abc import ABC, abstractmethod

class Logger(ABC):
    @abstractmethod
    def log(self, message):
        pass

class FileLogger(Logger):
    def log(self, message):
        print(f"Logging to a file: {message}")

class ReportGenerator:
    def __init__(self, logger: Logger):
        self.logger = logger

    def generate_report(self, data):
        self.logger.log("Report generated.")
```

### Steps to apply

To adhere to DIP, following steps can be applied:

- **Functionality Segregation:** Determine the operations that the main application logic requires from the supporting elements.
- **Abstraction Definition:** Design interfaces or abstract classes that outline these operations without specifying how they're achieved.
- **Concrete Implementation:** Develop the actual components that perform these tasks, ensuring they adhere to the predefined interfaces.
- **Dependency Provision:** Use dependency injection to supply instances of the low-level components to the high-level ones, usually through constructor parameters.
- **Focus on Cohesion:** Ensure each interface has a clear and narrow focus to simplify implementation and future modifications.

### Conclusion

Dependency Inversion Principle helps make code easier to change, test, and maintain by ensuring that different parts of code don't rely too heavily on each other. Instead of having high-level parts directly use low-level parts, both should use general interfaces. This way, changing one part doesn't require big changes to the rest of the program. It makes the program more flexible and easier to manage over time.
