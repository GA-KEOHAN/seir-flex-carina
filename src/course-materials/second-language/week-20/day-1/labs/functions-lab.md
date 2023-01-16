![GA Logo](https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/General_Assembly_logo.svg/1280px-General_Assembly_logo.svg.png)

# New Language Lab

Take the following functions written in Javascript and re-write them in your new language. Feel free to google how to do certain things in the new language. 

### 1. Reverse String

```js

function reverseString(str){
    return str.split("").reverse().join("")
}

console.log(reverseString("Hello World")) // "dlroW olleH"

```

### 2. Fizz Buzz

```js

function fizzBuzz(num){
    for (let index = 0; index < num; num++){
        
        let result = ""

        if (index % 3 === 0){
            result = result + "fizz"
        }

        if (index % 5 === 0){
            result = result + "buzz"
        }

        console.log(`${index} = `, result)
    }
}

fizzBuzz(16)
// 0 = "fizz buzz"
// 1 = ""
// 2 = ""
// 3 = "fizz"
// 4 = ""
// 5 = "buzz"
// 6 = "fizz"
// 7 = ""
// 8 = ""
// 9 = "fizz"
// 10 = "buzz"
// 11 = ""
// 12 = "fizz"
// 13 = ""
// 14 = ""
// 15 = "fizzbuzz"
```

### 3. Calculator

```js

function calculator(num1, num2, operation){
    if (operations = "+"){
        return num1 + num2
    }
    if (operations = "-"){
        return num1 - num2
    }
    if (operations = "*"){
        return num1 * num2
    }
    if (operations = "/"){
        return num2 !== 0 ? num1/num2 : "Can't Divide by 0"
    }
}

calculator(2,2,"+") //4
```

### 4. randomNumber

```js

function randomNumber(low, max){
    while (true){
        const randomNum = Math.floor(Math.random() * max)

        if(randomNum >= low && randomNum <= max){
            return randomNum
        }
    }
}

console.log(randomNumber(10,20)) //random number between 10 and 20

```

### 5. Map

```js

const map = (arr, callback) => {

    const newArray = [];

    for (let index = 0; index < arr.length; index++){
        newArray.push(callback(arr[index], index))
    }
    return newArray
}

console.log(map([1,2,3,4], (item, index) => item + 1)) // [2,3,4,5]

```

### 6. filter 

```js

const filter = (arr, callback) => {

    const newArray = []

    for(let index = 0; index < arr.length; index++){
        if (callback(arr[index], index)){
            newArray.push(arr[index])
        }
    }
    return newArray
}

console.log(filter([1,2,3,4,5], (item, index) => item % 2 === 0)) //[2,4]

```

### 7. makePerson

```js
const makePerson = (name, age) => {
    return {
        name: name,
        age: age
    }
}

console.log(makePerson("Alex", 35)) //{ name: "Alex", age: "35" }
```