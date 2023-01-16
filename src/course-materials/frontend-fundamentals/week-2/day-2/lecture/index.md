---
track: "Frontend Fundamentals"
title: "Intro to Objects"
week: 2
day: 2
type: "lecture"
---

# Objects
### by Alex Merced

So we have previously got over Arrays and how arrays are good at handling lists of data, like a list of friends. How about data that isn't a list of things but a description of a single thing, this is probably better suited for objects, Javascripts other big collection for data.

An object doesn't store data in sequential indexs but instead using strings referred to as "keys", and each key is related to a particular "value". So objects are collections of key/value pairs.

## Building an Evil Robot Army

![Robot Empire](https://media.blendernation.com/wp-content/uploads/2020/07/emperorThumbnail.jpg)

Let's build an evil army of robots, but before we can build the army we need to build a single robot. Let's create a robot object.

```js
const robot = {
  name: "BleepBlop",
};

console.log(robot);
```

We're now create a single robot, a new object is represented by a set of curly brackets ("{}"), and inside the curly brackets are the keys (name) and the values ("BleepBlop"). We can add as many properties as we want and they can be of any datatype we want which is a nice level of flexibility not always available in other languages.

```js
const robot = {
  name: "BleepBlop",
  serial: 1,
  isEvil: false,
};

console.log(robot);
```

You can also create keys with spaces or based on variables but it requires you to define your keys using bracket notation.

```js
const key = "weapon";

const robot = {
  name: "BleepBlop",
  serial: 1,
  isEvil: false,
  ["Gas Tank"]: "Full",
  [key]: "Lazers",
};

console.log(robot);
```

## Accessing Properties

What if I wanted to access the individual properties of our robot, if the key has no spaces we can use dot notation, and if it does or we are dynamically calling it then we need to use square brackets.

```js
const key = "weapon";

const robot = {
  name: "BleepBlop",
  serial: 1,
  isEvil: false,
  ["Gas Tank"]: "Full",
  [key]: "Lazers",
};

console.log(robot.name);
console.log(robot["Gas Tank"]);
console.log(robot.weapon);
```

## Giving the Robot Powers

Our objects can not only have properties that describe their current state, but they can have methods (functions) that allow them to take certain actions. There are three ways to add functions to an object.

```js
//method 1 - Using Arror Function, can't use this keyword

const obj = {
  prop: "hello world",
  myFunc: () => {
    console.log(`can I use this?... ${this.prop}`);
  },
};

obj.myFunc();

//method 2 - Function keyword syntax, can use this keyword

const obj2 = {
  prop: "hello world",
  myFunc: function () {
    console.log(`can I use this?... ${this.prop}`);
  },
};

obj2.myFunc();


//method 3 - class syntax, can use this keyword, same as adding methods to classes later

const obj3 = {
  prop: "hello world",
  myFunc(){
    console.log(`can I use this?... ${this.prop}`);
  },
};

obj3.myFunc();
```

Both of these work fine, just depends whether the function needs to refer to itself via the this keyword or not. Typically arrow function syntax has become standard convention, but in order to use this in your function (this refers to the object itself) you need the function keyword.

\*note: Arrow functions were added to Javascript in ES6 as traditional functions had a strange relationship with the this keyword that caused confusion in particular with triggering event from things like buttons. Arrow function helped clear this up, but traditional syntax is still the only way to use the this keyword if needed.

So let's add some methods/functions to our robot.

```js
const key = "weapon";

const robot = {
  name: "BleepBlop",
  serial: 1,
  isEvil: false,
  ["Gas Tank"]: "Full",
  [key]: "Lazers",
  speak: () => {
    console.log("EXTERRRRMINATE!!!");
  },
  attack: function () {
    console.log(`${this.name} attacks with its ${this.weapon}`);
  },
};

robot.speak();
robot.attack();
```

## Creating a Robot Factory

We don't want just one robot but an ARMY of robots, so let's create an RobotEmpire object that has a method that allows us to build a new robot and track those robots in an array.

```js
const RobotEmpire = {
    // Army array holds all the robots created
    army: [],
    // The RobotEmpires build method creates a new robot and adds it to the army array
    build: function(){
        // create a new robot
        const newRobot = {
                name: `Robot Soldier ${this.army.length}`,
                serial: this.army.length,
                weapon: "Lazers",
                attack: function(){
                console.log(`${this.name} attacks with its ${this.weapon}`)
                    }
                }
        // push the newly created robot into the army array
        this.army.push(newRobot)
        }
}

RobotEmpire.build()
console.log(RobotEmpire.army)

```

*note: this pattern of having an object that creates other object is also knownn as the Factory Design Pattern.*

## Build our army and attack the humans!!! (exercise)

Take 5 minutes and try to do the following with our RobotEmpire object

- use loops to generate 100 Robot Soldiers
- use a for of loop to loop through the Robot Army, if their serial is even have them attack

## Dismantling Robots (destructuring objects)

The robot wars are over and the humans are now dismantling the robots to reuse their parts for other things... like rebuilding.

We can breakdown our objects into separate variables the hard way like so...

```js

const brokenRobot = {
    part1: "arm",
    part2: "lazer",
    part3: "wheels"
}

const part1 = brokenRobot.part1
const part2 = brokenRobot.part2
const part3 = brokenRobot.part3

console.log(part1, part2, part3)

```

For very large objects this can be tedious and code looks bulky, destructuring like with arrays makes this a LOT easier.

```js

const brokenRobot = {
    part1: "arm",
    part2: "lazer",
    part3: "wheels"
}

const {part1, part2, part3} = brokenRobot

console.log(part1, part2, part3)

```

In the above surrounding the variable names with curly brackets tells javascript that it should expect a object on the other side and it will search for keys in that object in that match the variable names and assign the value of that key to the variable. Like arrays, if you want to store remaining properties in a separate object you can use the rest operator.

```js

const brokenRobot = {
    part1: "arm",
    part2: "lazer",
    part3: "wheels"
}

const {part1, ...theRest} = brokenRobot

console.log(part1, theRest)

```

## More Resources

- More on Javascript Objects
https://www.youtube.com/watch?v=6Ytou94vP9g

- Using Objects like Switch
https://www.youtube.com/watch?v=UY84rcvOINo

- Javascript OOP
https://www.youtube.com/watch?v=IxbDwmNwnFQ

- More Javascript OOP
https://www.youtube.com/watch?v=pM3T30GE1NI&list=PLY6oTPmKnKbagncvwQeIvSmHlirSGNCUO

- About Javascript Prototypes
https://www.youtube.com/watch?v=O_lyavc0lJc
