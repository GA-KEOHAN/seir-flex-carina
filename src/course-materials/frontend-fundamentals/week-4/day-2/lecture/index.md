---
track: "Frontend Fundamentals"
title: "Callback Functions"
week: 4
day: 2
type: "lecture"
---
# Callbacks

## What is a callback?

A callback is just a function that you pass in as a parameter to another function.  That second function will then do something and call that parameter function at some point.  Let's see some examples:

```javascript
setTimeout(
    ()=>{
        console.log('hi');
    },
    2000
);
```

```javascript
setInterval(
    ()=>{
        console.log('hi');
    },
    2000
)
```

```javascript
const iceCreams = ['Vanilla','Chocolate','Strawberry','Rocky Road'];
iceCreams.forEach(
    (currentElement)=>{
        console.log(currentElement);
    }
)
```

## What's going on behind the scenes

Let's examine a variable that is a function

```javascript
const henchman = ()=>{
    console.log("I'm the henchman");
}
console.log(henchman);
```

We can pass a function into another function

```javascript
const henchman = ()=>{
    console.log("I'm the henchman");
}
const mobboss = (employee)=>{
    console.log(employee);
}
mobboss(henchman);
```

Once we've done this, we can execute the function that is passed in as a parameter (called a callback)

```javascript
const henchman = ()=>{
    console.log("Right-o boss");
}
const mobboss = (employee)=>{
    console.log("Go set a restaurant on fire");
    employee();
}
mobboss(henchman);
```

This is good because it allows us to perform some functionality and then do something unique once that's complete:

```javascript
const thief = ()=>{
    console.log("I'm the thief");
}
const arsonist = ()=>{
    console.log("I'm the arsonist");
}
const mobboss = (employee)=>{
    console.log("Go do your specialty");
    employee();
}
mobboss(thief);
mobboss(arsonist);
```

If we want, we don't even need to assign the functions to variables

```javascript
const mobboss = (employee)=>{
    console.log("I'm the boss");
    employee();
}
mobboss(
    ()=>{
        console.log("I'm the thief");
    }
);
mobboss(
    ()=>{
        console.log("I'm the arsonist");
    }
);
```

We can reformat this:

```javascript
const badGuy = (action) => {
    console.log("I'm going to do something...");
    action();
    console.log("I'm done");
    console.log("");
}

badGuy(() => {
    console.log("Stealing a safe...");
});
badGuy(() => {
    console.log("Intimidating a local businessman");
});
```

This last form is very common.  For instance:

```javascript
setTimeout(()=>{
    console.log('hi');
}, 2000);
```

```javascript
setInterval(()=>{
    console.log('hi');
},2000)
```

Arrays have lots of helper functions that will do stuff for you so that you don't have to rely on a basic `for` loop all the time:

```javascript
const iceCreams = ['Vanilla','Chocolate','Strawberry','Rocky Road'];
iceCreams.forEach((currentElement)=>{
    console.log(currentElement);
});
```

```javascript
const iceCreams = ['Vanilla','Chocolate','Strawberry','Rocky Road'];
const updatedIceCreams = iceCreams.map((flavor)=>{
    return flavor + " Ice Cream";
});

console.log(updatedIceCreams);
```

There are lots of other array functions:

There are many others including:

- Every
- Filter
- Find
- Find Index
- Reduce
- Some
- Sort