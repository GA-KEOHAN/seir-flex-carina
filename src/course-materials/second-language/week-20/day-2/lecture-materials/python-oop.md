---
track: "Second Language"
title: "Python OOP"
week: 20
day: 2
type: "lecture"
---

![GA Logo](https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/General_Assembly_logo.svg/1280px-General_Assembly_logo.svg.png)

# OOP in New Language

---

## What you will learn

- How to Create a Class
- How to Instantiate a Class
- Write a Constructor and Methods
- Create an Inherited Class
- Write Static Methods/Properties

---

Below you'll see Javascript examples of Object Oriented Patterns and their new language Counterparts.

## Creating and Instantiating a Class

In Javascript

```js
// Creating a Class
class Dog {}

// Instantiation
const Sparky = new Dog();
```

In Python

```python
// Creating a Class
class Dog:
    pass

// Instantiation
sparky = Dog()
```

## The Constructor and Methods

In Javascript

```js
// Creating a Class
class Dog {
  // The constructor runs when we instantiate a new instance
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // A Method
  bark() {
    console.log(`${this.name} barks`);
  }
}

// Instantiation
const Sparky = new Dog("Sparky", 4);
Sparky.bark();
```

in Python

```py
# Creating a Class
class Dog:

    # The constructor runs when we instantiate a new instance
    def __init__(self, name, age):
        self.name = name
        self.age = name

    # A Method
    def bark(self):
        print(f"{self.name} barks")

# Instantiation
Sparky = Dog("Sparky", 4)
Sparky.bark()
```

## Inheritance

In Javascript

```js
// Creating a Class
class Dog {
  // The constructor runs when we instantiate a new instance
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // A Method
  bark() {
    console.log(`${this.name} barks`);
  }
}

class SmallDog extends Dog {
  constructor(name, age) {
    //Super calls the constructor of the parent class
    super(name, age);
  }

  //This will override the version of bark in the parent class
  bark() {
    console.log(`${this.name} yaps`);
  }
}

// Instantiation
const Sparky = new SmallDog("Sparky", 4);
Sparky.bark();
```

in Python

```py
# Creating a Class
class Dog:

    # The constructor runs when we instantiate a new instance
    def __init__(self, name, age):
        self.name = name
        self.age = name

    # A Method
    def bark(self):
        print(f"{self.name} barks")

class SmallDog(Dog):

    def __init__ (self, name, age):
        # Super calls the constructor of the parent class
        super().__init__(name, age)

    #This will override the version of bark in the parent class
    def bark(self):
        print(f"{self.name} Yaps")

# Instantiation
Sparky = SmallDog("Sparky", 4)
Sparky.bark()
```

## Static Methods and Properties

In Javascript

```js
// Static Properties/Methods belong to the class, not the instance
class Calculator {
  static lastResult = 0;

  static calculate(num1, num2, operator) {
    Calculator.lastResult = eval(`${num1} ${operator} ${num2}`);
    return Calculator.lastResult;
  }

  static showLastResult() {
    console.log(Calculator.lastResult);
  }
}

Calculator.calculate(2, 2, "+");
Calculator.showLastResult();
```

In Python

```py
# Static Properties/Methods belong to the class, not the instance
class Calculator:
    # Properties declared outside the constructor are class/static properties
    lastResult = 0

    @classmethod # Defines this as class method that receive cls instead of self
    def calculate(cls, num1, num2, operator):
        cls.lastResult = eval(f"{num1} {operator} {num2}")
        return cls.lastResult

    @staticmethod # defines this as static method that receives neither self/cls
    def showLastResult():
         print(Calculator.lastResult)

Calculator.calculate(2, 2, "+")
Calculator.showLastResult()
```

---

## Resources to Learn More

---
