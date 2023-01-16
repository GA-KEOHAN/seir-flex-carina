[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)



# Deployment for Node-Mongo-Express

Heroku has been the go-to deployment site for many years. With its free tier going away, this is our opportunity to explore new ways to deploy our express app. One such place is [render.com](https://render.com/).


## Learning Objectives

- Describe the difference between development, test, and production environments
- Use environmental variables to keep sensitive data out of code
- Deploy a Node/Express app using render.com

### What is Deployment?

Deployment is the act of putting an app up on one or more internet-connected
servers that allow users to access and use the app.

### Requirements for Deployment

There are generally a few things we need for an app to be properly deployed:

- **Server** - the server(s) must be on and connected to the internet
- **Executable Code** - we must get our code onto the server and be able to run
  it
- **Dependencies** - the server(s) must have the proper dependencies installed
- **Services** - the server(s) must be running the correct services (web,
  database, email, etc.)
- **Configuration** - we must configure our running app with respect to its
  deployment environment


## Environments and Environment Variables

### Environments

Application environments are an important part of the context in which an
application runs. Each environment is configured to support a certain usage of
the application.

Typical application environments include:

- **Development** - environment where an app or new feature(s) are created and
  run locally
- **Test** - environment where code and UI is tested for functionality and
  performance
- **Production** - environment for complete and tested code to be hosted online
  for clients to use

So far, we've been using the `development` environment by default. Today we'll
look at deploying to the `production` environment, a.k.a. the public, published
version of our site.

Each environment has a different set of configurations, things that vary
depending on how we're running or using our app. We could be developing,
testing, or deploying our apps. Configuration settings often include...

- The name of the database
- The username/password to connect to the database
- API authentication keys (e.g. to connect to twitter API)
- Whether or not to reload code on each request (for debugging vs performance)
- Where to save log information (error logs, etc)

### Environment Variables

We do not want to keep configuration in our codebase (e.g. the code we see when
we push to Github) for several reasons:

- We do not want to expose private information such as passwords and API Keys.
- When we push the same code to different environments, we need a way to
  dynamically tell which environment we're in.

Node manages application environments using "environment variables".

Environment variables store data and configuration information that is defined
outside of your codebase and pertain to the phase of the application's
development.

Storing this information separately protects sensitive information like API keys
and passwords because it is not visible from your project directory.


## Solving Deployment Issues

**Not working?** Don't worry! Debugging is a part of your life now, and
deployment issues are normal. Check out these tips on solving deployment issues.

### Make sure your code works locally before deployment

As a sanity check, ensure your code works prior to deployment. 

### Google is Your Best Friend

More often that not, solving deployment issues requires a good deal of Googling.
Don't expect to find a silver bullet -- often we must go through many different
issues other users may have encountered to understand our own.


## We Do: Deploy an simple app to render.com

Will serve simple example to express deployment. We will deploy the fruits app after this one.

### Start 
1. Inside of your Week 11 Day 2 folders create a folder called `test-deploy`.
1. Open the VSCode to the folder `test-deploy`. We should have a blank folder.
1. Create a `server.js` file. 
1. In the terminal, run the command `npm init -y`.
1. In the terminal, install express `npm i express`.
1. On the `server.js` file, create an express app with a simple route that sends a response `hello world`. Declare a variable `const PORT = process.env.PORT || 4321;` and have the express app listen to that variable. 

Your `server.js` file should look like this:

```js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4321;

app.get('/', (request, response) => {
  response.send('hello world')
})

app.listen(PORT, () => {
  console.log(`✅ PORT: ${PORT} 🌟`); //completely optional
});
```
### Update the route 
1. Change the / route to send the variable value `PORT`
1. Create another route called `/dburl`. Using the `dotenv` package create a `DATABASE_URL` environment variable in the `.env` file (that we will create) and set that to `<your connection string found on mongo atlas>`. This route will send that env. variable. 

```js
require("dotenv").config();
```

...

```js
app.get('/dburl', (request, response) => {
  response.send(`My connection string is: ${process.env.DATABASE_URL}`)
});
```

### Add additional routes and push to GitHub
1. Change the / route to send the variable value `PORT`
1. Create another route called `/dburl`. Using the `dotenv` package create a `DATABASE_URL` environment variable in the `.env` file (that we will create) and set that to `<your connection string found on mongo atlas>`. This route will send that env. variable.
1. Create a `.gitignore` file and add in `.env` and `node_modules`.
1. In the terminal, initialize git by running command `git init`. Add and commit those changes `git add .` and `commit -m 'first commit'`
1. Go to github.com and create a new repo. Do NOT create a readme. Click create repo
1. There should be three command on the next page. Below is an example. In the terminal, run the commands like the ones found below.
![](https://i.imgur.com/uP9vnKn.png)


### Sign Up for render.com
1. Go to [render.com](https://render.com/) and sign up. 
1. Once you sign up, connect to your github.
1. Click on NEW Web Service and choose the repo that we just created by clicking on the connect button. 
1. Add in a name for your web service and click Create Web Service.
1. If the deploy was successful, lets go to the two routes and see what `/` and `/dburl`.
1. Lets go into Environment section and add that environment variable for db.
1. After the second deployment finishes, we will get a defined variable for `process.env.DATABASE_URL`


## We Do: Continued
Deployment of the fruits app