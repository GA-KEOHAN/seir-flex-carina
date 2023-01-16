---
track: "React Fundamentals"
title: "Full-Stack React Lab"
week: 2
day: 4
type: "lab"
---


# Full-Stack React Lab

<br>
<br>
<br>
<br>


**This lab is not a deliverable**

You enjoy challenges - you've come to the right place!

Now that we've taken Mastermind full-stack, you're ready to get some practice interacting with a backend's API by persisting high-scores!

This lab begins with the code from where we left off at in the full stack react lesson, but if your code doesn't work, here's some <a href="/downloads/react_fundamentals/full-stack-react-lab/full-stack-react-mastermind.zip">starter code</a>.


<br>
<br>
<br>


#### Backend (Express/Mongoose) Hints:

**NOTE: before you begin, make sure to remove this dummy/test code:**

```javascript
const scores = [
    {
        numGuesses: 2,
        initials: 'DJS',
        elapsedTime: 62
    },
    {
        numGuesses: 4,
        initials: 'DJS',
        elapsedTime: 90
    },

]

app.get('/api/scores', function(req, res) {
    res.json(scores);
});
```

<br>
<br>
<br>

- Don't forget to install the necessary node modules like `dotenv` & `mongoose`. 

- You will **not** need `method-override` (you know why - right?).

- The backend API will be just like what we've previously worked with in class.  Define API routes on the server. Remember to follow the best practice of namespacing your API routes with `/api` and follow RESTful routing conventions, i.e., `POST /api/scores` to add a high score.

- You'll need a `/config/database.js` module to connect to a MongoDB. Don't forget to `require` the `database.js` module within `server.js`.  

- You'll need a hosted MongoDB and you already have an MongoDB Atlas account, so go for it.

- What will the `Score` schema/model look like? Keep it simple, the player's `initials`, `numGuesses` and `seconds` should work.

- You'll need an Express controller for the `scores` data resouce. Because this is a SPA, remember to respond with JSON from your controller actions.

- When composing the Mongoose query to return high-scores so that the "best" scores are first, `numGuesses` should be prioritized over `seconds`. Mongoose's `sort` query method will help with this.


<br>
<br>
<br>



#### Frontend (React) Hints:

- Plan what the UI should look like. Feel free to duplicate the High Scores "page" of the [deployed React Mastermind app](https://sei-mastermind.herokuapp.com/).

- You're going to need another client-side route, e.g., `/high-scores`, and a new React "page" component dedicated to displaying the high-scores.

- The time to check for a high-score is when `perfect === 4` (a chicken dinner) in the `handleScoreClick` helper function.

- If there is a winner, you'll want to stop the timer immediately.

- When a player has won, that's the time to get their initials and make the AJAX request to persist the score. FYI, the solution code took the easy way out and used a JS `prompt()` to ask the player for their initials. Feel free to improve upon this!

- Remember, it's a best practice to make AJAX calls from "service" modules vs. using `fetch` directly in the components.

<br>
<br>
<br>




#### Bonus

As a bonus, try limiting the number of high-scores to say, the top 20.

You'll need to check if the current score should be persisted by verifying that the score is better than the current last high-score.

On the server, you'll want to look into chaining the Mongoose `limit` query method to make sure that you don't return more than 20 scores.

<br>
<br>
<br>




#### Super Bonus

If a score has made the list, how about letting the user know by moving to the high-score route! 

<br>
<br>

This requires that the `<App>` component be able to access `BrowserRouter`'s `history` object so that it can change routes "programmatically" using the `history.push()` method. A minor refactor in **index.js** to this is needed:

```jsx
// Import Route also
import { BrowserRouter as Router, Route } from 'react-router-dom';

...

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route component={App}/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
```

<br>
<br>
<br>


**Program the backend to limit the number of high-scores in the collection to 20 (or whatever number of scores you want to limit to).**

Before adding a new high-score to the database, you will want to:

1. Verify that the high score sent by the client is indeed a worthy high score (better than the "worst" high-score in the database). This would be a great use case for a **custom validator** function in the schema.  Check out the **Custom** section of [the docs](http://mongoosejs.com/docs/validation.html). For further assistance, perhaps [this StackOverflow](https://stackoverflow.com/questions/43962430/mongoose-how-to-prevent-mongodb-to-save-duplicate-email-records-in-database) will help.

2. After adding the new high-score, remove the worst score if the collection grows larger than the number of high-scores you want to keep.  This would be a good use case for Mongoose **post save** [middleware](http://mongoosejs.com/docs/middleware.html) on the high score schema.


<br>
<br>
<br>



**Psssst... only use this if necessary, but here's the <a href="/downloads/react_fundamentals/full-stack-react-lab-solution/full-stack-react-mastermind.zip" download>Solution Code</a> to this lab**




