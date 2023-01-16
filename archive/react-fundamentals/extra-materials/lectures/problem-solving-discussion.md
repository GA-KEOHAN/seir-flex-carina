---
track: "React Fundamentals"
title: "Problem Solving Discussion"
week: 2
day: 5
type: "lecture"
---



# Problem Solving, Unstumpability vs Infallibility, The Zeigarnik Effect and What would Sherlock Do?
![Problem Solving](https://media.git.generalassemb.ly/user/15881/files/d48e1500-71fc-11ea-884d-e304b93a1a6f)


# Beginning with The End in Mind

  1. Define what an algorithm is.
  1. Devise a plan to solve algorithms and code problems with high efficiency
  1. Compare and Contrast problem solving patterns
  1. Learn how to become Unstumpable instead of trying to be Infallible
  
 ## What is an Algorithm
   A process or set of steps to accomplish a certain task

## How do you become better at solving algorithms

   1. Create a Standard Operating Procedure (SOP) for solving problems
   1. Master common problem solving patterns
   
## Problem Solving SOP
  1. Read The Entire Problem
  1. Seek to Understand the problem
  1. Explore Concrete Examples
  1. Break it Down
  1. Enter the Solve/Simplify Loop
  1. Look Back and Refactor
  
 # Excercises
 
 ```javascript
// Write a function that accepts 3 numbers and returns their sum 
// Note: time and space complexity must be constant 
// sum(1,2,3) // returns 6

 ```
 
 ```javascript
// Write a function that takes in a string and returns the count of 
// each character in the string in an object
// Note: The time complexity can not exceed Linear Time, don’t 
// distinguish between lowercase and uppercase and don’t count spaces
// count(“Hello World”) 
// returns {h: 1, e: 1, l:3, o: 2, w: 1, r:1, d:1 }

 ```
 
 # Problem Solving Techniques
   1. requency Counter
   1. Multiple Pointers
   1. Sliding Window
   1. Divide and Conquer
   1. Dynamic Programming ( Research This )
   1. Greedy Algorithms ( Research This )
   1. Backtracking ( Research This )
   
 # Walk Though Examples
 
 ```javascript
 // Answers
 /*************
 Write a function called same, which accepts two arrays. 
 The function should return true if every value in
 the array has its corresponding value squared in
 the second array. 
 The frequency of values must be the same.
 **************/
function same(arr1, arr2){
    if(arr1.length !== arr2.length){
        return false;
    }
    for(let i = 0; i < arr1.length; i++){
        let correctIndex = arr2.indexOf(arr1[i] ** 2)
        if(correctIndex === -1) {
            return false;
        }
        arr2.splice(correctIndex,1)
    }
    return true
}

// O(N^2)

function same(arr1, arr2){
    if(arr1.length !== arr2.length){
        return false;
    }
    let frequencyCounter1 = {}
    let frequencyCounter2 = {}
    for(let val of arr1){
        frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1
    }
    for(let val of arr2){
        frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1        
    }
    for(let key in frequencyCounter1){
        if(!(key ** 2 in frequencyCounter2)){
            return false
        }
        if(frequencyCounter2[key ** 2] !== frequencyCounter1[key]){
            return false
        }
    }
    return true
}
// O(n)

same([1,2,3], [4,1,9]) // true
same([1,2,3], [1,9]) // false
same([1,2,1], [4,4,1]) // false (must be same frequency)

/********************
Write a function called sumZero which accepts a sorted array
of integers. The function should find the first pair where 
the sum is 0. Return an array that includes both values 
that sum to zero or undefined if a pair does not exist
*********************/

function sumZero(arr){
    for(let i = 0; i < arr.length; i++){
        for(let j = i+1; j < arr.length; j++){
            if(arr[i] + arr[j] === 0){
                return [arr[i], arr[j]];
            }
        }
    }
}

// Time O(N ^2)
// Space O(1)

function sumZero(arr){
    let left = 0;
    let right = arr.length - 1;
    while(left < right){
        let sum = arr[left] + arr[right];
        if(sum === 0){
            return [arr[left], arr[right]];
        } else if(sum > 0){
            right--;
        } else {
            left++;
        }
    }
}

// Time O(N)
// Space O(1)

sumZero([-3,-2,-1,0,1,2,3]) // [-3,3] 
sumZero([-2,0,1,3]) // undefined
sumZero([1,2,3]) // undefined

/******************
Write a function called maxSubarraySum which accepts an 
array of integers and a number called n. The function 
should calculate the maximum sum of n consecutive elements in the array.
*******************/
function maxSubarraySum(arr, num) {
  if ( num > arr.length){
    return null;
  }
  var max = -Infinity;
  for (let i = 0; i < arr.length - num + 1; i ++){
    temp = 0;
    for (let j = 0; j < num; j++){
      temp += arr[i + j];
    }
    if (temp > max) {
      max = temp;
    }
  }
  return max;
}
// Time O(N^2)


function maxSubarraySum(arr, num){
  let maxSum = 0;
  let tempSum = 0;
  if (arr.length < num) return null;
  for (let i = 0; i < num; i++) {
    maxSum += arr[i];
  }
  tempSum = maxSum;
  for (let i = num; i < arr.length; i++) {
    tempSum = tempSum - arr[i - num] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
}

// Time O(N)


maxSubarraySum([1,2,5,2,8,1,5],2) // 10
maxSubarraySum([1,2,5,2,8,1,5],4) // 17
maxSubarraySum([4,2,1,6],1) // 6
maxSubarraySum([4,2,1,6,2],4) // 13
maxSubarraySum([],4) // null

function search(arr, val){
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === val){
            return i;
        }
    }
    return -1;
}

// Time O(N)

/********************
Given a sorted array of integers, write a 
function called search, that accepts a value 
and returns the index where the value passed 
to the function is located. 
If the value is not found, return -1
*********************/

function search(array, val) {
 
    let min = 0;
    let max = array.length - 1;
 
    while (min <= max) {
        let middle = Math.floor((min + max) / 2);
        let currentElement = array[middle];
 
        if (array[middle] < val) {
            min = middle + 1;
        }
        else if (array[middle] > val) {
            max = middle - 1;
        }
        else {
            return middle;
        }
    }
 
    return -1;
}

// Time - Log(N) Binary Search



search([1,2,3,4,5,6],4) // 3
search([1,2,3,4,5,6],6) // 5
search([1,2,3,4,5,6],11) // -1

 ```

[__Link to Arthur's Power Point__](https://docs.google.com/presentation/d/e/2PACX-1vSLeu3cVsuD5mPT7sa2-V6RZawPzotlQii7G11WU-8nk1f3FVdU8280SSN2LarmoCJ-BC1sU8I16-ov/pub?start=false&loop=false&delayms=15000&slide=id.g309cdc03770413ba_7)


# Hungry for more
```
Implement a function called countUniqueValues, which accepts a sorted array, 
and counts the unique values in the array. 
There can be negative numbers in the array, 
but it will always be sorted use Multiple Pointers Approach

countUniqueValues([1,1,1,1,1,2]) // 2
countUniqueValues([1,2,3,4,4,4,7,7,12,12,13]) // 7
countUniqueValues([]) // 0
countUniqueValues([-2,-1,-1,0,1]) // 4

```

```
Given two strings, write a function to determine if the second 
string is an anagram of the first. 
An anagram is a word, phrase, or name formed by rearranging the letters of another, 
such as cinema, formed from iceman. Use a frequency counter

validAnagram('', '') // true
validAnagram('aaz', 'zza') // false
validAnagram('anagram', 'nagaram') // true
validAnagram("rat","car") // false) // false
validAnagram('awesome', 'awesom') // false
validAnagram('qwerty', 'qeywrt') // true
validAnagram('texttwisttime', 'timetwisttext') // true

```
# Still Hungry 

```
Refactor them in Ruby
```
