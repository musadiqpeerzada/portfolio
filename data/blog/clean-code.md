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
