# React People Setup, Index, Create

## Setup

- open terminal in frontend folder

- install react router and sass:

```
  npm install react-router-dom@5.1.2
  npm install sass
``` 

NOTE: Be sure to install react-router-dom version 5.1.2. If you don't specify a version it will install the brand new one that has many breaking changes to our code.

- create a file called styles.scss in the /src folder

## Installing Router and Sass

- Update index.js to like like so

```js
import React from "react";
import ReactDOM from "react-dom";
// IMPORT SCSS FILE TO BE SOURCE OF STYLING
import "./styles.scss";
// IMPORT ROUTER
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

## Scoping Out Our Components

- Create a components and pages folder

- In the components folder create a Header.js and Main.js file

- In the pages folder create a Index.js and Show.js folder

- Write the component boilerplate and export the component in all the created files

```jsx
function Component(props){
  return <h1>Component Name</h1>
} 

export default Component
```

## App.js

Our desired component Architecture

```
-> App
  -> Header
  -> Main |state: people|
    -> Switch
      -> Route |path: "/"|
        -> Index |Props: people, createPeople|
      -> Route |path="/people/:id|
        -> Show |Props: people, updatePeople, deletePeople|
```

Let's add the following to App.js

```js
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

export default App;
```

## Setting up router in Main.js

- let's create our routes

```js
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {

  return (
    <main>
      <Switch>
        <Route exact path="/">
          <Index/>
        </Route>
        <Route
          path="/people/:id"
          render={(rp) => (
            <Show
              {...rp}
            />
          )}
        />
      </Switch>
    </main>
  );
}

export default Main;
```

## Setting Up Navigation

Let's put the following in Header.js

```js
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <nav className="nav">
      <Link to="/">
        <div>People App</div>
      </Link>
    </nav>
  );
}

export default Header;
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

We need the state to exist in Main so it can be shared between Index and Show. So let's update Main to have:

- state to hold our list of people
- function to make the api call for people
- function to create a new person
- useEffect to make initial call for people list
- pass the people state and the create function to Index

Main.js

```js
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {
  const [people, setPeople] = useState(null);

  const URL = "http://localhost:4000/people/";

  const getPeople = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setPeople(data);
  };

  const createPeople = async (person) => {
    // make post request to create people
    await fetch(URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    // update list of people
    getPeople();
  };

  useEffect(() => getPeople(), []);

  return (
    <main>
      <Switch>
        <Route exact path="/">
          <Index people={people} createPeople={createPeople} />
        </Route>
        <Route
          path="/people/:id"
          render={(rp) => (
            <Show
              {...rp}
            />
          )}
        />
      </Switch>
    </main>
  );
}

export default Main;

```

Let's now display the people in Index.js

```js
import { useState } from "react";
import {Link} from "react-router-dom"

function Index(props) {

  // loaded function
  const loaded = () => {
    return props.people.map((person) => (
      <div key={person._id} className="person">
        <Link to={`/people/${person._id}`}><h1>{person.name}</h1></Link>
        <img src={person.image} alt={person.name} />
        <h3>{person.title}</h3>
      </div>
    ));
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };
  return props.people ? loaded() : loading()

}

export default Index;
```

## Creating People

Let's now add a form to our index.js

- state to hold the form data
- form inputs in our JSX
- handlechange function to allow our state to control the form
- handlesubmit function handle form submisssion

```js

import { useState } from "react";
import {Link} from "react-router-dom"

function Index(props) {
  // state to hold formData
  const [newForm, setNewForm] = useState({
    name: "",
    image: "",
    title: "",
  });

  // handleChange function for form
  const handleChange = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value });
  };

  // handle submit function for form
  const handleSubmit = (event) => {
    event.preventDefault();
    props.createPeople(newForm);
    setNewForm({
      name: "",
      image: "",
      title: "",
    });
  };

  // loaded function
  const loaded = () => {
    return props.people.map((person) => (
      <div key={person._id} className="person">
        <Link to={`/people/${person._id}`}><h1>{person.name}</h1></Link>
        <img src={person.image} alt={person.name} />
        <h3>{person.title}</h3>
      </div>
    ));
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.image}
          name="image"
          placeholder="image URL"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.title}
          name="title"
          placeholder="title"
          onChange={handleChange}
        />
        <input type="submit" value="Create Person" />
      </form>
      {props.people ? loaded() : loading()}
    </section>
  );
}

export default Index;

```

## Conclusion

You should now be able to see all the people and create people

## Lab

Begin the Frontend for your Cheese app, and create the ability to display and create cheeses like our People app.