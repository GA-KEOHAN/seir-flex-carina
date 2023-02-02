---
track: "Frontend Fundamentals"
title: "Objects Lab"
week: 2
day: 2
type: "lab"
---

[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Tamagotchi Challenge

## Prerequisites

- Understanding of how to define and access properties
- Understanding of how to define and invoke functions, including constructor functions

## Instructions

1.  Fulfill the listed requirements.

## Requirements
## Build a Tamagotchi

What is a tamagotchi? According to [wikipedia](https://en.wikipedia.org/wiki/Tamagotchi), the name is a portmanteau combining the Japanese word tamago (たまご), which means "egg", and the English word "watch". Most Tamagotchi characters' names end in tchi (っち) in Japanese, with few exceptions.

A tamagotchi has a few properties:
```js
/*
- name
- weight
- age
- birthday
- description
- hungerLevel
- happinessLevel
- attentionLevel
- lifeStage // Baby, Child, Teen, and Adult
/*
```

A few states:
```js
/*
- isHungry
- wantsToPlay
- isHappy
- needsAttention
*/
```

And a few behaviors:
```js
eat() {
/* feeding should satisfy hunger, depending on what you feed it, and may increase weight
 grass, meat, tofu, bread, candy, etc…
*/
}

speak() {
 /* what needs does your tamagotchi have? */
}

play() {
 /* playing with your tamagotchi should increase happiness, satisfy need for attention, and may decrease weight */
}
```

Usage:
```js
tamagotchi.age // 0
tamagotchi.birthday // today's date
tamagotchi.weight // 1 
tamagotchi.description // 'A <lifeStage> tamagotchi named <name> born on <birthday> weighing <weight>'
tamagotchi.speak() // 'Mesutchi is <some state>'
```

## Bonus:
Continue to implement a real tamagotchi, adding the following properties and methods:

Properties:
```js
/*
- disciplineLevel
- isDisciplined
- needsBathroom
- itPottyTrained
- isSick
- sleeping
*/
```

Methods:
```js

sleep()

wake()

scold() {
 /* fills discipline level, reduces happiness level */
}

useBathroom()

view() {
 /* displays image of the tamagotchi */
}

```

What else can your tamagotchi do?

## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
1.  All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
