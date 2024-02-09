---
title: Clean Code
date: '2024-02-10'
tags:
  - clean
  - code
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

What do you get from the above variables? Although the value is same but `days_in_a_week` clearly indicates what it is, what will it be used for but `d` does not.

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

We often introduce unnecessary complexity by trying to overcome language constraints, like naming variables too similarly or using unconventional spellings to differentiate them, like using "listt" because "list" is a keyword. Even sometimes if we need two different things in our code to have different names but you run out of ideas, we might end up slightly changing one name in a way that doesn't make sense, like misspelling it on purpose. This can lead to weird situations where fixing the spelling stops the code from working. It's not enough to just add random numbers or extra words to make the names different for the computer; the names should also clearly show how they're different to anyone reading the code.
Using names like "a1", "a2", etc., doesn't help at all because they don't tell you anything about what the variable is for. It's much clearer if we use names which give information about the variable or function.
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

When naming things in code, make sure the names are straightforward so that others don't have to guess what they mean. Never underestimate their imagination. The goal is to write code that is easy to understand for anyone who might read it, not just for yourself.

### Class Names

Name classes with nouns or noun phrases like Customer, Account, PaymentService. Avoid words like Manager, Processor, Data, or Info. Class names should describe what they are, not what they do, and definitely not just the kind of data they handle.

### Method Names

Methods should be named with verbs or verb phrases that clearly state what they do, like postPayment, delete, or save. For getters and setters, use prefixes like get, set. If we have multiple constructors with different purposes, consider using static factory methods with descriptive names, and make the constructors private to guide their usage.

### Don't Be Cute

Don't use "funny" names in your code; it might seem humorous at the moment, but it can make your code harder to understand and maintain. For example, use clear names like deleteItems instead of holyHandGrenade, or abort instead of eatMyShorts.

### Pick One Word per Concept

Choose one word for one concept and stick with it throughout your code. It's confusing if one class uses fetch, another uses retrieve, and another uses get to do essentially the same thing.

### Add Meaningful Context

Code will mostly be read by other programmers, so it's okay to use technical terms, algorithm names, or other specialized language when it fits.

### Use Problem Domain Names

If there's no technical term that fits what we're trying to do, prefer names from the problem domain working in. That way, even if someone doesn't understand the code, they can ask an expert in the field for help.

### Add Meaningful Context

Not every name makes sense on its own. Sometimes we need to give more context, either by grouping related names together in a class or namespace or by using prefixes (though this should be a last resort). For example, if we have variables like firstName, lastName, and street, it's clear they're part of an address. If we need to use one of these variables on its own, like state, providing some context, like addressState, can help clarify its role.

### Don’t Add Gratuitous Context

Adding too much context, especially unnecessary or repetitive context, can make names longer without making them clearer. For example, in an application called "PaymentService," we don't need to start every class name with PS.
