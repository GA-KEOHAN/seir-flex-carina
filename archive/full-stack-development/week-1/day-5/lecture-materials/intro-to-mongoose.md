---
track: "Full-Stack Development"
title: "Intro to Mongoose"
week: 1
day: 4
type: "lecture"
---

# Intro To Mongoose 

<br>
<br>
<br>
<br>




## Learning Objectives


- Describe the use case for Mongoose

- Define a basic Schema for a single Model

- Create and Read documents using a Model

- Define default values in a Schema

- Define validations in a Schema


<br>
<br>
<br>





## Roadmap


1. Setup
1. Intro to Mongoose
1. Including Mongoose in an app
1. Defining Schemas in Mongoose
1. Built-in Types for Properties
1. Compiling Schemas into Models
1. Use a Model to Create data
1. Use a Model to Read data
1. Defining default values for a Property
1. Defining validations for a Property
1. Essential Questions


<br>
<br>
<br>




#### Setup 

For this lecture, we'll need to get setup with a brand new express app in our practice folder for this week, (this is great practice with the workflow). 

We're going to make a movies app!

1. Make a directory called `mongoose-movies` then change into it

```bash
mkdir mongoose-movies
cd mongoose-movies/
```


2. Create a `server.js` file

```bash
touch server.js
```

3. Create a `package.json` file and accept all defaults using `npm init -y`

```bash
npm init -y
```


4. Install base dependencies

```bash
npm i express ejs morgan
```


5. Set up boilerplate for `server.js`

```javascript
// Require modules
const express = require('express');
const morgan = require('morgan');
const port = 3000; 

// Set up express app
const app = express();

// Connect to DB


// Configure the app with app.set()
app.set('view engine', 'ejs');

// Mount middleware with app.use()
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// Mount routes with app.use()

// Tell App to listen
app.listen(port, function() {
    console.log(`Express is listening on port:${port}`);
});
```

6. Create `routes`, `views`, and `public` directories

```bash
mkdir routes controllers views public
```

7. Add the appropriate subdirectories to your `public` directory

```bash
mkdir public/css public/js public/images 
```

8. Add base files to your sub directories

```bash
touch views/index.ejs routes/index.js controllers/index.js public/css/style.css 

```

9. Add some boilerplate `html` to `views/index.ejs`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel='stylesheet' href='/css/style.css' />
  <title>Mongoose Movies</title>
</head>
<body>
  <h1>Mongoose Movies</h1>
  <p>Welcome!</p>
</body>
</html>
```

10. Let's set up our routes and controller actions for our root routes


```javascript
// inside of routes/index.js

const express = require('express');
const router = express.Router();
const indexCtrl = require('../controllers/index');


router.get('/', indexCtrl.index);

module.exports = router;
```

```javascript
// inside of controllers/index.js
module.exports = {
    index
};

function index(req, res) {
    res.render('index');
}
```


11. Now we require and mount our index router inside of `server.js`

```javascript
// Require modules
const express = require('express');
const morgan = require('morgan');
const port = 3000;
const indexRouter = require('./routes/index');
// ^-- requiring the indexRouter


// more code below...
```
**...don't forget to mount your router**

```javascript

// more code above

// Mount Routes app.use()
app.use('/', indexRouter);

```

**Perfect! Let's start up the app with `nodemon` and check for errors**

<br>
<br>
<br>





## Intro to Mongoose


- What is Mongoose?

- Sneak peak of some Mongoose code

- The big picture

- **Mongoose** is the most popular way to perform CRUD operations on a MongoDB database.

- Mongoose is called an **Object Document Mapper (ODM)** because it maps object-oriented JavaScript to MongoDB _documents_.

- Mongoose makes it easier to perform CRUD using object-oriented JavaScript instead of working directly MongoDB.


<br>
<br>
<br>




#### What is Mongoose?


- Let's check out the landing page for Mongoose and see what it has to say for itself...

	<a href="http://mongoosejs.com/index.html" target="_blank">Mongoose Homepage</a>


**According to Mongoose's homepage:**

_"Mongoose provides a straight-forward, **schema-based** solution to model your application data..."_

- Wait a minute, what's with this "schema" business, isn't MongoDB schema-less?  

- Well, yes it is, however, it turns out that the vast majority of applications benefit when their data conforms to a defined structure (schema).

- Mongoose allows us to define schemas and ensures that documents conform to them.


<br>
<br>
<br>





**Mongoose also provides lots of other useful functionality:**
	- Default property values
	- Validation
	- Automatic related model population via the `populate` method
	- _Virtual properties_ - create properties like "fullName" that are not persisted in the database
	- Custom _Instance methods_ which operate on a document
	- _Static methods_ which operate on the entire collection 
	- `pre` and `post` event lifecycle hooks (Mongoose "middleware")


<br>
<br>
<br>




#### The Big Picture 


- Here is a big picture overview of the purpose of Mongoose's **Schema** and **Model** components:

<img src="https://i.imgur.com/Q6A7KTQ.png" width="900">


#### Big Picture Example 

- Assuming the following schema:

```javascript
const postSchema = new mongoose.Schema({
content: String
});
```

- It can be compiled into a model and that model exported like this:

```javascript
module.exports = mongoose.model('Post', postSchema);
```

- The model can then be required and used to perform CRUD on the `posts` collection in the MongoDB:

```javascript
const Post = require('./models/post');
Post.create({content: 'Amazing post...'});
```

<br>
<br>
<br>



### Review Questions


**❓ In your own words, describe the use case for Mongoose (what is it's purpose and when might you choose to use it?).**

**❓ A Mongoose _________ is compiled into a Mongoose Model.**

**❓ We use a Mongoose  _________ to perform CRUD operations on a MongoDB.**.



<br>
<br>
<br>




### Including Mongoose in an App and Connecting to MongoDB

1. [Create a Cloud Hosted MongoDB](/full-stack-development/week-1/day-5/lecture-materials/create-an-atlas-hosted-mongodb/)

2. Install Mongoose

3. Configure Mongoose in a module

4. Add an event listener to the Mongoose connection

<br>
<br>
<br>





#### Install Mongoose


- Installing the Mongoose package is straight forward:

```shell
$ npm i mongoose
```

<br>
<br>
<br>




	
#### Configure Mongoose in a module


- We're going to create a separate module named `database.js` and put it in a folder named `config`:

<br>
<br>
<br>


```shell
$ mkdir config
$ touch config/database.js
```

<br>
<br>


- Then in `database.js`, let's connect to a database named `movies` that we'll first need to set up on **MongoDB Atlas** using [**this guide**](/full-stack-development/week-1/day-5/lecture-materials/create-an-atlas-hosted-mongodb/):

<br>
<br>


```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://<username>:<password>@cluster0.oc1n0.mongodb.net/movies?retryWrites=true&w=majority/movies', {
	useNewUrlParser: true, 
	useCreateIndex: true,
	useUnifiedTopology: true 
});
```

<br>
<br>

🚨 <strong style="color: crimson;">PLEASE NOTE 🚨</strong> <u>Make sure you replace the `<username>` & `<password>` in your connection string with your actual username and password</u> ... **without the < > brackets** 😅


<br>
<br>

	
**ALSO NOTE:** The `{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}` options avoid deprecation warnings.


- In order for the code in `database.js` to run and connect to the database, we must require it in `server.js`:

```javascript
const express = require('express');
const morgan = require('morgan');
const port = 3000; 
const indexRouter = require('./routes/index');
// Set up express app
const app = express();

// connect to the database with Mongoose
require('./config/database');

// more code below
```


**Note that we aren't assigning our module to a variable. That's because there's no need to because:**

<br>
<br>




- We're not exporting anything of use - why assign to a variable?
- Calling `require('./config/database')` is all it takes to make the code run
- We can `require` Mongoose in any module we want and it will always refer to the same _configured_ Mongoose instance

<br>
<br>
<br>




#### Start up the App 

**Time to check if our app starts up without errors...**

- Ensure that the MongoDB engine is running. You will have to run `mongod` in a separate terminal session if you haven't already told MongoDB to start automatically with`brew services start mongodb`.



- Start our app:`$ nodemon`

- Browse to:`localhost:3000`

- No errors? Great!  However, wouldn't it be nice to know that our connection to our database was successful?  Sure it would...

<br>
<br>
<br>





#### Adding event listeners to the Mongoose connection


- The Mongoose connection object inherits from Node's `EventEmitter` which allows us to listen to defined events.

- Let's listen to the `connected` event...


<br>
<br>
<br>





#### Adding event listeners 

- Let's modify our _database.js_ module as follows:

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://<username>:<password>@cluster0.oc1n0.mongodb.net/movies?retryWrites=true&w=majority/movies', {
  	useNewUrlParser: true, 
  	useCreateIndex: true, 
  	useUnifiedTopology: true
});

// shortcut to mongoose.connection object
const db = mongoose.connection;

db.on('connected', function() {
console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

```

- Check for the _Connected to MongoDb..._ message in the server terminal.

<br>
<br>
<br>




### Review Questions

**❓ What is the advantage of creating a `database.js` module?**

**❓ What method on the Mongoose object connects to a MongoDB database?**


<br>
<br>
<br>




### Defining Schemas in Mongoose


1. Create a module for the Schema/Model

2. Define a basic Schema for a `Movie` model


<br>
<br>
<br>





#### Create a module for the Schema/Model


- Now that we are connected to the MongoDB engine, it's time to define our first schema.

- So, where are we going to put our app's schemas and models?  In their own folder - of course!

- The MVC design pattern influences our code organization:

```shell
$ mkdir models
$ touch models/movie.js
```

<br>
<br>
<br>




#### Define a basic Schema for a _Movie_ model


- We will always have a single file per Mongoose Model where:
	1. We define the schema,
	2. Compile the schema into a model, and
	3. Export that model.


- In the schema/model module, we will always do this:

```javascript
const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;
```

- Creating the shortcut to the `mongoose.Schema` class is optional but convenient when defining complex schemas.

- Now let's define our schema...

<br>
<br>
<br>




#### Define a basic Schema 


- Here's our basic _Movie_ schema:

```javascript
const Schema = mongoose.Schema;
	
const movieSchema = new Schema({
  title: String,
  releaseYear: Number,
  mpaaRating: String,
  cast: [String]
});
```

- Note the `cast` property's type is an Array of Strings.

- Mongoose vocababulary:
	- A **property** may be referred to as a "**path**", or "**field**".

<br>
<br>



**💪 YOU DO:**
- Add an additional property named `nowShowing` with a type of `Boolean` (make sure that it's uppercased so that it refers to JavaScript's built-in `Boolean` object wrapper).

- Awesome! We have defined a Mongoose schema!

- As we progress toward learning more about Mongoose, we will be adding more properties and functionality to the `movieSchema`.

- For now, let's take a look at the eight built-in types available...

<br>
<br>
<br>




#### Built-in Types for Properties

- The types that we can assign to properties are known as `SchemaTypes`

- There are 8 types that we can specify for our properties:
	- **String**
	- **Number**
	- **Boolean**
	- **Date**
	- **mongoose.Schema.Types.ObjectId**
	- **mongoose.Schema.Types.Buffer**
	- **`[]` (Array)** 
	- **mongoose.Schema.Types.Mixed**


- Notice that Mongoose uses a few types that are not built into JavaScript:
	- **mongoose.Schema.Types.ObjectId**
	- **mongoose.Schema.Types.Buffer**
	- **mongoose.Schema.Types.Mixed**

- When we need to specify one of the above types, e.g., `ObjectId`, we will need to ensure that we access them through the object hierarchy. 

- Defining that `Schema` shortcut variable, enables us to write `Schema.Types.ObjectId`, leaving off the `mongoose.`.


<br>
<br>
<br>





### Compiling Schemas into Models


**Remember - Models, not schemas are used to perform CRUD**


- Mongoose performs CRUD using a **Model**.

- Compiling a schema into a model is as easy as calling the `mongoose.model` method:

```javascript
const Schema = mongoose.Schema;
		
const movieSchema = new Schema({
  title: String,
  releaseYear: Number,
  mpaaRating: String,
  cast: [String],
  nowShowing: Boolean
});
	
// Compile the schema into a model and export it
module.exports = mongoose.model('Movie', movieSchema);
```
- **There is a one-to-one mapping between Mongoose models and MongoDB collections**.

- By default, the collection will be named as the pluralized version of the model in all lower-case.

- The collection name can be overridden when compiling the model, but it's uncommon to do so.

<br>
<br>
<br>





#### Use a Model to Create data

- Now that we have a model, we're ready to perform some CRUD!

- First up is **creating** data.

- We can use a Mongoose Model in two ways to create documents in the collection:
	- `const instance = new Model()`, then`instance.save()`, or
	- `Model.create()`

- Let's see how we can `create` a document in a Node REPL...


- Warning, if you make a typo, you'll have to start over:

```shell
$ node
> require('./config/database')
> const Movie = require('./models/movie')
> Movie.create({
... title: 'Star Wars',
... releaseYear: 1977
... }, function(err, doc) {
... console.log(doc);
... })
```

- Logged out will be a document that looks something like...


- Here's the newly created document:

```shell
{ __v: 0,
 title: 'Star Wars',
 releaseYear: 1977,
 _id: 57ea692bab09506a97e969ba,
 cast: []
}
```

- The `__v` field is added by Mongoose to track versioning - ignore it.


- Note that we did not provide a value for `nowShowing` so it was not created as a property in the document.

- However, properties of type Array, are always initialized to empty arrays like `cast` was. This makes it easy to start pushing performers into  it!


- That was fun! Exit the REPL (`ctrl + C` twice) and let's see how we can use`new` + `save` to create movie documents - but this time from within our app.

<br>
<br>
<br>




**As we build out our CRUD functionality, here is the process we will repeat:**

1. Determine the verb + URI for the route.  Use RESTful conventions whenever possible.
2. Add the UI (link and/or forms) to the view that will trigger the request.
3. Define the route in the appropriate router module for the request, mapping it to the `<controller>.<method>`.
4. Add the controller action/method and be sure to export it.
5. In the controller, perform necessary CRUD and either `render` (passing it the data) or `redirect`.


- Referring back to our routing chart from the routing lesson this week, we find that to display a `new.ejs` view with a form for entering movies, the proper route will be:

```shell
GET /movies/new
```

- At this point, we need to finish coding out the router and controller modules for our movies resource; let's take care of that now


- First, let's make the file we'll use to create our movies router

```bash
touch routes/movies.js
```

- Inside of `routes/movies.js`, set up the router and code our first route responsible for showing a form for entering a movie:

```javascript
const express = require('express');
const router = express.Router();
const moviesCtrl = require('../controllers/movies');

// GET /movies/new
router.get('/new', moviesCtrl.new);

module.exports = router;
```

- Don't forget to require and mount our router inside of `server.js`

```javascript
const moviesRouter = require('./routes/movies');
```

```javascript
app.use('/movies', moviesRouter);
```

> You will most likely getting errors in your terminal at this point - we need a controller

<br>
<br>




**💪 YOU DO: Create the controller, export the `new` action & create the view!**

<br>
<br>




Start by creating `controllers/movies.js`

```shell
touch controllers/movies.js
```

<br>
<br>




**The `new` action is just the first of several that are going to be exported from this module.**


The code in the `new` action is pretty simple:

```javascript
module.exports = {
    new: newMovie
};

function newMovie(req, res) {
 res.render('movies/new');
}
```

<br>

**Now for the view.**

- As we've discussed, organizing views for a certain model into a dedicated folder makes sense:

```shell
$ mkdir views/movies
$ touch views/movies/new.ejs
```
	
- Next, add the HTML boilerplate to `new.ejs`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel='stylesheet' href='/css/style.css' />
  <title>Mongoose Movies</title>
</head>
<body>
	<!-- More html will go here -->
</body>
</html>
```

<br>
<br>
<br>




**Here's our awesome but ugly form; we'll add this inside of the body of our html**

<br>

```html
<h2>Enter a New Movie</h2>
<form action="/movies" method="POST">
  <label>Title:
   <input type="text" name="title">
  </label>
  <label>Release Year:
   <input type="text" name="releaseYear">
  </label>
  <label>MPAA Rating
   <select name="mpaaRating">
   <option value="G">G</option>
   <option value="PG">PG</option>
   <option value="PG-13">PG-13</option>
   <option value="R">R</option>
   </select>
  </label>
  <label>Cast (separate actors with commas):
   <input type="text" name="cast">
  </label>
  <label>Now Showing:
   <input type="checkbox" name="nowShowing" checked>
  </label>
  <input type="submit" value="Add Movie">
</form>
```

<br>
<br>



#### Use a Model to Create data 


- Note that we've already set the `action` & `method` attributes to match the proper RESTful route to submit the form to.

- Let's define that route in **routes/movies.js**:

```javascript
router.post('/', moviesCtrl.create);
```
	
- The next step is to write that `create` controller action...

- In **controllers/movies.js** we're going to be using our `Movie` model, so we need to require it at the top:

```javascript
const Movie = require('../models/movie');
```

- Shortly we'll talk through how to use the `Movie` Model in the controller to create the movie submitted by the form.

- We'll review it as we type it...

- Don't forget to export `create`, then write the function:

```javascript
module.exports = {
    new: newMovie,
    create
};
```

- This is our controller action for `create`
  
```javascript
function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  // remove whitespace next to commas
  req.body.cast = req.body.cast.replace(/\s*,\s*/g, ',');
  // split if it's not an empty string
  if (req.body.cast) req.body.cast = req.body.cast.split(',');
  
  const movie = new Movie(req.body);

  movie.save(function(err) {
    // one way to handle errors
    if (err) return res.render('movies/new');
    console.log(movie);
    // for now, redirect right back to new.ejs
    res.redirect('/movies/new');
  });
}
```


- You should now be able to submit movies - congrats!

- Now that we have created a movie or two, let's see how we use Mongoose models to read documents from a MongoDB collection...


- The querying ability of Mongoose is **very** capable.  For example:

```javascript
Movie.find({mpaaRating: 'PG'})
	.where('releaseYear').lt(1970)
	.where('cast').in('Bob Hope')
	.sort('-title')
	.limit(3)
	.select('title releaseYear')
	.exec(cb);
``` 

- But we're going to start with the basics :)

<br>
<br>
<br>





### Here are the useful methods on a Model for querying data:

- `find`: Returns an array of all documents matching the _query object_
		
```javascript
Movie.find({mpaaRating: 'PG'}, function(err, movies) {...
```

<br>
<br>
<br>





- `findById`: Find a document based on it's `_id`
	
```javascript
Movie.findById(req.params.id, function(err, movie) {...
```

<br>
<br>


- `findOne`: Find the first document that matches the _query object_

```javascript
Movie.findOne({releaseYear: 2000}, function(err, movie) {...
```

<br>
<br>
<br>

#### Reading Data - Practice (20 min)

<br>
<br>

**💪 YOU DO - Display the list of movies!**

- Define the RESTful route
- Write the controller `index` action to read and provide all movies to the view
- Create an **index.ejs** view to display in an HTML table.

- Hint: In the view, use the array `join` method to concatenate the names inside of the `cast` array.

**We'll review shortly.**

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

### Warning - Spolier Below

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>


**Not Sure How To Start? - Here's Your Guide**

- First, let's think about the route a user would need to visit to see the index of movies...

```javascript
router.get('/', moviesCtlr.index);
```

- Now we map to our controller action, how should it be defined?

```javascript
const Movie = require('../models/movie');

module.exports = {
    new: newMovie,
    create,
    index
};



function index(req, res) {
  // We need to get all the movies from the DB
  // ...then send those movies to an index view
}

// ... more code below ...
```

- Before we set up the `index` view to see all the movies, let's think about how we'll get our data using the `Movie` model
  
- To do this, we use the [`mongoose` `Model.find()`](https://mongoosejs.com/docs/api.html#model_Model.find) method.

- This is how we implement it...


```javascript
Movie.find({}, function(err, movies) {
  //... render a template with movies data
});
```

- So in the controller, we write it like this...


```javascript
Movie.find({}, function(err, movies) {
    res.render('movies/index', {
        movies
    });
});
```

<br>

**Perfect! Now we just need to create `views/movies/index.ejs` and add some markup!**

```shell
touch views/movies/index.ejs
```

- Here's our markup!

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Mongoose Movies</title>
</head>
<body>
    <h1>Movies Index</h1>
    <table>
        <thead>
            <th>Title</th>
            <th>Release Year</th>
            <th>MPAA Rating</th>
            <th>Cast</th>
            <th>Now Showing</th>
        </thead>
        <tbody>
            <% movies.forEach(movie => { %>
                <tr>
                    <td><%= movie.title %></td>
                    <td><%= movie.releaseYear %></td>
                    <td><%= movie.mpaaRating %></td>
                    <td><%= movie.cast.join(", ")%></td>
                    <td><%= movie.nowShowing ? 'Yes' : 'No' %></td>
                </tr>
            <% }) %>
        </tbody>
    </table>
</body>
</html>
```

<br>
<br>
<br>

### Refactor the Redirect


**Now that we have an `index` view, let's update the `redirect` in the `create` action:**

```javascript
 movie.save(function(err) {
   if (err) return res.render('movies/new');
   console.log(movie);
   res.redirect('/movies');  // update this line
 });
```

<br>
<br>

### Defining default values for a Property

1. Modify the schema to add a default value

2. Use a function to provide a default value


<br>
<br>

#### Modify the schema to add a default value


- To add a default value, we need to switch from this simple property definition syntax:

```javascript
const movieSchema = new Schema({
	title: String,
	releaseYear: Number,
		...
```

- To this object syntax:

	```javascript
	const movieSchema = new Schema({
  		title: String,
  		releaseYear: {type: Number},
  		...
	```

- Now we can add a `default` key to specify a default value:

```javascript
const movieSchema = new mongoose.Schema({
 title: String,
 releaseYear: {type: Number, default: 2000},
 mpaaRating: String,
 cast: [String],
 nowShowing: {type: Boolean, default: false}
});
```

- Silly example defaulting the release year to 2000 - yes. But that's how we can add a simple default value.

- FYI, defaults for array types will not work - they require the use of Mongoose middleware to set default values.

- Test it out and we'll find that it didn't work for the `releaseYear` because `req.body.releaseYear` exists and this prevents the default from being assigned.

- We can fix this in the `create` action by deleting any property in `req.body` that is an empty string:

```javascript
if (req.body.cast) req.body.cast = req.body.cast.split(',');
	// remove empty properties
	for (let key in req.body) {
 	  if (req.body[key] === '') delete req.body[key];
	}
```

- Now if we don't enter a release year, the default will be set.

<br>
<br>

#### Use a function to provide a default value


- You've seen how to add a simple default value, but we can also provide a function as well.

- The property's default would then be set to the value returned by the function!

- For example, we can take our silly default for _releaseYear_ and make it just as silly like this:

```javascript
const movieSchema = new mongoose.Schema({
  title: String,
  releaseYear: {
   type: Number,
   default: function() {
	return new Date().getFullYear();
   }
  },
  mpaaRating: String,
  cast: [String],
  nowShowing: {type: Boolean, default: true}
});
```

- Of course, named functions will work too.

<br>
<br>

#### Timestamps in Mongoose


- Mongoose will add `createdAt` and add + update `updatedAt` fields automatically to every document if we set the `timestamps` option as follows in the schema:

```javascript
const movieSchema = new mongoose.Schema({
 ...
}, {
 timestamps: true
});
```

- This really comes in handy so it's recommended to add the `timestamps: true` option to all schemas by default.

<br>
<br>

#### Defining validations for a Property


- Validations are used to prevent bogus data from being saved in the database.

- There are several built-in validators we can use.

- However, endless flexibility is possible with custom asynchronous and synchronous validator functions and/or Mongoose middleware.

- We'll keep it simple at first...

- Movies should not be allowed to be created without a `title`.  Let's make it required:

```javascript
const movieSchema = new mongoose.Schema({
 title: {
   type: String,
   required: true
 },
 ...
```
- Now, if we try saving a movie without a `title` an error will be set and we'll render the `new` view instead of being redirected to the `index`.

- For properties that are of type _Number_, we can specifya `min` and `max` value:

```javascript
const movieSchema = new mongoose.Schema({
 ...
 releaseYear: {
   type: Number,
   default: function() {
     return new Date().getFullYear();
   },
   min: 1927
 },
 ...
```

- No more silent movies!
	
- For properties that are of type _String_, we have:
	- **`enum`**: String must be in the provided list
	- **`match`**: String must match the provided regular expression
	- **`maxlength`** and **`minlength`**: Take a guess :)

- Here is how we use the `enum` validator:

```javascript
const movieSchema = new mongoose.Schema({
 ...
 mpaaRating: {
   type: String,
   enum: ['G', 'PG', 'PG-13', 'R']
 },
 ...
```

<br>
<br>

#### Summary


- Mongoose is the go to when it comes to working with a MongoDB.

- We define Mongoose **schemas**, which are then compiled using the `mongoose.model` method into **Models**.

- We use a Model to perform all CRUD for a given MongoDB collection.

<br>
<br>

## Essential Questions


**❓ True or False:  In our code, a document's structure is _defined_ in a Mongoose model.**

**❓ Name at least two Model methods used to read data from a MongoDB collection.**

**❓ Can a single Model be used to query more than one MongoDB collection?**


<br>
<br>
<br>




# References


- [Official MongooseJS Documentation](http://mongoosejs.com/)


