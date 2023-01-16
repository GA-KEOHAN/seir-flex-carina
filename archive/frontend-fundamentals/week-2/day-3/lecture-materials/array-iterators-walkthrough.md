---
track: "Frontend Fundamentals"
title: "Walk-Thru of Array Iterator Methods"
week: 2
day: 3
type: "lecture"
---

# Walk-Thru of Array Iterator Methods

<br>
<br>
<br>
<br>


## Intro

JavaScript Arrays have lots of helpful built-in methods.

These methods allow you to write more **declarative/functional** code as opposed to **imperative** code.

<br>
<br>
<br>




#### Imperative Programming

Imperative programming is a more step-by-step way of writing code.

`for` loops, for example, are imperative: 

```javascript
for (let index = 0; index < array.length; index++) {
    // do stuff
}
```

With a `for` loop we're saying:

1. Initialize a looping variable
2. Use the looping variable to access an element in the array
3. Increment the looping variable
4. If the looping variable is less than the length of the array, loop again


<br>
<br>
<br>




#### Declarative Programming

In declarative programming, we write code that describes what we want to do:

```javascript
array.forEach(function(val) {
    // do stuff
});
```

*How* are we iterating? Don't need to worry about that.


<br>
<br>
<br>




#### Trends in Development

Current trends in development are pushing toward using declarative code over imperative code when possible.

This walk-thru summarizes Array _iterator_ methods, that is, methods that declaratively iterate over an array's elements.


<br>
<br>
<br>




## Method Summary

| Method | Purpose | Returns | Callback Should | Callback's Args |
| --- | --- | :-: | --- | --- |
| `forEach(cb)` | General purpose |`undefined` | Do whatever you want | `(elem, idx, array)` | 
| `map(cb)` | Transform a source array into a new array | new array | Modify each element as desired and return it | `(elem, idx, array)` | 
| `reduce(cb, initAcc)` | Reduce the array to a single value/object | final value of `acc` | Return the new value for `acc` | `(acc, elem, idx, array)` | 
| `filter(cb)` | Filter source array | new array | Return truthy if `elem` is to be included | `(elem, idx, array)` | 
| `find(cb)` | Find an element | the first `elem` found | Return truthy if `elem` is what you're looking for | `(elem, idx, array)` |
| `findIndex(cb)` | Find a certain element's **index** | the index of the first `elem` found | Return truthy if `elem` is what you're looking for | `(elem, idx, array)` |
| `some(cb)` | Check if array has something | `true` or `false` | Return truthy if `elem` is what you're checking for | `(elem, idx, array)` |
| `every(cb)` | Check if every `elem` passes condition | `true` or `false` | Return truthy if `elem` is what you're checking for | `(elem, idx, array)` |


Note that each of the methods invoke a callback function for each iteration - _usually_ once for each element, however, the following methods will "short circuit" and stop iterating once their purpose has been fulfilled:

- `find`
- `findIndex`
- `some`
- `every` (stops iterating when a falsey value is returned)

> **VOCAB:** Note that the `filter`, `find`, `findIndex`, `some` and `every` iterator methods rely on the truthy-ness or falsey-ness returned by the callback function. Such a function, written to return true/false values, is called a **predicate**. 

Notice that all of the iterator methods, except `reduce`, have identical signatures, that is, they all accept a single argument - a callback function.

Additionally, the signature of the callback functions are all the same as well!

This fact makes it easier to remember the syntax of these important methods, with the `reduce` method being the only one that varies slightly.

<br>
<br>
<br>



## Code Examples



### `forEach`

**PURPOSE:** General purpose iterator method.

```javascript
const friends = ["Melissa", "Marc", "Andrew", "Nick"];

friends.forEach(function(friend) {
  console.log(`I have a friend named ${friend}`);
});

// logs out "I have a friend named <friend's name>" for each friend
```

<br>
<br>




#### YOU DO

Using `forEach` log out each of my `friends` but with the first letter of their name lower-cased. Use the `<str>.toLowerCase()` method. 

```javascript
"Cats".toLowerCase(); //=> cats
``` 



<br>
<br>





### `map`

**PURPOSE:** Create a new array from a source array, usually "transforming" its values.

The returned array is always the same length as the source array.

#### Transform an array

```javascript
const nums = [1, 2, 3];
const squared = nums.map(function(num) {
  return num * num;
});

// squared --> [1, 4, 9]

/*--- using an arrow function for the callback ---*/
const squared = nums.map(num => num * num);
```

#### When we say transform, we mean transform!

```javascript
const people = [
  {name: 'Fred', town: 'Bedrock'},
  {name: 'Susan', town: 'Miami'},
  {name: 'John', town: 'Arcadia'}
];

const els = people.map(function(person, idx) {
  const el = document.createElement('div');
  el.innerHTML = `${person.name} <span>(${person.town})</span>`;
  return el;
});

// Log out the <div>s
console.log(els);

/*--- using an arrow function for the callback ---*/
const types = Object.keys(obj).map(elem => typeof elem);
```

<br>
<br>



#### YOU DO

Given an array of instructors,

```javascript
const instructors = ["Alex", "Ben", "Daniel", "Morgan", "Micah", "Jims"];
```

Use `map` to create a new array that adds the string " is awesome" to each element in the array.

```javascript
["Alex is awesome", "Ben is awesome", "Daniel is awesome", "Morgan is awesome", "Micah is awesome", "Jims is awesome"]
```


<br>
<br>
<br>




### `reduce`

**PURPOSE:** Reduce an array into a single value.  Note that the "single value" can be a single object, array - anything.

#### Sum up the numbers in an array

```javascript
const nums = [25, 6, 100, 3];
let sum = nums.reduce(function(acc, num) {
  return acc + num;
}, 0);

// sum equals 134

/*--- using an arrow function for the callback ---*/
let sum = nums.reduce((acc, num) => acc + num);
```

#### Count votes

```javascript
const votes = ['Yes', 'No', 'No', 'Yes', 'Yes'];
let tally = votes.reduce(function(acc, vote) {
  acc[vote] = acc[vote] ? acc[vote] + 1 : 1;
  return acc;
}, {});

// tally is {"No": 2, "Yes": 3}

/*--- using an arrow function for the callback (not as valuable when we can't use an implicit return) ---*/
let tally = votes.reduce((acc, vote) => {
  acc[vote] = acc[vote] ? acc[vote] + 1 : 1;
  return acc;
}, {});
```



<br>
<br>
<br>



### `filter`

**PURPOSE:** Select certain elements from a source array.

#### Obtain just the odd numbers

```javascript
const nums = [100, 2, 5, 42, 99];
const odds = nums.filter(function(num) {
  return num % 2;
});

console.log(odds);

/*--- using an arrow function for the callback ---*/
const odds = nums.filter(num => num % 2);
```

#### YOU DO

Filter out all "jerks"!

```javascript
const people = ["jerks", "nice people", "jerks", "nice people", "nice people"];
```

<br>
<br>


### `find`

**PURPOSE:** Find an element within an array.

#### Find certain car objects

```javascript
const cars = [
  {color: 'red', make: 'BMW', year: 2001},
  {color: 'white', make: 'Toyota', year: 2013},
  {color: 'blue', make: 'Ford', year: 2014},
  {color: 'white', make: 'Tesla', year: 2016}
];

let firstWhiteCar = cars.find(function(car) {
  return car.color === 'white';
});
// firstWhiteCar is {color: 'white', make: 'Toyota', year: 2013}

let missingCar = cars.find(function(car) {
  return car.color === 'black';
});
// missingCar = undefined

/*--- using an arrow function for the callback ---*/
let firstWhiteCar = cars.find(car => car.color === 'white');
```

<br>
<br>
<br>



#### YOU DO

Find the first car whose year is older than 2014 and assign it to a variable named `notTooOldCar`;


<br>
<br>




### `findIndex`

**PURPOSE:** Like `find` above, but returns the found element's index. Note that this is usually used to find the index of an object, or one of its built-in variations (Array, Date, Regular Expression, Error) within the array. If trying to find the index of a primitive type, use `indexOf` instead.

<br>
<br>




#### Find the index of the first match

```javascript
const cars = [
  {color: 'red', make: 'BMW', year: 2001},
  {color: 'white', make: 'Toyota', year: 2013},
  {color: 'blue', make: 'Ford', year: 2014},
  {color: 'white', make: 'Tesla', year: 2016}
];

let firstWhiteCarIdx = cars.findIndex(function(car) {           
  return car.color === 'white';
});
// firstWhiteCarIdx equals 1

let missingCarIdx = cars.findIndex(function(car) {
  return car.color === 'black';
});
// missingCarIdx = -1

/*--- using an arrow function for the callback ---*/
let firstWhiteCarIdx = cars.findIndex(car => car.color === 'white');
```

<br>
<br>




### `some`

**PURPOSE:** Check if array has at least one element that meets a certain condition.

Henry would be proud...

```javascript
const cars = [
  {color: 'red', make: 'BMW', year: 2001},
  {color: 'white', make: 'Toyota', year: 2013},
  {color: 'blue', make: 'Ford', year: 2014},
  {color: 'white', make: 'Tesla', year: 2016}
];

let hasFord = cars.some(function(car) {
  return car.make === 'Ford';
});
// hasFord is true

/*--- using an arrow function for the callback ---*/
let hasFord = cars.some(car => car.make === 'Ford');
```

<br>
<br>



#### YOU DO

Do I have an _evil monkey_ in my room? 

```javascript
const myRoom = ["evil monkey", "bed", "lamp"];
let isEvilMonkeyInRoom = /* Fill code in here */
```

<br>
<br>




### `every`

**PURPOSE:** Check if **every** element in the array meets a certain condition.


<br>
<br>




#### Are all cars blue?

```javascript
const cars = [
  {color: 'red', make: 'BMW', year: 2001},
  {color: 'white', make: 'Toyota', year: 2013},
  {color: 'blue', make: 'Ford', year: 2014},
  {color: 'white', make: 'Tesla', year: 2016}
];

let everyCarIsBlue = cars.every(function(car) {
  return car.color === 'blue';
});

// everyCarIsBlue is false

/*--- using an arrow function for the callback ---*/
let everyCarIsBlue = cars.every(car => car.color === 'blue');
```

<br>
<br>



## Reference

[Array Reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)