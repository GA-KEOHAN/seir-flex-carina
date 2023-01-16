---
track: "Frontend Fundamentals"
title: "Javascript Functions"
week: 2
day: 1
type: "lecture"
---

# Javascript Functions

![Functions](https://www.local-pc-guy.com/wp-content/uploads/2019/03/arrow_function.png)

## What are functions?

Functions are like a spell. It can be used at any time and does magical things like add numbers, create objects and more.

## Write a Funcion, 3 Ways...

### Classic Functions
**HOISTED, Generates a Prototype (Constructor, Arguments Objects)**

```js
function helloWorld(){
    console.log("Hello World")
}

helloWorld()
```

### Anonymous Function with Function Keyword
**Not Hoisted, Generates a Prototype**

```js
const helloWorld = function(){
    console.log("Hello World")
}

helloWorld()
```

### Arrow Functions
**Not Hoisted, No Prototype**

```js
const helloWorld = () => {
    console.log()
}

helloWorld()
```

## Function Parameters and Arguments

Functions can receive information to use during execution.

- **Parameters:** Variables defined in the function definition to represent arguments to be passed when the function is invoked.

- **Arguments:** The data passed into the function when invoked.

```js

//Name is a parameter/variable that receives the first argument passed to nameAPony
const nameAPony = (name) => {
    console.log(`The name of my pony is ${name}`)
}

//Each invocation of nameAPony receives a different argument
nameAPony("Charlie")
nameAPony("Susie")
nameAPony("Lisa")
```

### Default Parameter Values

```js
const logTheThing = (stuff = "Hello World") => {
    console.log(stuff)
}

logTheThing("cheese")
logTheThing()
```

### Variable Arguments

You could use a variable number of arguments by either using the arguments object when using the function keyword or with the rest operator on arrow functions.

**The Arguments Object**

```js

function manyArgs (){
    
    //See the arguments object in the console
    console.log(arguments)
    
    //loop over the arguments
    for (arg of arguments){
        console.log(arg)
    }

    //turn the arguments object into an array with the spread operator and log it
    console.log([...arguments])
}

manyArgs(1,2,3,4,5,6,7)

```

**The Rest Operator and Arguments**

```js
const manyArgs = (...args) => {
    
    console.log(args)
}

manyArgs(1,2,3,4,5,6,7)
```

### Objects as arguments and Destructuring Arguments

Many other languages have a named arguments features where you can give names to function parameters so the order they are passed in doesn't matter long as they are given the right name.

Javascript doesn't have this feature but the same result can be achieved by taking in objects as arguments. This is a very typical practice for many functions to instead of expecting many arguments expecting an object with all the necessary properties for the function.

```js
const myFunction = (argObject) => {
    console.log(argObject.cheese)
    console.log(argObject.bread)
}

myFunction({
    cheese: "Gouda",
    bread: "Rye"
})
```

The problem with this is someone using your function could pass in a bunch of extra properties that never get used that will be sitting in your memory for the remainder of the function execution, plus writing dot notation can be annoying, right! So one way fix both problems is destructure the properties you know you need from the object that will be passed in. (We can even give them default values)

```js
const myFunction = ({cheese = "Cheddar", bread = "White"}) => {
    console.log(cheese)
    console.log(bread)
}

myFunction({
    cheese: "Gouda",
    bread: "Rye"
})

myFunction({})
```

## Return Values

Right now we've mainly just been logging values which is fun but not particularly useful. To actually get the values out of the function back into our main program so we can use it we need to return the value using the return keyword.

```js
const buyAPony = (name) => {
    return {
        name,
        ride: () => console.log("You are riding a pony")
    }
}

const myPony = buyAPony("Lightning")
console.log(myPony)
myPony.ride()
```

You can use return values in mathmatical operations...

```js

//No Curley Brackets on an arrow function is an implied return
const sum = (x,y) => x + y

console.log(sum(2,2) + sum(3,3)) //same as 4 + 6

```

You can return booleans...

```js

//No Curley Brackets on an arrow function is an implied return
const isItEven = (x) => x % 2 === 0

//using the return value as a conditional
if (isItEven(8)){
    console.log("it is even")
}

```

## Functions as Arguments and Return Values

That's right function can take in other functions and return other functions

### Passing a Function as Argument

A function that is passed as an argument to another function is called a callback.

```js
const someFunction = (callback) => {
    callback()
}

const argFunc = () => console.log("this function was used as an argument!")

//You can pass previously defined functions as arguments
someFunction(argFunc)

//you can define function directly when invoking
someFunction(() => console.log("I am an arrow function passed into a function"))
```

### Returning a Function

Sometimes a function needs some information before it is created, so you can create a function to create a function, then return that function.

```js

//Function to create the function
const whoIsTheOwner = (name) => {
    return (item) => {
        console.log(`${name} is the owner of ${item}`)
    }
}

const theReturnedFunction = whoIsTheOwner("Alex")
theReturnedFunction("Guitar")
theReturnedFunction("Many Cardigans")

const anotherReturnedFunction = whoIsTheOwner("Joe")
anotherReturnedFunction("Baseball Cap")
anotherReturnedFunction("Running Shoes")
```
