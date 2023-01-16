---
track: "Full-Stack Development"
title: "Intro to Mongoose Referenced Relationships"
week: 2
day: 2
type: "lecture"
---

# Mongoose Referencing Related Data

<br>
<br>
<br>


<iframe width="560" height="315" src="https://www.youtube.com/embed/8vit-qdoupY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


<br>
<br>
<br>


## Learning Objectives


<p>Students Will Be Able To:</p>

- Use Referencing to Implement 1:M & M:M Data Relationships
- "Populate" Referenced Documents 

<br>
<br>

## Roadmap

1. Setup
2. Use a Node REPL session to perform CRUD using Mongoose Models
3. A New Data Resource: _Performers_
4. Create the `Performer` Model
5. Referencing _Performers_ in the _Movie_ Model
6. Creating _Performers_
7. Associating Movies and Performers
8. _AAU, when viewing a movie's detail page, I want to see a list of the current cast and add a new performer to the list_
9.  Essential Questions


<br>
<br>

#### Setup

- Today's starter code is the final code from our _Mongoose - Embedding Related Data_ lesson, however, to make this lesson flow better, let's make a few small changes:

<br>

#### 1) We're going to add a feature to `show.ejs` that shows the average rating:

```html

<% if (movie.reviews.length) { %>
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Review</th>
        <th>Rating</th>
      </tr>
    </thead>
    <tbody>
      <!--First let's set up a total variable -->
      <% let total = 0 %>  
      <% movie.reviews.forEach(function(r) { %>
         <!-- We'll aggregate the total ratings -->
        <% total += r.rating %>
        <tr>
          <td><%= r.createdAt.toLocaleDateString() %></td>
          <td><%= r.content %></td>
          <td><%= r.rating %></td>
        </tr>
      <% }); %>
      <!-- Then we'll add this table row element below to show our average rating =) -->
      <tr>
        <td colspan="2"></td>
        <td><strong><%= (total / movie.reviews.length).toFixed(1) %></strong></td>
      </tr>
    </tbody>
  </table>
<% } else { %>
  <h5>No Reviews Yet</h5>
<% } %>
```
<br>

#### 2) Remove the "Cast" input tag from `/views/movies/new.ejs`

```html
<form id="new-form" action="/movies" method="POST">
  <label>Title:</label>
  <input type="text" name="title">
  <label>Release Year:</label>
  <input type="text" name="releaseYear">
  <label>MPAA Rating</label>
  <select name="mpaaRating">
    <option value="G">G</option>
    <option value="PG">PG</option>
    <option value="PG-13">PG-13</option>
    <option value="R">R</option>
  </select>
  <label>Now Showing:</label>
  <input type="checkbox" name="nowShowing" checked>
  <input type="submit" value="Add Movie">
</form>
```

<br>

#### 3) Remove the `<div>` elements for displaying the movie "Cast" input tag from `/views/movies/show.ejs`

```html
<section id="show-page">
  <div>Title: </div>
  <div><%= movie.title %></div>
  <div>Release Year: </div>
  <div><%= movie.releaseYear %></div>
  <div>Rating: </div>
  <div><%= movie.mpaaRating %></div>
  <div>Now Showing: </div>
  <div><%= movie.nowShowing ? 'Yes' : 'Nope' %></div>
</section>
```

<br>

#### 4) Temporarily "comment out" the cast property in the `models/movie.js`

```javascript
const movieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  releaseYear: {
    type: Number,
    default: function () {
      return new Date().getFullYear();
    }
  }, mpaaRating: String,
  // cast: [String],
  nowShowing: { type: Boolean, default: false },
  reviews: [reviewSchema]

}, {
  timestamps: true
});
```

<br>
<br>


#### 5) Remove the following lines from the **`create` action** inside of `controllers/movies.js`

```javascript

  req.body.cast = req.body.cast.replace(/\s*,\s*/g, ',');

  if (req.body.cast) req.body.cast = req.body.cast.split(',');
```

<br>
<br>

#### Perform CRUD Using Mongoose Models in a Node REPL


- Because of the eventual refactor of the `cast` property, we will want to start fresh by deleting the existing _movie_ documents.

- This provides another opportunity to perform CRUD operations in Terminal using a Node REPL session - something that you'll likely need to do in a real-world scenario.

- Start by opening a terminal session and make sure that you are in the **mongoose-movies** folder.

- Start a Node REPL:

```shell
$ node
> 
```

- Connect to the MongoDB database:

```shell
> require('./config/database')
{}
> Connected to MongoDB at localhost:27017
// Press enter to return to the prompt
```


- Load the `Movie` Model:

```shell
> const M = require('./models/movie')
```

- **Important:** If you make any changes to the Model, you'll have exit Node and start again.


- Log all _movie_ docs:

```shell
> M.find({}, (e, movies) => {
... console.log(movies)
... })
```

The `find` method returns a **Query** object that is first logged, followed by the _movie_ docs. Press enter to return to the prompt.


- Anything that can be done with a Model in the app, can be done in the REPL including CRUD operations, manipulate individual documents, etc.

- Next, let's remove all existing _movie_ documents...


- Here's a way to delete all documents from a collection:

```shell
> M.deleteMany({}, (err, result) => console.log(result))
...
> { n: 3, ok: 1, deletedCount: 3 }
```
	
- The _empty query object_ provided as the first argument matches all documents, so all documents were removed.

- Press `control + C` twice to exit the REPL.



- For future reference, here's a gist that documents how to do what we just did: [Perform CRUD Using Mongoose Models in a Node REPL](https://gist.github.com/myDeveloperJourney/1f3c01e199913b09e90988dce3384bb1)

<br>
<br>

#### A New Data Resource: _Performers_


- We are going to implement the following data relationship:<br>

**_A Movie has many Performers; A Performer has many Movies_**

**`Movie >--< Performer`** *(Many-To-Many)*

<br>
<br>


#### 💪 Practice Exercise (5 minutes)


- A new data resource requires new modules, etc.

- Create the following for the new **Performers** resource:
	- Model (empty module)
	- Router (module exporting a router object)
	- Controller (empty module)
	- A dedicated folder for its views

- Require and mount the new router in **server.js** to the path of `/`.

<br>
<br>

#### Create the _Performer_ Model


- _Performers_ will be stored in their own collection so that their `_id` (ObjectId) can be referenced by numerous movies.

- As you know, models map to collections in Mongoose...

- We'll review the schema for the `Performer` Model as we type it:

```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const performerSchema = new Schema({
 name: {type: String, required: true, unique: true},
 born: Date
}, {
 timestamps: true
});

module.exports = mongoose.model('Performer', performerSchema);
```

- We want to _try_ to prevent duplicate _performers_ (more on this in a bit).

<br>
<br>


#### Referencing _Performers_ in the _Movie_ Model


- With the `Performer` Model created, we can now add back the `cast` property in `Movie`:

```javascript
reviews: [reviewSchema],
// don't forget to add a comma above
cast: [{type: Schema.Types.ObjectId, ref: 'Performer'}]
```

- The property type of `ObjectId` **is always** used to implement **referencing**.

- The `ref: 'Performer'` is optional, but allows us to use the magical Mongoose method - `populate`. 


- Unlike in a Relational DB, all it takes to implement a **many-to-many** relationship, is a single property of type Array.

- It's the application logic (the developer) that determines what the [cardinality](https://en.wikipedia.org/wiki/Cardinality_(data_modeling)) will be between any two data entities.


- Here is the difference between a `1:M` and a `M:M` relationship:
	- In a `1:M` relationship, each of the **many** (child) documents belongs to only **one** (parent) document. Each time we want add a new relationship - **the child document must be created**.
	- In a `M:M` relationship, **existing** documents are referenced and the same document can be referenced over and over. New documents are created only if it's the first of its kind. 

- What this means for **mongoose-movies** is that we only want to create a certain _performer_ once (when they don't exist).

<br>
<br>

#### Many:Many CRUD


- So, before a many-to-many relationship can be created between two documents (often called an **association**), those two documents must first exist.

- This requires that the app first provide the functionality to create each of the two resources independently of each other.

- **mongoose-movies** can already create _movies_, but now it needs the capability to create _performers_...

<br>
<br>

#### _AAU, I want to create a new performer if they don't already exist_


- Here's the flow we've now followed several times when adding functionality to the app:

	- Identify the "proper" Route (Method + Path)
	
	- Create the UI that will send the request matching that route.
	
	- Define the route on the server and map it to the proper controller action (`index`, `show`, `new`, `create`, etc.).
	
	- Code and export the controller action.
	
	- `res.render` a view in the case of a GET request, or `res.redirect` if data was changed.

<br>
<br>


#### Creating _Performers_ - Step 1


- We will want a dedicated view for adding a performer, thus creating a performer will require two request/response cycles:  One for the `new` action and one for the `create` action...

<br>
<br>

**💪 YOU DO: Reply in Slack with the proper routes (Method & Path) for**:
- Displaying a page with a form for entering a _performer_
- Creating a new _performer_ when the form is submitted

<br>
<br>


#### Creating _Performers_ - Step 2


- We need UI that will send the request to view the form...

- Let's add a new link in the nav bar in **partials/header.js**:

```ejs
<img src="/images/camera.svg">
<!-- new menu link below -->
<a href="/performers/new" <%- title === 'Add Performer' ? 'class="active"' : '' %>>ADD PERFORMER</a>
```

Yup, the same pattern as the other links.

<br>
<br>

#### Creating _Performers_ - Step 3


- Clicking the **ADD PERFORMER** link is going to send a `GET /performers/new` request - now we need a route to map that HTTP request to code (controller action) in **routes/performers.js**:

```javascript
const express = require('express');
const router = express.Router();
const performersCtrl = require('../controllers/performers');

router.get('/performers/new', performersCtrl.new);

module.exports = router;
```

- As usual, the server won't be happy until we create and export that `new` action...

<br>
<br>

#### Creating _Performers_ - Step 4


- We want to try to prevent the users from creating more than one document for a given performer, so we will display a list of existing performers (in a dropdown) and beg our users not to add a performer unless they've verified that the performer does not already exist in the list.

- The controller action of course will need to provide an array of the exiting performers to be rendered in the dropdown...


- Inside of **controllers/performers.js** we go:

```javascript
const Performer = require('../models/performer');

module.exports = {
 new: newPerformer
};

function newPerformer(req, res) {
 Performer.find({}, function(err, performers) {
   res.render('performers/new', {
     title: 'Add Performer',
     performers
   });
 })
}
```

<br>
<br>


#### Creating _Performers_ - Step 5


- We'll need that `new` view that we just rendered:

```shell
$ touch views/performers/new.ejs
```

- The next slide has the markup...

- Here's the markup for **performers/new.ejs**:

```html
<%- include('../partials/header') %>
<p>Please first ensure that the Performer is not in the dropdown
 <select>
   <% performers.forEach(function(p) { %>
     <option><%= p.name %></option>
   <% }) %>
 </select>
</p>
<form id="add-performer-form" action="/performers" method="POST">
 <label>Name:</label>
 <input type="text" name="name">
 <label>Born:</label>
 <input type="date" name="born">
 <input type="submit" value="Add Performer">
</form>
<%- include('../partials/footer') %>
``` 
<br>
<br>


#### Creating _Performers_ - CSS

- Find and update in **public/stylesheets/style.css**:

```css
#new-form *,
#add-review-form *,
#add-performer-form * {
 font-size: 20px;
 ...
}


#add-review-form,
#add-performer-form {
 display: grid;
 ...
}	


#add-review-form input[type="submit"],
#add-performer-form input[type="submit"] {
 width: 10rem; /* <-- change to from 8 to 10rem*/
 ...
}	
``` 
<br>
<br>


#### Creating _Performers_


- Now for the second request/response cycle to handle the form submission...

- The `action` & `method` on the form look good, we just need to listen to that route.

<br>
<br>

**💪 YOU DO: Define the route for the create action**

<br>
<br>

- In **controllers/performers.js**:

```javascript
module.exports = {
 new: newPerformer,
 create
};

function create(req, res) {
 Performer.create(req.body, function(err, performer) {
   res.redirect('/performers/new');
 });
}
```


<br>
<br>

#### Associating Movies and Performers


- Now that we've added the functionality to create _performers_, we're ready to add the functionality to associate them with _movies_.

- But first, a quick refactor...

<br>
<br>

#### _AAU, after adding a movie, I want to see its details page_


- This user story can be accomplished with a quick refactor in the `moviesCtrl.create` action in **controllers/movies/js**:

```javascript
movie.save(function(err) {
 if (err) return res.redirect('/movies/new');
 // res.redirect('/movies');
 res.redirect(`/movies/${movie._id}`);
});
```

- Don't forget to replace the single-quotes with back-ticks!

- User story done! Now for some fun!

<br>
<br>


#### _AAU, when viewing a movie's detail page,I want to see a list of the current cast and add a new performer to the list_

- Let's ponder what it's going to take to implement this user story:
	- In **movies/show.ejs**, iterate over the movie's cast and use EJS to render them.
	- Hold it! Because we are using referencing, there are `ObjectId`s in a movie's `cast` array - not subdocs. <br>Oh wait, this is what the magical `populate` method is for!
	- Using a form with a dropdown, we can send a request to associate a performer and movie. <br>We will need the list of performers to build the dropdown, but only the performers not already in the cast!

- Let's get started!

<br>
<br>


#### Replacing _ObjectIds_ with the Actual Docs


- Let's refactor the `moviesCtrl.show` action so that it will pass the movie with the _performer_ documents in its `cast` array instead of `ObjectIds`:

```javascript
function show(req, res) {
 Movie.findById(req.params.id)
 .populate('cast').exec(function(err, movie) {
   res.render('movies/show', { title: 'Movie Detail', movie });
 });
}
```

- `populate`, the unicorn of Mongoose...

<br>
<br>

#### Replacing _ObjectIds_ with the Actual Docs


- We can chain the `populate` method after any query.

- When we "build" queries like this, we need to call the `exec` method to actually run it (passing in the callback to it).

<br>
<br>

**❓ How does the `populate` method know to replace the `ObjectId`s with `Performer` documents?**


<br>
<br>

#### Passing the _Performers_


- While we're in `moviesCtrl.show`, let's see how we can query for just the _performers_ that are not in the _movie's_ `cast` array.  

- First, we're going to need to access the `Performer` model, so require it at the top:

```javascript
const Movie = require('../models/movie');
// require the Performer model
const Performer = require('../models/performer');
```
	
- Now we're ready to refactor the `show` action... 

- We'll review as we refactor the code:

```javascript

function show(req, res) {
 Movie.findById(req.params.id)
 .populate('cast').exec(function(err, movie) {
   // Performer.find({}).where('_id').nin(movie.cast)
   Performer.find(
       {_id: {$nin: movie.cast}},
       function(err, performers) {
         console.log(performers);
         res.render('movies/show', {
           title: 'Movie Detail', movie, performers
         });
       }
     );
 });
}
```

The log will show we are retrieving the _performers_ - a good sign at this point. 

<br>
<br>


#### Refactor _show.ejs_


- The next slide has some refactored markup in **movies/show.ejs**.

- It's a bit complex, so we'll review it while we make the changes.

- We'll have to be careful though...



```html
  <div><%= movie.nowShowing ? 'Yes' : 'Nope' %></div>
  <!-- start cast list -->
  <div>Cast:</div>
  <ul>
    <%- movie.cast.map(p => 
      `<li>${p.name} <small>${p.born.toLocaleDateString()}</small></li>`
    ).join('') %>
  </ul>
  <!-- end cast list -->
</section>
	
<!-- add to cast form below -->
<form id="add-per-to-cast" action="/movies/<%= movie._id%>/performers" method="POST">
  <select name="performerId">
    <%- performers.map(p => 
      `<option value="${p._id}">${p.name}</option>`
    ).join('') %>
  </select>
  <button type="submit">Add to Cast</button>
</form>
```

<br>
<br>
<br>
<br>

#### Refactor _show.ejs_ - CSS
- Add this tidbit of CSS to clean up the cast list:

```css
ul {
 margin: 0 0 1rem;
 padding: 0;
 list-style: none;
}

li {
 font-weight: bold;
}
```

<br>
<br>


#### Need a Route for the _Add to Cast_ Form Post


- The route is RESTful, but we have to use a non-RESTful name for the controller action because we're creating an association between a movie and a performer...

- In **routes/performers.js**

```javascript
router.post('/movies/:id/performers', performersCtrl.addToCast);
```

`addToCast` - not a bad name, but you can use a different one if you want to

<br>
<br>

#### The _addToCast_ Controller Action

- Let's write that `addToCast` action in **controllers/performers.js**:

```javascript
const Performer = require('../models/performer');
// add the Movie model
const Movie = require('../models/movie');

module.exports = {
 new: newPerformer,
 create,
 addToCast
};

function addToCast(req, res) {
 Movie.findById(req.params.id, function(err, movie) {
   movie.cast.push(req.body.performerId);
   movie.save(function(err) {
     res.redirect(`/movies/${movie._id}`);
   });
 });
}
```


<br>
<br>

#### We Did It!


- That was fun!

- A few questions, then on to the lab!


<br>
<br>

### Essential Questions


<p>Take a couple of minutes to review...</p>

**❓ What property type is used in schemas to reference other documents?**

**❓ Describe the difference between 1:M & M:M relationships.**

**❓ What's the name of the method used to replace an `ObjectId` with the document it references?**

<br>
<br>


## References

- [MongooseJS Docs - Populate](https://mongoosejs.com/docs/populate.html)

- [MongooseJS Docs - Queries](https://mongoosejs.com/docs/queries.html)


