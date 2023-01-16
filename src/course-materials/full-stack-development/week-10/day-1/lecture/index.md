# Full Stack Fruits Build with Mongo and Express
### Part 1 - Setup, Index, Show, New, Create

## Setup

- create a new folder

- create a server.js `touch server.js`

- create a new npm project `npm init -y`

- install dependencies `npm install express mongoose method-override ejs dotenv morgan`

- install nodemon as a dev dependency `npm install --save-dev nodemon`

- setup the following scripts in package.json

```json
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
```

#### Summary of Dependencies

    - express => web framework for create server and writing routes

    - mongoose => ODM for connecting to and sending queries to a mongo database

    - method-override => allows us to swap the method of a request based on a URL query

    - ejs => our templating engine

    - dotenv => will allow us to use a `.env` file to define environmental variables we can access via the `process.env` object

    - morgan => logs details about requests to our server, mainly to help us debug

- create a `.env` file with the following dependencies

```
DATABASE_URL=<use your mongodb.com url>
PORT=4000
```
- create a `.gitignore` file with the following (always a good habit to make one even if you have a global .gitignore, the global is there to catch you in case)

```
/node_modules
.env
```

## Setting Up Our server.js

### Import our dependencies

```js
/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config() // Load ENV Variables
const express = require("express") // import express
const morgan = require("morgan") //import morgan
const methodOverride = require("method-override")
const mongoose = require("mongoose")
```

### Establish Database Connection

```js
/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
// Setup inputs for our connect function
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

// Establish Connection
mongoose.connect(DATABASE_URL, CONFIG)

// Events for when connection opens/disconnects/errors
mongoose.connection
.on("open", () => console.log("Connected to Mongoose"))
.on("close", () => console.log("Disconnected from Mongoose"))
.on("error", (error) => console.log(error))
```

### Create Our Fruits Model

```js
////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
const {Schema, model} = mongoose

// make fruits schema
const fruitsSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean
})

// make fruit model
const Fruit = model("Fruit", fruitsSchema)
```
### Create App Object

```js
/////////////////////////////////////////////////
// Create our Express Application Object
/////////////////////////////////////////////////
const app = express()
```

### Register our Middleware

```js
/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")) //logging
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.urlencoded({extended: true})) // parse urlencoded request bodies
app.use(express.static("public")) // serve files from public statically
```

### Our initial route

```js
////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.get("/", (req, res) => {
    res.send("your server is running... better catch it.")
})
```

### Server Listener

```js
//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))
```

### The complete server.js file

```js
/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config() // Load ENV Variables
const express = require("express") // import express
const morgan = require("morgan") //import morgan
const methodOverride = require("method-override")
const mongoose = require("mongoose")


/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
// Setup inputs for our connect function
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

// Establish Connection
mongoose.connect(DATABASE_URL, CONFIG)

// Events for when connection opens/disconnects/errors
mongoose.connection
.on("open", () => console.log("Connected to Mongoose"))
.on("close", () => console.log("Disconnected from Mongoose"))
.on("error", (error) => console.log(error))


////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
const {Schema, model} = mongoose

// make fruits schema
const fruitsSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean
})

// make fruit model
const Fruit = model("Fruit", fruitsSchema)

/////////////////////////////////////////////////
// Create our Express Application Object
/////////////////////////////////////////////////
const app = express()

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")) //logging
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.urlencoded({extended: true})) // parse urlencoded request bodies
app.use(express.static("public")) // serve files from public statically

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.get("/", (req, res) => {
    res.send("your server is running... better catch it.")
})

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))
```

- run server `npm run dev`
- visit `localhost:4000` to see if our test route works

## Seeding Our Database

Before we build all our crud routes we should get some sample data in our database. There are two ways we can facilitate this:

- Seed Route: A route on our server when requested will delete everything in our database and re-seed it with some starter data
- Seed File: A script we can run (usually called seed.js) that'll empty and re-seed our database.

We'll create a seed route for now, later I'll also show you how to setup a seed file when we refactor the application later on.

Add This to your routes

```js
app.get("/fruits/seed", (req, res) => {

  // array of starter fruits
  const startFruits = [
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "orange", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: false },
        { name: "Coconut", color: "brown", readyToEat: false },
      ]

  // Delete all fruits
  Fruit.remove({}, (err, data) => {
    // Seed Starter Fruits
    Fruit.create(startFruits,(err, data) => {
        // send created fruits as response to confirm creation
        res.json(data);
      }
    );
  });
});
```

now we can use the url `/fruits/seed` as a reset button on our data, great for development. Keep in mind you would want to comment this out in production so users can't reset your data by accident.

## Index Route (Get => /fruits)

Mongoose allows you to write your queries in three ways

- using a callback (what you've done so far)
- using .then
- using async await

So here is how the route would look like all three ways:

#### Callback Method

```js
// index route
app.get("/fruits", (req, res) => {
  Fruit.find({}, (err, fruits) => {
    res.render("fruits/index.ejs", { fruits });
  });
});
```

#### The .then Method

```js
// index route
app.get("/fruits", (req, res) => {
  Fruit.find({})
  .then((fruits) => {
    res.render("fruits/index.ejs", { fruits });
  });
});
```

#### The Async/Await Method

```js
// index route
app.get("/fruits", async (req, res) => {
  const fruits = await Fruits.find({});
  res.render("fruits/index.ejs", { fruits });
});
```

## Setting Up Our Views

- create a views and public folder `mkdir views public`

- in the public folder let's make a css and javascript file `touch public/styles.css public/app.js`

- make a fruits and partials folder in views `mkdir views/fruits views/partials`

- make a head.ejs and header.ejs in your partials folder `touch views/partials/head.ejs views/partials/header.ejs`

- in the head.ejs file add the following

```html
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Fruits Website</title>
  <!-- Milligram CSS for Some Default Styling -->
  <!-- Google Fonts -->
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic"
  />

  <!-- CSS Reset -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css"
  />

  <!-- Milligram CSS -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.4.1/milligram.css"
  />

  <!-- Jquery -->
  <script
    src="https://code.jquery.com/jquery-3.6.0.min.js"
    integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
    crossorigin="anonymous"
  ></script>

  <!-- OUR CSS AND JS -->
  <link rel="stylesheet" href="/styles.css" />
  <script src="/app.js" defer></script>
</head>
```

- add the following in header.ejs

```html
<header>
  <h1>The Fruits App</h1>
</header>
```

- Now create `views/fruits/index.ejs`

```js
<!DOCTYPE html>
<html lang="en">
  <%- include("../partials/head.ejs") %>

  <body>
    <%- include("../partials/header.ejs") %>
    <main>
      <div>
        <% for (fruit of fruits) { %>

        <article>
          <a href="/fruits/<%= fruit._id %>">
            <h2>
              <%= fruit.name %> - <%= fruit.readyToEat ? "Ripe" : "Not Ripe" %>
            </h2>
          </a>
        </article>

        <% } %>
      </div>
    </main>
  </body>
</html>
```

Now we can see the list of fruits and whether they are ripe or not, except they all have links that don't take us anywhere... because we still need to make the show route and view.

## The Show Route (GET => /fruits/:id)

Add the following route to server.js (remember, always keep the show route at the bottom to avoid route naming collisions)

```js
// show route
app.get("/fruits/:id", (req, res) => {
    // get the id from params
    const id = req.params.id

    // find the particular fruit from the database
    Fruit.findById(id, (err, fruit) => {
        // render the template with the data from the database
        res.render("fruits/show.ejs", {fruit})
    })
})
```

- now create `views/fruits/show.ejs`

```html
<!DOCTYPE html>
<html lang="en">
  <%- include("../partials/head.ejs") %>

  <body>
    <%- include("../partials/header.ejs") %>
    <main>
      <div>

        <article>
          <h2><%= fruit.name %> - <%= fruit.readyToEat ? "Ripe" : "Not Ripe" %></h2>
          <h3><%= fruit.color %></h3>
          <a href="/fruits/<%= fruit._id %>/edit"><button>Edit</button></a>
          <form action="/fruits/<%= fruit._id %>?_method=DELETE" method="POST">
            <input type="submit" value="Delete"/>
          </form>
          <a href="/fruits/"><button>Back to Main</button></a>
        </article>

      </div>
    </main>
  </body>
</html>
```

So now we can see an individual fruit, we have the delete and edit button setup for later. But before we set that up let's make sure we can create a fruit!

## New Route (GET => /fruits/new)

This route should render a form for the user to create a new fruit, let's add the route! (Remember it should be above your show route)

```js
// new route
app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs")
})
```

- let's create `views/fruits/new.ejs`

```html
<!DOCTYPE html>
<html lang="en">
  <%- include("../partials/head.ejs") %>

  <body>
    <%- include("../partials/header.ejs") %>
    <main>
      <div>
        <form action="/fruits" method="post">
          <fieldset>
              <legend>Create a New Fruit</legend>
            <label>
              NAME:<input
                type="text"
                name="name"
                placeholder="enter fruit name"
              />
            </label>
            <label>
              COLOR:<input
                type="text"
                name="color"
                placeholder="enter fruit name"
              />
            </label>
            <label>
              READY TO EAT:<input type="checkbox" name="readyToEat" />
            </label>
          </fieldset>
          <input type="submit" value="create new fruit" />
        </form>
      </div>
    </main>
  </body>
</html>
```

- let's add a link to this page in fruits/index.ejs

```html
    <main>
      <div>
          <a href="/fruits/new"><button>Create A New Fruit</button></a>
        <% for (fruit of fruits) { %>

        <article>
          <a href="/fruits/<%= fruit._id %>">
            <h2>
              <%= fruit.name %> - <%= fruit.readyToEat ? "Ripe" : "Not Ripe" %>
            </h2>
          </a>
        </article>

        <% } %>
      </div>
    </main>
```

Form looks good but it has no create route to submit the forms data too! Let's take care of that!

## Create Route (POST => /fruits)

- let's add the route (location for this route doesn't particularly matter, but your always safe with INDUCES)

```js
// create route
app.post("/fruits", (req, res) => {
    // check if the readyToEat property should be true or false
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false
    // create the new fruit
    Fruit.create(req.body, (err, fruit) => {
        // redirect the user back to the main fruits page after fruit created
        res.redirect("/fruits")
    })
})
```

Now you should be able to add fruits!

## Edit Route (GET => /fruits/:id/edit)

This route should produce a form to edit the fruit with the specified id. Let's make the route, make sure it's above the show route.

```js
// edit route
app.get("/fruits/:id/edit", (req, res) => {
    // get the id from params
    const id = req.params.id
    // get the fruit from the database
    Fruit.findById(id, (err, fruit) => {
        // render template and send it fruit
        res.render("fruits/edit.ejs", {fruit})
    })
})
```

- let's make a copy of `views/fruits/new.ejs` and call it `views/fruits/edit.ejs` and refactor it so the form shows the current values of the fruit!

```html
<!DOCTYPE html>
<html lang="en">
  <%- include("../partials/head.ejs") %>

  <body>
    <%- include("../partials/header.ejs") %>
    <main>
      <div>
        <form action="/fruits/<%= fruit._id %>?_method=PUT" method="post">
          <fieldset>
            <legend>Edit a <%= fruit.name %></legend>
            <label>
              NAME:<input
                type="text"
                name="name"
                value="<%= fruit.name %>"
                placeholder="enter fruit name"
              />
            </label>
            <label>
              COLOR:<input
                type="text"
                name="color"
                value="<%= fruit.color %>"
                placeholder="enter fruit name"
              />
            </label>
            <label>
              READY TO EAT:<input type="checkbox" name="readyToEat" <%=
              fruit.readyToEat ? "checked" : "" %> />
            </label>
          </fieldset>
          <input type="submit" value="Update <%= fruit.name %>" />
        </form>
      </div>
    </main>
  </body>
</html>
```

Now that edit button we made earlier should take us to the form successfully, but the form doesn't do anything when submitted. That's because we still need to make the update route!

## Update Route (PUT =>  /fruits/:id)

Let's add the route

```js
//update route
app.put("/fruits/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    // check if the readyToEat property should be true or false
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false
    // update the fruit
    Fruit.findByIdAndUpdate(id, req.body, {new: true}, (err, fruit) => {
        // redirect user back to main page when fruit 
        res.redirect("/fruits")
    })
})
```

Now you can edit fruits

## Destroy (Delete => /fruits/:id)

This last route will allow our delete button to work giving us full CRUD functionality!

```js
app.delete("/fruits/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    // delete the fruit
    Fruit.findByIdAndRemove(id, (err, fruit) => {
        // redirect user back to index page
        res.redirect("/fruits")
    })
})
```

Success, you now have full crud functionality!

## Let's make it better

We will now go through seveal refactors to improve this code base, if you need to see the code as it before these refactors.

- [Code Before Refactoring](https://git.generalassemb.ly/AlexMerced/fruitsapp2.0/tree/norefactor)

*the main branch of that repo will reflect all the upcoming refactoring.

## Refactor #1 - Moving the Connection and Model into their own files.

Right now we have all our server logic inside server.js, this is easier when we are developing alone but can quickly become a mess as the code base and development team gets bigger. We should always seeks to separate concerns, meaning moving the different pieces of our application into their own files. So let's let's start setting up our project to have a more MVC structure.

#### Move the connection

- create a folder called models, and in it a file called connection.js

- move our connection code from server.js to models/connection.js

```js
/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const mongoose = require("mongoose");

/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
// Setup inputs for our connect function
const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Establish Connection
mongoose.connect(DATABASE_URL, CONFIG);

// Events for when connection opens/disconnects/errors
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error));


////////////////////////////////////////////////////
// Export the Connection
////////////////////////////////////////////////////

module.exports = mongoose
```
#### Moving the Model

- then we should house each of our models in their own file that uses the connection. Make a models/fruit.js and move the code defining the fruit model in there.

```js
//////////////////////////////////////////////
// Import Dependencies
//////////////////////////////////////////////
const mongoose = require("./connection")

////////////////////////////////////////////////
// Define Model
////////////////////////////////////////////////
// pull schema and model from mongoose
const { Schema, model } = mongoose;

// make fruits schema
const fruitsSchema = new Schema({
  name: String,
  color: String,
  readyToEat: Boolean,
});

// make fruit model
const Fruit = model("Fruit", fruitsSchema);

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Fruit
```

So now import the model where it is used (currently server.js)...

```js
/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const Fruit = require("./models/fruit")
```

Our server.js is already starting to look a lot cleaner!

## Refactor #2 - Move the fruit routes into a controller/router

It'll organize and speed up our application to bundle our related routes into routers, typically routes that share the same prefix/namespace. In this case we have several routes that start with `/fruits/` we can bundle all these into one router.

- make a folder called controllers and in that folder make a fruit.js

- let's import express and create a router in that file, then export that router

```js
////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Fruit = require("../models/fruit")

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////
// Routes
/////////////////////////////////////////


//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router
```

- Now copy over all our fruits routes from server.js to the routes section of our controller

- change each reference to `app` to `router`

- remove the `/fruits/` from the endpoint, we'll define this when we register the router

```js
////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const Fruit = require("../models/fruit");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

router.get("/seed", (req, res) => {
  const startFruits = [
    { name: "Orange", color: "orange", readyToEat: false },
    { name: "Grape", color: "purple", readyToEat: false },
    { name: "Banana", color: "orange", readyToEat: false },
    { name: "Strawberry", color: "red", readyToEat: false },
    { name: "Coconut", color: "brown", readyToEat: false },
  ];

  // Delete all fruits
  Fruit.remove({}, (err, data) => {
    // Seed Starter Fruits
    Fruit.create(startFruits, (err, data) => {
      // send created fruits as response to confirm creation
      res.json(data);
    });
  });
});

// index route
router.get("/", (req, res) => {
  Fruit.find({}, (err, fruits) => {
    res.render("fruits/index.ejs", { fruits });
  });
});

//new route
router.get("/new", (req, res) => {
  res.render("fruits/new.ejs");
});

// create route
router.post("/", (req, res) => {
  // check if the readyToEat property should be true or false
  req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
  // create the new fruit
  Fruit.create(req.body, (err, fruit) => {
    // redirect the user back to the main fruits page after fruit created
    res.redirect("/fruits");
  });
});

// edit route
router.get("/:id/edit", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // get the fruit from the database
  Fruit.findById(id, (err, fruit) => {
    // render template and send it fruit
    res.render("fruits/edit.ejs", { fruit });
  });
});

//update route
router.put("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // check if the readyToEat property should be true or false
  req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
  // update the fruit
  Fruit.findByIdAndUpdate(id, req.body, { new: true }, (err, fruit) => {
    // redirect user back to main page when fruit
    res.redirect("/fruits");
  });
});

router.delete("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // delete the fruit
  Fruit.findByIdAndRemove(id, (err, fruit) => {
    // redirect user back to index page
    res.redirect("/fruits");
  });
});

// show route
router.get("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;

  // find the particular fruit from the database
  Fruit.findById(id, (err, fruit) => {
    // render the template with the data from the database
    res.render("fruits/show.ejs", { fruit });
  });
});

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;

```

- now we can import the router into server.js and register it as middleware for any request that begins with `/fruits`

```js
/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const FruitRouter = require("./controllers/fruit")

/////////////////////////////////////////////////
// Create our Express Application Object
/////////////////////////////////////////////////
const app = express();

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically
app.use("/fruits", FruitRouter)

```

Your app should now be working just like it was before but now should be more organized. Notice all the pieces for fruits have been broken down into MVC.

- `models/fruit.js` - handles the getting the database connection and defining the fruit model (share of data)

- `views/fruits/` - this folder contains all our views/templates for our fruits

- `controllers/fruit.js` - creates all our routes which pull data from the model and sends them over to the templates

Essentially we just repeat this pattern for each category of functionality we want to add to our app.

## Refactor #3 - Using a Seed File

Seed routes are great convienient but you do run the risk of forgetting to remove the route before releasing the app creating a way a user can just reset your app, even if by accident. May be safer to seed your database in a non-route so only you can seed the database. This is usually dont by creating a seperate file that can be run as a script where you can put any database code you like.

- create a `models/seed.js` file

```js
///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require("./connection");
const Fruit = require("./fruit")

///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

// Make sure code is not run till connected
mongoose.connection.on("open", () => {

  ///////////////////////////////////////////////
  // Write your Seed Code Below
  //////////////////////////////////////////////

  // Run any database queries in this function
  const startFruits = [
    { name: "Orange", color: "orange", readyToEat: false },
    { name: "Grape", color: "purple", readyToEat: false },
    { name: "Banana", color: "orange", readyToEat: false },
    { name: "Strawberry", color: "red", readyToEat: false },
    { name: "Coconut", color: "brown", readyToEat: false },
  ];

  // Delete all fruits
  Fruit.remove({}, (err, data) => {
    // Seed Starter Fruits
    Fruit.create(startFruits, (err, data) => {
      // log the create fruits to confirm
      console.log("--------FRUITS CREATED----------");
      console.log(data);
      console.log("--------FRUITS CREATED----------");

      // close the DB connection
      mongoose.connection.close();
    });
  });

  ///////////////////////////////////////////////
  // Write your Seed Code Above
  //////////////////////////////////////////////

});
```

Let's write a script in package.json that will run this file for us

```js
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "seed": "node models/seed.js"
  },
```

Now we can run our seed with `npm run seed`

# Bonus Refactors if there is Time

## Refactor #4 - Adding Session Based Authentication

Let's define some terms

- Authentication: Proving the user exists usually with a password (logging in)
- Authorization: Checking if the logged in user is allowed to use the specified resource

**Authentication**

This is typically done by comparing a password a user has entered with one they provided at signup. The only wrinkle is for security purposes we will want to encrypt the password using something called bCrypt.

**Authorization**

There are two main ways to achieve this:

- Session Based Auth: This is a better choice if all resources the logged in user needs to access is on the same backend server. In this scenario a user logs in and a cookie is created for the browser session (until they close the browser or logout). This cookie will identify a tiny packet of data on our server we can then access with anything we'd like to store in it like the users login status or user information. 

*The data is on the server, the cookie allows us to know which data belongs to which logged in user.*

- JWT Token based Auth: This is a better choice for API and applications split accross multiple servers. Instead of saving the data on the server, the data is encoded into a token that each server knows how to decode. When accessing protected resources on the server the token must be presented. If the server can successfully decode the token then the user must be logged in, and the users info will be payload inside the decoded token.

*The data is on the token, the token proves we are logged in and contains our info in the browser not the server*

For our particular app, session based auth will be the better pattern. In units 3 & 4 where we will build APIs, JWT tokens will be the better way to do it.

#### Authorization

- Let's install some dependencies `npm install bcryptjs express-session connect-mongo`

  - bcryptjs: a pre-compiled version of bcrypt which we will use to encrypt passwords

  - express-session: middleware for creating session cookies

  - connect-mongo: plugin that will allow express session to save session data in our mongo database

**CREATE USER MODEL**

create `model/user.js`

```js
//////////////////////////////////////////////
// Import Dependencies
//////////////////////////////////////////////
const mongoose = require("./connection")

////////////////////////////////////////////////
// Define Model
////////////////////////////////////////////////
// pull schema and model from mongoose
const { Schema, model } = mongoose;

// make fruits schema
const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

// make fruit model
const User = model("User", userSchema);

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = User
```

**Create a User Controller**

- create `controllers/user.js`

```js
////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

// The Signup Routes (Get => form, post => submit form)
router.get("/signup", (req, res) => {
    res.render("user/signup.ejs")
})

router.post("/signup", (req, res) => {
    res.send("signup")
})

// The login Routes (Get => form, post => submit form)
router.get("/login", (req, res) => {
    res.render("user/login.ejs")
})

router.post("/login", (req, res) => {
    res.send("login")
})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;
```

- connect the router to server.js

```js
/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const FruitRouter = require("./controllers/fruit")
const UserRouter = require("./controllers/user")

/////////////////////////////////////////////////
// Create our Express Application Object
/////////////////////////////////////////////////
const app = express();

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically
app.use("/fruits", FruitRouter)
app.use("/user", UserRouter)
```

**CREATE USER VIEWS**

- create `views/user/signup.ejs` and `views/user/login.ejs`

`signup.ejs`

```html
<!DOCTYPE html>
<html lang="en">
  <%- include("../partials/head.ejs") %>

  <body>
    <%- include("../partials/header.ejs") %>
    <main>
      <div>
        <form action="/user/signup" method="post">
          <fieldset>
            <legend>New User</legend>
            <label
              >USERNAME: <input type="text" name="username" required />
            </label>
            <label
              >PASSWORD: <input type="password" name="password" required />
            </label>
            <input type="submit" value="Create Account" />
          </fieldset>
        </form>
      </div>
    </main>
  </body>
</html>
```

`login.ejs`

```js
<!DOCTYPE html>
<html lang="en">
  <%- include("../partials/head.ejs") %>

  <body>
    <%- include("../partials/header.ejs") %>
    <main>
      <div>
        <form action="/user/login" method="post">
          <fieldset>
            <legend>User Login</legend>
            <label
              >USERNAME: <input type="text" name="username" required />
            </label>
            <label
              >PASSWORD: <input type="password" name="password" required />
            </label>
            <input type="submit" value="Login" />
          </fieldset>
        </form>
      </div>
    </main>
  </body>
</html>
```

**Make Signup Post Response**

`controllers/user.js`

```js
router.post("/signup", async (req, res) => {
    // encrypt password
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
    // create the new user
    User.create(req.body, (err, user) => {
        //redirect to login page
        res.redirect("/user/login")
    })
})
```

**Make Login Post Response**

```js
router.post("/login", (req, res) => {
  // get the data from the request body
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    // checking if userexists
    if (!user) {
      res.send("user doesn't exist");
    } else {
      //check if password matches
      const result = bcrypt.compareSync(password, user.password);
      if (result) {
        res.redirect("/fruits");
      } else {
        res.send("wrong password");
      }
    }
  });
});
```

Users need a way to get to the login and sign up pages so let's refactor the home route in server.js.

```js
app.get("/", (req, res) => {
  res.render("index.ejs")
});
```

let's create a `views/index.ejs`

```html
<!DOCTYPE html>
<html lang="en">
  <%- include("./partials/head.ejs") %>

  <body>
    <%- include("./partials/header.ejs") %>
    <main>
      <div>
        <a href="/user/signup"><button>Signup</button></a>
        <a href="/user/login"><button>Login</button></a>
      </div>
    </main>
  </body>
</html>
```

#### Authorization

So now a user can signup and login but it doesn't really do much for us. A user can still access all pages whether they are logged in or not and the app doesn't remember if they are logged in after they switch pages. So while the user is authenticated we need to setup the ability to track whether they have authority to access things, authorization.

**Configuring Sessions Middleware**

Add a SECRET to your environment variables

```
SECRET=thisCanBeAnythingYouWant
```

Let's adjust our middleware in server.js

```js
/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const FruitRouter = require("./controllers/fruit")
const UserRouter = require("./controllers/user")
const session = require('express-session');
const MongoStore = require('connect-mongo');

/////////////////////////////////////////////////
// Create our Express Application Object
/////////////////////////////////////////////////
const app = express();

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically
app.use(session({
  secret: process.env.SECRET,
  store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
  saveUninitialized: true,
  resave: false,
}))
app.use("/fruits", FruitRouter)
app.use("/user", UserRouter)
```

This now adds a property to the request object (req.session), we can use this object to store data between requests. Perfect for storing whether the user is logged in or not!

**Saving Login info in Session**

Refactor your login post route in `controllers/user.js`

```js
router.post("/login", (req, res) => {
  // get the data from the request body
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    // checking if userexists
    if (!user) {
      res.send("user doesn't exist");
    } else {
      //check if password matches
      const result = bcrypt.compareSync(password, user.password);
      if (result) {
        req.session.username = username
        req.session.loggedIn = true
        res.redirect("/fruits");
      } else {
        res.send("wrong password");
      }
    }
  });
});
```

add a logout route to destroy the session

```js
router.get("/logout", (req, res) => {
    // destroy session and redirect to main page
    req.session.destroy((err) => {
        res.redirect("/")
    })
})
```

**Authorization Middleware**

So now the user data is in sessions, we just need middleware to check it and bounce users to login if they try to access pages that require login.

We will only add this protection to our `/fruits` routes, so we'll add it as middleware in our fruits router. 

`controllers/fruit.js`

```js
////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const Fruit = require("../models/fruit");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

////////////////////////////////////////
// Router Middleware
////////////////////////////////////////
// Authorization Middleware
router.use((req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/user/login");
  }
});
```

**Add Logout Button**

Add the following button to `views/fruits/index.ejs`

```html
<a href="/user/logout"><button>Logout</button></a>
```

**User Specific Fruits**

Wouldn't it be nice if each fruit belonged to a user, and the user can only see their fruits when they login?

1. first we need to update the model so we can track the username of the creater in `models/fruit.js`

```js
// make fruits schema
const fruitsSchema = new Schema({
  name: String,
  color: String,
  readyToEat: Boolean,
  username: String
});
```

2. Then we need to refactor the create route to add the username before creating the fruit, in `controllers/fruit.js`

```js
// create route
router.post("/", (req, res) => {
  // check if the readyToEat property should be true or false
  req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
  // add username to req.body to track related user
  req.body.username = req.session.username
  // create the new fruit
  Fruit.create(req.body, (err, fruit) => {
    // redirect the user back to the main fruits page after fruit created
    res.redirect("/fruits");
  });
});
```

3. Update index route to only show the logged in users fruits, by querying only fruits whose username matches the username stored in session

```js
// index route
router.get("/", (req, res) => {
  Fruit.find({username: req.session.username}, (err, fruits) => {
    res.render("fruits/index.ejs", { fruits });
  });
});
```

There you go, users can login and out and only see fruits associated with their account!

## Bonus Refactor #5 - Incorporating AlpineJS

- [AlpineJS Documentation](https://alpinejs.dev/directives/transition)

Let's make our frontend code a little more exciting by creating stateful logic with AlpineJS. First we need to include Alpine in our head.ejs. While we can do this manually with Javascript or jQuery, Alpine gives us an easy to toggle visibility of elements and more.

```js
<script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>

```

Let's Incorporate it on the show page, making the delete and edit buttons only show if desired.

```js
<!DOCTYPE html>
<html lang="en">
  <%- include("../partials/head.ejs") %>

  <body>
    <%- include("../partials/header.ejs") %>
    <main>
      <div>

        <article x-data="{showTools: false}">
          <h2><%= fruit.name %> - <%= fruit.readyToEat ? "Ripe" : "Not Ripe" %></h2>
          <h3><%= fruit.color %></h3>
          <button x-on:click="showTools = !showTools">Show Options</button>
          <div x-show="showTools" x-transition>
          <a href="/fruits/<%= fruit._id %>/edit"><button>Edit</button></a>
          <form action="/fruits/<%= fruit._id %>?_method=DELETE" method="POST">
            <input type="submit" value="Delete"/>
          </form>
          <a href="/fruits/"><button>Back to Main</button></a>
          </div>
        </article>

      </div>
    </main>
  </body>
</html>
```
To review the directives being used:

- x-data: creates a batch variables we can refer tool within that HTML element
- x-show: makes visibility of HTML element based on expression/variable
- x-on:click: runs an expression when element is clicked
- x-transition: applies transitions when possible to make changes of visibility more aesthetic

## Bonus Refactor #6 - Incorporating HTMX

- [HTMX Documentation](https://htmx.org/docs/)

Right now as we go from page to page, the entire page is being re-rendered when only parts of it really need it. With HTMX we can make our get/post/put/delete requests and instead of replacing the whole page only replace the parts we need creating a smoother experience as user travel around our site.

Let's try to apply to our fruits index page.

- first let's add HTMX to our head.ejs

```html
    <script src="https://unpkg.com/htmx.org@1.5.0"></script>
```

`views/fruits/index.ejs`

```html
<!DOCTYPE html>
<html lang="en">
  <%- include("../partials/head.ejs") %>

  <body>
    <%- include("../partials/header.ejs") %>
    <main>
      <div>
          <a href="/fruits/new"><button>Create A New Fruit</button></a>
          <a href="/user/logout"><button>Logout</button></a>
        <% for (fruit of fruits) { %>

        <article>

            <h2 
            hx-get="/fruits/<%= fruit._id %>"
            hx-trigger="click"
            hx-target="div"
            hx-swap="innerHTML">
              <%= fruit.name %> - <%= fruit.readyToEat ? "Ripe" : "Not Ripe" %>
            </h2>

        </article>

        <% } %>
      </div>
    </main>
  </body>
</html>
```

- hx-get: will make a get request to the following url when triggered
- hx-trigger: specifies the trigger
- hx-target: will take a css selector to determine the element to inject the response HTML
- hx-swap: will determine the swap behavior (in this case replace innerHTML)

It works but as you can see it is now inject the header a second time, so let's remove all the partials from out show.ejs since it doesn't need them anymore. Now show.ejs will render faster and the update of the page is faster, won't be that noticable in this app but in larger apps this can make a quite a difference.

`show.ejs`

```js
<article x-data="{showTools: false}">
  <h2><%= fruit.name %> - <%= fruit.readyToEat ? "Ripe" : "Not Ripe" %></h2>
  <h3><%= fruit.color %></h3>
  <button x-on:click="showTools = !showTools">Show Options</button>
  <div x-show="showTools" x-transition>
    <a href="/fruits/<%= fruit._id %>/edit"><button>Edit</button></a>
    <form action="/fruits/<%= fruit._id %>?_method=DELETE" method="POST">
      <input type="submit" value="Delete" />
    </form>
    <a href="/fruits/"><button>Back to Main</button></a>
  </div>
</article>
```

Now it should be working like before but now the server doesn't have to render as much when you ask for the show page.

## Bonus Refactor #7 - Isolating the Middleware

Let's move the middleware into it's own file like we did the models and controllers

`utils/middleware.js`

```js
/////////////////////////////////////////
// Dependencies
/////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const FruitRouter = require("../controllers/fruit");
const UserRouter = require("../controllers/user");
const session = require("express-session");
const MongoStore = require("connect-mongo");

/////////////////////////////////////
// MiddleWare Function
//////////////////////////////////////

const middleware = (app) => {
  app.use(morgan("tiny")); //logging
  app.use(methodOverride("_method")); // override for put and delete requests from forms
  app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
  app.use(express.static("public")); // serve files from public statically
  app.use(
    session({
      secret: process.env.SECRET,
      store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
      saveUninitialized: true,
      resave: false,
    })
  );
  app.use("/fruits", FruitRouter);
  app.use("/user", UserRouter);
};

///////////////////////////////////////////
// Export Middleware Function
//////////////////////////////////////////
module.exports = middleware
```

Now we can really strip down our server.js

```js
/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const express = require("express"); // import express
const middleware = require("./utils/middleware");

/////////////////////////////////////////////////
// Create our Express Application Object
/////////////////////////////////////////////////
const app = express();

//////////////////////////////////////////////////
// Register Middleware
//////////////////////////////////////////////////
middleware(app);

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.get("/", (req, res) => {
  res.render("index.ejs");
});

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));
```

## Bonus Refactor #8 - the home router

Let's get all routes outside of server.js by making a homerouter for "/" routes

- create `controllers/home.js`

```js
////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

router.get("/", (req, res) => {
    res.render("index.ejs");
  });

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;
```

- let's connect the router in our middleware.js

```js
/////////////////////////////////////////
// Dependencies
/////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const FruitRouter = require("../controllers/fruit");
const UserRouter = require("../controllers/user");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const HomeRouter = require("../controllers/home")

/////////////////////////////////////
// MiddleWare Function
//////////////////////////////////////

const middleware = (app) => {
  app.use(morgan("tiny")); //logging
  app.use(methodOverride("_method")); // override for put and delete requests from forms
  app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
  app.use(express.static("public")); // serve files from public statically
  app.use(
    session({
      secret: process.env.SECRET,
      store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
      saveUninitialized: true,
      resave: false,
    })
  );
  app.use("/fruits", FruitRouter);
  app.use("/user", UserRouter);
  app.use("/", HomeRouter)
};

///////////////////////////////////////////
// Export Middleware Function
//////////////////////////////////////////
module.exports = middleware
```

Now we can remove the routes from server.js making super streamlined

```js
/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const express = require("express"); // import express
const middleware = require("./utils/middleware");

/////////////////////////////////////////////////
// Create our Express Application Object
/////////////////////////////////////////////////
const app = express();

//////////////////////////////////////////////////
// Register Middleware
//////////////////////////////////////////////////
middleware(app);

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));
```

- [See the Final Code Here](https://git.generalassemb.ly/AlexMerced/fruitsapp2.0)