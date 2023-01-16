---
track: "React Fundamentals"
title: "Full-Stack React"
week: 2
day: 4
type: "lecture"
---

# Intro to Full-Stack React

<br>
<br>
<br>
<br>



## Learning Objectives

| Students Will Be Able To: |
| --- |
| Ready a React app for production |
| Logically structure a full-stack React project |
| Configure an Express app to serve JSON |
| Configure an Express app to allow CORS |
| Introduce service modules in a React App for making AJAX requests |

<br>
<br>
<br>

## Roadmap

- Set Up
- Why Full-stack?
- Building the React App's Production Code
- Code the Express App
- Deployment
- Essential Questions

<br>
<br>
<br>



## Set Up

The starter code is the React Mastermind app that includes the timer implemented from the previous walkthrough.

- Download the <a href="/downloads/react_fundamentals/intro-to-full-stack-react/react-mastermind.zip" download>Starter Code</a>
- Extract the folder from the `.zip` file and `cd` into it
- Install the Node modules: `$ npm i`
- Open the code in VS Code: `$ code .`
- Start the dev server: `$ npm start`

<br>
<br>
<br>


## Why Full-stack?

Thus far, our React apps have been static, front-end only apps that don't communicate with a server after the _index.html_ has been delivered.

It's _possible_ for static front-end only SPAs to have a reasonable amount of functionality if they incorporate calls to APIs or cloud services like Firebase.

However, most SPAs rely on a backend server app for tasks such as:

- Performing CRUD
- Authenticating users

Such an app, where we write code that runs on the front-end and the backend, as you know, is a full-stack application.

<br>
<br>
<br>


## Architecting a Full-stack React App

Up until this point, we've taken for granted that full-stack apps, like your Express Projects, were single, integrated projects.

However, developing a MERN-stack (MongoDB, Express, React & Node) project involves complexities such as tooling, React's integrated development server, etc.

Basically, there are complications in both **development and production** environments that have to be addressed.

<br>
<br>
<br>



#### Complications During Development 

If we're going to develop a MERN-stack app, we have to figure out how we're going to:

- Use React's Development Server (`npm start`)
- **and**, run `nodemon` to productively develop an Express backend that can respond to AJAX requests sent from the React front-end

<details>
<summary>There's a conflict between React's development server and Express development - what is it?</summary>
<p><strong>They both run on port 3000 by default.</strong></p>
</details>

<br>

**Key Point: When developing a MERN-stack app, you will need to launch both React's development server (`$ npm start`) and the Express app (`$ nodemon server`) in separate VS Code windows.**

<br>
<br>
<br>



#### Production Environment Complications

As we develop our React app locally, we're writing source code that React's dev server builds and runs automatically.

However, the React dev server is a local tool that does not run in the cloud, i.e., Heroku or a CDN like Github Pages, Netlify or Vercel.

We need a way to **build** our code in whichever machine is hosting our app, which will vary depending upon which hosting service is used.


<br>
<br>
<br>


#### Possible Full-stack Architectures

There are two general architectures we could pursue:

1. Maintain **two** separate projects, one for the React SPA, the other for the Express backend.
1. Integrate the codebase for both the React front-end and the Express backend.

| Architecture | Pros | Cons |
| --- | --- | --- |
| Separate Projects | Easier to set up and better seperation of concerns. | Manage two projects and git repos. Must deploy to two separate hosts, **or**, copy over the front-end production code to the server project before each deployment. Cross-site configuration will need to be implemented. |
| Single Project | A single codebase | Source code can get convoluted with front-end and back-end code side by side in the same parent directory |


**We'll go with the `seperate projects` architecture as it will help us seperate concerns a little better.**

<br>
<br>
<br>


## Building the React App's Production Code

If we want to be able to test locally how our full-stack application is going to run when deployed, we'll need to:

- Build the React app's code locally - this is called "production code"
- Configure Express to serve the production code

So, how do we make the `index.html` & React's JavaScript production-ready? 

Thankfully, the `create-react-app` CLI includes tooling and a **build** script in **package.json** that, when run, converts the the code in the `src` and `public` folders of the React project into production code.

<br>
<br>
<br>

**Let's run it:**

```bash
npm run build
```


**Note: npm requires us to use the `run` command for scripts other than `start` and `test`.**

<br> 
<br> 
<br> 


After building, examining our project's structure reveals a new **build** folder containing a production ready **index.html**, **static/css** & **static/js** folders, and other less important stuff.

This **build** folder of production-ready goodness will eventually be served by a host once we deploy, but for now you can take advantage of a static server tool available from `npm` called `serve`


<br>
<br>
<br>


**Try it out!**

```bash
npm i -g serve
```

<br>
<br>
<br>

**You can then serve the production-version of React using the following command:**

```bash
serve -s build
```

<br>
<br>
<br>



## Code the Express App

In a MERN-stack app, the backend Express app only does two things:

1. Responds to AJAX requests from the React app with JSON Data
2. Connect to our MongoDB database and perform CRUD on our data resources


<br>
<br>
<br>



#### Create and Code the Express App 

For now, we're only going to install a minimal number of modules for the Express app:

`$ npm i express morgan`


**Note: We don't need a view engine because our server will only respond to AJAX requests with JSON.**

There will not be any ***.ejs** templates rendered, instead we'll call `res.json()` from our controller actions.

For the lab, to add additional features such as database access, etc., you'll need to install additional modules like `mongoose`, `dotenv`, etc ...

<br>
<br>
<br>


**Let's write our server:**

1. First, create a directory for our server called `react-mastermind-backend`

2. Then, `cd` into the directory and create the server entry point with `touch server.js`.

3. Let's create our `package.json` with `npm init -y`

<br>
<br>


**At the top of`server.js`, let's do all the familiar stuff: `require` the modules; create the Express app; and mount the `morgan` logging and body parsing middleware:**

```javascript
const express = require('express');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));

// this piece of middleware allows us to parse incoming JSON data
app.use(express.json());
```

<br>
<br>
<br>

**Set the port for development to use 3001 so that React's dev server can continue to use 3000 and finally, tell the Express app to listen for incoming requests:**

```javascript
// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

app.listen(port, function() {
	console.log(`Express app running on port ${port}`)
});
```

<br>
<br>
<br>


**Let's set up a simple route respond to an AJAX request from React; we'll send some fake data as a response:**


```javascript
//... more code above
app.use(logger('dev'));
app.use(express.json());


const scores = [{
		numGuesses: 2,
		initials: 'DJS',
		seconds: 62
	},
	{
		numGuesses: 4,
		initials: 'DJS',
		seconds: 90
	},

]

app.get('/api/scores', function (req, res) {
	res.json(scores);
});

//...more code below
```

**Notice how we've "name-spaced" the route at `/api/scores`, this is more or less convention rather than a necessary configuration.**

**For your projects in this unit, we recommend using this convention.**

<br>
<br>
<br>


#### Try It Out

Let's go ahead and start our express server and navigate to `localhost:3001/api/scores` to see how express responds:


```json
// http://localhost:3001/api/scores

[
  {
    "numGuesses": 2,
    "initials": "DJS",
    "seconds": 62
  },
  {
    "numGuesses": 4,
    "initials": "DJS",
    "seconds": 90
  }
]

```

<br>

**Awesome! We'll eventually serve data from our database, not fake data.** 

**We will also have React make the request to our express backend instead of us manually making the request in the browser**

<br>
<br>
<br>


### Make AJAX request to express using our React App

Now that everything is working, let's double check that our React app is running in development mode. 

Make sure to shut down the static server we had running earlier and switch back to our development server with `npm start`.

During the **"Add a Timer Feature code-along"**, we created a `services` directory inside our `src` directory to organize our `service/utility` modules; we're going to use that same folder for this next step.


**Let's add a "scores service" module to `services` for getting high scores data from Express**

```bash
touch src/services/scoresService.js
```

<br>
<br>
<br>

**We'll add this boilerplate code that will make the request to the route we defined inside of `server.js`**

```javascript
// local constant for holding the URL to our api
const BASE_URL = 'http://localhost:3001/api';


// named export of function for making AJAX request
export function fetchScoreData() {
    return fetch(BASE_URL + '/scores').then(res => res.json());
}

```

<br>
<br>
<br>


**Next, inside of our React App, we'll need to go to `App.js` and import the `useEffect` hook we learned about for running side effects such as making AJAX requests**

```javascript

import { useState, useEffect } from "react";
```


<br>
<br>
<br>

**Then, we'll import the exported function for getting score data inside of `scoresService`**


```javascript
import { fetchScoreData } from './services/scoresService';
```

<br>
<br>
<br>

**Next, we just have a few more steps:**

1. Define an async helper-function called `getScores` for making the AJAX request with our service module. 
2. When invoked, `getScores` will request the data and then console log it.
3. Then, with the useEffect hook, we can invoke our getScores function when the component first renders.
   

```javascript
	// ... more code above


    /* helper functions */

	// another cleanly written function with async/await
    async function getScores() {
		const data = await fetchScoreData();
		console.log(data) // we should see our scores data in the browser console
    }

    useEffect(() => {
      getScores()
	}, []) // don't forget the empty dependency array 
	
	// ... more code below
```

<br>

**We should see some data in our browser console 🤔**

<br>
<br>
<br>
<br>


**Once we get our scores data using AJAX, we'll need a piece of state to remember it with, let's initialize it**

```javascript
// Let's create a piece of state to hold our scores data
    const [ scores, setScores ] = useState([]);
```

<br>
<br>
<br>
<br>

**Then we can just refactor the `getStores` helper function to set our score state instead of console logging it:**

```javascript

    // Let's create a piece of state to hold our scores data
    const [ scores, setScores ] = useState([]);

    /* helper functions */

    // another cleanly written function with async/await
    async function getScores() {
      const data = await fetchScoreData();
      // add data from AJAX request to state
      setScores(data)
    }

    // make AJAX request when component first renders
    useEffect(() => {
      getScores()
    }, []) // don't forget the empty dependency array 
```
<br>
<br>

**Awesome, we can now verify that our state is there using the react dev tools extension**

<br>
<br>
<br>
<br>


### IMPORTANT REMINDER - Backend Development

Eventually, we'll have to address [`Cross Origin Resource Sharing` or `CORS`](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), which is a security feature implemented by modern browsers to prevent attacks such as `Cross Site Scripting` or `XSS`.

To solve this issue, we can introduce a middleware package called `cors`, which is avaiable for installation from `npm`, we can learn more about it [here](https://expressjs.com/en/resources/middleware/cors.html)

<br>
<br>
<br>

**First we install it:**

```shell
npm i cors
```

<br>
<br>
<br>

**Then, add a simple configuration to allow access from any origin.**

```javascript
// first require it
const cors = require('cors');

// then mount it
app.use(cors());
```

<br>
<br>

Also, just to be clear, the Express backend is fully configured and ready for additional backend functionality to be coded.

When the time comes, be sure to add folders such as `config`, `routes`, `models` & `controllers` to keep your backend code organized.

Additionally, in a SPA, the routes will be API-type routes, i.e., they should be namespaced using `/api` and respond with JSON, not EJS views.

You will also want to refer to the Mongoose related lessons to refresh your recollection of how to define schemas and perform CRUD using Mongoose models.


<br>
<br>
<br>




## Deployment of Express App


These steps are relatively straightforward. 

The back-end (express) can be deployed the same way we deployed our apps in Unit 2.

**If you need a refresher, please see the walkthrough below:**

<br>
<br>
<br>

### Initialize a git repo inside your express app

Since heroku uses `git` you'll need a `git` repo for express.

Not to mention you'll need a repo anyways for pushing to `GitHub` in addition to pushing to `heroku`


**Go to your express app, open a terminal, and type the following command:**

```bash
git init
```

<br>
<br>
<br>


### Login to heroku using the `heroku-cli`

**Still in your terminal in your express app, type `heroku login` and follow the instructions to log in using your Heroku account's credentials.**


```bash
heroku login
```

<br>
<br>
<br>



### Create the App in your Heroku Dashboard

Your [Heroku Dashboard](https://dashboard.heroku.com/apps) lists all of your apps that have been deployed to Heroku.

Before you can deploy a new app, you must first create the app and using the CLI is the easiest approach:

<br>

```shell
heroku create <optional preferred name of app>
```
<br>
<br>
<br>

If you don't specify the `<optional preferred name of app>` argument, Heroku will assign a randomly generated app name automatically.

Keep in mind that there are thousands upon thousands of apps deployed on Heroku, so you may have to get creative when giving your app a name because it has to be unique to Heroku. Using hyphens is one way to help get the app name/URL you want.

<br>

```shell
heroku create react-mastermind-backend
```

<br>
<br>
<br>

The output from the above command was:
```shell
Creating ⬢ react-mastermind-backend... done
https://react-mastermind-backend.herokuapp.com/ | https://git.heroku.com/react-mastermind-backend.git
```
<br>
<br>

Verify the command was successful by verifying that a git remote named `heroku` was created by typing:

```shell
git remote -v
```
<br>
<br>

You should see a remote name `heroku` listed, if it wasn't or you get an error, make sure you have a `git` repository for your express app.

<br>
<br>
<br>


### Ensure the Code is Committed to `master`

Deploying to Heroku is as easy as pushing the `master` branch to the remote named `heroku`.

First, make sure your code is committed (on the `master` branch):

```shell
$ git add -A
$ git commit -m "Deploy to Heroku"
```
<br>
<br>

Then push the repo to Heroku:

```shell
$ git push heroku master
```

The above command will kick off the deployment on Heroku which may take a minute or two to complete.

<br>
<br>
<br>

While the app is deploying, you will see messages from the Heroku server prefaced by `remote: `.

A successful deployments will have a

`remote: -----> Build succeeded!`

message and ultimately a

`remote: Verifying deploy... done.`

toward the bottom of the output.

If the deployment fails, there will be error messages that can be used to track down the issue(s).

<br>
<br>
<br>

### Set the App's Environment Variables

Each of the key:value pairs in your app's `.env` file must be set on Heroku using the following command:

```shell
$ heroku config:set KEY=VALUE
```

For example: 

```shell
$ heroku config:set DATABASE_URL=mongodb+srv://username:pw@sei-students-1btwt.azure.mongodb.net/students?retryWrites=true
```

Multiple key:value pairs can be space separated, or the command can be run as many times as necessary.

> Note:  If using zsh, it may be necessary to quote the KEY=VALUE pair, for example:<br>`heroku config:set "DATABASE_URL=mongodb+srv://username:pw@sei-students-1btwt.azure.mongodb.net/students?retryWrites=true"`

<br>
<br>
<br>

## Deployment of React App

If you haven't figured it our already, React will need to be deployed seperately from express. 

This also means you'll want to create a seperate repository for your React Application as well.

For this step, you'll have the option of using services like `Netlify`, `Vercel` or `gh-pages`

This is actually the easiest step...

<br>
<br>


**...so easy, each of these vendors have created some easy to follow guides to walk through the process:**

- [Deploy to Netlify](https://www.netlify.com/blog/2016/07/22/deploy-react-apps-in-less-than-30-seconds/)
- [Deploy to Vercel](https://vercel.com/guides/deploying-react-with-vercel-cra)
- [Deploy to GitHub Pages](https://create-react-app.dev/docs/deployment#github-pages)

<br>
<br>
<br>



## Essential Questions

**❓ What folder holds a React app's production-ready code?**

**❓ True or False: API routes will need to be defined so that the React app can obtain data, create data in the database, etc.**

**❓ True or False: The React app should use a "service" module to communicate with the backend's API routes via AJAX.**


<br>
<br>
<br>

## Resources

- [`Cross Origin Resource Sharing` or `CORS`](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Information on `CORS` middleware for express/node applications in ExpressJS Docs](https://expressjs.com/en/resources/middleware/cors.html)