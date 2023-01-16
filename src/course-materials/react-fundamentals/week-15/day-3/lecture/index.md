# React People Setup, Index, Create

## Setup

- open terminal in frontend folder

- install react router and sass:

```
  npm install react-router-dom sass
```

- create a file called styles.scss in the /src folder

## Installing Router and Sass

With React-Router we will be able to create Routes, Loaders and Actions:

- Routes: A component that render when navigate to a particular URL
- Loaders: A function to get data that runs before a route loads and can be used in a component with the useLoaderData hook
- Actions: Functions that run if a `Form` component is submitted to a particular route.

To keep track of these create three files in your `src` folder

- router.js
- loaders.js
- actions.js

In router.js let's setup our router:

```js
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import App from "./App"

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<App />}></Route>)
)

export default router
```

- Update index.js to like like so

```js
import React from "react"
import ReactDOM from "react-dom/client"
import "./styles.scss"
import reportWebVitals from "./reportWebVitals"
import { RouterProvider } from "react-router-dom"
import router from "./router"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
```

## Scoping Out Our Components

- Create a components and pages folder

- In the components folder create a Header.js file

- In the pages folder create a Index.js and Show.js folder

- Write the component boilerplate and export the component in all the created files

```jsx
function Component(props) {
  return <h1>Component Name</h1>
}

export default Component
```

## App.js

Our desired component Architecture

```
-> App
  -> Header
  -> Outlet
      -> Route |path: "/"|
        -> Index |loads all people|
      -> Route |path="/people/:id|
        -> Show |loads single person|
      -> Route |path: "/create"| Action to create people
      -> Route |path: "/update/:id"| Action to update people
      -> Route |path: "/delete/:id"| Action to delete people
```

Let's update our routes in router.js:

```js
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import App from "./App"
import Index from "./pages/Index"
import Show from "./pages/Show"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Index />} />
      <Route path=":id" element={<Show />} />
      <Route path="create" />
      <Route path="update/:id" />
      <Route path="delete/:id" />
    </Route>
  )
)

export default router
```

Let's add the following to App.js

```js
import { Outlet } from "react-router-dom"
import Header from "./components/Header"

function App() {
  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  )
}

export default App
```

## Setting up router in Main.js

- let's create our routes

## Setting Up Navigation

Let's put the following in Header.js

```js
import { Link } from "react-router-dom"

function Header(props) {
  return (
    <nav className="nav">
      <Link to="/">
        <div>People App</div>
      </Link>
    </nav>
  )
}

export default Header
```

## Sass

Sass is a CSS pre-compiler that allows us some new tricks in writing CSS including...

- Nesting
- Mixin
- Variables

Let's write some Sass in our styles.scss

```scss
// --------------------------
// VARIABLES
// --------------------------
$maincolor: black;
$contrastcolor: white;

@mixin white-text-black-bg {
  color: $contrastcolor;
  background-color: $maincolor;
}

@mixin black-test-white-bg {
  color: $maincolor;
  background-color: $contrastcolor;
}

// --------------------------
// Header
// --------------------------

nav {
  @include white-text-black-bg;
  display: flex;
  justify-content: flex-start;

  a {
    @include white-text-black-bg;
    div {
      margin: 10px;
      font-size: large;
    }
  }
}
```

## Displaying People in Index

First we will give the index route a loader to load all the people who should be listed. This is how `src/loaders.js` should look like:

```js
const URL = "http://localhost:4000"

export const peopleLoader = async () => {
  const response = await fetch(URL + "/people")
  const people = await response.json()
  return people
}
```

Then we attach this loader to our route in router.js

```js
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import App from "./App"
import Index from "./pages/Index"
import Show from "./pages/Show"
import { peopleLoader } from "./loaders"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Index />} loader={peopleLoader} />
      <Route path=":id" element={<Show />} />
      <Route path="create" />
      <Route path="update/:id" />
      <Route path="delete/:id" />
    </Route>
  )
)

export default router
```

Let's now display the people in Index.js

```js
import { Link, useLoaderData } from "react-router-dom"

function Index(props) {
  const people = useLoaderData()

  return people.map(person => (
    <div key={person._id} className="person">
      <Link to={`/${person._id}`}>
        <h1>{person.name}</h1>
      </Link>
      <img src={person.image} alt={person.name} />
      <h3>{person.title}</h3>
    </div>
  ))
}

export default Index
```

## Creating People

Let's now add a form to our index.js

- Use the react-router form component which triggers a route actions when submitted
- We will create an action that create a person from the form data with our API

```js
import { Form, Link, useLoaderData } from "react-router-dom"

function Index(props) {
  const people = useLoaderData()

  return (
    <div>
      <h2>Create a Person</h2>
      <Form action="/create" method="post">
        <input type="input" name="name" placeholder="person's name" />
        <input type="input" name="image" placeholder="person's picture" />
        <input type="input" name="title" placeholder="person's title" />
        <input type="submit" value="create person" />
      </Form>

      <h2>People</h2>
      {people.map(person => (
        <div key={person._id} className="person">
          <Link to={`/${person._id}`}>
            <h1>{person.name}</h1>
          </Link>
          <img src={person.image} alt={person.name} />
          <h3>{person.title}</h3>
        </div>
      ))}
    </div>
  )
}

export default Index
```

Now we just need to create an action for when that form is submitted for the `/create` route. Let's add the following to `actions.js`:

```js
import { redirect } from "react-router-dom"

const URL = "http://localhost:4000"

export const createAction = async ({ request }) => {
  // get data from form
  const formData = await request.formData()
  // set up our new person to match schema
  const newPerson = {
    name: formData.get("name"),
    image: formData.get("image"),
    title: formData.get("title"),
  }
  // Send new person to our API
  await fetch(URL + "/people", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPerson),
  })
  // redirect to index
  return redirect("/")
}
```

Now let's attach this action to the right route in router.js:

```js
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import App from "./App"
import Index from "./pages/Index"
import Show from "./pages/Show"
import { peopleLoader } from "./loaders"
import { createAction } from "./actions"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Index />} loader={peopleLoader} />
      <Route path=":id" element={<Show />} />
      <Route path="create" action={createAction} />
      <Route path="update/:id" />
      <Route path="delete/:id" />
    </Route>
  )
)

export default router
```

## Conclusion

You should now be able to see all the people and create people

## Lab

Begin the Frontend for your Cheese app, and create the ability to display and create cheeses like our People app.
