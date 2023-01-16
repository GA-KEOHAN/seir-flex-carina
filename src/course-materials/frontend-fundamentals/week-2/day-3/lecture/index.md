---
track: "Frontend Fundamentals"
title: "Intro to Classes"
week: 2
day: 3
type: "lecture"
---

# Intro to Classes and Object Oriented Programming

## What is OOP?

OOP is a programming paradigm built around...

- Encapsulation: abstracting an idea into a defined construct

- Inheritance: being able extend constructs to add functionality

- Polymorphism: The idea that on construct can be used in many ways

## Encapsulation the Hard way

Javascript is unique as it's one of the few languages that allows you define objects outright. (Most languages require you to create a class before you can create an object). So in Javascript we can encapsulate the idea of animals by defining several objects.

```js
const dog = {
    legs: 4,
    ears: 2,
    sound: "bark"
}

const pig = {
    legs: 4,
    ears: 2,
    sound: "oink"
}

const cow = {
    legs: 4,
    ears: 2,
    sound: "moo"
}

console.log(dog, pig, cow)
```

So we can see we have encapsulated the idea of a dog in the dog object, and the same for the pig and the cow. But what if we were create a farm simulator game that would have several cows and pigs, creating one off objects like this would be pretty tedious. Classes will allow us mix encapsulation with polymorphism to make our life easier.

## The Animal Class

A class allows use to pre-define an object before it's created and the kind of variables and functions that object can use.

- properties: the variables that below to an object
- methods: functions that belong to an object

```js
// Define a new class
class Animal {

}

// use polymorphism to use the class to create different things
const dog = new Animal()
const pig = new Animal()
const cow = new Animal()

console.log(dog, pig, cow)


```

We can see from the console.log that we create three Animal type objects, but they don't have any properties. Notice when we say "new Animal()" it looks a lot like a function, because it is. When a class is created an instance of this class is created, also known as instantiation. When we instantiate an object a function called known as the constructor, but since we haven't defined that function, nothing happened and our objects our empty.

```js
// Define a new class
class Animal {
    //define the constructor function to define object properties
    constructor(sound, ears, legs){
        //assign the values passed to the constructor to the new object
        this.sound = sound
        this.ears = ears
        this.legs = legs
    }

}

// use polymorphism to use the class to create different things
const dog = new Animal("bark", 2, 4)
const pig = new Animal("oink", 2, 4)
const cow = new Animal("moo", 2, 4)

console.log(dog, pig, cow)
```

Now we should be seeing properties in our objects, but we also mentioned methods, things the object can do. In the class definition we can always reference the instance of the object with the this keyword to access its properties and methods.

```js
// Define a new class
class Animal {
    //define the constructor function to define object properties
    constructor(sound, ears, legs){
        //assign the values passed to the constructor to the new object
        this.sound = sound
        this.ears = ears
        this.legs = legs
    }

    makeSound(){
        console.log(this.sound)
    }

}

// use polymorphism to use the class to create different things
const dog = new Animal("bark", 2, 4)
const pig = new Animal("oink", 2, 4)
const cow = new Animal("moo", 2, 4)

console.log(dog, pig, cow)
dog.makeSound()
pig.makeSound()
cow.makeSound()
```

Just like any other object we can access the properties and methods using dot notation. 

## Excercise: Encapsulate This!

Take 10 minutes and try to encapsulate a computer and write a computer class.

- Ask your self what describes a computer?
  - These are properties that should be defined via the constructor

- What does a computer do?
  - These are methods that should be function definitions below the constructor like makeSound

Write a computer class and then test it making a computer and logging it's properties and invoking its methods.

## Inheritance

What if we needed lots of pigs, typing ("oink", 2, 4) then becomes redundant. Also pigs may do things that other animals don't so wouldn't make sense to add those methods to the animal class. This is where inheritance comes into play. Inheritance allows us to create a new class based on a class that already exists. 

This new class has access to all the methods of the parent class and access to the parents constructor via the super() function. So let's define a pig class that takes instead of taking arguments will pass in set values to the animal constructor and add a new method.

```js
// Define a new class
class Animal {
    //define the constructor function to define object properties
    constructor(sound, ears, legs){
        //assign the values passed to the constructor to the new object
        this.sound = sound
        this.ears = ears
        this.legs = legs
    }

    makeSound(){
        console.log(this.sound)
    }

}


// New Pig Class that inherits from Animal
class Pig extends Animal {
    constructor(name){
        //invoking the parent constructor with set values
        super("oink", 2, 4)
        this.name = name
    }

    // New Method
    rollInMud(){
        console.log(`${this.name} rolls in mud and says ${this.sound}`)
    }
}


// Instantiate Instance of our new Pig Class
const wilbur = new Pig("Wilbur")

console.log(wilbur)
wilbur.rollInMud()
wilbur.makeSound()
```

## Overriding 

When inheriting you can redefine existing methods. When an object of that class uses the method it will use the definition from the class it is created from not from the parent class.

```js
// Define a new class
class Animal {
    //define the constructor function to define object properties
    constructor(sound, ears, legs){
        //assign the values passed to the constructor to the new object
        this.sound = sound
        this.ears = ears
        this.legs = legs
    }

    makeSound(){
        console.log(this.sound)
    }

}


// New Pig Class that inherits from Animal
class Pig extends Animal {
    constructor(name){
        //invoking the parent constructor with set values
        super("oink", 2, 4)
        this.name = name
    }

    // New Method
    rollInMud(){
        console.log(`${this.name} rolls in mud and says ${this.sound}`)
    }

    makeSound(){
        console.log(`${this.name} says ${this.sound}`)
    }
}


// Instantiate Instance of our new Pig Class
const wilbur = new Pig("Wilbur")

console.log(wilbur)
wilbur.rollInMud()
wilbur.makeSound()
```

## Inherit This!

Take 10 minutes and do the following:

- Create a Cow Class that inherits from Animal
- Create a Dog Class that inherits from Animal

- pass set values to the parent constructor
- add a name property that is defined with instantiated
- add at least one new method
- override the makeSound method

## Static Properties and Methods

Sometimes you have variables or methods that don't need to or should belong to a single instance of the class but are needed to work with the class. For these situation we can use Static properties and methods which belong to the class, not the instance.

So let's say we want to keep track of all the pigs we've created, we can create a static property that is incremented in the constructor when a pig is created. We can then create a static method to access that value. To specify a static member of the class we use the keyword static.

```js
// New Pig Class that inherits from Animal
class Pig extends Animal {

    //Define static property
    static count = 0;

    constructor(name){
        //invoking the parent constructor with set values
        super("oink", 2, 4)
        this.name = name
        // increment static property when each pig is created
        Pig.count++
    }

    // New Method
    rollInMud(){
        console.log(`${this.name} rolls in mud and says ${this.sound}`)
    }

    makeSound(){
        console.log(`${this.name} says ${this.sound}`)
    }

    // method to get count of pigs
    static countPigs(){
        return Pigs.count
    }
}

const pig1 = new Pig("1")
const pig2 = new Pig("2")
const pig3 = new Pig("3")

//Invoke Static Method
Pig.countPigs()
```

## Design Patterns

Design Patterns are common ways of using objects as solutions in your code. "Design Patterns: Elements of Reusable Object-Oriented Software" is a classic book on this topic you'll often hear referenced as the "Gang of Four" book. Some of the more popular design patterns include.

#### Creation Patterns (Dealing with Creating New Objects)

- Factory: creating one class who is responsible for creating instances of another class. (imagine a farm class that creates Pigs and Cows)

- Prototype: Creating an object that is cloned to create copies, instead of assembling new copies from a blueprint. (This is actually how classes work under the hood in javascript, which is different from other languages. When you create a class you are actually creating a prototype that is copied)

- Singleton: Creating a class where only one instance is intended. In unit two, in express you'll create a single application object using the Express Library.

#### Structural Design Patterns (Dealing with Extending Functionality of Objects)

- Adapter: Creating a class that makes two unrelated classes work together

- Decorator: Mechanism to add functionality to instances or definitions as needed. (Essentially you pass an object to a function which adds methods and properties to that instance)

- Proxy: An object that represents another object (Vue Library uses this strategy to hide a lot of under the hood details from the user)

#### Behavioral Design Patterns (Dealing with Communication Between Objects)

- Null Object: An object that represents a value to another object. (Imagine making a color class, and instantiating a bunch of colors that can be passed to another class)

- Observer: A class that watches for events then notifies other objects of the events occurence. (In unit two we will use MongoDB that uses such a pattern to notify of database connections and connections errors)

- State: When an object rebuilds itself based on the changes to its internal properties. (This is the heart of how React works)


[See a List of More Design Patterns Here](https://sourcemaking.com/design_patterns)