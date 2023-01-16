# Express and React Lab

During this lab we will be creating a full stack portfolio page using Express and React to see how you can create a full stack project using a simple API build with express and a frontend application with React.

- [Here is a Repo with a final version for reference](https://git.generalassemb.ly/AlexMerced/Express-React-Portfolio-Reference-Code/tree/router64)

**NOTE** While the above repo has the backend and frontend folder in one repo, to deploy the backend and frontend project MUST be in separate repos, follow the direction carefully regarding where repos are created and deployment.

**ANOTHER NOTE** This is **not your actual portfolio**, so don't worry about making it perfect. Use this as an exercise to practice the skills we've learned in the class so far.

## Setup

- Create an empty folder to house this project `express_react_lab` (this folder should NOT be a GIT repo)

- Inside this folder create a folder for our backend app called `backend` this will house our express application

- Then we will generate a react project for a our frontend, either of these two commands should do the trick (the command should be run from the express_react_folder so make sure your terminal is in that folder)...

  - `npx create-react-app@latest frontend`
  - `npm init vite`

- The end result should be the following folder structure

```
- /express_react_lab
  > /backend
  > /frontend
```

## Express app setup

- Open up your terminal inside the backend folder

- create a new npm project with the command `npm init -y`

- install the following
  - `npm install express cors`
  - `npm install --save-dev nodemon`

#### What we installed

1. express: The backend web framework for generating a web server

2. cors: middleware to make sure we don't get cors errors when our react app makes a request to our express app

3. nodemon: development tool to auto restart our server whenever

- update the package.json with the following scripts

```json
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
```

#### Our Data

Instead of using a database we will use JSON files to store the data for our project for now.

Run the following command in the `backend` folder to create our files

- `touch server.js projects.json about.json`

#### projects.json

In this file you should use the below example but replace it with your projects from the previous units. (json files don't need to be exported, node knows how to read them).

Essentially this file is an array of objects that represent your projects.

```json
[
  {
    "name": "project1",
    "live": "https://app.herokuapp.com/whatever",
    "git": "http://www.github.com/username/reponame",
    "image": "http://www.imgur.com/pictureofproject.png"
  },
  {
    "name": "project2",
    "live": "https://app.netlify.app/whatever",
    "git": "http://www.github.com/username/reponame",
    "image": "http://www.imgur.com/pictureofproject.png"
  }
]
```

#### about.json

This file will be one big option with information about you to use in your portfolio.

```json
{
  "name": "Bob Smith",
  "email": "Bob@BobSmith.dev",
  "headshot": "http://www.imgur.com/pictureofproject.png",
  "bio": "Bob Smith graduated from General Assembly in 2017. Afterwords, he went to work for XYZ Technologies where he maintained a full stack application using Meteor and Ember. He also recently started started learning Prolog, cause why not waste time."
}
```

#### server.js

Now we can make our server, here is the overview of what we will do.

- import our dependencies and json files
- create our app object
- add our cors middleware
- create a home route to test our app
- create a `/projects` route to retrieve our projects
- create a `/about` route to retrieve our about info
- setup our server listener

```js
// Import Dependencies
const express = require("express");
const cors = require("cors");

// Import JSON files
const projects = require("./projects.json");
const about = require("./about.json");

// Create our app object
const app = express();

// set up middleware
app.use(cors());

//home route for testing our app
app.get("/", (req, res) => {
  res.send("Hello World");
});

// route for retrieving projects
app.get("/projects", (req, res) => {
  // send projects via JSON
  res.json(projects);
});

// route for retrieving about info
app.get("/about", (req, res) => {
  // send projects via JSON
  res.json(about);
});

//declare a variable for our port number
const PORT = process.env.PORT || 4000;

// turn on the server listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
```

- run your server `npm run dev`

- go to `localhost:4000` and make sure you see "hello world"

- go to `localhost:4000/projects` and make sure you see your projects as JSON

- go to `localhost:4000/about` and make sure you see your about info as json

- Our Backend is complete, now to deploy.

## Express app deployment

#### Creating the Procfile

- create a file called `Procfile`

```
web: npm start
```

#### Creating the git repo

- make sure your terminal is inside the "backend" folder

- create a new git repo `git init`

- add all files to staging `git add .`

- commit the files `git commit -m "backend is done"`

- create a new EMPTY repo on github.com and get the remote url

- connect the remote to your local repo `git remote add origin URL`, make sure to replace "URL" with the URL of your github.com repo

- push up your changes `git push origin BRANCH` make sure to replace "BRANCH" with your current branch name which can be retrieved by running `git branch`

#### Deploying to Heroku

[Due to End of Herokus Free Tier: Good Alternatives are Render or Railway, this video will show you how to deploy to these services](https://www.youtube.com/watch?v=YhOGojgR3O4)

- Head over to heroku and create a new project

- under the deploy section, connect your github repo

- enable automatic deploys

- then under manual deploys hit the "deploy" button

- when its done, click the "open app" button in the upper right of the dashboard

**ONCE YOUR API IS DEPLOYED, TEST IT**

- go to `HEROKU_URL/` make sure you see "Hello World"

- go to `HEROKU_URL/projects` make sure you see your projects as JSON

- go to `HEROKU_URL/about` make sure you see your about info as JSON

congrats, your simple backend API is complete and deployed! You may shut down any local backend servers you have running.

If you have any issues with Heroku refer to [this guide](https://tuts.alexmercedcoder.com/2021/4/deploying_node_heroku/)

## Building the Frontend

Make sure to keep your Heroku url handy, we'll need it in a moment.

- open your terminal to the `frontend` folder

- install react router `npm install react-router-dom`

## Setting up React Router

Let's create `src/router.js` to house our frontend router.

```js
import { createRoutesFromElements,createBrowserRouter, Route } from "react-router-dom";
import App from "./App";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<App/>}>

    </Route>
))

export default router
```

open up `src/index.js` and make the following changes

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

## Getting things scoped out

- create a `src/components` folder and `src/pages` folder

- in components create `Header.js` and `Footer.js`

`src/components/Header.js`

```jsx
function Header(props) {
  return <h1>Header</h1>;
}

export default Header;
```

`src/components/Footer.js`

```jsx
function Footer(props) {
  return <h1>Footer</h1>;
}

export default Footer;
```

- In `src/pages` create `Home.js`, `About.js` and `Projects.js`

`src/pages/Home.js`

```jsx
function Home(props) {
  return <h1>Home</h1>;
}

export default Home;
```

`src/pages/About.js`

```jsx
function About(props) {
  return <h1>About</h1>;
}

export default About;
```

`src/pages/Projects.js`

```jsx
function Projects(props) {
  return <h1>Projects</h1>;
}

export default Projects;
```

Let's update our routes in `router.js`:

```js
import { createRoutesFromElements,createBrowserRouter, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<App/>}>
        <Route path="" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/projects" element={<Projects/>}/>
    </Route>
))
```

## App.js

Now our App component will show our header and footer and have an outlet to display our subroutes.

`src/App.js`

```jsx
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  );
}

export default App;
```

## The Navigation

Right now we can't switch between our routes with Link components, so let's build our navigation so we can switch between pages. Our navigation should be in our header.

`src/components/Header.js`

```jsx
import { Link } from "react-router-dom";

function Header(props) {
  //inline style for the nav tag
  const navStyle = {
    display: "flex",
    justifyContent: "space-around",
    border: "3px solid black",
    padding: "8px",
    width: "90%",
    margin: "auto",
  };

  return (
    <header>
      <h1>My Portfolio Page</h1>
      <nav style={navStyle}>
        <Link to="/">
          <div>HOME</div>
        </Link>
        <Link to="/about">
          <div>ABOUT</div>
        </Link>
        <Link to="/projects">
          <div>PROJECTS</div>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
```

You should be able to navigate between our pages but they are only one word at the moment. Let's populate our projects and about pages.

## About Page

We will do the following...

We will create a loaders for our /projects and /about routes to get the data from our API when the routes load. Let's create `src/loaders.js`.

```js
// BASE URL OF OUR DEPLOYED API
// BASE URL OF OUR DEPLOYED API
const URL = "http://mydeployedurl.hostserver.whatever"

export const projectsLoader = async () => {
    const response = await fetch(URL + "/projects")
    const projects = await response.json()
    return projects
}

export const aboutLoader = async () => {
    const response = await fetch(URL + "/about")
    const about = await response.json()
    return about
}
```

Let's attach the loaders to our routes in router.js

```js
import { createRoutesFromElements,createBrowserRouter, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import { aboutLoader, projectsLoader } from "./loaders";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<App/>}>
        <Route path="" element={<Home/>}/>
        <Route path="/about" element={<About/>} loader={aboutLoader}/>
        <Route path="/projects" element={<Projects/>} loader={projectsLoader}/>
    </Route>
))

export default router
```

Now we can use the useLoaderData hook to bring in the data when that route is loaded.

`src/pages/About.js`

```jsx
import { useLoaderData } from "react-router-dom";

function About(props) {

  const about = useLoaderData()

  return <div>
      <h2>{about.name}</h2>
      <h3>{about.email}</h3>
      <p>{about.bio}</p>
    </div>
}

export default About;
```

## Projects

we already got the loader created, so we can just setup the component.

`src/pages/Projects.js`

```jsx
import { useLoaderData } from "react-router-dom";

function Projects(props) {

  const projects = useLoaderData()

    return projects.map((project) => (
      <div>
        <h1>{project.name}</h1>
        <img src={project.image} />
        <a href={project.git}>
          <button>Github</button>
        </a>
        <a href={project.live}>
          <button>live site</button>
        </a>
      </div>
    ));
}

export default Projects;
```

## Deploy Frontend

Once everything seems working, do the following.

- create a file called `netlify.toml` in the `frontend` folder with the following

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
```

- There should already be a local repo based out of the frontend folder (create react app creates one by default). If not, make one.

- add all files to staging `git add .`

- commit `git commit -m "frontend complete"`

- create a new empty repository on github and get the url

- connect it to your local repository `git remote add origin URL` make sure to replace URL with your repo URL

- push up the code `git push origin BRANCH` make sure to replace BRANCH with your active branch, you can confirm what it is with the command `git branch`

- head over to netlify and create a new project based on your frontend repo, it should auto detect the build command and deploy.

- if you run into any issues refer to this [guide for deployment](https://tuts.alexmercedcoder.com/2021/1/deployreact/)

- You've deployed your portfolio!!!

## What Now?

- Add some content to the home page
- Spend some time styling your frontend
- Add content to the footer

## Hungry For More

#### Styling Challenges (choose 1)

- Style using the Styled Components Library `npm install styled-components`
- Style using sass `npm install sass` (after install change the extension on your css files scss)
- Try using `bulma-react-components` a [library of components pre-made using Bulma](https://www.npmjs.com/package/react-bulma-components)

#### Express Challenges

- Try adding a form to your React project and a post route on your express app to go with it
- Convert from JSON files to using a mongo database for your project (not really necessary for the about info)
