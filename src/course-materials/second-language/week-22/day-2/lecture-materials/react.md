![GA Logo](https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/General_Assembly_logo.svg/1280px-General_Assembly_logo.svg.png)

# Frontend - React

---

## Prerequisites

- Deployed Todos API
- NodeJS

## Setup

- In your terminal spin-up a new React Project `npx create-react-app@latest todofront`

- CD into new folder and Install support Libraries to be used `npm install react-router-dom milligram`

- test out dev server `npm start` and go to localhost:3000

## Setting Up React Router

Let's start out by setting up our router files in the src:

- router.js
- actions.js
- loaders.js

In router.js let's add the following:

```js
import {createBrowserRouter, createRoutesFromElements, Route, Routes} from "react-router-dom"
import App from "./App"

const router = createBrowserRouter(createRoutesFromElements(
    <Routes>
        <Route path="/" element={<App/>}>

        </Route>
    </Routes>
))

export default router
```

Let's setup Router and Milligram in our index.js.

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import "milligram"
import {RouterProvider} from "react-router-dom"
import router from './router';

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

## Setting Up Our Files

- In src create a `components` folder for holding small pieces of UI and a `pages` folder for components that act routes/pages.

#### Create the following Components

src/components/Post.js

```js
const Post = (props) => {
  return <h1>Post</h1>;
};

export default Post;
```

src/pages/Index.js

```js
const Index = (props) => {
  return <h1>Index</h1>;
};

export default Index;
```

src/pages/Show.js

```js
const Show = (props) => {
  return <h1>Show</h1>;
};

export default Show;
```

#### Setting up our routes

So now it's time to bring our components into our App.js where we will setup four client-side routes.

- "/" -> Our index page showing all posts

- "/post/:id" -> show page showing a single post

- "/create" -> for our new form to submit to

- "/update/:id" -> for edit form to submit to

- "/delete/:id" -> for our delete forms to submit to

/src/router.js

```js
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom"
import App from "./App"
import Index from "./pages/Index"
import Show from "./pages/Show"

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<App/>}>
            <Route path="" element={<Index/>}/>
            <Route path="post/:id" element={<Show/>}/>
            <Route path="create"/>
            <Route path="update/:id"/>
            <Route path="delete/:id"/>
        </Route>
    </>
))

export default router
```

/src/App.js

```js
import {Outlet} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Outlet/>
    </div>
  );
}

export default App;
```

#### Getting Our Todos

We will create two loaders

- indexLoader: Gets all the todos for the Index page

- showLoader: Gets a single todo for the Show page

We can then use the data on those pages with useLoaderData hook. Let's write the loaders in loaders.js.

loaders.js
```js
// YOUR DEPLOYED API BASE URL
const URL = "https://xxxxxxx.onrender.com"

//indexLoader => get all todos for index route
export const indexLoader = async () => {
    const response = await fetch(URL + "/todos/")
    const todos = await response.json()
    return todos
}

//showLoader => get a single todo for Show route
export const showLoader = async ({params}) => {
    const response = await fetch(URL + `/todos/${params.id}/`)
    const todo = await response.json()
    return todo
}
```

let's attach our loaders to their routes

router.js
```js
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom"
import App from "./App"
import { indexLoader, showLoader } from "./loaders"
import Index from "./pages/Index"
import Show from "./pages/Show"

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<App/>}>
            <Route path="" element={<Index/>} loader={indexLoader}/>
            <Route path="post/:id" element={<Show/>} loader={showLoader}/>
            <Route path="create"/>
            <Route path="update/:id"/>
            <Route path="delete/:id"/>
        </Route>
    </>
))

export default router
```

#### Rendering Our Todos

The Index route should now be loading all the todos, let's pull them in and render them using the useLoaderData hook from react-router-dom.

src/pages/Index.js

```js
import Post from "../components/Post";
import {useLoaderData} from "react-router-dom"

const Index = (props) => {
  const todos = useLoaderData()
  // For each post in the array render a Post component
  return todos.map((post) => <Post post={post} key={post.id} />);
};

export default Index;;
```

Let's define how an individual post will look like in src/components/post.js

```js
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

export default Post
```

#### SinglePost Component!

Our component to see an individual post, src/pages/SinglePost.js

```js
import { Link, useLoaderData } from "react-router-dom";

// destructuring the props needed to get our post, including router prop match
const Show = () => {
  const post = useLoaderData();

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

export default Show;
```

Cool, we can now see our todos!

#### Setting Up Our Forms

Let's start by defining the actions that each of our forms will submit to:

- createAction: will take the data from our form and make a call to create route of our API

- updateAction: will take the data from our form and make a call to the update route of our API

- deleteAction: will make a call to the delete route of our api

actions.js

```js
import { redirect } from "react-router-dom"

// YOUR DEPLOYED API BASE URL
const URL = "https://xxxxxxx.onrender.com"

//createAction => create a todo from form submissions to `/create`
export const createAction = async ({request}) => {
    // get form data
    const formData = await request.formData()

    // construct request body
    const newTodo = {
        subject: formData.get("subject"),
        details: formData.get("details")
    }

    // send request to backend
    await fetch(URL + "/todos/", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTodo)
    })

    // redirect back to index page
    return redirect("/")
}

//updateAction => update a todo from form submissions to `/update/:id`
export const updateAction = async ({request, params}) => {
    // get form data
    const formData = await request.formData()

    // get todo id
    const id = params.id

    // construct request body
    const updatedTodo = {
        subject: formData.get("subject"),
        details: formData.get("details")
    }

    // send request to backend
    await fetch(URL + `/todos/${id}/`, {
        method: "put",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedTodo)
    })

    // redirect back to show page page
    return redirect(`/post/${id}`)
}

//deleteAction => delete a todo from form submissions to `/delete/:id`
export const deleteAction = async ({params}) => {
    // get todo id
    const id = params.id

    // send request to backend
    await fetch(URL + `/todos/${id}/`, {
        method: "delete",
    })

    // redirect back to show page page
    return redirect("/")
}
```

Let's connect those actions to our routes in router.js

```js
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import App from "./App";
import { indexLoader, showLoader } from "./loaders";
import Index from "./pages/Index";
import Show from "./pages/Show";
import { createAction, updateAction, deleteAction } from "./actions";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="" element={<Index />} loader={indexLoader} />
        <Route path="post/:id" element={<Show />} loader={showLoader} />
        <Route path="create" action={createAction}/>
        <Route path="update/:id" action={updateAction}/>
        <Route path="delete/:id" action={deleteAction}/>
      </Route>
    </>
  )
);

export default router;
```

#### Creating a Todo

Let's add a form to our index page to create a todo.

pages/Index.js

```js
import Post from "../components/Post";
import {useLoaderData} from "react-router-dom"
import { Form } from "react-router-dom";

const Index = (props) => {
  const todos = useLoaderData()
  // For each post in the array render a Post component
  return <>
  <div style={{textAlign: "center"}}>
  <h2>Create a Todo</h2>
  <Form action="/create" method="post">
      <input type="text" name="subject" placeholder="write subject here"/>
      <input type="text" name="details" placeholder="write details here"/>
      <button>Create New Todo</button>
  </Form>
  </div>
  {todos.map((post) => <Post post={post} key={post.id} />)}
  </>;
};

export default Index;
```

#### Editing and Deleting Todos

Now we just need to add a Form for updated and a Form for deleting in our Show page and we're good to go!

pages/Show.js

```js
import { Link, useLoaderData, Form } from "react-router-dom";

// destructuring the props needed to get our post, including router prop match
const Show = () => {
  const post = useLoaderData();

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
      <div style={{ textAlign: "center" }}>
        <h2>Create a Todo</h2>
        <Form action={`/update/${post.id}`} method="post">
          <input
            type="text"
            name="subject"
            placeholder="write subject here"
            defaultValue={post.subject}
          />
          <input
            type="text"
            name="details"
            placeholder="write details here"
            defaultValue={post.details}
          />
          <button>Update Todo</button>
        </Form>
        <Form action={`/delete/${post.id}`} method="post">
          <button>Delete Todo</button>
        </Form>
      </div>
      <Link to="/">
        <button>Go Back</button>
      </Link>
    </div>
  );
};

export default Show;
```
You have achieved Full CRUD!

Now you can deploy the static site to Vercel, Render or Netlify!

---
