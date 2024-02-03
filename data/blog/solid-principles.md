---
title: Solid Principles
date: 2024-02-03
tags:
  - clean
  - code
  - solid principles
draft: true
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

Single Responsibility Principle is a foundational concept in software engineering, particularly in object-oriented design. It says that a class should have one and only one reason to change, meaning it _should only have a single responsibility_ or functionality. But we engineers have a nag of asking **why**? How does that help? So let's check the the purpose it serves.

### Why use it?

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

### Steps

But we have a million dollar question now? How do you define a responsibility? or maybe how to break classes? Let's check it out:

- **Clarify Requirements**: Understand the system we are supposed to build, what functionalities it should perform. We must be aware of all use cases the system needs to handle. Eg: sign up users, updating user, checking if user exits, fetching user details, save user information in a database and notify users upon successful sign-up.

- **Identify Tasks**: Based on the functionalities our system needs to perform, break down each functionality into smaller tasks. This will help in recognizing the various operations our classes need to manage. Eg: validate input data, create a user account, updating a user, check if user already exists, fetch user, insert user details and notify user

- **Group Tasks**: Combine tasks that logically fit together. These might be tasks that operate on the same data or contribute to a same feature. Each group should reflect a single responsibility. Eg: User Manager Group: Input validation, user account creation, user update. DataBase Group: checking existing data, insertion and fetch tasks. User Notification Group: sending notifications.

- **Define Responsibilities**: Each task group identified in the previous step represents a responsibility. Ensure these responsibilities are distinct and focused, with a clear purpose. Eg: User Responsibility: Managing everything about user sign-up, updates and validation. User Database Layer Responsibility: Handling all database interactions for user information storage. User Notification Responsibility: Taking care of all aspects of sending notifications to users.

- **Design Classes**: For every responsibility, design a class. The class name should clearly indicate its responsibility, making the system's structure intuitive and easy to navigate. Eg:
  ```python
  class User:
  def register(self, user_details):
  #validate and create user account

            def update(self, userId, user_details):
              #validate and update user account

        class UserModel:
            def save(self, user_details):
              #insert user data

            def check(self, userId):
              #check if user exits in db

            def get(self, userId):
              #fetch the user from db

        class UserNotify:
            def notify(self, user_email):
                # Compose and send confirmation message
        ```

  By starting with these steps, we can lay a solid foundation for Single Responsibility in our system, leading to a cleaner, more modular design from the beginning.

### Conclusion

The Single Responsibility Principle is like giving each piece of your code a single task, making your software easier to understand and change. This approach keeps things simple, reduces bugs, and makes it easier to add new features later. It's like organizing your tools so each has its own place, streamlining both minor fixes and major updates, leading to more reliable and flexible software.

## Open/Closed Principle

Open/Closed Principle states that software entities (classes, modules, functions, etc.) should be _open for extension but closed for modification_. This means that we should be able to add new functionality to an entity without changing its existing code. So, it implies two things:

- **Open for Extension**: We should be able to add new features without altering the existing code. This is typically achieved by using interfaces, abstract classes, or inheritance, allowing the entity to adopt new behaviors.

- **Closed for Modification**: The existing code of the entity should remain unchanged when we add new features. This reduces the risk of introducing new bugs into existing functionality and promotes code stability and reusability.

So, the principle encourages us to write code that doesn't need to be changed every time the requirements change but can be extended by adding new code. This leads to a more modular, scalable, and maintainable codebase.

### Why use it?

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

### Steps

To adhere to the Open/Closed Principle (OCP) when starting on a project, we can follow these simplified steps:

- **Define Clear Abstractions**: We first need to identify the core functionalities and entities in our application (such as items, filters, and properties like color and size in our case). Define abstract representations for these entities so that they can be extended without modification.

- **Identify Extension Points**: We need to determine the aspects of our application that are most likely to change or expand in the future. This could include functionality, data entities, algorithms, etc.

- **Define Abstractions**: For each extension point identified, we need to define a high-level abstraction (such as an interface or an abstract class). This abstraction should capture the essence of the functionality without tying it to any specific implementations.

- **Implement Abstractions**: We can then create concrete implementations of these abstractions for our current requirements. Just like we had an property abstraction for filtering, we implemented it for the color.

- **Leverage Polymorphism**: We can use polymorphism to allow for different implementations of the same abstraction to be used interchangeably. This is key in allowing new extensions to be added without changing the code that uses the abstraction.

By following these steps, we'll be build a system that is both extendable with new features and closed for modifications to existing code, hence making it robust, maintainable, and scalable.

### Conclusion

Open/Closed Principle guides us in designing software that is adaptable to change without requiring modifications to existing code. By adhering to this principle, we create a development environment where extending functionality is straightforward and safe, minimizing the risk of bugs in existing features. This approach not only makes our codebase more robust and maintainable but also enhances its ability to evolve with new requirements, ensuring long-term sustainability and efficiency in the software development process.

## Liskov Substitution Principle

## Interface Segregation Principle

## Dependency Inversion Principle
