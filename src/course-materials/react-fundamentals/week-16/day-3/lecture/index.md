# People Build, Show, Edit and Delete

## Links to Show Page

Right now the link to each show page doesn't work, let's fix that!

## The Show Page

First step is we need a loader for the the show route, let's add it to `loaders.js`

```js
const URL = "http://localhost:4000"

export const peopleLoader =  async() => {
    const response = await fetch(URL + "/people")
    const people = await response.json()
    return people
}

export const personLoader = async ({params}) => {
    const response = await fetch(URL + "/people/" + params.id )
    const person = await response.json()
    return person
}
```

Let's attach the loader to the route in router.js

```js
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom"
import App from "./App"
import Index from "./pages/Index"
import Show from "./pages/Show"
import { peopleLoader, personLoader } from "./loaders"
import { createAction } from "./actions"

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<App/>}>
        <Route path="" element={<Index/>} loader={peopleLoader}/>
        <Route path=":id" element={<Show/>} loader={personLoader}/>
        <Route path="create" action={createAction}/>
        <Route path="update/:id"/>
        <Route path="delete/:id"/>
    </Route>
))

export default router
```

Now let's build out our Show.js


```js
import { useLoaderData } from "react-router-dom"

function Show(props) {
    const person = useLoaderData()
  
    return (
      <div className="person">
        <h1>{person.name}</h1>
        <h2>{person.title}</h2>
        <img src={person.image} alt={person.name} />
      </div>
    )
  }
  
  export default Show
```

## Updating a Person

On the show page let's add

- add a router Form

- create an action for when the Form submits to `/update/:id`

- attach the action to the right route

```js
import { useLoaderData, Form } from "react-router-dom";

function Show(props) {
  const person = useLoaderData();

  return (
    <div className="person">
      <h1>{person.name}</h1>
      <h2>{person.title}</h2>
      <img src={person.image} alt={person.name} />

      <h2>Update {person.name}</h2>
      <Form action={`/update/${person._id}`} method="post">
        <input type="input" name="name" placeholder="person's name" />
        <input type="input" name="image" placeholder="person's picture" />
        <input type="input" name="title" placeholder="person's title" />
        <input type="submit" value={`update ${person.name}`} />
      </Form>
    </div>
  );
}

export default Show;
```

Now let's add an action to handle the update to actions.js

```js
import { redirect } from "react-router-dom"

const URL = "http://localhost:4000"

export const createAction = async ({request}) => {
    // get data from form
    const formData = await request.formData()
    // set up our new person to match schema
    const newPerson = {
        name: formData.get("name"),
        image: formData.get("image"),
        title: formData.get("title")
    }
    // Send new person to our API
    await fetch(URL + "/people", {
        method: "post",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(newPerson)
    })
    // redirect to index
    return redirect("/")
}

export const updateAction = async ({request, params}) => {
    // get data from form
    const formData = await request.formData()
    // set up our new person to match schema
    const updatedPerson = {
        name: formData.get("name"),
        image: formData.get("image"),
        title: formData.get("title")
    }
    // Send new person to our API
    await fetch(URL + "/people/" + params.id, {
        method: "put",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(updatedPerson)
    })
    // redirect to index
    return redirect("/")
}
```

Now we just add that action to right route and we're good to go!

router.js
```js
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom"
import App from "./App"
import Index from "./pages/Index"
import Show from "./pages/Show"
import { peopleLoader, personLoader } from "./loaders"
import { createAction, updateAction } from "./actions"

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<App/>}>
        <Route path="" element={<Index/>} loader={peopleLoader}/>
        <Route path=":id" element={<Show/>} loader={personLoader}/>
        <Route path="create" action={createAction}/>
        <Route path="update/:id" action={updateAction}/>
        <Route path="delete/:id"/>
    </Route>
))

export default router
```

## Deleting a Person

All we have to do is add a delete button now, and we can do that using a Form and following the same pattern.

- Add Form
- Add Action
- Connect Action to Route

```js
import { useLoaderData, Form } from "react-router-dom";

function Show(props) {
  const person = useLoaderData();

  return (
    <div className="person">
      <h1>{person.name}</h1>
      <h2>{person.title}</h2>
      <img src={person.image} alt={person.name} />

      <h2>Update {person.name}</h2>
      <Form action={`/update/${person._id}`} method="post">
        <input type="input" name="name" placeholder="person's name" defaultValue={person.name}/>
        <input type="input" name="image" placeholder="person's picture" defaultValue={person.image}/>
        <input type="input" name="title" placeholder="person's title" defaultValue={person.title} />
        <input type="submit" value={`update ${person.name}`} />
      </Form>
      <h2>Delete Person</h2>
      <Form action={`/delete/${person._id}`} method="post">
      <input type="submit" value={`delete ${person.name}`} />
      </Form>
    </div>
  );
}

export default Show;
```

Create our action in action.js

```js
import { redirect } from "react-router-dom"

const URL = "http://localhost:4000"

export const createAction = async ({request}) => {
    // get data from form
    const formData = await request.formData()
    // set up our new person to match schema
    const newPerson = {
        name: formData.get("name"),
        image: formData.get("image"),
        title: formData.get("title")
    }
    // Send new person to our API
    await fetch(URL + "/people", {
        method: "post",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(newPerson)
    })
    // redirect to index
    return redirect("/")
}

export const updateAction = async ({request, params}) => {
    // get data from form
    const formData = await request.formData()
    // set up our new person to match schema
    const updatedPerson = {
        name: formData.get("name"),
        image: formData.get("image"),
        title: formData.get("title")
    }
    // Send updated person to our API
    await fetch(URL + "/people/" + params.id, {
        method: "put",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(updatedPerson)
    })
    // redirect to index
    return redirect("/")
}

export const deleteAction = async ({params}) => {
    // delete person with our API
    await fetch(URL + "/people/" + params.id, {
        method: "delete"
    })
    // redirect to index
    return redirect("/")
}
```

Attach the action to our `delete/:id` route

router.js
```js
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom"
import App from "./App"
import Index from "./pages/Index"
import Show from "./pages/Show"
import { peopleLoader, personLoader } from "./loaders"
import { createAction, updateAction, deleteAction } from "./actions"

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<App/>}>
        <Route path="" element={<Index/>} loader={peopleLoader}/>
        <Route path=":id" element={<Show/>} loader={personLoader}/>
        <Route path="create" action={createAction}/>
        <Route path="update/:id" action={updateAction}/>
        <Route path="delete/:id" action={deleteAction}/>
    </Route>
))

export default router
```

CRUD functionality should be complete

## Some Final Styling

A few more changes to our styles.scss

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

// --------------------------
// Form
// --------------------------

section,
div {
  form {
    input {
      @include white-text-black-bg;
      padding: 10px;
      font-size: 1.1em;
      margin: 10px;

      &[type="submit"]:hover {
        @include black-test-white-bg;
      }
    }
  }
}

// --------------------------
// button
// --------------------------

button#delete {
  @include white-text-black-bg;
  display: block;
  margin: auto;
  font-size: 1.3em;
  padding: 10px;
}

// --------------------------
// images
// --------------------------

img {
  width: 300px;
  height: 300px;
  border-radius: 90px;
  object-fit: cover;
}
```

Just make sure the URL in your actions.js and loaders.js is your deployed API URL.

## Configuring Redirects for React Router

Since we are using React Router which aren't real routes, a user may refresh a page and get an error so we need to make sure our host will redirect requests to any other url back to our application.

#### 2 Ways to do this for Netlify.com

- add a netlify.toml with the following

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
```

- or add a file called `_redirects` in the public folder with the following:
```
/*  /index.html   200
```
#### 1 Way to do this for Vercel

_NOTE, if you wanted to deploy to Vercel you'd include a vercel.json with the following_

```json
{
  "version": 2,
  "routes": [
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ]
}
```

#### 1 Way for Render

For render you have to deploy first then in your project settings there is a section for setting up redirects. Setup a redirect with the following rule:
```
source: /*
destination: /index.html
```

## Deployment Steps

- push frontend repo to github

- connect repo to netlify/vercel/render (for render deploy a static app, not a web service)

just in case
```
build command: npm run build
publish folder: build
```

- done

**[FINISHED CODE FOR REFERENCE](https://github.com/AlexMercedCoder/peoplereactexpressbuildcode)**

## Lab - Complete Your Cheese App

Complete your cheese app using the steps of todays lessons adding the following:

- the ability see an individual cheese
- the ability edit a cheese
- the ability to delete a cheese
