---
track: "Second Language"
title: "React Frontend to Rails API"
week: 2
day: 1
type: "lecture"
---

![GA Logo](https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/General_Assembly_logo.svg/1280px-General_Assembly_logo.svg.png)

# Frontend - React

---

## Prerequisites

- Deployed Todos API
- NodeJS

## Setup

- In your terminal spin-up a new React Project `npx create-react-app@latest todofront`

- Install support Libraries to be used `npm install react-router-dom milligram`

- test out dev server `npm start` and go to localhost:3000

## Setting Up React Router

Let's import the Router components and wrap our App components like this in index.js.

```js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// Import Milligram for Some Default Styling
import "milligram";
// Import the BrowserRouter Component and Rename it Router
import { BrowserRouter as Router, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  // Wrap our App Component inside router so App and children can use router
  // Pass the app component into Route to give it access to router props
  <Router>
    <React.StrictMode>
      <Route path="/" component={App} />
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);
```

## Setting Up Our Files

- In src create a `components` folder for holding small pieces of UI and a `pages` folder for components that act routes/pages.

#### Create the following Components

src/components/post.js

```js
import React from "react";

const Post = (props) => {
  return <h1>Post</h1>;
};

export default Post;
```

src/pages/AllPosts.js

```js
import React from "react";

const AllPosts = (props) => {
  return <h1>AllPosts</h1>;
};

export default AllPosts;
```

src/pages/SinglePost.js

```js
import React from "react";

const SinglePost = (props) => {
  return <h1>Post</h1>;
};

export default SinglePost;
```

src/pages/Form.js

```js
import React from "react";

const Form = (props) => {
  return <h1>Post</h1>;
};

export default Form;
```

#### Importing Our Components

So now it's time to bring our components into our App.js where we will setup four client-side routes.

- "/" -> which will Render all of our todos in the AllPosts component

- "/post/:id" -> which will render an individual todo in our SinglePost component

- "/new" -> which render our Form component for creating a new Todo

- "/edit" -> which renders our Form to edit

/src/App.js

```js
// Import All Our Components
import AllPosts from "./pages/AllPosts";
import SinglePost from "./pages/SinglePost";
import Form from "./pages/Form";

// Import React and hooks
import React, { useState, useEffect } from "react";

// Import components from React Router
import { Route, Switch } from "react-router-dom";

function App(props) {
  ////////////////////
  // Style Objects
  ////////////////////

  const h1 = {
    textAlign: "center",
    margin: "10px",
  };

  ///////////////
  // State & Other Variables
  ///////////////

  // Our Api Url
  const url = "https://api.herokuapp.com/todos/";

  // State to Hold The List of Posts
  const [posts, setPosts] = useState([]);

  //////////////
  // Functions
  //////////////

  //////////////
  // useEffects
  //////////////

  /////////////////////
  // returned JSX
  /////////////////////
  return (
    <div>
      <h1 style={h1}>My Todo List</h1>
      <Switch>
        <Route
          exact
          path="/"
          render={(routerProps) => <AllPosts {...routerProps} posts={posts} />}
        />
        <Route
          path="/post/:id"
          render={(routerProps) => (
            <SinglePost {...routerProps} posts={posts} />
          )}
        />
        <Route
          path="/new"
          render={(routerProps) => <Form {...routerProps} />}
        />
        <Route
          path="/edit"
          render={(routerProps) => <Form {...routerProps} />}
        />
      </Switch>
    </div>
  );
}

export default App;
```

#### Getting Our Todos

We will create a getTodos function that will get all of our todos from our deployed API then call it inside a useEffect.

src/App.js

```js
//////////////
// Functions
//////////////

// Function to get list of Todos from API
const getTodos = async () => {
  const response = await fetch(url);
  const data = await response.json();
  setPosts(data);
};

//////////////
// useEffects
//////////////

// useEffect to get list of todos when page loads
useEffect(() => {
  getTodos();
}, []);
```

#### Rendering Our Todos

We are already passing the posts as props to AllPosts so now let's go to src/pages/AllPosts.js and render those todos!!!

src/AllPosts.js

```js
import React from "react";
import Post from "../components/post";

const AllPosts = (props) => {
  // For each post in the array render a Post component
  return props.posts.map((post) => <Post post={post} key={post.id} />);
};

export default AllPosts;
```

Let's define how an individual post will look like in src/components/post.js

```js
import React from "react";
import { Link } from "react-router-dom";

//destructure the post from props
const Post = ({ post }) => {
  //////////////////
  // Style Objects
  //////////////////
  const div = {
    textAlign: "center",
    border: "3px solid",
    margin: "10px auto",
    width: "80%",
  };
  return (
    <div style={div}>
      <Link to={`/post/${post.id}`}>
        <h1>{post.subject}</h1>
      </Link>
      <h2>{post.details}</h2>
    </div>
  );
};

export default Post;
```

#### SinglePost Component!

Our component to see an individual post, src/pages/SinglePost.js

```js
import React from "react";
import { Link } from "react-router-dom";

// destructuring the props needed to get our post, including router prop match
const SinglePost = ({ posts, match }) => {
  const id = parseInt(match.params.id); //get the id from url param
  const post = posts.find((post) => post.id === id);

  ////////////////////
  // Styles
  ///////////////////
  const div = {
    textAlign: "center",
    border: "3px solid green",
    width: "80%",
    margin: "30px auto",
  };

  return (
    <div style={div}>
      <h1>{post.subject}</h1>
      <h2>{post.details}</h2>
      <Link to="/">
        <button>Go Back</button>
      </Link>
    </div>
  );
};

export default SinglePost;
```

Cool, we can now see our todos!

#### Setting Up Our Form

One Benefit of React is Reusability. Let's design a form component we can reuse for our New and Edit routes. Our form will need three props to make it useable it multiple use cases.

- initialTodo: This should be an object to initialize the forms state

- handleSubmit: This will be the function that is run when the form is submitted

- buttonLabel: This will be the label for the submit button on the form

src/pages/form.js

```js
// Import useState hook
import React, { useState } from "react";

//destructure out props, including router prop history
const Form = ({ initialTodo, handleSubmit, buttonLabel, history }) => {
  ////////////////
  // The Form Data State
  ////////////////
  // Initiallize the form with the initialTodo state
  const [formData, setFormData] = useState(initialTodo);

  //////////////////////////
  // Functions
  //////////////////////////

  // Standard React Form HandleChange Function
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Function to run when form is submitted
  const handleSubmisson = (event) => {
    //prevent form refresh
    event.preventDefault();
    //pass formData to handleSubmit prop function
    handleSubmit(formData);
    //push user back to main page
    history.push("/");
  };

  // Our Form, an input for the subject and details fields and a submit button
  return (
    <form onSubmit={handleSubmisson}>
      <input
        type="text"
        onChange={handleChange}
        value={formData.subject}
        name="subject"
      />
      <input
        type="text"
        onChange={handleChange}
        value={formData.details}
        name="details"
      />
      <input type="submit" value={buttonLabel} />
    </form>
  );
};

export default Form;
```

#### Creating a Todo

Now that we have our form ready to go let's go back to App and create and pass the necessary props and add a button to get to the form.

- add function that creates a todo

```js
//////////////
// Functions
//////////////

// Function to get list of Todos from API
const getTodos = async () => {
  const response = await fetch(url);
  const data = await response.json();
  setPosts(data);
};

// Function to add todo from form data
const addTodos = async (newTodo) => {
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });

  // get updated list of todos
  getTodos();
};
```

- a null todo object

```js
///////////////
// State & Other Variables
///////////////

// Our Api Url
const url = "https://api.herokuapp.com/todos/";

// State to Hold The List of Posts
const [posts, setPosts] = useState([]);

// an object that represents a null todo
const nullTodo = {
  subject: "",
  details: "",
};
```

- update the props on the "/new" route

```js
<Route
  path="/new"
  render={(routerProps) => (
    <Form
      {...routerProps}
      initialTodo={nullTodo}
      handleSubmit={addTodos}
      buttonLabel="create todo"
    />
  )}
/>
```

- import Link

```js
// Import components from React Router
import { Route, Switch, Link } from "react-router-dom";
```

- create a "create new todo" button with styling!

```js
////////////////////
// Style Objects
////////////////////

const h1 = {
  textAlign: "center",
  margin: "10px",
};

const button = {
  backgroundColor: "navy",
  display: "block",
  margin: "auto",
};
```

```js
      <h1 style={h1}>My Todo List</h1>
      <Link to="/new"><button style={button}>Create New Todo</button></Link>
```

#### Editing Todos

To edit the todo we need to know which todo the user is editing, we will create new state to track this todo and create a function to change it that we'll pass down to the SinglePost component.

src/App.js

- create the state for the targeted todo

```js
///////////////
// State & Other Variables
///////////////

// Our Api Url
const url = "https://api.herokuapp.com/todos/";

// State to Hold The List of Posts
const [posts, setPosts] = useState([]);

// an object that represents a null todo
const nullTodo = {
  subject: "",
  details: "",
};

// const state to hold todo to edit

const [targetTodo, setTargetTodo] = useState(nullTodo);
```

- create the function to select the todo and head to edit form and another function for when the form is submitted.

```js
//////////////
// Functions
//////////////

// Function to get list of Todos from API
const getTodos = async () => {
  const response = await fetch(url);
  const data = await response.json();
  setPosts(data);
};

// Function to add todo from form data
const addTodos = async (newTodo) => {
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });

  // get updated list of todos
  getTodos();
};

// Function to select todo to edit
const getTargetTodo = (todo) => {
  setTargetTodo(todo);
  props.history.push("/edit");
};

// Function to edit todo on form submission
const updateTodo = async (todo) => {
  const response = await fetch(url + todo.id + "/", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  // get updated list of todos
  getTodos();
};
```

- update the props of the "/post/:id" and "edit" routes

```js
<Switch>
  <Route
    exact
    path="/"
    render={(routerProps) => <AllPosts {...routerProps} posts={posts} />}
  />
  <Route
    path="/post/:id"
    render={(routerProps) => (
      <SinglePost {...routerProps} posts={posts} edit={getTargetTodo} />
    )}
  />
  <Route
    path="/new"
    render={(routerProps) => (
      <Form
        {...routerProps}
        initialTodo={nullTodo}
        handleSubmit={addTodos}
        buttonLabel="create todo"
      />
    )}
  />
  <Route
    path="/edit"
    render={(routerProps) => (
      <Form
        {...routerProps}
        initialTodo={targetTodo}
        handleSubmit={updateTodo}
        buttonLabel="update todo"
      />
    )}
  />
</Switch>
```

- Add an edit button when looking at an individual todo

src/pages/SinglePost.js

```js
import React from "react";
import { Link } from "react-router-dom";

// destructuring the props needed to get our post, including router prop match
const SinglePost = ({ posts, match, edit }) => {
  const id = parseInt(match.params.id); //get the id from url param
  const post = posts.find((post) => post.id === id);

  ////////////////////
  // Styles
  ///////////////////
  const div = {
    textAlign: "center",
    border: "3px solid green",
    width: "80%",
    margin: "30px auto",
  };

  return (
    <div style={div}>
      <h1>{post.subject}</h1>
      <h2>{post.details}</h2>
      <button onClick={(event) => edit(post)}>Edit</button>
      <Link to="/">
        <button>Go Back</button>
      </Link>
    </div>
  );
};

export default SinglePost;
```

#### Deleting a Todo

The final piece is deleting a todo, all we have to do is create a delete function in app, send it down to SinglePost and make a button, tada!

- make another function in App.js

```js
//////////////
// Functions
//////////////

// Function to get list of Todos from API
const getTodos = async () => {
  const response = await fetch(url);
  const data = await response.json();
  setPosts(data);
};

// Function to add todo from form data
const addTodos = async (newTodo) => {
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });

  // get updated list of todos
  getTodos();
};

// Function to select todo to edit
const getTargetTodo = (todo) => {
  setTargetTodo(todo);
  props.history.push("/edit");
};

// Function to edit todo on form submission
const updateTodo = async (todo) => {
  const response = await fetch(url + todo.id + "/", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  // get updated list of todos
  getTodos();
};

// Function to edit todo on form submission
const deleteTodo = async (todo) => {
  const response = await fetch(url + todo.id + "/", {
    method: "delete",
  });

  // get updated list of todos
  getTodos();
  props.history.push("/");
};
```

- pass the function as a prop to SinglePost

```js
<Route
  path="/post/:id"
  render={(routerProps) => (
    <SinglePost
      {...routerProps}
      posts={posts}
      edit={getTargetTodo}
      deleteTodo={deleteTodo}
    />
  )}
/>
```

- Add the button in singlepost

```js
import React from "react";
import { Link } from "react-router-dom";

// destructuring the props needed to get our post, including router prop match
const SinglePost = ({ posts, match, edit, deleteTodo }) => {
  const id = parseInt(match.params.id); //get the id from url param
  const post = posts.find((post) => post.id === id);

  ////////////////////
  // Styles
  ///////////////////
  const div = {
    textAlign: "center",
    border: "3px solid green",
    width: "80%",
    margin: "30px auto",
  };

  return (
    <div style={div}>
      <h1>{post.subject}</h1>
      <h2>{post.details}</h2>
      <button onClick={(event) => edit(post)}>Edit</button>
      <button onClick={(event) => deleteTodo(post)}>Delete</button>
      <Link to="/">
        <button>Go Back</button>
      </Link>
    </div>
  );
};

export default SinglePost;
```

---

## Resources to Learn More

---
