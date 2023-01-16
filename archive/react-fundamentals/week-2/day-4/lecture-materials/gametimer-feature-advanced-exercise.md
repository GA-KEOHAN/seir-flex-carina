---
track: "React Fundamentals"
title: "Advanced Exercise: Game Timer Feature "
week: 2
day: 4
type: "lecture"
---

# Advanced Exercise: Game Timer Feature 


<br>
<br>
<br>
<br>


## Roadmap

- Set Up
- What we're building?
- Building the React App's Production Code
- Code the Express App
- Deployment
- Essential Questions

<br>
<br>
<br>



## Set Up

The starter code is the React Mastermind app from the completed React Router Lab.

- Download the <a href="/downloads/react_fundamentals/gametimer-feature/react-mastermind.zip" download>Starter Code</a>
- Extract the folder from the `.zip` file and `cd` into it
- Install the Node modules: `$ npm i`
- Open the code in VS Code: `$ code .`
- Start the dev server: `$ npm start`

<br>
<br>
<br>

Once you run the React Dev Server, you should see the following Screen:

<img src="https://i.imgur.com/IaeY5P6.png" alt="screenshot">

<br>
<br>
<br>

You'll also notice we have a functional Difficulty Screen as Well:

<img src="https://i.imgur.com/cTzH576.png" alt="screenshot">


## What are we building?

This resource is meant to provide students with more practice working with React concepts such as state, props, hooks and components by adding an additional feature to the game ... a functional Game Timer. 

<br>
<br>
<br>


### Here's our User Story:

**(AAU)** *"As a User, I should be able to see a ticking timer when the app loads to keep track of how long it takes me to crack the secret code."*


<br>
<br>
<br>

### Considerations before getting started - how do we Integrate this Feature?

So, before implementing this new feature we need to make some consideration as to how we should approach it.

**In the context of implementing a game timer, we need to ask ourselves questions like:**

- How will we represent time in our application?
- Should we store the value of time in state?
- Should we create a seperate piece of state to store time or should we combine it with existing state?
- What should we name this piece of state? ... "`elapsedTime`"?
- How should we increment `elapsedTime`?
- How often or *(by which interval)* should we update `elapsedTime` every ... millisecond? ... second? ... minute?
- What type of data should we use to represent elapsed time ... a string? ... a number?
- Should we consider if we might want to start/stop the timer? 
- How do we toggle a timer from **"timing"** to **"not timing"**?
- Should we store an additional piece of state to represent whether or not the timer is timing?
- What should we name that piece of state? ... `isTiming`?
- What type of data should we use to represent `isTiming`? ... a string? a boolean?

<br>
<br>
<br>

**What did we come up with?**

After all considerations made, the approach we decided to take is as follows:

**Step 1:** We're going to add two additional pieces of state, to our existing `gameState` object inside of `App.js`.
  
 1. **`elapsedTime`** - *What we'll use to keep track of total time elapsed as a `Number` in seconds.*
 1. **`isTiming`** - *What we'll use to represent whether or not the timer is timing as a `Boolean`.*


**Why are we adding these two properties to existing state?**

*This choice was made because the game timer is part of a game instance ... in other words, the timer is part of the game, so it only makes sense to manage with the other game-related pieces of state.*

<br>

So, this is what our `gameState` object should be initialized to:

```javascript
{
    guesses: [getNewGuess()],
    code: genCode(numColors),
    difficulty,
    elapsedTime: 0,
    isTiming: true
}
```

<br>
<br>


**Step 2:** We'll create a helper function called `handleTimerUpdate` responsible for invoking our `setGameState` setter function and updating existing state with new state with the `elapsedTime` value incremented by one second.

**Step 3:** We'll pass the `handleTimerUpdate` helper function, `elapsedTime` and `isTiming` to our `<GameTimer>` component so we can visualize changes to that data there.

**Step 4:** We'll also need to build a custom time formatter function to convert total seconds from our `elapsedTime` prop to minutes and seconds.

**Step 5:** This is where we set up the logic of the `<GameTimer>` component. We'll use a `useEffect` hook to initialize a timer object instance created by `setInterval`. This method will be used to repeatedly call our timer update function on a fixed delay [as described here](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval). We'll also use the `useEffect` hook to perform a clean up of our `interval` object whenever the component is unmounted from the DOM to prevent causing a memory leak ... more on this later.




<br>
<br>
<br>

## Step 1: Add our new pieces of state:

Alright let's go ahead and update our `getInitialState` function to also initialize the two pieces of state we need for our game timer:

```javascript
// inside the App function Component inside App.js

 function getInitialState(numColors = 4, difficulty = 'Easy') {
    return {
      guesses: [getNewGuess()],
      code: genCode(numColors),
      difficulty,
      elapsedTime: 0,
      isTiming: true
    };
  }
```

<br>
<br>
<br>


## Step 2: Create our helper function for updating state

For this step we need to write a function we can use to update only the `elapsedTime` property of our `gameState`.

As we remember, the setter function we get from our `useState` hook **replaces** existing state with new state, so let's see how we can address this.

```javascript
// inside the App function Component inside App.js
    function handleTimerUpdate() {
      // the useState gives us an alternate pattern for setting state using previous state
      // with this syntax we pass a callback into the setter function
      setGameState(prevGameState => ({
      // ... which will receive previous state as it's argument
        ...prevGameState,
        // we can then unpack previous state with the spread syntax and just update only what we need
        elapsedTime: prevGameState.elapsedTime + 1
        // in this case, only elapsed time gets updated
      }))
    }
```
<br>
<br>
<br>

Interesting huh? This syntax and behavior it produces [is well documented here](https://reactjs.org/docs/hooks-reference.html#usestate) in the ReactJS docs.

So, basically what's happening is that we're using the `useState` setter function like we have before only this time we're passing in a callback function instead of the new state.

There's a lot of power in this new pattern as it allows us to access previous state, so we can only worry about updating the values we too and leave the rest intact.

This is important because the `useState` setter function replaces state with whatever we pass to it, so without this nifty callback pattern, we would have needed to make a copy the entire state object first, update the properties we need to and then pass the new object into the setter function when we invoke it.


<br>
<br>
<br>

## Step 3: Pass our props!

Here's one of the easier parts, lets pass our data: `elapsedTime`, `isTiming` and `handleTimerUpdate` as props to our `<GameTimer>` component.

<br>


**To do this, we'll need to first pass these props through our `<GamePage>` component:**

```jsx
// inside App.js
  <GamePage
    winTries={winTries}
    colors={colors[gameState.difficulty]}
    selColorIdx={selColorIdx}
    guesses={gameState.guesses}
    setColorIdx={setColorIdx}
    handleNewGameClick={handleNewGameClick}
    handlePegClick={handlePegClick}
    handleScoreClick={handleScoreClick}
    {/* new stuff below 👇 */}
    handleTimerUpdate={handleTimerUpdate} 
    elapsedTime={gameState.elapsedTime}
    isTiming={gameState.isTiming}
  />
```

<br>
<br>
<br>


**Next, we'll drill those props down to our `<GameTimer>` component:**

```jsx
// inside`GamePage.js` 
<GameTimer 
  elapsedTime={props.elapsedTime}
  isTiming={props.isTiming}
  handleTimerUpdate={props.handleTimerUpdate}
/>
```

<br>
<br>
<br>


## Step 4: GameTimer Component Set up and Logic

Now it's time to program our GameTimer component to perform it's tasks!

<br>
<br>
<br>

**This is what our `<GameTimer>` component should look like right now:**

```jsx
import styles from './GameTimer.module.css';

const GameTimer = (props) => (
  <div className={styles.GameTimer}>
    00:00
  </div>
);

export default GameTimer;
```

<br>
<br>
<br>

**The first thing we'll do is replace the hard-coded timer with the actual `elapsedTime` prop we passed down from `App.js`.**

```jsx
import styles from './GameTimer.module.css';

const GameTimer = (props) => (
  <div className={styles.GameTimer}>
    {props.elapsedTime}
  </div>
);

export default GameTimer;

```

<br>
<br>
<br>


**We should notice immediately that now our timer looks like this...**

<img src="https://i.imgur.com/hOlYkVs.png" alt="screenshot" />

<br>
<br>
<br>

To replace this value with the value that looks like an actual timer, we'll need to write a helper function that formats the `elapsedTime` value; we'll take care of this next.


<br>
<br>
<br>



## Step 4: Write a helper function for formatting time

For this next step, we need to create a special helper function for taking seconds as an argument, and then converting total seconds into minutes and seconds.

```javascript
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}
```
<br>
<br>

To better organize our code, we're going to export this function from a service module we'll use to define special utility functions for tasks like this.

<br>
<br>

**Let's create a directory inside of `src` called `services`:**

```bash
mkdir src/services
```

<br>
<br>

**Then, inside of `services/` we'll create a file called `utilities.js`:**

```bash
touch src/services/utilities.js
```

<br>
<br>

**Now, let's export the formatter function from `utilities.js`**

```javascript
// inside of utilties.js

export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}
```


<br>
<br>

**Next, let's import this function inside of `GameTimer.js`**

```jsx
import styles from './GameTimer.module.css';
import { formatTime } from '../../services/utilities';

const GameTimer = (props) => (
  <div className={styles.GameTimer}>
    {props.elapsedTime}
  </div>
);

export default GameTimer;
```

<br>
<br>

**Now, all we have to do is call the function in place of where we're rendering out `{props.elapsedTime}`, passing in the value `props.elapsedTime` as an argument.**

```jsx
import styles from './GameTimer.module.css';
import { formatTime } from '../../services/utilities';

const GameTimer = (props) => (
  <div className={styles.GameTimer}>
    {formatTime(props.elapsedTime)}
  </div>
);

export default GameTimer;

```


<br>
<br>
<br>

**Awesome! We should have what looks like a timer now!**

<img src="https://i.imgur.com/6d2d0jy.png" alt="screenshot" />

<br>
<br>

**Now its all left up to the fun part of programming the game timer to tick!**

<br>
<br>
<br>


## Step 5: Setting up our Game Timer Logic

To get started with this step lets first set up a local helper function inside of `GameTimer.js` to invoke `props.handleTimerUpdate` every second. 


<br>

**This step will also involve refactoring the `<GameTimer>` component from the implicit return syntax to the explicit return syntax:**


```jsx
import styles from './GameTimer.module.css';
import { formatTime } from '../../services/utilities';

const GameTimer = (props) => {
  
  // here's our helper function
  function handleTick() {
    props.handleTimerUpdate();
  }

  // we need to add an explicit return statement now
  return (
    <div className={styles.GameTimer}>
      {formatTime(props.elapsedTime)}
    </div>
  );
}

export default GameTimer;
```

<br>
<br>
<br>

Alright, so all there's left to do is to call our helper function with a 1 second delay as soon as the GameTimer components is mounted to the DOM. To accomplish this, we're going to use the [`setInterval`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval) function that comes with most modern web browsers. 

<br>
<br>

**This function takes a callback, and a delay value for arguments, and then uses that data to create an object in a special part of your browser's memory called the heap.**

```javascript
setInterval(callback, delay);
```

<br>
<br>

**So, in our case, we could configure `setInterval` to call our helper function with a **1000** millisecond delay like this:**

```javascript
setInterval(handleTick, 1000);
```

<br>
<br>

Using this function does come with some concerns though.

If we're not careful, it can create multiple timer objects in the browser as a result from the `<GameTimer>` component being mounted and unmounted several times in one session.

We don't want this to happen as it could lead to a memory leak and other possible performance issues.

So, we need to clean up or ... destroy this timer object whenever the `<GameTimer>` component is unmounted from the DOM.


Fortunately, this function returns a reference we can use to essentially "clear" the object from memory; the name of the function we use to clear our interval object is called ... `clearInterval`.

```javascript

// create the timer
const timerId = setInterval(handleTick, 1000);

// clear the timer from memory
clearInterval(timerId);

```

<br>
<br>
<br>

So, having explained how we're going to make our timer tick, and that we need to clear our timer from memory once the `<GameTimer>` is removed from the DOM, let's talk about how we're going to bring all this together.

We'll need to set all this up as a side effect to set the timer interval and the clear the interval at the right phases within the component lifecycle.

<br>

**For example:**

- Component Mounted - **Create the interval.**
- Component Updated - _No action needed, let React re-render the component._
- Component Un-mounted from DOM and Destroyed - **Clear the interval from memory.**

<br>
<br>

The best way to hook into this behavior is with the `useEffect` hook, which we're learned about recently!

<br>

**Let's go ahead and import the `useEffect` hook inside of `GameTimer.js`**

```jsx
// import the useEffect hook as a named Import
import { useEffect } from 'react';
import styles from './GameTimer.module.css';
import { formatTime } from '../../services/utilities';

const GameTimer = (props) => {
  
  
  function handleTick() {
    props.handleTimerUpdate();
  }

  // set up useEffect to set the interval when the component is mounted
  useEffect(() => {
    // call the setInterval function 👇 passing in the handleTick callback and time delay value
    const timerId = setInterval(handleTick, 1000);
   /* 
      the useEffect callback 
      also returns a cleanup function 👇 
      we can use to invoke the cleanup behavior
    */
   return () => clearInterval(timerId) // 👈 clear the timer interval once component is destroyed
  }, []); /* 👈 empty dependency array 
              to prevent side effect from running 
              on every re-render 
            */

  
  return (
    <div className={styles.GameTimer}>
      {formatTime(props.elapsedTime)}
    </div>
  );
}

export default GameTimer;

```

<br>
<br>

Great! You should have a ticking timer now!

... but now there's one small problem, if you open your JS console in the browser, you should see this error:

```shell
► react_devtools_backend.js:2430 src/components/GameTimer/GameTimer.js
Line 26:6:  React Hook useEffect has a missing dependency: 'handleTick'. Either include it or remove the dependency array  react-hooks/exhaustive-deps
```

<br>

This is a real head scratcher, because it's totally unexpected.

Basically whats happening is whenever a new second is added to `elapsedTime` that every time the `GameTimer` component re-renders , the `handleTick` function isn't persisting between re-renders. 

So, in other words, we're creating a new `handleTick` function every time 

