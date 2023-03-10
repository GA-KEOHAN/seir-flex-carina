---
track: "React Fundamentals"
title: "React Event Handling & Program Logic Lab"
week: 2
day: 2
type: "lab"
---

# React Event Handling & Program Logic Lab


<br>
<br>
<br>



## Intro

Okay, you just saw:

1. How references to function are passed from a parent component to a child component via props - no differently than passing data.

2. How to wrap an event handler function with an arrow function if the handler function needs to be invoked with arguments.

<br>
<br>

Now it's time to have some fun building out Mastermind using what you know about components, state, props, styling, event handlers, and of course, JavaScript.

If you can implement each of the exercises below - you will have a fully functioning game of Mastermind!


<br>
<br>
<br>


**After completing the events lesson, here's what our app looks like:**

<img src="https://i.imgur.com/7CX8Dfs.png">

**This lab is not a DELIVERABLE**

<br>
<br>
<br>


We'll use the same version of mastermind we left off at from today's lesson.

In case you don't have a working version to start with, you can download this <a href="/downloads/react_fundamentals/event-handling-lab/react-mastermind.zip" download>Starter Code</a>


<br>
<br>
<br>




## Exercises

1. Write the code that initializes the game's state when the  `[ New Game ]` button is clicked.

	Hint: You already have the initialization code in your call to `useState`. Stay DRY and refactor into a function that returns the initialized object.

2. Make the `[ ✔ ]` (score) button disabled until all four pegs for the current guess have a color chosen.

	Hint: Disable the button if the current guess' `code` **includes** a `null`.

3. Add an `onClick` event handler for the four `<GuessPeg>` components. Clicking pegs for **only the current guess** row should update the state of the guess object. Remember - baby steps!

	Hints: In `<GuessPegs>`, you can wrap the click handler (originally passed from `<App>`) with an arrow function and include the index of the peg as an arg when passing it to each `<GuessPeg>`. Also, as a best practice, review how to **replace** objects/arrays in state instead of mutating them. In this case, you actually should be creating new versions (copies) of the `state.guesses` array, the current guess object within that array, as well as the `code` array on the current guess object! Yes, a lot of work, but considered the "best practice" of not mutating objects/arrays in state.
	
	After this step is completed, selecting "red" in the color picker, then clicking the second peg should result in the display looking like this:

	<img src="https://i.imgur.com/loJBeHh.png">
  
4. Score the guess when the Score (checkmark) button is clicked!

	Hint: Compute the number of **perfect** (correct color & position) first. Then compute the number of **almost**, but be sure not to reuse colors that have already been scored as perfect!

5. After scoring, if the game is not won, push a new guess object into the guesses array, otherwise if there is a winner, don't push a new guess and instead update the message in the footer to something like "You Won in X Guesses!".

6. After a win, ensure that the score is shown for the winning guess instead of the score button.

	Hint: This can be done by adding some additional logic in `<GuessRow>` to display `<ScoreButton>` not only if it's the current row (as it's currently doing), but also if that guess object's score's `perfect` property is not equal to 4 (winner).


<br>
<br>
<br>



## Hints

- Baby steps, baby steps, baby steps! Check your code for each baby step!

- Use the React Developer Tools to view components' state & props and to debug as you go. For example, use it to change state in `<App>` then click the `[ New Game ]` button to see if it resets the state as planned.

- To get the score to show for the last winning guess will require a tweak to the `<GuessRow>` component's render logic.

<br>
<br>
<br>

## BAM! 💥

<img src="https://i.imgur.com/zbUUDUs.png">


#### Pssssst ... here's one possible solution to this lab (Please, only use as a last resort reference) 

<a href="/downloads/react_fundamentals/event-handling-lab-solution/react-mastermind.zip" download>Solution Code</a>

 
