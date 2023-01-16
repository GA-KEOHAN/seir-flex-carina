---
track: "Second Language"
title: "Intro to Ruby"
week: 1
day: 1
type: "lecture"
---


# Intro to Ruby



## Lesson Objectives

- Interpreted vs Compiled Languages
- Using REPL.it to learn a new language
- Data Types and Conditionals in the Ruby Programming Language
- Loops and Functions in Ruby

### Interpreted vs Compiled Languages

Languages like Javascript, Python and Ruby are "Interpreted Languages" and are usually turned into machine readable code by an interpreter when the code is run, so any errors in the code will create "Runtime Errors". For example, Javascript when it is run in the Google Chrome Browser or by Node it is being interpreted by the Google's V8 Javascript engine.

Languages like Crystal, Rust, and Go are compiled languages and first must be compiled into an executable file before they can be run. So errors usually show up during the compilation process and are called "Compile Time Errors" so there are very few to no run-time errors since the code won't complete compilation unless all errors are addressed, making it rare that the end user sees errors beyond bugs created by bad logic.

### REPL.it

REPL.it is website that allows you to generate a runtime for almost any programming language in the browser. This is a great tool for learning and trying out different programming languages to improve your portfolio of skills.

If you don't already have a REPL.it account, please take a moment and create one now.

# The Ruby Programming Language

From the Ruby Documentation

```
Ruby is a simple and powerful object-oriented programming language, created by Yukihiro Matsumoto (who goes by the handle “Matz” in this document and on the mailing lists).

Ruby was designed with "developer happiness" in mind, and the community encourages kindness: "Matz is nice and so we are nice".

Like Perl, Ruby is good at text processing. Like Smalltalk, everything in Ruby is an object, and Ruby has blocks, iterators, meta-classes and other good stuff.

You can use Ruby to write servers, experiment with prototypes, and for everyday programming tasks. As a fully-integrated object-oriented language, Ruby scales well.

Ruby features:

Simple syntax,
Basic OO features (classes, methods, objects, and so on),
Special OO features (mixins, singleton methods, renaming, and so on),
Operator overloading,
Exception handling,
Iterators and closures,
Garbage collection,
Dynamic loading (depending on the architecture),
High transportability (runs on various Unices, Windows, DOS, macOS, OS/2, Amiga, and so on).
Show me some Ruby code!
```

## Let's code!

### Setup

1. Go to your REPL.it account and create a new REPL
2. Select the Ruby Programming Language

### Hello World

First let's do the customary maiden voyage for any programming language with hello world. The syntax for crystal is meant to be very similar to ruby making it very easy to pick up if you've used ruby before.

```
puts "Hello world!"
```

### Data Types

Like Javascript, Python and Ruby, Crystal has dynamic typing so you don't need to specify the specific type of variable being assigned to a variable, the crystal compiler will infer it based on the data being assigned.

```
a = 1

b = "Hello"

c = true

d = nil
```

#### nil

nil represents the absence of value, similar to null in Javascript

#### Bool

A Bool type variable can hold either **true** or **false**

#### Integer

Whole numbers like 1 and 2

#### Float

Numbers with a decimal place like 5.65 and 4.42

#### Char

A single character such as 'a'

#### String

A collection of characters such as "hello there"

#### Array

An indexed collection of data denoted with []

```
my_arr = [1,2,3]
puts my_arr[2] # => Prints 3
```

#### Hash

A collection of key value pairs using the syntax of {key => value}

```
my_hash = {"name" => "Alex Merced", "age" => 34}
puts my_hash["name"]
```

#### proc

Is syntax for defining anonymous functions (like arrow functions in javascript)

```

# A proc without arguments
hello = ->{ puts "Hello" }
hello.call()

# A proc with one argument
print_number = ->(x) { puts x }
print_number.call(5)

```

### Conditionals

#### if

the syntax for if statements is the following:

```
my_var = "foo"

if my_var == "foo"
  puts my_var
else
  puts "oops"
end

```

#### unless

Like an if statement but the code runs if the expression evaluates as false

```
my_var = "foo"

unless my_var == "foo"
  puts my_var
else
  puts "oops"
end

```

#### case

These work like switch statements in javascript test data against several possible cases.

```
my_var = "foo"

case my_var
when "foo"
  puts my_var
when "bar"
  puts "oh my"
else
  puts "and here we are"
end
```

### Loops

#### while

A standard while loop that loops as long as the expression evaluates true

```
loops = 0

while loops < 6
 puts loops
 loops = loops + 1
end
```

#### until

like a while loop but only loops if the expression evaluates to false

```
loops = 0

until loops > 6
 puts loops
 loops = loops + 1
end
```

### functions

Everything is an object in crystal so all functions are called as a method of an object. The simplest way to write a function in crystal is to assign a Proc to a variable and use .call() function to invoke the proc.

```
def hello_world()
  puts "hello world"
end

hello_world()
```

## Practice Time

- feel free to search for more information such as how to determine the length of a data collection or how to iterate over them.

Attempt to do the following on your own:

1. assign a integer to a variable and print it to the console

2. assign a string to a variable and print it to the console

3. write an if statement that runs if a variable called myVar is greater than 5, test it out with different Numbers

4. Write an unless statement that runs if a variable called myVar isn't greater than 5 and test it out with different Numbers

5. write a case statement with at least 2 whens and test them out

6. create an array with 5 elements and use a while loop to print each of its values

7. create a hash with at least 3 properties and print one of its properties to the console

8. create an array with 5 elements and use a until loop to print each its evaluates

9. create a function that takes 2 numbers as arguments and adds them

10. create a function that takes 2 numbers as arguments and subtracts them

11. create a function that takes 2 strings and concatenates them
