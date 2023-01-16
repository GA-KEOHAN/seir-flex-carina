---
track: "Frontend Fundamentals"
title: "Javascript Functions"
week: 2
day: 1
type: "lecture"
---

# Javascript Arrays & Functions

## Arrays

![Arrays](https://miro.medium.com/max/816/0*jJba103A-9xmpTYq.jpg)

In any programming language an important concept is that of collections. Collections are data structures that allow you hold several pieces of data in one container. So let's clarify the different built in javascript data types into two categories.

- Primitives: Represent a single piece of information, like a number or a string

- Collections: Objects for managing several pieces of information

| Data Type | Is it a Primitive? | Is it a Collection? | When is it falsey? |
|-----------|--------------------|---------------------|--------------------|
| Number | True | False | 0 |
| String | True | False | ""|
| Boolean | True | False | False |
| null, undefined | True | False | Always |
| Arrays | False | True | Never |
| Objects | False | True | Never |
| Sets | False | True | Never |
| Maps | False | True | Never |

### What are Arrays

Arrays are a collection that holds data in a set order, accessible via a numerical index starting with the number 0.

So imagine this array...

```js
// Creating an array of strings
const instructionalTeam = ["Ira", "Alex", "Yanny", "Chris", "Ray"]
```

This array would look like this...

| Index | Value |
|-------|-------|
| 0 | "Ira" |
| 1 | "Alex" |
| 2 | "Yanny" |
| 3 | "Chris |
| 4 | "Ray" |

- What index would give us access to "Alex" ?

```console.log(instructionalTeam[1])```

- What index would give us access to "Chris" ?

```console.log(instructionalTeam[3])```

### Changing Array Values

So now that we understand creating arrays and accessing their elements via indexes, we need to discuss how to edit different array values.

```js

// We create our array
const anArray = [1, "", 3, "", 5]

//Replace the 2nd element with 2
anArray[1] = 2

//Replace the 4th element with 4
anArray[3] = 4

//log it to make sure our changes happened
console.log(anArray)

```

### Adding Values to An Array

So we can create and edit an array, but sometimes we'll need to add new information to it. To do this we have to use array methods. Array methods are functions that are build in to all arrays (only on arrays). We can access these methods using dot notation. The methods for adding to an array include.

- Array.push() => Pushes a value to the end of the array and returns the new length of the array

- Array.unshift() => adds a value to the front of the array and returns the new length of the array

```js

// Create a new array
const numbers = [2,3,4]

//log the current length of the array
console.log(numbers.length)

// push the number 5 to the end of the array and log the array and its length
numbers.push(5)
console.log("---We Just Pushed 5---")
console.log(numbers)
console.log(numbers.length)

// unshift the number 1 to the beginning of the array, then log the array and its length
numbers.unshift(1)
console.log("---We Just Unshifted 1---")
console.log(numbers)
console.log(numbers.length)

```

### Removing a Value from an Array

More array methods!

- Array.pop() => removes the last item in an array and returns it
- Array.shift() => Removes the first item in an array and returns it

```js
// create an array
const survivor = ["loser","winner","loser"]

// Remove the last item from the array and log the array
survivor.pop()
console.log("popped loser:", survivor)

// Remove the first item from the array and lot the array
survivor.shift()
console.log("shifted loser:", survivor)
```

### 10 Minute Exercise

- Create an array with 3 characters from your favorite TV show
- log the array and the length
- remove the last and first value of the array
- add another character to the front and back of the array
- log the array
- paste your code as a snippet in a thread on slack and give the post an emoji

### Using Splice

What is wanted to add or remove items in the middle of the array! Well that is what splice will help us with!

- Array.splice(x,y,z) = starting at index x, remove y number of elements, and replace them with z if there is a z

```js
const garden = ["dirt", "weed", "weed", "weed", "dirt"]

// Remove the weeds from our garden by splicing 3 items from index 1
garden.splice(1, 3)
console.log("Cleaned Garden:", garden)

// Plant a rose in the middle of our garden by splicing nothing from index 1 and inserting items before it
garden.splice(1, 0, "rose")
console.log("rose in garden:", garden)
```

### Looping Over an array with a For Of Loop

Using a for of loop we can quickly loop over each element of an an array.

- for (element of array) {...what to do each loop}

```js

const pokemon = ["Pikachu", "Mew", "Snorlax"]

// Catch them all with a for of loop

for (poke of pokemon){
    console.log(`I have caught ${poke}`)
}

```

### Multi-Dimensional Arrays

Arrays can have other arrays inside of them.

```const arr = [1,2,[3,4,[5,6]][7,8]]```

- How would you access the number 3? ```arr[2][0]```

- How would you access the number 6?

- How would you access the number 8?

### 10 Minute exercise

- google the array sort method and sort this array [5,4,3,2,1]

- google the array slice method and grab the middle three elements of this array [2,3,3,3,4]

- google the array indexOf method and find the index of the number 7 in this array [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,7,1,1,1,1,1,1,1,1,1,1,1]

- google the string split method take the string "Hello World" and turn it into an array of letters

- google the array join method and turn this array into a word ["s","u","c","c","e","s"]

### Learn more about Arrays

- [More Array Methods](https://www.youtube.com/watch?v=CIWHuP8n_KA&t=4s)
- [Array Masterclass](https://www.youtube.com/watch?v=0rd-WuGtLgI)
- [JS Iterating/Looping Masterclass](https://www.youtube.com/watch?v=JFf6ogtBUdo)
- [Fun JS Tricks](https://www.youtube.com/watch?v=KKIZ08GfQzM&t=1s)

## Functions
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

# Hungry for More - Bonus

The Below are advanced Function Techniques that you can read and attempt if you want.

You can see some of these in action by watching this Functions Masterclass Video:

- [Functions Masterclass](https://www.youtube.com/watch?v=WKvjgVA55Dw)
- [Callback Functions](https://www.youtube.com/watch?v=O0dK3_5SeQ4)
- [More Callbacks Overview](https://www.youtube.com/watch?v=fSfBldZGs9A)


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
