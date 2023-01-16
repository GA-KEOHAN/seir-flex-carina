---
track: "Full-Stack Development"
title: "Authentication with Bcrypt and Sessions"
week: 2
day: 5
type: "lecture"
---

# Authentication with Bcrypt and Sessions

<br>
<br>
<br>


## Lesson Objectives

1. Setup
1. Explain what bcrypt does
1. Include bcrypt package
1. Hash a string using bcrypt
1. Compare a string to a hashed value to see if they are the same
1. Explain what a session is
1. Use express-session package as middleware
1. Save user information on the session object
1. Retrieve user information saved on the session object
1. Update user information saved on the session object
1. Destroy the session
1. Enable basic authentication in an express app


<br>
<br>
<br>


### Setup 

We need a brand new express app to learn with. 


1. Make a directory called `expresstagram` then change into it

```bash
mkdir expresstagram
cd expresstagram/
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

6. Create `routes`, `views`, `controllers`, `models`, and `public` directories

```bash
mkdir routes views controllers models public
```

7. Add the appropriate subdirectories to your `public` directory

```bash
mkdir public/css 
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
    <title>Expresstagram</title>
</head>

<body>
    <header>
        <h1>Expresstagram</h1>
        <ul>
            <li>
                <a href="#">Signup</a>
            </li>
            <li>
                <a href="#">Login</a>
            </li>
        </ul>
    </header>
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

<br>
<br>
<br>

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
<br>
<br>

...don't forget to mount your router

<br>

```javascript

// more code above

// Mount Routes app.use()
app.use('/', indexRouter);

```

<br>
<br>
<br>

### Including Mongoose and Connecting to MongoDB

1. [Create a Cloud Hosted MongoDB](/full-stack-development/week-1/day-5/lecture-materials/create-an-atlas-hosted-mongodb/)
2. The name of the database will be `expresstagram` and the first collection name will be `users`

3. Install Mongoose

4. Configure Mongoose in a database config module

5. Add an event listener that listens to a connection event


<br>
<br>
<br>


**Install Mongoose**


```shell
npm i mongoose
```

<br>
<br>
<br>

	
**Configure Mongoose in a module**

<br>
<br>


```shell
mkdir config
touch config/database.js
```

<br>
<br>
<br>


```javascript
const mongoose = require('mongoose');

// 🚨 Don't forget to add your username and password to your connection URI

const connectionURI = 'mongodb+srv://<yourusername>:<yourpassword>@cluster0.oc1n0.mongodb.net/expresstagram?retryWrites=true&w=majority'

// shortcut to mongoose.connection object
const db = mongoose.connection;

mongoose.connect(connectionURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});


db.on('connected', function () {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});
```

<br>
<br>
<br>

Let's then require our database config module so we can connect to the database as soon as express initializes

<br>
<br>


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

<br>
<br>
<br>




#### Start up the App 

Time to check if our app starts up without errors...

```shell
nodemon
```

<br>
<br>
<br>
<br>
<br>
<br>



## Explain what bcrypt does

bcrypt is a package that will encrypt passwords using a process known as hashing, so that if a database gets compromised (hacked), people's passwords won't be exposed.

<br>
<br>
<br>

### Create a Playground to Explore bcrypt

```shell
mkdir playground
touch playground/bcrypt.js
```

<br>
<br>
<br>

### Include the bcrypt package

<br>
<br>

Here's the standard install


```bash
npm i bcrypt
```

<br>
<br>
<br>

Let's then require the module inside of `playground/bcrypt.js`

```javascript
const bcrypt = require('bcrypt');
```

<br>
<br>
<br>

### Salting a Hash using bcrypt

In addition to hashing, bcrypt can perform another process known as "salting". It requires you to generate a salt which is used in the encryption process each time a string is hashed. 

If you don't do this, the same string will get hashed to the same value each time. If this were to happen, someone with a common password could hack the database and see who else's hashed password had the same value as theirs and know that they have the same password as them.

<br>
<br>
<br>

```javascript

const bcrypt = require('bcrypt');

// inside of playground/bcrypt.js

const SALT_ROUNDS = bcrypt.genSaltSync(10);

const password = 'supersecretpassword';

const hashedString = bcrypt.hashSync(password, SALT_ROUNDS);
```

<br>
<br>


We can then console log the result like so:


```javascript
// other code above inside of playground/bcrypt.js

console.log(hashedString)

```

<br>
<br>

Let's process this file with node to see the hashed string

```shell

node playground/bcrypt

```


<br>
<br>
<br>


### Compare a string to a hashed value to see if they are the same

Because the same string gets encrypted differently every time, we have no way of actually seeing what the value of the string is.  We can compare it to another string and see if the two are "mathematically" equivalent.

<br>


```javascript

// other code above inside of playground/bcrypt.js

const isMatch = bcrypt.compareSync('yourGuessHere', hashedString); //returns true or false and assigns value to isMatch

console.log(isMatch);
```

<br>
<br>


[Bcrypt in a little more depth - Thanks Eric Lewis!](https://all-about-bcrypt.glitch.me/)

<br>
<br>
<br>

## Express With Sessions

<br>
<br>
<br>


### Explain what a session is

Cookies are little strings of data that get stored on your computer so that, when you return to a web page, it will remember what you did the last time you were there.  You can specify how long a cookie will stay around in a browser before it "expires" or is deleted. 

This can be after a specific time has elapsed, or it can end as soon as the user closes their browser.

The problem with cookies is that if you store sensitive information in them (usernames, etc), someone could take the computer and view this sensitive information just by opening up the web browser. Sessions are basically cookies, but the server stores the sensitive info in its own memory and passes an encrypted string to the browser as a cookie. The server then uses this encrypted string to know what was saved on the user's computer.

Sessions typically only last for as long as the user keeps their window open, and aren't assigned a specific date to expire.  



<br>
<br>
<br>


### Use express-session package as middleware

Here's the standard install

```shell
npm i express-session 
```

<br>
<br>


Then we can require the module inside our app's main entry module e.g ... `server.js`

```javascript
// All other required modules above

const session = require('express-session');
```

<br>
<br>


Then we mount `session` to our middleware stack


```javascript
// ... other code above

// Mount middleware with app.use()
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));


app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: false
}));

// ... more code below
```

<br>
<br>
<br>


### Let's make a little session playground inside of `server.js`

<br>

Right below where we mounted our `session` middleware, let's add the following placeholders:


```javascript

app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: false
}));

////////// Express Session Playground //////////





////////////////////////////////////////////////


// Mount routes with app.use()
app.use('/', indexRouter);

```



<br>
<br>
<br>


### Save user information on the session object

For each of the routes you create, the `req` object will now have a session property which is itself an object. At the end of the day, it's still JavaScript, so you can add properties to this object.

```javascript

////////// Express Session Playground //////////

app.get('/first-route', function(req, res) { // any route will work
    req.session.favFood = 'pizza';
    res.send(req.session);
});

////////////////////////////////////////////////
```
<br>
<br>
<br>


### Retrieve user information saved on the session object

Once you add a property to the session object, you can retrieve it when a user navigates to any other route. 

You can also use it to make decisions based on the design of your application. 


```javascript
app.get('/second-route', function(req, res) { 
	if(req.session.favFood === 'pizza') { // test to see if necessary value exists
		//do something if it's a match
	} else {
		//do something else if it's not
	}
});
```

<br>
<br>
<br>

So, for example, we could do something like this

```javascript

////////// Express Session Playground //////////

app.get('/first-route', function(req, res) { // any route will work
    req.session.favFood = 'pizza';
    res.send(req.session);
});


// new code below

app.get('/second-route', function(req, res) { 
	if(req.session.favFood === 'pizza') { // test to see if necessary value exists
		res.send('<h1>😎 Pizza Party!! 🍕🎉</h1>');
	} else {
		res.send('<h1>Wait ... you don\'t like pizza? 😢</h1>');
	}
});

////////////////////////////////////////////////

```


<br>
<br>
<br>


### Update information saved on the session object

You can overwrite a session value somewhere else too, just like any other property on a normal JavaScript object.

```javascript

////////// Express Session Playground //////////

app.get('/first-route', function(req, res) { // any route will work
    req.session.favFood = 'pizza';
    res.send(req.session);
});


app.get('/second-route', function(req, res) { 
	if(req.session.favFood === 'pizza') { // test to see if necessary value exists
		res.send('<h1>😎 Pizza Party!! 🍕🎉</h1>');
	} else {
		res.send('<h1>Wait ... you don\'t like pizza? 😢</h1>');
	}
});

// New code below

app.get('/update-route', function(req, res) { 
    req.session.favFood = 'mom\'s spaghetti';
    res.send(req.session);
});


////////////////////////////////////////////////
```

<br>
<br>
<br>

Sessions unlock tons of potential in our apps, here's another interesting thing you can do 😎


```javascript

// How many times visited


app.get('/times-visited', function(req, res) {
    if(req.session.visits) {
        req.session.visits++;
    } else {
        req.session.visits = 1;
    }
    res.send(`<h1>You've visited this page ${req.session.visits} time(s)</h1>`);
});

```
<br>
<br>
<br>

### Destroy the session

Lastly, you can forcibly destroy a session like so:

```javascript
app.get('/destroy-route', function (req, res) { //any route will work
	req.session.destroy(function(err) {
		if(err){
			//do something if destroying the session fails
		} else {
			//do something if destroying the session succeeds
		}
	});
});
```

<br>
<br>
<br>


**NOTE: If you restart your server, it will lose all memory of the sessions it created**


<br>
<br>
<br>

## Authentication Build

It's time to add authentication to our application! 🎉

<br>
<br>

First let's add a URI to the signup "navigation link" inside of `views/index.ejs`

```html
<ul>
    <li>
        <a href="/users/new">Signup</a>
    </li>
    ...
```

<br>
<br>
<br>

### Signup Route

Let's build a router to handle our app's authentication needs

```shell
touch routes/users.js

```

<br>
<br>
<br>

Here's some starter code:

```javascript
// inside of routes/users.js

const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');


router.get('/new', usersCtrl.new);

module.exports = router;

```

<br>
<br>
<br>


Then, we need to mount the router to `server.js` on `/users`

```javascript

// other code above

const usersRouter = require('./routes/users');


// more code here


app.use('/users', usersRouter);

// more code below

```

<br>
<br>
<br>


### Create an Users controller 

<br>

It's time to create our users controller 

```shell
touch controllers/users.js

```
<br>
<br>


Here's some starter code for our controller

```javascript

// inside of controllers/users.js

module.exports = {
    new: newUser
};

function newUser(req, res) {
    res.render('users/new');
}

```

<br>
<br>
<br>


### Create a signup view 


First, let's make the template inside a dedicated folder inside of `views`

```shell
mkdir views/users

touch views/users/new.ejs
```

<br>
<br>
<br>

Here's some boilerplate markup for our view

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel='stylesheet' href='/css/style.css' />
    <title>Expresstagram</title>
</head>

<body>
    <h1>Signup</h1>
    <form action="/users/signup" method="POST">
        Username: <input type="text" name="username" /><br />
        Password: <input type="password" name="password" /><br />
        <input type="submit" value="Signup" />
    </form>
</body>

</html>

```

<br>
<br>
<br>

At this point, we should be able to navigate to our signup page at http://localhost:3000/users/new


<br>
<br>
<br>


### Create a user model

Before we try to "signup a user" we should create and export a user model

```shell
touch models/user.js

```

<br>
<br>
<br>


Here's what our model should look like:
```javascript

// inside of models/user.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
 
```

<br>
<br>
<br>

### Create a signUp route

let's set up a signup route to map over requests made by the signup form

```javascript

// inside of routes/users.js

const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');


router.get('/new', usersCtrl.new);
router.post('/signup', usersCtrl.signUp); // new route definition

module.exports = router;
```

<br>
<br>
<br>



### Create a signup controller action

Now we must define and export a controller action that will be used to create a new user in the database

```javascript
// inside of controllers/users.js
const User = require('../models/user'); // require user model
const bcrypt = require('bcrypt');       // require bcrypt module
const SALT_ROUNDS = 10;                 // the salt round we'll use 


module.exports = {
    new: newUser,
    signUp
};

function newUser(req, res) {
    res.render('auth/new');
}

function signUp(req, res) {
    // we'll add more code here soon
}
```

<br>
<br>


Once the form is submitted, we can set `req.password` to an encrypted version

```javascript
// inside of controllers/users.js

function signUp(req, res) {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(SALT_ROUNDS));
    res.send(req.body);
}
```

<br>
<br>
<br>


Create user and then redirect them back home `/`

```javascript

// inside of controllers/users.js

function signUp(req, res) {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, function (error, newUser) {
        console.log(newUser) // let's check out our new user
        res.redirect('/');
    });
}
```

<br>
<br>
<br>

### Login Route

<br>
<br>

let's add a URI to the login "navigation link" inside of `views/index.ejs`

```html
 <ul>
     <li>
         <a href="/users/new">Signup</a>
     </li>
     <li>
         <a href="/users/signin">Login</a>
     </li>
     ...
```

<br>
<br>
<br>

Then, inside of `routes/users.js`

```javascript

const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');


router.get('/new', usersCtrl.new);
router.post('/signup', usersCtrl.signUp);

router.get('/signin', usersCtrl.signIn); // new route definition

module.exports = router;
```

<br>
<br>
<br>

Let's add a controller action that can render a login form

```javascript

// inside of controllers/users.js
const User = require('../models/user'); // require user model
const bcrypt = require('bcrypt');       // require bcrypt module
const SALT_ROUNDS = 10;                 // the salt round we'll use 


module.exports = {
    new: newUser,
    signUp,
    signIn // new controller action exported
};

function newUser(req, res) {
    res.render('users/new');
}

function signUp(req, res) {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(SALT_ROUNDS));
    User.create(req.body, function (error, newUser) {
        console.log(newUser) // let's check out our new user
        res.redirect('/');
    });
}

// new controller action defined
function signIn(req, res) {
    res.render('users/login');
}
```

<br>
<br>
<br>

At this point we'll need a view for a user to login in with, so we'll name it `login.ejs`


```shell
touch views/users/login.ejs

```

<br>
<br>
<br>


### Login Page

<br>
<br>

Let's add this markup to views/users/login.ejs:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel='stylesheet' href='/css/style.css' />
    <title>Expresstagram</title>
</head>

<body>
    <h1>Login</h1>
    <form action="/users/login" method="POST">
        Username: <input type="text" name="username" /><br />
        Password: <input type="password" name="password" /><br />
        <input type="submit" value="Login" />
    </form>
</body>

</html>
```

<br>
<br>
<br>


### Create a login route

Let's add our next route definition

```javascript

// inside of routes/users.js

const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');


router.get('/new', usersCtrl.new);

router.post('/signup', usersCtrl.signUp);

router.get('/signin', usersCtrl.signIn);

router.post('/login', usersCtrl.login); // new route definition 

module.exports = router;
```
<br>
<br>
<br>
<br>

Now we just need to export our login action

```javascript

// inside of controllers/users.js
const User = require('../models/user'); // require user model
const bcrypt = require('bcrypt');       // require bcrypt module
const SALT_ROUNDS = 10;                 // the salt round we'll use 


module.exports = {
    new: newUser,
    signUp,
    signIn,
    login
};

function newUser(req, res) {
    res.render('users/new');
}

function signUp(req, res) {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(SALT_ROUNDS));
    User.create(req.body, function (error, newUser) {
        console.log(newUser) // let's check out our new user
        res.redirect('/');
    });
}

// new controller action defined
function signIn(req, res) {
    res.render('users/login');
}

// here's the login action

function login(req, res) {
    User.findOne({
        username: req.body.username
    }, function (error, foundUser) {
        res.send(foundUser);
    });
}
```

<br>
<br>
<br>


It's time to refactor the `login` controller action to redirect to the home screen or same page based on whether password is correct:

```javascript
function login(req, res) {
    User.findOne({
        username: req.body.username
    }, function (error, foundUser) {
        if (foundUser === null) {
            res.redirect('/users/signin');
        } else {
            const doesPasswordMatch = bcrypt.compareSync(req.body.password, foundUser.password);
            if (doesPasswordMatch) {
                res.redirect('/');
            } else {
                res.redirect('/users/signin');
            }
        }
    });
}
```
<br>
<br>
<br>


Now we can make a small change to add user information to the session

```javascript
function login(req, res) {
    User.findOne({
        username: req.body.username
    }, function (error, foundUser) {
        if (foundUser === null) {
            res.redirect('/users/signin');
        } else {
            const doesPasswordMatch = bcrypt.compareSync(req.body.password, foundUser.password);
            if (doesPasswordMatch) {
                req.session.userId = foundUser._id; // new code right here
                console.log(req.session) // we can also log out the session to see the results
                res.redirect('/');
            } else {
                res.redirect('/users/signin');
            }
        }
    });
}
```

<br>
<br>
<br>


### Summary

We've just discussed how to use `bcrypt` to perform encryption on plain-text passwords and how to use the `express-session` middleware to create a sessions for our application. We also provided an example of how you can add user information to the session object; this will be highly useful when you want to gate certain content based on whether the requesting user has "logged in" and created a session with our application. 


Please see the references below for more information regarding these technologies.

<br>
<br>
<br>



## References

- [Express Session Middleware](https://www.npmjs.com/package/express-session)
- [Express.js Docs on Session Middleware](http://expressjs.com/en/resources/middleware/session.html)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)