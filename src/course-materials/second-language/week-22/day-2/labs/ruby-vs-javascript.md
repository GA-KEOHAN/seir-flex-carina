---
track: "Second Language"
title: "Ruby vs. Javascript - The Differences"
week: 1
day: 1
type: "lab"
---


# Ruby vs. Javascript - The Differences

Let's take a look at the differences between Ruby and Javascript

<br>
<br>
<br>

## Getting Started

1. Create a [Ruby repl.it](https://repl.it/@DanielScott2/Ruby-vs-JavaScript) and name it Ruby vs JavaScript

<br>
<br>
<br>


## The Functions

### Get Name


Write a method that accepts a name from the user and then returns it. Here's the javascript:

```javascript
const getName = () => {
  let name = prompt("what is your name?");
  return name;
};
```


<br>
<br>
<br>


### Reverse It

Write a method that reverses a string. Here's the javascript:

```javascript
const reverseIt = () => {
  let string = "a man, a plan, a canal, frenemies!";

  let reverse = "";

  for (let i=0; i < string.length; i++) {
    reverse += string[string.length - (i+1)];
  };

  alert(reverse);
};
```


<br>
<br>
<br>


### Swap Em

Write a method that swaps the values of two variables around. Here's the javascript:

```javascript
const swapEm = () => {
  let a = 10;
  let b = 30;
  let temp;

  temp = b;
  b = a;
  a = temp;

  alert("a is now " + a + ", and b is now " + b);
};
```


<br>
<br>
<br>


### Multiply Array

Write a method that multiplies all numbers in a given array and returns the final product. Here's the javascript:

```javascript
const multiplyArray = (ary) => {
  if (ary.length == 0) { return 1; };

  let total = 1;
  // let total = ary[0];

  for (let i=0; i < ary.length; i++) {
    total = total * ary[i];
  };

  return total;
};
```


<br>
<br>
<br>


### Fizz Buzzer

Write a method that takes a number argument and returns "fizz" if the number is divisible by three, "buzz" if the number is divisible by five, and "fizzbuzz" if it's divisible by both. Here's the javascript:

```javascript
const fizzbuzzer = (x) => {
  if( x%(3*5) == 0 ) {
    return 'fizzbuzz'
  } else if( x%3 == 0 ) {
    return 'fizz'
  } else if ( x%5 == 0 ) {
    return 'buzz'
  } else {
    return 'archer'
  }
}
```


<br>
<br>
<br>

### Nth Fibonacci

Write a method that finds the fibonacci number at the nth position and returns it. Here is the javascript:

```javascript
const nthFibonacciNumber = () => {
  let fibs = [1, 1];
  let num = prompt("which fibonacci number do you want?");

  while (fibs.length < parseInt(num)) {
    let length = fibs.length;
    let nextFib = fibs[length - 2] + fibs[length - 1];
    fibs.push(nextFib);
  }

  alert(fibs[fibs.length - 1] + " is the fibonacci number at position " + num);
};
```

<br>
<br>
<br>



### Search Array

Write a method that searches through an array for a value and returns true or false depending on whether or not the value is present in the array. Here is the javascript:

```javascript
const searchArray = (array, value) => {
  for(let i = 0; i < array.length-1; i++) {
    if(array[i] == value) {
      return true;
      break;
    }
  }
  return -1;
};

```

<br>
<br>
<br>


### Palindrome

Write a method that checks whether or not a string is a palindrome. Here is the javascript:

```javascript
const isPalindrome = (str) => {
  for(let i = 0; i < str.length/2; i++){
    if(str[i] != str[str.length-i-1]){
      return false;
      break;
    }
  }
  return true;
};
```

<br>
<br>
<br>


### hasDupes

Write a method that checks whether or not an array has any duplicates. Here is the javascript:

```javascript
const hasDupes = (arr) => {
  let obj = {};
  for (i = 0; i < arr.length; i++) {
    if(obj[arr[i]]) {
      return true;
    }
    else {
      obj[arr[i]] = true;
    }
  }
  return false;
};
```


<br>
<br>
<br>
<br>


## Hungry for More?

1. If you haven't already, sign up for [Code Wars](https://www.codewars.com/) and try out some Ruby code challenges! Find a good one? Share it in slack!

