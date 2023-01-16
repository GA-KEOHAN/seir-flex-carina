# Intro to Javascript

Javascript is a very unique languages with a unique history.

- [Watch this video on the history of JS](https://www.youtube.com/watch?v=Sh6lK57Cuk4)

We'll be focusing on programming fundamentals and javascript, a few terms/concepts we should familiarize yourself with.

- Interpreted vs Compiled
- V8 Javascript Engine
- Frontend (JS in the Browser) vs Backend (Node)

## Setup

We'll be using node for today's exercise so make sure to head to NodeJS.org and download node. Once installed to confirm that it is installed, in your terminal run...

```
node --version
```

Once node is installed...

- create a new folder "Intro to JS"
- in that folder create an index.html and intro.js `touch index.html intro.js`

## Two Ways to Run Javascript

- Frontend: include the javascript file in an HTML file as a script tag (use browser console to see console output)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <!-- THIS SCRIPT TAG CONNECTS OUR JS FILE TO OUR WEB PAGE -->
    <script src="intro.js"></script>


</head>
<body>
    
</body>
</html>
```

- Backend: run the the js file with node `node filename.js` (console output appears in terminal)

## Hello World

The first thing you should always learn in a programming language is how to print text to the console. This simple action will be super useful for testing your code and making sure it does what you think it does.

In javascript there is a console object with several built in functions/methods for printing output to the console, the more important being, console.log.

- inside intro.js

```js
// Print Hello World to the Console
console.log("Hello World")
```

- run the file in the browser or with `node intro.js` in the terminal

## Data Types

Every programming languages has different types of data and knowing what they are can really make a difference in understand why certain syntax works the way it does.

In javascript all data is either a primitive or an object.

Primitives represent actual data: numbers, letters, etc. These are passed around in your code as values. So when you store the number one in a variable you are actually storing the number one.

- numbers
- strings
- booleans (true/false)

Objects represent containers for data so when you store an object in a variable you are actually storing a reference to where the container exists in the computers memory.

- Objects
- Functions
- Arrays
- Maps
- Sets
- everything other than the primitives above

## Variables

Variables can be declared in three ways which will effect whether the variable can change values (reassignability) and where does it exist (scope).

```js
const a = 5
console.log(a)
```
- can't be reassigned
- block scoped

```js
let a = 5
console.log(a)
```
- can be reassigned
- block scoped

```js
var a = 5
console.log(a)
```
- can be reassigned
- global scoped unless declared in a function, then scoped to the function

## Math Operators

Operators are symbols we can use to do operations between multiple data points. The below are for math operations (operations that result in numbers)

```
add +
subtract -
multiply *
divide /
modulos %
exponent **
increment ++
decrement --

add and reassign +=
subtract and reassign -=
```

## Boolean Operators

Boolean operators allows us to do operations that result in either true or false. Keep in mind javascript categorizes all values as truthy of falsey. Easiest way to remember it, is that everything is truthy except...

- 0
- ""
- false
- null
- undefined
- NaN

The Operators
```
Equality: == (1 == "1" is true)
Switch Equality: === (1 === "1" is false)
inEquality: !=
string inequality: !==
greater than: >
equal or greater that: >=
less than: <
equal or less than: <=
AND: && (both sides must be true)
OR: || (One side must be true)
```

## Control Flow

Control Flow is a bundle of programming tools that allow us to break apart from the procedural nature of code (do x, then y, then z).

### If Statements

Runs code if the expression passed evaluates as true. If an else block is given will run that block if its false.

```js
let x = 5

if (x > 3){
    console.log("greater than 3")
} else {
    console.log("3 or less)
}

```

### Switch Statement

Will run a block of code if the value passed equal one of many possible "cases", if no case is a match will then run the default case.

```js
let comingOrGoing = "goodbye"

switch(comingOrGoing){
    case "hello":
        console.log("Hello, how are you?")
        break

    case "goodbye":
        console.log("goodbye, be well!")
        break

    default:
        console.log("are you coming or going?")
}

```

### Loops
The ability to repeat a block of code several consecutive times.
#### While Loops

Will repeat a block of code as long as the expression is true.

```js
let x = 0

while(x < 10){
    console.log(x)
    x += 1
}
```

#### While Loops

Will repeat a block of code as long as the expression is true. It has a three part initializer:

-`let x = 0` initialize the counter variable
- `x < 10` the expression do determine if loop repeats
- `x += 1` expression run at the end of each loop

```js


for(let x = 0; x < 10; x += 1){
    console.log(x)
}
```