---
track: "Frontend Fundamentals"
title: "Array Callback Methods"
week: 4
day: 3
type: "lecture"
---

# Array Methods with Callbacks

Our sample Array

```js

const dogs = [
  {name: "Fido", age: 5, owner: "Sam", adopted: true},
  {name: "Stella", age: 2, owner: "", adopted: false},
  {name: "Spot", age: 6, owner: "Diane", adopted: true},
  {name: "Clifford", age: 1, owner: "", adopted: false},
  {name: "Bruiser", age: 8, owner: "Sam", adopted: true},
  {name: "Frodo", age: 3, owner: "", adopted: false},
]

```

## Map

Returns a new array of all the return values from the callback functions

SYNTAX
`const result = array.map((item, index) => {})`

Example:

Give all dogs an id property using their index as their id number.

```js
const result = dogs.map((item, index) => {
  item.id = index
  return item
})

console.log(result)
```

## Filter

Returns a new array of only items in which the callback returned a truthy value.

SYNTAX
`const result = array.filter((item, index)=> {})`

Example:

Create an array only of dogs under 5

```js
const result = dogs.filter((item, index) => {
  return item.age < 5
})

console.log(result)
```

## Some and Every

Some return true if the callback returns a truthy value at least once, Every returns true if it returns a truthy value everytime!

EVERY SYNTAX
`const result = array.every((item, index) => {})`

SOME SYNTAX
`const result = array.some((item, index) => {})`

Example

return whether some dogs are adopted and whether all dogs were adopted

```js
const someAdopted = dogs.some((item, index) => {return item.adopted})
const everyAdopted = dogs.every((item, index) => {return item.adopted})

console.log("Some dogs adopted?:", someAdopted)
console.log("Every dog adopted?:", everyAdopted)
```

## Find and FindIndex

Find returns the value of the item in which the callback returns a truthy value
FindIndex returns the index of the first item in which a truthy value is returned

FIND SYNTAX
`const result = array.find((item, index) => {})`

FINDINDEX SYNTAX
`const result = array.findIndex((item, index) => {})`

Example

return the dog adopted by diane

```js
const value = dogs.find((item, index) => {return item.owner === "Diane})
const index = dogs.findIndex((item, index) => {return item.owner === "Diane})

console.log("Dog Diane Adopted:", value)
console.log("Index of the dog:", index)
```

## Sort

Sorts the array based on the function. If the callback returns zero or a negative number it does not swap the items, and if it returns a positive number it will swap the items

Sort SYNTAX
`const result = array.sort((currentItem, nextItem ) => {})`


Example

sort the dogs from adopted to not adopted

```js
dogs.sort((currentItem, nextItem) => {
  // translate adopted value into numbers
  const currentValue = currentItem.adopted ? 1 : 2
  const nextValue = nextItem.adopted ? 1 : 2
  // subtract values to determine if they are swapped
  return currentValue - nextValue
  })


console.log(dogs)
```

## Reduce

Reduce takes a function and a starting value,

in each loop the function is passed the current accumulator (a cumulative value that starts with the starting value), the item, and the index. The return value of the function becomes the accumulator on the next loop. Reduce returns the value of the accumulator at the end.

Sort SYNTAX
`const result = array.reduce((acc, item, index) => {}, startingValue)`


Example

What is the cumulative age of all dogs that aren't adopted

```js
const result = dogs.reduce((acc, item, index) => { return item.adopted ? acc : acc + item.age} , 0)
console.log(result)
```