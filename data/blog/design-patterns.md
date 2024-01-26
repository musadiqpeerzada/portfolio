---
title: Design Patterns (WIP)
date: 2024-01-20
tags:
  - clean
  - code
  - design
  - patterns
draft: false
summary: Journey into Design Patterns.
images:
  - /static/blogs/design-patterns.png
authors:
  - default
---

In Sudoku, we follow specific rules to fill in numbers without repeating them in rows, columns, or smaller sections. Each strategy or pattern—like spotting pairs, using elimination, or identifying unique possibilities—helps us solve parts of the puzzle systematically. Similarly, in software development, design patterns are strategies or templates that guide us to solve common problems. Just as Sudoku strategies help us logically fill in numbers, design patterns offer logical solutions for writing code to address specific issues, ensuring well-structured, efficient and maintainable systems.

## What is a design pattern?

So design patterns are general blueprints for solving common problems in software development. They offer templates or guides that help us solve recurring issues encountered while designing systems, ensuring a structured and efficient approach to building software systems.

Design patterns are different from algorithms. While algorithms are step-by-step instructions for solving specific problems, design patterns are blueprints guiding how to structure software to solve recurring problems efficiently.

Design patterns are typically classified into three main categories based on their purpose:
 - Creational Patterns
 - Structural Patterns
 - Behavioral Patterns

Each category addresses different aspects of software design and aids in solving various problems encountered during software development.


## Why learn Design Patterns?

Learning design patterns offers several advantages in software development:

- **Efficiency**: They provide reusable solutions to common problems, saving time and effort by avoiding reinventing the wheel for similar issues.

- **Best Practices**: Understanding patterns makes us aware of best practices and standardized ways, improving the overall quality and maintainability of code.

- **Communication**: They establish a common language among developers, enabling clear communication and collaboration among teams.

- **Scalability**: Patterns help create scalable and flexible software architectures that can adapt to changing requirements and larger projects without much changes.

- **Problem-solving Skills**: They enhance our problem-solving skills by offering tested, well-defined solutions that can be applied in various scenarios.

- **Career Growth**: Proficiency in design patterns is highly valued in the industry, boosting employability and potential for career advancement in software development.

Overall, learning design patterns enhances our ability to write cleaner, more maintainable, and efficient code while promoting a deeper understanding of software architecture and design principles.

So let's start exploring the patterns.

## Creational Patterns

These patterns focus on object creation mechanisms, providing flexibility in creating objects or classes and reusing code.
### Singleton

Singleton pattern ensures that a class has only one instance but provides a global access to that instance.

Consider working on an app that connects to database. Do we need to create a new connection every time we need to access data?
If we create a new connection each time, we might:
- end up with different connections having different configurations (maybe a different connection string altogether)
- exceed the number of concurrent connections
- consume more resources

It'll be better if we create a single database connection and use it throughout the app. Doesn't it seem more like a global variable? No, Singletons provide controlled and managed global access to a single instance of a class, while global variables offer easy but less regulated global access to data, potentially leading to maintenance and integrity issues.

Example: We have a S3 singleton class

```python
import boto3

class S3:
    client = None

    def get_client(self):
        if self.client is None:
            self.client = boto3.client('s3')
        return self.client    
```

When ` S3.get_client` is called the first time, it sets the client and after that every time returns the same client.

**Note**: In multithreaded environments, use synchronization (like locks) to ensure thread-safe singletons. 

### Prototype

The Prototype pattern helps to enable the creation of new objects by copying existing ones, known as prototypes. This approach is used instead of creating new objects from scratch, especially when the process of constructing a new object is costly or complex.

Let's consider example of a football game where we have many variants of same player based on player form. (Alexis Sanchez in Arsenal was way better 😜). We can create new objects of the same player from scratch each time but that doesn't make sense since the name, nationality, position, height, birth day etc are same. This will increase the complexity and what if the player later changes his nationality, then we need to change for every version of the player. 

We can just create a BasePlayer class and then create players out of it. And then to create a special player we can clone the base player and add (or maybe update) its properties.

```python
class FootballPlayer:
    def __init__(self, name, position, skills):
        self.name = name
        self.position = position
        self.skills = skills

    def clone(self):
        new_player = FootballPlayer(self.name, self.position, self.skills)
        return new_player

    def set_skills(self, skills):
        self.skills = skills
    def __str__(self):
        return f"{self.name}, {self.position}, Skills: {self.skills}"


ozil = FootballPlayer("Ozil", "CAM", ["Wizard"])

real_madrid_ozil = ozil.clone()
real_madrid_ozil.set_skills([*real_madrid_ozil.skills, "Ability to find Ronaldo", "Breaking passes"])

print("Ozil: ")
print(ozil)

print("Real Madrid Ozil:")
print(real_madrid_ozil)
```
Output
```bash
Ozil: 
Ozil, CAM, Skills: ['Wizard']
Real Madrid Ozil:
Ozil, CAM, Skills: ['Wizard', 'Ability to find Ronaldo', 'Breaking passes']
```

And then we can create n number of Ozil players and add skills as and when needed.

So in Prototype pattern, we have a template and then using that template we create objects, which is particularly useful in scenarios where object creation is resource-intensive or requires a lot of setup.

### Factory Method
Factory Method provides an interface for creating objects in a superclass but allows subclasses to alter the type of objects that will be created. It's a bit like having a rule or a recipe for creating objects.

Consider we need to create animals like cat or dog. Each type of animal has its own way of being created and might have different behaviors. We can do it simply by creating classes for each animal, but each time we need to add an new animal, our whole code will change. This makes the code complex and hard to manage.

If we create an interface for animals and then each type of animal implements this interface, we always get an animal interface irrespective of it's type.
But in the Factory Method, we use different factories for each animal, like a DogFactory for dogs and a CatFactory for cats. Each factory knows how to make its corresponding animal. This is helpful because it keeps the code simple and organized. When we want to add a new type of animal, we just add a new factory without changing the existing code. This makes our code easy to manage and expand.


```python
class Animal:
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return "Woof!"

class AnimalFactory:
    def create_animal(self):
        pass

class DogFactory(AnimalFactory):
    def create_animal(self):
        return Dog()


dog = DogFactory().create_animal()
print(dog.speak())  # Woof!

```
Now to add a new animal, say cat
```python

class Cat(Animal):
    def speak(self):
        return "Meow!"

class CatFactory(AnimalFactory):
    def create_animal(self):
        return Cat()

cat = CatFactory().create_animal()
print(cat.speak())  # Meow!
```
This way we can add new types of animals without altering the existing factories, staying true to the **Open/Closed Principle**: open for extension but closed for modification.



### Abstract Factory

Abstract Factory Pattern is a way to create families of related or dependent objects without specifying their concrete classes. It's like having a factory that creates other factories, each of which can produce different types of objects.

Consider working on an app that creates different types of animals for each habitat. When creating different sets of animals for habitats, using individual classes for each habitat can get messy. Adding a new habitat would mean altering the entire code structure, making it complex and hard to manage.


Abstract Factory pattern allows us to have a unique factory for each habitat, like a JungleFactory or OceanFactory. Each factory creates a set of animals appropriate for its habitat, smoothening the addition of new habitats without complicating the existing code, thus keeping our development process organized and adaptable. We create an Animal Factory interface with createLandAnimal(), createBird(), and createWaterAnimal() methods. Then we create factories for each habitat which implement the Animal Factory.

```python
class HabitatFactory:
    def create_land_animal(self):
        pass
    def create_bird(self):
        pass
    def create_water_animal(self):
        pass

class FarmFactory(HabitatFactory):
    def create_land_animal(self):
        return Cow()
    def create_bird(self):
        return Chicken()
    def create_water_animal(self):
        return Duck()

class Cow:
    def speak(self):
        return "Moo!"

class Chicken:
    def speak(self):
        return "Cluck!"

class Duck:
    def speak(self):
        return "Quack!"

def create_habitat(factory: HabitatFactory):
    land_animal = factory.create_land_animal()
    bird = factory.create_bird()
    water_animal = factory.create_water_animal()
    print(land_animal.speak())
    print(bird.speak())
    print(water_animal.speak())

create_habitat(FarmFactory()) 
```
Output: 
```bash
Moo!
Cluck!
Quack!
```

Now to add a new habitat, all we need to do is create a factory for that habitat and then add respective animal classes
```python
class JungleFactory(HabitatFactory):
    def create_land_animal(self):
        return Tiger()
    
    def create_bird(self):
        return Toucan()
    
    def create_water_animal(self):
        return Crocodile()

class Tiger:
    def speak(self):
        return "Roar!"

class Toucan:
    def speak(self):
        return "Squawk!"

class Crocodile:
    def speak(self):
        return "Growl!"

create_habitat(JungleFactory())

```
Output
```bash
Roar!
Squawk!
Growl!
```
This helps adding new habitats easily by providing a structured and flexible approach to creating objects (in this case, animals) for each habitat.

Overall, Abstract Factory decouples the object creation code from the specific implementations of classes. This decoupling allows to effortlessly add a new type of classes by creating new factory classes, adhering to open-closed principle. It makes the codebase more adaptable, organized, and easier to manage as we expand our application with diverse habitats.


### Builder
Builder pattern is particularly useful for constructing complex objects step by step. It's ideal when an object involves many optional components or configurations. This pattern distinguishes the object's construction from its representation, enabling the same construction process to generate diverse outcomes.

Consider an app involving the creation of various animals. Initially, we might think to create a distinct class for each animal. However, this approach quickly becomes unwieldy with an ever-increasing number of classes. Alternatively, employing a base Animal interface with subclasses for each animal type seems logical. But here, we face a challenge: animals are diverse, and a characteristic critical for one might be irrelevant for another. This situation could lead to bloated classes or constant code modifications for new animal types.

The Builder pattern elegantly addresses these challenges. It allows us to assemble animal objects piece by piece, utilizing only the necessary traits, thus enhancing our code's flexibility and manageability. We begin with a base Animal class and an AnimalBuilder class. Then, we create specific builders for each animal type, inheriting from AnimalBuilder, to produce the respective animal.

```python
class Animal:
    def __init__(self):
        self.type = None
        self.name = None
        self.habitat = None
        self.diet = None
        self.number_of_legs = None
        self.sound = None

    def __str__(self):
        return f"{self.name} -> Type: {self.type}, Habitat: {self.habitat}, Diet: {self.diet}, Legs: {self.number_of_legs}, Sound: {self.sound}"

class Mammal(Animal):
    def __init__(self):
        super().__init__()
        self.type = "Mammal"

class AnimalBuilder:
    def __init__(self):
        self.animal = None

    def set_name(self, name):
        self.animal.name = name
        return self

    def set_habitat(self, habitat):
        self.animal.habitat = habitat
        return self

    def set_diet(self, diet):
        self.animal.diet = diet
        return self

    def set_number_of_legs(self, number_of_legs):
        self.animal.number_of_legs = number_of_legs
        return self

    def set_sound(self, sound):
        self.animal.sound = sound
        return self

    def build(self):
        return self.animal

class MammalBuilder(AnimalBuilder):
    def __init__(self):
        self.animal = Mammal()

mammal_builder = MammalBuilder()
cat = mammal_builder.set_name("Cat")
                     .set_habitat("Domestic")
                     .set_diet("Carnivore")
                     .set_number_of_legs(4)
                     .set_sound("Meoww")
                     .build()
print(cat)

whale = mammal_builder.set_name("Whale")
                      .set_habitat("Ocean")
                      .set_diet("Krill, Fish")
                      .build()
print(whale)
```

Output
```
Cat -> Type: Mammal, Habitat: Domestic, Diet: Carnivore, Legs: 4, Sound: Meoww
Whale -> Type: Mammal, Habitat: Ocean, Diet: Krill, Fish, Legs: None, Sound: None

```

With this setup, adding new animal types, like birds, is very easy. We simply introduce Bird and BirdBuilder classes, extending AnimalBuilder. This approach allows us to add any bird without altering existing code.

```python
class Bird(Animal):
    def __init__(self):
        super().__init__()
        self.type = "Bird"
        self.wings = None

    def __str__(self):
        wings_str = f", Wings: {self.wings}" if self.wings is not None else ""
        return f"{super().__str__()}{wings_str}"

class BirdBuilder(AnimalBuilder):
    def __init__(self):
        self.animal = Bird()

    def set_wings(self, wings):
        self.animal.wings = wings
        return self

bird_builder = BirdBuilder()
eagle = bird_builder.set_name("Eagle")
                     .set_habitat("Forests and Mountains")
                     .set_diet("Carnivore")
                     .set_number_of_legs(2)
                     .set_sound("Screech")
                     .set_wings("Large")
                     .build()
print(eagle)
```
Output
```bash
Eagle -> Type: Bird, Habitat: Forests and Mountains, Diet: Carnivore, Legs: 2, Sound: Screech, Wings: Large
```

To further streamline the process, we introduce the AnimalDirector class. This acts as a guide, instructing the builder on the construction steps. The builder performs the building work, but the director orchestrates the process. This separation allows us to modify the construction process without changing the builder classes.

```python
class AnimalDirector:
    def __init__(self, builder):
        self._builder = builder

    def construct_mammal(self, name, habitat, diet, number_of_legs, sound):
        self._builder.set_name(name)
        self._builder.set_habitat(habitat)
        self._builder.set_diet(diet)
        self._builder.set_number_of_legs(number_of_legs)
        self._builder.set_sound(sound)
        return self._builder.build()

    def construct_bird(self, name, habitat, diet, number_of_legs, sound, wings):
        self._builder.set_name(name)
        self._builder.set_habitat(habitat)
        self._builder.set_diet(diet)
        self._builder.set_number_of_legs(number_of_legs)
        self._builder.set_sound(sound)
        self._builder.set_wings(wings)
        return self._builder.build()

mammal_builder = MammalBuilder()
mammal_director = AnimalDirector(mammal_builder)
cat = mammal_director.construct_mammal("Cat", "Domestic", "Carnivore", 4, "Meoww!")
print(cat)

bird_builder = BirdBuilder()
bird_director = AnimalDirector(bird_builder)
eagle = bird_director.construct_bird("Eagle", "Forests and Mountains", "Carnivore", 2, "Screech", "Large")
print(eagle)
```
Output
```bash
Cat -> Type: Mammal, Habitat: Domestic, Diet: Carnivore, Legs: 4, Sound: Meoww!
Eagle -> Type: Bird, Habitat: Forests and Mountains, Diet: Carnivore, Legs: 2, Sound: Screech, Wings: Large
```

The Director essentially acts as a middleman. It leverages the Builder to create complex objects, simplifying the client code and abstracting the construction details.


## Structural Patterns
Structural patterns deal with object composition and class relationships, enabling the creation of larger structures from individual parts. 

### Adapter

Adapter Design Pattern allows objects with incompatible interfaces to collaborate. It's used to enable two incompatible interfaces to work together without changing their existing code. This pattern is very useful in cases where we need to integrate new features or components with existing systems.

Let's take an example of an app where we are using external payment services. Consider we use cashfree for now. The code for it will be simple.

```python
class Cashfree:
    def make_payment(self, amount):
        print(f"Cashfree payment of ₹{amount} processed")

def send_money(payment_service, amount):
    payment_service.make_payment(amount)

payment_service = Cashfree()

send_money(payment_service, 100) # Cashfree payment of ₹100 processed
```
Pretty straightforward till now. 
Now let's say we need to add payment service with a different interface. One option is that in `send_money` we check the type of payment service and then call the method to make payment based on that. But every time we add a new payment service we will have to add new conditions. 

In Adapter pattern, we create a .

```python
class PaymentService:
    def make_payment(self, amount):
        pass

class CashfreeService:
    def process_payment_cashfree(self, amount):
        print(f"Cashfree payment of ₹{amount} processed")

class CashfreeAdapter(PaymentService):
    def __init__(self, cashfree_service):
        self.cashfree_service = cashfree_service

    def make_payment(self, amount):
        self.cashfree_service.process_payment_cashfree(amount)


class RazorpayService:
    def execute_payment_razorpay(self, amount):
        print(f"Razorpay payment of ₹{amount} processed")


class RazorpayAdapter(PaymentService):
    def __init__(self, razorpay_service):
        self.razorpay_service = razorpay_service

    def make_payment(self, amount):
        self.razorpay_service.execute_payment_razorpay(amount)


def send_money(payment_service, amount):
    payment_service.make_payment(amount)


cashfree_service = CashfreeAdapter(CashfreeService()) 
send_money(cashfree_service, 100) #Cashfree payment of ₹100 processed

razorpay_service = RazorpayAdapter(RazorpayService()) 

send_money(razorpay_service, 100) #Razorpay payment of ₹100 processed
```
Already seems like lot of code changes 😮‍💨 but now if we want to add new payment service, it will be simpler and we won't need to modify existing code.
Let's add PayU which has a different interface
```python
class PayUService:
    def execute_payment_payu(self, amount):
        print(f"PayU payment of ₹{amount} processed")


class PayUAdapter(PaymentService):
    def __init__(self, payu_service):
        self.payu_service = payu_service

    def make_payment(self, amount):
        self.payu_service.execute_payment_payu(amount)

payu_service = PayUAdapter(PayUService()) 

send_money(payu_service, 100) #PayU payment of ₹100 processed
```

The Adapter Design Pattern aligns with the **Single Responsibility Principle** by isolating the interface conversion to a single class, and it adheres to the **Open/Closed Principle** by allowing systems to extend functionality with new adapters without altering existing code.

### Bridge
Bridge pattern involves dividing a complex class or a group of related classes into two separate hierarchies: abstraction and implementation. These hierarchies can be developed and modified independently of each other, which simplifies the class structure and enhances flexibility in development.

Let's consider an app that can send messages. The app separates the content(text, image, video) from the channels(email, sms, push notifications). We can have separate implementation for each delivery method, but the code will keep ever increasing with addition of new channels or content types. To add a new channel, we need to implement it for all content types and vice versa.
In Bridge pattern, we create a MessageChannel interface and a Message interface. All the channels implement the MessageChannel interface, and all the content types implement the Message interface. To send a text message via email, we create a EmailChannel and pass it to the TextMessage, so the sender of Message is EmailChannel and emailChannel.send will eventually send the message.

```python
class MessageChannel:
    def send(self, content):
        pass

class EmailChannel(MessageChannel):
    def send(self, content):
        print(f"Sending via Email: {content}")

class SMSChannel(MessageChannel):
    def send(self, content):
        print(f"Sending via SMS: {content}")

class Message:
    def __init__(self, sender):
        self.sender = sender

    def send(self, content):
        pass

class TextMessage(Message):
    def send(self, content):
        self.sender.send(f"Text: {content}")

class ImageMessage(Message):
    def send(self, content):
        self.sender.send(f"Image: {content}")

text_message = TextMessage(EmailChannel())
text_message.send("Hello!") # Sending via Email: Text: Hello!

image_message = ImageMessage(SMSChannel()) # Sending via SMS: Image: image.jpg
image_message.send("image.jpg")
```
Now to add new communication channel like push notifications, we just need to add PushNotification class.

```python
class PushNotificationChannel(MessageChannel):
    def send(self, content):
        print(f"Sending via Push Notification: {content}")

text_notification_message = ImageMessage(PushNotificationChannel()) 
text_notification_message.send("Hello!") # Sending via Push Notification: Hello!
```
We can now send push notification of any content type. To add a new type of content, we can add a new interface say VideoMessage and simply use it.

```python
class VideoMessage(Message):
    def send(self, content):
        self.sender.send(f"Video: {content}")

video_message = VideoMessage(EmailChannel())
video_message.send("video.mp4") # Sending via Email: Video: video.mp4
```
Now we can send video's via any channel.


Bridge pattern decouples an abstraction from its implementation, allowing them to be developed independently. This pattern enhances flexibility and scalability in software design, particularly useful in systems where both components and their behaviors are expected to change frequently or independently.

### Composite
Composite pattern allows to compose objects into **tree structures** to represent hierarchies. It enables to treat individual objects and compositions of these objects uniformly. This is mostly used when the core model of our app can be represented as a tree.

Let's take an example of app working on file structures, we can either have a directory or a file. Each directory can have subdirectories or files . This fits very well in the tree structure. We need to calculate the number of files in a directory. We can make two classes one for files and one for directories. `file.count` always returns 1 and `directory.count` checks if the item is a file, then returns 1 else if it is a subdirectory, calls `directory.count(subdirectory)` recursively. But every time we want to do something with them, we have to check: "Is this a file or a folder?" If it's a folder, leading to a lot of repetitive and complicated code.

Using composite pattern, we can make a FileSystemComponent and then each type of file structure, file, directory etc implement it. Now we have a common interface to play with.

```python
class FileSystemComponent:
    def count(self):
        pass

class File(FileSystemComponent):
    def __init__(self, name):
        self.name = name

    def count(self):
        return 1

class Directory(FileSystemComponent):
    def __init__(self, name):
        self.name = name
        self.contents = []

    def add(self, component):
        self.contents.append(component)

    def count(self):
        return sum(child.count() for child in self.contents)



file1 = File('file1')
file2 = File('file2')

directory = Directory('directory')
directory.add(file1)
directory.add(file2)

subDirectory = Directory('subDirectory')
subDirectory.add(File('file1'))
subDirectory.add(File('file2'))

directory.add(subDirectory)

print(directory.count()) # 4
```
It doesn't seem being much helpful till now. But shit, we forgot that even [symlinks](https://en.wikipedia.org/wiki/Symbolic_link) exist. Let's try to incorporate that as well. We can simply create SymLink class which implements FileSystemComponent and we are good to go. It is this easy to add new types of structures without modifying existing code.

```python
class Symlink(FileSystemComponent):
    def __init__(self, name, target):
        self.name = name
        self.target = target

    def count(self):
        return 0 # since it is a link to a file, not an actual file



file1 = File("file1")
file2 = File("file2")
file3 = File("file3")

directory = Directory("directory")
directory.add(file1)
directory.add(file2)

subDirectory = Directory("subDirectory")
subDirectory.add(file3)

directory.add(subDirectory)

symlink = Symlink("symlink_to_file3", file3)

directory.add(symlink)
print(directory.count()) # 3
```

So the composite pattern lets us group objects into tree structures to treat them uniformly and simplifies handling complex hierarchies by treating individual and composite objects the same way, making code more flexible and easier to maintain.


### Decorator

Decorator pattern allows to dynamically add responsibilities to objects. It is a flexible alternative to subclassing for extending functionality. This pattern is useful when we want to add features to individual objects without affecting other instances of the same class. It involves a "decorator" object which wraps the original object, extending its behavior without modifying its code.

Let's consider we need to create animals where each animal can have different behaviors like a cat can walk, a crocodile can swim and walk, a sparrow can walk and fly, while as a penguin can walk, fly and swim, a wingless sparrow can just walk. We adding behaviors like flying or swimming to specific animal types leads to a multitude of subclasses for each behavior combination, like FlyingBird or SwimmingFish. This results in a complex and rigid class hierarchy, challenging to maintain and extend. 
Making a subclass for each animal may seem an option but it it will become difficult and inefficient as we come across different behavior of animals, maybe mutated animals exist as well you never know. We will end up with infinite number of subclasses and will need to alter code for each new animal addition, making the system difficult to maintain and extend.

The Decorator Pattern solves these issues by wrapping objects with new functionalities at runtime, eliminating the need for numerous subclasses. We can have an Animal class

```python
class Animal:
    def __init__(self, name):
        self.name = name
        self.mobility = []

class AnimalDecorator(Animal):
    def __init__(self, animal):
        self.animal = animal
        self.name = animal.name
        self.mobility = animal.mobility

class WalkingDecorator(AnimalDecorator):
    def __init__(self, animal):
        super().__init__(animal)
        self.mobility.append("walk")

class FlyingDecorator(AnimalDecorator):
    def __init__(self, animal):
        super().__init__(animal)
        self.mobility.append("fly")

class SwimmingDecorator(AnimalDecorator):
    def __init__(self, animal):
        super().__init__(animal)
        self.mobility.append("swim")

cat = WalkingDecorator(Animal("Cat"))
print(f"{cat.name} can {', '.join(cat.mobility)}") #Cat can walk


crocodile = WalkingDecorator(SwimmingDecorator(Animal("Crocodile")))
print(f"{crocodile.name} can {', '.join(crocodile.mobility)}") #Crocodile can swim, walk

penguin = WalkingDecorator(SwimmingDecorator(FlyingDecorator(Animal("Penguin"))))
print(f"{penguin.name} can {', '.join(penguin.mobility)}") #Penguin can fly, swim, walk
```

We can add any combination of behaviors without needing to change the code at all. So adding a duck is as simple as

```python
duck = WalkingDecorator(SwimmingDecorator("Duck"))
print(f"{duck.name} can {', '.join(duck.mobility)}") #Duck can swim, walk
```
We can also handle mutants (maybe accidents), let's add a wingless sparrow 😢

```python
wingless_sparrow = WalkingDecorator(Animal("Wingless Sparrow"))
print(f"{wingless_sparrow.name} can {', '.join(wingless_sparrow.mobility)}") #Wingless Sparrow can walk
```

So managing behaviors is easy but what if we want to add a new type of behavior? We can add new type of behavior simply by adding it's decorator. Let's add hop 🐇 as mobility behavior.

```python
class HopingDecorator(AnimalDecorator):
    def __init__(self, animal):
        super().__init__(animal)
        self.mobility.append("hop")
```
Now we can add frog and rabbit and kangaroo as well 

```python
frog = SwimmingDecorator(HopingDecorator(Animal("Frog"))) 
print(f"{frog.name} can {', '.join(frog.mobility)}") # Frog can hop, swim
```

So with decorator pattern 
- no need to create a new class for each combination of behaviors
- behaviors can be added or removed at runtime.
- adding a new type of behavior requires only a new decorator, not altering the entire class structure


### Facade

Facade Pattern provides a simplified interface to a complex subsystem. It doesn't encapsulate the subsystem but provides a simplified interface to it, making it easier for the client to interact with the subsystem. Facade is particularly useful when a system is very complex or difficult to understand because the system has a large number of interdependent classes. 

Consider working on place order functionality of an e-commerce app. Before placing the order we need to check inventory process payment and then ship the order and the processes are interdependent. We can have Inventory, PaymentProcessor and ShippingService class that the client calls before placing the order. The client looks something like: 

```python

class Inventory:
    def check_stock(self, item_id):
        return True

class PaymentProcessor:
    def process_payment(self, account_details, amount):
        return True

class ShippingService:
    def initiate_shipping(self, order_details):
        return "TrackingNumber123"

#client code
def place_order(item_id, account_details, order_details):
    inventory = Inventory()
    payment_processor = PaymentProcessor()
    shipping_service = ShippingService()

    if not inventory.check_stock(item_id):
        return "Item out of stock"

    if not payment_processor.process_payment(account_details, order_details['amount']):
        return "Payment failed"

    tracking_number = shipping_service.initiate_shipping(order_details)
    return f"Order placed successfully, tracking number: {tracking_number}"

result = place_order('item123', {'card_number': '1234-5678-9012-3456'}, {'amount': 100, 'address': '123 Main St'}) 
print(result) # Order placed successfully, tracking number: TrackingNumber123
```

Now if we need to send email on order confirmation, we need to add EmailSender class and then use it in the place_order of the client code.
But with facade pattern, we introduce a OrderFacade interface which handles all the checks and processing for placing the order and the client simply needs to call `OrderFacade.place_order`.

```python
class OrderFacade:
    def __init__(self):
        self.inventory = Inventory()
        self.payment_processor = PaymentProcessor()
        self.shipping_service = ShippingService()

    def place_order(self, item_id, account_details, order_details):
        if not self.inventory.check_stock(item_id):
            return "Item out of stock"
        if not self.payment_processor.process_payment(account_details, order_details['amount']):
            return "Payment failed"
        tracking_number = self.shipping_service.initiate_shipping(order_details)
        return f"Order placed successfully, tracking number: {tracking_number}"

# client code
order_facade = OrderFacade()
result = order_facade.place_order('item123', {'card_number': '1234-5678-9012-3456'}, {'amount': 100, 'address': '123 Main St'})
print(result) #Order placed successfully, tracking number: TrackingNumber123
```
So the client code got simplified and now does not have to do all the checks and processing, now even if we want to send order confirmation email, we can add that in place_order of OrderFacade and won't have to touch the client code.

```python
class EmailService:
    def send_order_confirmation_email(self, email, tracking_number):
        print(f"Sending order confirmation email to {email}")

class OrderFacade:
    def __init__(self):
        self.inventory = Inventory()
        self.payment_processor = PaymentProcessor()
        self.shipping_service = ShippingService()
        self.email_service = EmailService()

    def place_order(self, item_id, account_details, order_details):
        if not self.inventory.check_stock(item_id):
            return "Item out of stock"
        if not self.payment_processor.process_payment(account_details, order_details['amount']):
            return "Payment failed"
        tracking_number = self.shipping_service.initiate_shipping(order_details)
        self.email_service.send_order_confirmation_email('abc@pqr.com', tracking_number)
        return f"Order placed successfully, tracking number: {tracking_number}"
```
We just added `self.email_service.send_order_confirmation_email('abc@pqr.com', tracking_number)` in place order of OrderFacade and we are done. The client does not need to change anything. We hide the complex logic of placing order in the facade and gave the client a simple abstract interface to play with.
So the Facade Pattern thus helps in reducing the complexity of the system from the perspective of the client and decouples the client from the subsystem, making the system easier to use and maintain.

### Flyweight

Flyweight pattern focuses on decreasing memory and resource usage, thereby improving performance in large-scale systems. It achieves this by sharing as much as possible with related objects; the intrinsic state is shared, and the extrinsic state is passed in from the client.

Let's take an example of a library system designed to track every book and every copy of each book. So there can be a book and the book can have multiple copies. Each copy can have a borrower. We can simply create a general book class and then create objects for each copy book. But the issue with this approach is that our objects book copies will have same data apart from copy number and borrower. So the memory size of objects increases as a lot of redundant data is stored. More resources are being consumed.
With flyweight pattern, apart from a general Book class, we create a BookCopy class and an flyweight class BookFactory. The BookFactory has just one copy of each book and  BookCopy creates a copy of same book and also implements borrow_book and return_book since a copy of book can be borrowed not the book itself. The Book class stores common details about the book.

```python
class Book:
    def __init__(self, title, author, ISBN):
        self.title = title
        self.author = author
        self.ISBN = ISBN
        print(f"New book instance created {self.get_details()}")

    def get_details(self):
        return f"Title: {self.title}, Author: {self.author}, ISBN: {self.ISBN}"


class BookCopy:
    def __init__(self, book, copy_id):
        self.book = book
        self.copy_id = copy_id
        self.borrower = None

    def borrow(self, borrower_name):
        self.borrower = borrower_name
        print(f"Book ->  {self.book.get_details()}, Copy ID: {self.copy_id}, Borrowed By: {self.borrower}")

    def return_book(self):
        self.borrower = None
        print(f"Book: {self.book.get_details()}, Copy ID: {self.copy_id}, Returned")


class BookFactory:
    _books = {}

    @classmethod
    def get_book(cls, title, author, ISBN):
        if ISBN not in cls._books:
            cls._books[ISBN] = Book(title, author, ISBN)
        return cls._books[ISBN]


book_instance_1 = BookFactory.get_book("Dive Into Design Patterns", "Alexander Shvets", "00001")
book_instance_2 = BookFactory.get_book("Dive Into Design Patterns", "Alexander Shvets", "00001")

book_copy1 = BookCopy(book_instance_1, "Copy 1")
book_copy2 = BookCopy(book_instance_2, "Copy 2")
book_copy1.borrow("John Doe") # 
book_copy1.borrow("Peter")
book_copy1.return_book()
```
Output:
```bash
New book instance created Title: Dive Into Design Patterns, Author: Alexander Shvets, ISBN: 00001
Book ->  Title: Dive Into Design Patterns, Author: Alexander Shvets, ISBN: 00001, Copy ID: Copy 1, Borrowed By: John Doe
Book ->  Title: Dive Into Design Patterns, Author: Alexander Shvets, ISBN: 00001, Copy ID: Copy 1, Borrowed By: Peter
Book: Title: Dive Into Design Patterns, Author: Alexander Shvets, ISBN: 00001, Copy ID: Copy 1, Returned
> 
```

So we have a single book instance and each copy of that book shares the same book instance and just adds fields specific to copies only. This reduces the resource consumption and thereby improves performance in large-scale systems. 

### Proxy

Proxy pattern provides an object that acts as a placeholder for another object used by a client to control access to it. It's often used when working with objects that are expensive to create or operate, or when additional actions are needed when accessing an object. A proxy receives client requests, does some work (access control, caching, etc.) before passing the request to a service object.

Let's continue our last example of library but now we have a digital library where users read digitally. We can have a DigitalLibrary class with fetch book and then each time we fetch book when the user requests. The class will also check if the user is allowed to access this book. This approach can be inefficient and slow, especially for large files and repeated requests. 

Using proxy, we can add a DigitalLibraryProxy class which acts as a placeholder for library and expose DigitalLibraryProxy to the client. The client will interact with this class only. In the DigitalLibraryProxy, we can add access control and caching in the DigitalLibraryProxy class to load books faster.

```python
from datetime import datetime
import time
class DigitalLibrary:
    def __init__(self):
        self.documents = {"doc1": "Content of Document 1", "doc2": "Content of Document 2"}

    def fetch_document(self, doc_id):
        print(f"Fetching document {doc_id} from storage")
        time.sleep(5) # fetching takes time
        return self.documents.get(doc_id, "Document not found")

class LibraryProxy:
    def __init__(self):
        self.library = DigitalLibrary()
        self.cache = {}
        self.access_permissions = {"user1": ["doc1"], "user2": ["doc1", "doc2"]}

    def has_access(self, user_id, doc_id):
        return doc_id in self.access_permissions.get(user_id, [])

    def fetch_document(self, user_id, doc_id):
        print(f"{datetime.now()} - {user_id} Requested {doc_id}")
        if not self.has_access(user_id, doc_id):
            return f"Access Denied for user {user_id} to document {doc_id}"
        
        doc = None
        if doc_id in self.cache:
            doc =  self.cache[doc_id]

        if not doc:
            doc = self.library.fetch_document(doc_id)
            self.cache[doc_id] = doc
        
        print(f"{datetime.now()} -  Sent {doc_id} to {user_id}")
        return doc

proxy = LibraryProxy()
print(proxy.fetch_document('user1', 'doc1'))
print(proxy.fetch_document('user2', 'doc1'))
print(proxy.fetch_document('user1', 'doc2'))
```
Output
```bash
2024-01-26 11:14:54.956682 - user1 Requested doc1
Fetching document doc1 from storage
2024-01-26 11:14:59.956843 -  Sent doc1 to user1
Content of Document 1
2024-01-26 11:14:59.956935 - user2 Requested doc1
2024-01-26 11:14:59.956964 -  Sent doc1 to user2
Content of Document 1
2024-01-26 11:14:59.956984 - user1 Requested doc2
Access Denied for user user1 to document doc2
```
We can also easily extend the DigitalLibraryProxy to include other features without altering the underlying library system.

Proxy pattern is used in a number of other ways:
- **Virtual Proxy**: Used for lazy initialization of expensive objects. 
- **Remote Proxy**: Represents an object located in a different address space.
- **Smart Reference Proxy**: Adds additional actions when an object is accessed or referenced.
- **Logging Proxy**: Keeps a log of operations performed on the proxied object.
- **Firewall Proxy**: Controls network traffic to protect from malicious activities.
- **Synchronization Proxy**: Adds thread-safety to object access in a multi-threaded application.
- **Complexity Hiding Proxy**: Hides the complexity and centralizes access to a complex system.

## Behavioral Patterns
Behavioral patterns concentrate on interactions between objects, defining how they communicate and collaborate.  
### Chain of Responsibility 
### Iterator
### Command
### Mediator
### Memento
### Observer
### State
### Strategy
### Template Method
### Visitor