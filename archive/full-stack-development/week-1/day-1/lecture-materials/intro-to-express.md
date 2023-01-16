---
track: "Full-Stack Development"
title: "Intro to Express"
week: 1
day: 1
type: "lecture"
---

# Intro to Express 



<br>
<br>
<br>
<br>




### Learning Objectives


- Students Will Be Able To:
	- List the Fundamental Capabilities of Web Frameworks
	- Create a Basic Express Web App
	- Define Basic Routes
	- Respond to HTTP Requests
	- Render Dynamic Views Using EJS


<br>
<br>



#### Roadmap

- Setup
- The Three Fundamental Capabilities of Web Frameworks 
- Intro to Express
- Express "Hello World"
- Basic Structure of an Express App
- Our First Route
- The Route's Callback Function
- Practice - Define Another Route
- Ways to Respond to a Request
- Rendering Views
- Dynamic Templating using EJS
- Redirecting



<br>
<br>



#### Setup

- Create a folder called `express-practice` and then change into it

```shell
$ mkdir express-practice
$ cd express-practice
```

- Create a file inside this folder called `server.js`

```shell
$ touch server.js
```
	
- Then create a `package.json` and accept the defaults using this command:

```shell
$ npm init -y
```

- Open the project's folder in VS Code.

<br>
<br>

#### The Three Fundamental Capabilities of Web Application Frameworks 


- Web Application Frameworks have three capabilities fundamental to writing a back-end web application:
	1. The ability to define routes
	2. The ability to process HTTP requests using middleware
	3. The ability to use a view engine to render dynamic templates

- Over the next few lessons, you will learn about how the Express framework implements these three fundamental capabilities.


<br>
<br>
<br>


#### Express Framework - Intro


- [Express](https://expressjs.com/) is the most popular web framework for Node.js.

- It is minimalistic and lightweight, especially when compared to massive frameworks like Django and Rails.

- Express uses Node's built-in HTTP module to listen for, and respond to, HTTP requests - Express simply adds those three web application capabilities on top of Node

<br>
<br>

#### Install the Express Module


- Let's use `npm` to install the Express module in this project:

	```shell
	$ npm i express
	```
	Note that `i` is a shortcut for `install`


<br>
<br>

#### Express - Hello World!

- Let's write the obligatory "Hello World!" application:

	```javascript
	// Load express
	const express = require('express');
	
	// Create our express app
	const app = express();
	
	// Define a "root" route directly on app
	// Tomorrow, we'll use best practice routing
	app.get('/', function (req, res) {
	  res.send('<h1>Hello World!</h1>');
	});
	
	// Tell the app to listen on port 3000
	// for HTTP requests from clients
	app.listen(3000, function () {
	  console.log('Listening on port 3000');
	});
	```

<br>
<br>

- Run the app:

	```shell
	$ node server
	```
	
- Browsing to `localhost:3000` will hit our app's root route that we defined and return "Hello World!".



- Using DevTools, we will find that despite just sending back the text of `<h1>Hello World!</h1>`, the browser "built" a minimal HTML document to display it in.

- The `send` method is a general purpose way to respond to the request, however, soon we'll be using more specific methods.

<br>
<br>

#### Basic Structure of Express App

- Here is a helpful outline of what a typical Express app does - let's put this guide right in our `server.js`:

```javascript
// Require modules
const express = require('express');

// Create the Express app
const app = express();

// Configure the app (app.set)


// Mount middleware (app.use)


// Mount routes
app.get('/', function(req, res) {
  	res.send('<h1>Hello World!</h1>');
});

// Tell the app to listen on port 3000
app.listen(3000, function() {
 console.log('Listening on port 3000');
});
```

<br>
<br>

#### Our First Route


- Let's replace the content we just sent from our route with something else.

	```javascript
	// Mount routes
	app.get('/', function(req, res) {
	  res.send('<h1>Hello Express</h1>');
	});
	```

- Refreshing the page will reveal that it didn't work!  This is because we have to restart the server, or...


<br>
<br>

#### Nodemon

- `nodemon` is a popular development tool used for automatically restarting our Express app when we save changes.

- If you are unsure if you've already installed it, you can make sure you have it or at least ensure you have the latest version by running:

	```shell
	$ npm i -g nodemon
	``` 
	Command line tools are installed using the `-g` (global) option

- Now, thanks to the `main` key in `package.json`, we can start the server by simply typing `nodemon`.

- Let's move on to routing...

<br>
<br>

#### Our First Route (Cont)


- Like most web frameworks, Express uses the `HTTP Method` and the `Path` of the HTTP request to match a route defined in the application.
	
- In our first route, we defined a route using the `get` method on the Express `app` object. 

- The `get` method defines a route that listens for a `GET` request. There are other methods such as `post`, `put` and `delete`, that map to the other HTTP verbs.


- The first argument provided to `app.get`, `/`, defines the path for the route. In this case the root of the application, i.e., just the host name like `localhost:3000`.

- In Express, all strings used to define a path should start with a forward-slash character (`/`).

- In tomorrow's Express lesson, we'll learn a preferred way of defining routes using the Express `Router` object, but you need to be aware of defining routes this way as well.


<br>
<br>

#### The Route's Callback


- The second argument provided to `app.get()` is a callback function:

	```javascript
	app.get('/', function(req, res) {
	  res.send('<h1>Hello Express</h1>');
	});
	```

- Express will execute route's callback function only when a matching HTTP request (HTTP Method + Path) is received.


- The route's callback function:

	```javascript
	app.get('/', function(req, res) {
	  res.send('<h1>Hello Express</h1>');
	});
	```
	defines two parameters: `req` & `res`

- `req`: Represents Express's [request object](https://expressjs.com/en/4x/api.html#req), and

- `res`: Represents Express's [response object](https://expressjs.com/en/4x/api.html#res)

- Express provides those two objects as arguments when it invokes the callback.



- The `request` object has properties and methods used to access information regarding the current HTTP request, including any data being sent from the browser.

- The `response` object contains properties and methods used to end the request/response cycle - like we've done so far using the  `res.send` method.

<br>
<br>

#### Practice - Define Another Route (3 mins)


- Define another route that matches a `get` request to a path of `/home` that sends a text response of `<h1>Home Page</h1>`.

- Test it by browsing to `localhost:3000/home`.

<br>
<br>

#### Review Question - Routing


- **Is it okay to define more than one route on the same path? <br>For example:**

```javascript
app.get('/cars', function(req, res) {
  res.send("Here's a list of my cars...");
});
	
app.post('/cars', function(req, res) {
  res.send('Thanks for the new car!');
});
```

<br>
<br>

#### Ways to Respond to a Request


- So far we have responded in our route handler (callback) code by using the `res.send` method.

- The [Express docs for the Response object](https://expressjs.com/en/4x/api.html#res) explains the other ways to respond to the HTTP request.

- Here are the methods we'll use the most:
  - `res.render()` - Render a view template and send the resulting HTML to the browser.
  - `res.redirect()` -	Tell the browser to issue another `GET` request.
  - `res.json()` - Send a JSON response (used when we communicate via AJAX).

<br>
<br>

#### Rendering Views

- Another of the three fundamental capabilities of a web framework is to be able to use a view engine to render templates.

- A template can include a mixture of static HTML and "code" that generates HTML dynamically.

- For example, code in a template could generate a series of `<li>` elements for data provided to it in an array.


- In Express, we use `res.render` to process a template using a _view engine_ and return the resulting HTML to the browser.

- Express can work with a multitude of _view engines_.

- [`Pug`](https://pugjs.org/api/getting-started.html) (formerly `Jade`) is a template language that leverages indentation to create HTML with a "shorthand" syntax.

- However, [`EJS`](https://www.npmjs.com/package/ejs) (Embedded JavaScript) templates are one of the most popular!


- Let's use EJS to render a `home` view for the existing `GET /home` route.

- Express applications are usually architected using the MVC design pattern, so we will put all view templates inside of a `views` folder:

	```shell
	$ mkdir views
	$ touch views/home.ejs
	```

- `ejs` is the file extension for the EJS view engine.


- Open `home.ejs` then type `!` and press tab to generate the HTML boilerplate:

	```html
	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <meta name="viewport" 
	    	content="width=device-width, initial-scale=1.0">
	    <meta http-equiv="X-UA-Compatible" content="ie=edge">
	    <title>First Express</title>
	</head>
	<body>
	    
	</body>
	</html>
	```


- For now, we will need to include the HTML boilerplate inside of every view.

- EJS includes the ability to make our views more DRY by using _partial views_.

- We will cover partial views later, however, if you want to check them out before then, check out the `include` function [here](https://www.npmjs.com/package/ejs#includes). 



- Let's add an `<h1>` inside the `<body>` so that we see something :)

```html
<body>
  <h1>Home Page</h1>
</body>
```


- Okay, now let's refactor the `GET /home` route's callback to render our new `home.ejs` template:

```javascript
app.get('/home', function(req, res) {
  res.render('home');
});
```

- Just the file name, not the `ejs` extension.

- Browse to `localhost:3000/home` and - it doesn't work...

- We're going to get a little practice reading Express errors in this lesson.

- The Express error _Error: No default engine was specified..._, makes it clear that we need to specify a view engine.

- This is our first opportunity to configure our app:

```javascript
// Configure the app (app.set)
app.set('view engine', 'ejs');
```
> Keep in mind, when we configure our server like this, our `ejs` view engine assumes all of our views ... i.e. (files with the `.ejs` extension, in this case), will be placed in a directory named `views` at the root of our directory.

- The `app.set` method is used to configure an Express app's settings...

- Refresh and let's see what the next error is...


- _Error: Cannot find module 'ejs'_ - this error is telling us that we need to install the EJS view engine package:

```shell
$ npm i ejs
```

- We don't need to `require` the view engine - Express knows how to find it.

- Refresh the page - success!

<br>
<br>

#### Dynamic Templating Using EJS


- Again, view engines are used to dynamically generate HTML on the server before sending it to the client.

- We just used the `render` method, passing in the view name as an argument.

- We can also pass in a JavaScript **object** as a second argument, and all of its properties will be accessible in the view within `ejs` tags!


- Let's say we want to render a list of To Dos.

- Normally, the To Dos would be coming from a database, however, we'll "fake" a DB by putting the To Dos in a module and export a method to return them.

- Do this to set up the module:

```shell
$ mkdir data
$ touch data/todo-db.js
```
	
- Next up, put code in the module...


- In the spirit of saving time, copy/paste the following inside of `todo-db.js`, then we'll review the code:

```javascript
module.exports = {
  getAll
};

const todos = [
  {text: 'Feed Dogs', done: true},
  {text: 'Learn Express', done: false},
  {text: 'Buy Milk', done: false}
];
	

function getAll() {
	return todos;
}
```


- To access our To Do "database", we need to `require` it inside of **server.js**:

```javascript
	
// require the todo "database"
const todoDb = require('./data/todo-db');
```

- Now let's add another route responsible for displaying the list of To Do's...


- Add this new route:

```javascript
app.get('/todos', function(req, res) {
  res.render('todos/index', {
   todos: todoDb.getAll()
  });
});
```
	
- Again, to pass data to a view, we pass an object as a second argument to `render`.

- We should now be able to access a `todos` variable in the `todos/index` view...


- It's a best practice to group views related to a data resource (in this case **To Dos**) in their own folder.

- We also commonly use `index` as a name for views, etc. used for **all** of something - in this case, displaying all To Dos.

- Therefore, we need an `index.ejs` view inside of a `views/todos` folder:

```shell
$ mkdir views/todos
$ touch views/todos/index.ejs
```


- Now let's code the `todos/index.ejs` view. Start by copying over the HTML from `home.ejs` and fix it up to look like this:

	```html
	<body>
	  <h1>Todos</h1>
	  <ul>
	    <% todos.forEach(function(todo) { %>
	      <li>
	        <%= todo.text %>
	          - 
	        <%= todo.done ? 'done' : 'not done' %>
	      </li>
	    <% }); %>
	  </ul>
	</body>
	```


- That my friends is embedded JavaScript between those `<% %>` and `<%= %>` tags and I believe you are going to love their simplicity!

- The `<% %>` EJS tags are for executing JavaScript such as control flow.

- The `<%= %>` EJS tags are for writing JS expressions into the HTML page.

- Refresh and browse to `localhost:3000/todos` - yeah!

<br>
<br>

#### Redirecting


- One last trick for the day...

- Currently, if we browse to the root route, we see"Hello Express", however...

- We can use the `res.redirect` method to redirect to `GET /home` so that we will see the Home page upon browsing to the app... 


- Refactor the root route as follows:

```javascript
app.get('/', function(req, res) {
 res.redirect('/home');
});
```

- Redirects tell the browser to make a new `GET` request to the provided `path`.

- Later, when we  start creating, updating, or deleting data, we will always perform a `redirect`.

<br>
<br>

#### Essential Questions

**❓ When we define routes in a web app, we are mapping HTTP requests to ________.**

**❓ What method do we call to render a view and on what object does that method exist?**

