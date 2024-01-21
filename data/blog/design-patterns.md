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

- **Best Practices**: Understanding patterns makes us aware of best practices and standardized ways, improving the overall quality and maintainability of your code.

- **Communication**: They establish a common language among developers, enabling clear communication and collaboration among teams.

- **Scalability**: Patterns help create scalable and flexible software architectures that can adapt to changing requirements and larger projects without much changes.

- **Problem-solving Skills**: They enhance our problem-solving skills by offering tested, well-defined solutions that can be applied in various scenarios.

- **Career Growth**: Proficiency in design patterns is highly valued in the industry, boosting your employability and potential for career advancement in software development.

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

    @classmethod
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
real_madrid_ozil.set_skills([*real_madrid_ozil.skills, "Abitlity to find Ronaldo", "Breaking passes"])

# Print the players to see the results
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
Ozil, CAM, Skills: ['Wizard', 'Abitlity to find Ronaldo', 'Breaking passes']
```

And then we can create n number of Ozil players and add skills as and when needed.

So in Prototype pattern, we have a template and then using that template we create objects, which is particularly useful in scenarios where object creation is resource-intensive or requires a lot of setup.

### Factory Method
Factory Method provides an interface for creating objects in a superclass but allows subclasses to alter the type of objects that will be created. It's a bit like having a rule or a recipe for creating objects.

Consider we need to create animals like cat or dog. Each type of animal has its own way of being created and might have different behaviors. We can do it simply by creating classes for each animal, but each time we need to add an new animal, our whole code will change. This makes the code complex and hard to manage.

If we create an interface for animals and then each type of animal implements this interface, we always get an animal interface irrespective of it's type.
But in the Factory Method, we use different factories for each animal, like a DogFactory for dogs and a CatFactory for cats. Each factory knows how to make its corresponding animal. This is helpful because it keeps the code simple and organized. When we want to add a new type of animal, we just add a new factory without changing the existing code. This makes our code easy to manage and expand.


```python
# Abstract Animal class
class Animal:
    def speak(self):
        pass

# Concrete Animal classes
class Dog(Animal):
    def speak(self):
        return "Woof!"

# Abstract Factory class
class AnimalFactory:
    def create_animal(self):
        pass

# Concrete Factory classes
class DogFactory(AnimalFactory):
    def create_animal(self):
        return Dog()


# Usage
dog = DogFactory().create_animal()
print(dog.speak())  # Output: Woof!

```
Now to add a new animal, say cat
```python

# Additional Concrete Animal class for Cat
class Cat(Animal):
    def speak(self):
        return "Meow!"

# Concrete Factory class for Lion
class CatFactory(AnimalFactory):
    def create_animal(self):
        return Cat()

cat = CatFactory().create_animal()
print(cat.speak())  # Output: Meow!
```
This way we can add new types of animals without altering the existing factories, staying true to the **Open/Closed Principle**: open for extension but closed for modification.



### Abstract Factory

Abstract Factory Pattern is a way to create families of related or dependent objects without specifying their concrete classes. It's like having a factory that creates other factories, each of which can produce different types of objects.

Consider working on an app that creates different types of animals for each habitat. When creating different sets of animals for habitats, using individual classes for each habitat can get messy. Adding a new habitat would mean altering the entire code structure, making it complex and hard to manage.


Abstract Factory pattern allows us to have a unique factory for each habitat, like a JungleFactory or OceanFactory. Each factory creates a set of animals appropriate for its habitat, smoothening the addition of new habitats without complicating the existing code, thus keeping our development process organized and adaptable. We create an Animal Factory interface with createLandAnimal(), createBird(), and createWaterAnimal() methods. Then we create factories for each habitat which implement the Animal Factory.

```python

# Abstract Factory Interface
class HabitatFactory:
    def create_land_animal(self):
        pass
    def create_bird(self):
        pass
    def create_water_animal(self):
        pass

# Concrete Factories
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

Overall, Abstract Factory decouples the object creation code from the specific implementations of classes. This decoupling allows to effortlessly add a new type of classes by creating new factory classes, adhering to open-closed principle. It makes the codebase more adaptable, organized, and easier to manage as you expand your application with diverse habitats.


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

### Decorator

Decorator pattern allows to dynamically add responsibilities to objects. It is a flexible alternative to subclassing for extending functionality. This pattern is useful when you want to add features to individual objects without affecting other instances of the same class. It involves a "decorator" object which wraps the original object, extending its behavior without modifying its code.

Let's consider we need to create animals where each animal can have different behaviors like a cat can walk, a crocodile can swim and walk, a sparrow can walk and fly, while as a penguin can walk, fly and swim, a wingless sparrow can just walk. We adding behaviors like flying or swimming to specific animal types leads to a multitude of subclasses for each behavior combination, like FlyingBird or SwimmingFish. This results in a complex and rigid class hierarchy, challenging to maintain and extend. 
Making a subclass for each animal may seem an option but it it will become difficult and inefficient as we come across different behavior of animals, maybe mutated animals exist as well you never know. We will end up with infinite number of subclasses and will need to alter code for each new animal addition, making the system difficult to maintain and extend.

The Decorator Pattern solves these issues by wrapping objects with new functionalities at runtime, eliminating the need for numerous subclasses. We can have an Animal class

```python
# Animal Interface
class Animal:
    def __init__(self, name):
        self.name = name
        self.mobility = []

# Decorator Base Class
class AnimalDecorator(Animal):
    def __init__(self, animal):
        self.animal = animal
        self.name = animal.name
        self.mobility = animal.mobility

# Walking Decorator
class WalkingDecorator(AnimalDecorator):
    def __init__(self, animal):
        super().__init__(animal)
        self.mobility.append("walk")

# Flying Decorator
class FlyingDecorator(AnimalDecorator):
    def __init__(self, animal):
        super().__init__(animal)
        self.mobility.append("fly")

# Swimming Decorator
class SwimmingDecorator(AnimalDecorator):
    def __init__(self, animal):
        super().__init__(animal)
        self.mobility.append("swim")


# Usage
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
# Flying Decorator
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



### Adapter
### Bridge
### Composite

### Facade
### Flyweight
### Proxy

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