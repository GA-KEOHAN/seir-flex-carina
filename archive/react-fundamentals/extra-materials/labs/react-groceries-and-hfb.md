---
track: "React Fundamentals"
title: "React Groceries & HFB"
week: 1
day: 1
type: "lab"
---


# React Groceries & HFB 

Build an app that let's you make a list of groceries to buy

#### Learning Objectives

- Practice setting up a React app
- Practice Mocking a React app
- Practice using state
- Practice rendering a list
- Practice conditional rendering


#### Prerequisites

- Introduction to React static components, mocking, state, rendering

---

## Getting Started

1. In tonight's HW directory, run `lets-code` and name your app `react-groceries`
2. `cd react_groceries`
4. `npm run dev` to start your server
5. `git add -A` and `git commit -m "initial commit"`


## Deliverables

- A grocery app that allows users to make a grocery list. Remember to `git add` and `git commit` every time you get a part of the app working!
- Your forked Happy Fun Ball Repo demonstrating a knowledge of git branching and merging. 

## Technical Requirements
1. Read over these specs and draw a mockup of your app (don't worry about bonus features at this point)
1. Must have grocery items in this shape

```js
{
  item: '',
  brand: '',
  units: '',
  quantity: 0,
  isPurchased: false
}
```

1. Make an array of 3 objects using the above shape and render the item, quantity and units (12 pack, 1lb, 2 liters, etc.)
1. Make inputs so that new items can be added
1. Conditionally render the grocery items based on whether or not they were purchased (ok to have hard coded values for isPurchased)
1. Add some style to your app
1. **Stretch Goal:** Add a button that says 'remove' and when clicked the value of `isPurchased` is toggled

## Submission Guidelines

- React Groceries and Happy Fun Ball Must be submitted no later than before the start of next class.
- Your app must run without syntax errors

## Hungry for more
- Make multiple grocery lists (one for each family member) and have them update independently
- sort your list alphabetically
- create other ways to sort your data (ie by quantity)
- change the 'remove' button's functionality to atually remove the item from the list
- add a 'later' button that toggles the css (gray text, strikeout etc.) if the item should be purchased later
- expand your app to allow for images (the images should be an http url ) and then render the image in your app - some images may take longer to load and not appear correctly, look into react life cycle events and/or lazy loading (if that is too much just keep trying images, some will work and save lifecycles/lazy loading for later)

