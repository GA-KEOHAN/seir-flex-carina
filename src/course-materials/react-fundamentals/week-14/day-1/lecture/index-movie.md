# React Movie Search

### Lesson to be Learned

- Making AJAX requests in a React Application
- Lifting state that is shared by components
- using the useEffect Hook

## create-react-app

When it comes to using the major frontend frameworks (Angular, React, Vue, and Svelte) to really create the ideal development environment it can take several different tools.

- **babel** A tool for taking cutting ends javascript code and jsx and translating it into older browser readable javascript. This allows us to use the newest javascript in React with out concern for browser compatibility.

- **ESLint** A linter is a tool that seeks out syntax errors and issues warnings and errors to help you clean up your code faster. There is React ESLint libraries that allow ESLint to give us information to optimize our React builds.

- **bundler** A bundler takes all our code across several javascript files, runs it through several plugins (like babel and eslint) then takes all the code and builds it into one javascript file for deployment. The two major bundlers are Webpack and Rollup, with Parcel and Snowpack being newcomers growing in popularity.

It would not be pleasant to have to configure all of the above for every React app you want to create so there is a vast array of project generators out there for all the frameworks that give you pre-configured templates to start from.

Facebook, the creators of React, have created one for React called, create-react-app. With one command we can generate the an optimized and configured environment designed by the Facebook team to start our app from!

**How do we do it!**

`npx create-react-app projectName`

Let's break it down...

- **NPX** npx is a tool build into npm to run different npm tools one time, so that way you don't have to install them permanent for quick use. This is usually used mainly with project generators and CLI tools.

- **create-react-app** tool created by facebook that does one thing, generate a React project with all the fancy tools ready to go (Webpack, ESLint, Babel, more).

- **projectName** The name of the folder that will be created with your new project!

## Creating our Project

- create a new "react" folder where we will generate all our React projects going forward.

- From the terminal in your react folder run the following command `npx create-react-app reactmovies`

- cd into the new reactmovies folder

- enter command `npm start` to start the development server and see the default react website.

## Third Party APIs

Many web sites have their own data which they make available to developers either for free or a small fee, while others charge quite a bit and are very expensive.

Below is a non-exhaustive list of some free API's you can use. Please note that some may require signing up for an API key (Giphy) and others require a bit more setup (Marvel API)

#### No Key Required
  1. Pokemon: http://pokeapi.co/
  1. Card Deck: https://deckofcardsapi.com/
  1. Google Books: https://developers.google.com/books/
  1. City of Chicago: https://data.cityofchicago.org/
  1. Beer: https://www.brewerydb.com/developers
  1. Chuck Norris: http://www.icndb.com/
  1. Rick and Morty: https://rickandmortyapi.com/documentation/#rest
  1. Star Wars: https://swapi.co/


#### Key Required
  1. Marvel: https://developer.marvel.com/
  1. Weather: https://openweathermap.org/api
  1. Giphy: https://developers.giphy.com/ 
  1. News: https://newsapi.org/


<!-- <hr>

#### <g-emoji class="g-emoji" alias="alarm_clock" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/23f0.png">⏰</g-emoji> Activity - 5min

- Let's take a moment and examine a few of the [public API's](https://github.com/toddmotto/public-apis) available. 
- Pick a topic of interest and examine the API's for that category. 

Let's capture some of the APIs you've discovered and their category.

#### Catergory Name
- API url

#### Catergory Name
- API url


<hr> -->

## API

As we've seen so far API's provide access to the data via a url. Let's take a look at the [RandomUser API](https://randomuser.me/) specifically. 

```js
https://randomuser.me/api
```

This returns a single random user. 

<img src="https://i.imgur.com/nk78W6A.png"  />

**Query String**

This API has also been constructed to allow us to request multiple users in one call. This is done by using a `query string`  that includes the search parameters. 

The `query string` is placed at the end of the url and starts with a `?` followed by a `key=value` pair. 

Here are a few examples of API's using a `query string` to include additional parameters in the request:

**Random User**

Here we request 5 users
```js
https://randomuser.me/api/?results=5
```

We can also add multiple search queries using the `&` symbol along with additional query values. 
```js
https://randomuser.me/api/?results=5&gender=female
```

**Swapi (Star Wars)**

```js
https://swapi.dev/api/people/?search=r2
```

## Movie Display Component

In today's application we will be using the OMDB API to pull information about movies and render them to the screen. To use the OMDB API you will need an API key so take a moment and get one from here...

- http://www.omdbapi.com/

In case you have any trouble with your api key, here is one but please use carefully to not reach request limits: 98e3fb1f

Test our your key by opening the following url in a new tab:

http://www.omdbapi.com/?apikey=YOURKEY&t=godfather

replace YOURKEY with your api key.

For the omdb api the api key is submitted via a URL query (anything after the ? in a url). Every API is different so what queries can you submit to an api if any will be in the documentation of that api, for the omdb api...

- apikey: is your api key

- t: the title of the movie you are searching for

**NOTE:** Every API is different so some don't need API keys, some need them in the url, some need them sent in request headers, some need multiple security keys, so never assume anything about the API other than you need to read its documentation.

## Our Components

We will have two additional components in this build, a component that displays movie data then a form that we can use to type which movie we want to search and display.

Convention is to create a components folder in your src folder and build any additional components in there.

so inside src/components/ you should create two files...

- MovieDisplay.js
- Form.js

Now let's put the react boilerplate in both of them...

MovieDisplay.js

```js
// We Must Import the React Library
import React from "react";

// Define a function that is our component, always make sure to declare the props parameter so you can use props in your component
const MovieDisplay = (props) => {
  //The component must return some JSX
  return <h1>The MovieDisplay Component</h1>;
};

// We must export the component to use it in other files
export default MovieDisplay;
```

Form.js

```js
// We Must Import the React Library
import React from "react";

// Define a function that is our component, always make sure to declare the props parameter so you can use props in your component
const Form = (props) => {
  //The component must return some JSX
  return <h1>The Form Component</h1>;
};

// We must export the component to use it in other files
export default Form;
```

Now let's import them and use them in src/App.js

```js
import React from "react";
import logo from "./logo.svg";
import "./App.css";
// WE IMPORT OUR COMPONENTS
import MovieDisplay from "./components/MovieDisplay";
import Form from "./components/Form";

function App() {
  // USE OUR COMPONENTS IN APPs RETURNED JSX
  return (
    <div className="App">
      <Form />
      <MovieDisplay />
    </div>
  );
}

export default App;
```

## Building out the Form

So in our form component we need to do the following

- return the form in the components JSX

Form.js

```js
// We Must Import the React Library
import React from "react";

// Define a function that is our component, always make sure to declare the props parameter so you can use props in your component
const Form = (props) => {
  //The component must return some JSX
  return (
    <div>
      <form>
        <input type="text" />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

// We must export the component to use it in other files
export default Form;
```

## Lifting State

But here we run into an issue. When we make the AJAX call for the movie data, we need somewhere to save the data too... we need state. Creating state is simple enough but the data then needs to later be shipped to the MovieDisplay component which is a sibling (both components are currently children of App).

One thing about React is information only moves in one direction, down. There is no practical way to send the state from Form to MovieDisplay so they'll need to house the data in a mutual parent, App.

So when two components need to share data you'll often move where the data is primarily existing (the location of the state with the data) to a shared parent and this pattern is known as "Lifting State".

So while App doesn't need the movie data, its children do so it will become the bearer of the data. (In general you prefer for components to not share state when possible so they can be more reusable).

So let's head over to App and do the following...

- Create state to hold our movie data

- Create a function that is given the search term then does the fetch request for the movie data and stores it in state

- Pass the function down to form via props

App.js

```js
import React from "react";
import logo from "./logo.svg";
import "./App.css";
// WE IMPORT OUR COMPONENTS
import MovieDisplay from "./components/MovieDisplay";
import Form from "./components/Form";

function App() {
  //variable with your apiKey
  const apiKey = "98e3fb1f";

  //State to hold movie data
  const [movie, setMovie] = React.useState(null);

  //Function to getMovies
  const getMovie = async (searchTerm) => {
    // make fetch request and store response
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`
    );
    // Parse JSON response into a javascript object
    const data = await response.json();
    //set the Movie state to the movie
    setMovie(data);
  };

  // USE OUR COMPONENTS IN APPs RETURNED JSX
  // We pass the getMovie function as a prop called moviesearch
  return (
    <div className="App">
      <Form moviesearch={getMovie} />
      <MovieDisplay />
    </div>
  );
}

export default App;
```

## Finishing Our Form

Now that we passed down the getMovie function to form which allows use to pass the search term to our App component let's wire up the form by doing the following.

- creating state to track our form value
- a handleChange function to control our form value
- a handleSubmit function that passes the formData to getMovie via the moviesearch prop

Form.js

```js
import React from "react";

// Define a function that is our component, always make sure to declare the props parameter so you can use props in your component
const Form = (props) => {
  //State to hold the data of our form
  const [formData, setFormData] = React.useState({
    searchterm: "",
  });

  //handleChange - updates formData when we type into form
  const handleChange = (event) => {
    //use the event object to detect key and value to update
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    //prevent page from refreshing on form submission
    event.preventDefault();
    //pass the search term to moviesearch prop, which is apps getMovie function
    props.moviesearch(formData.searchterm);
  };

  //The component must return some JSX
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="searchterm"
          onChange={handleChange}
          value={formData.searchterm}
        />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

// We must export the component to use it in other files
export default Form;
```

Now type a movie into the form and hit submit and open up your devtools and see if everything worked by checking two things:

- Under the network tab look for the successful request and examine the data there, this is a great place to diagnose when your fetch calls aren't behaving as expected

- If you don't have it already, make sure to download the React devTools chrome extension and then look to see if the state in your App component has updated as expected.

So now we have the data, we just have to get to render to the screen... how are we going to do that?

## Displaying Our Movie

Currently our App component has the data and we need to send it to our MovieDisplay component, we can do this by simply passing the state as props!

App.js

```js
import React from "react";
import logo from "./logo.svg";
import "./App.css";
// WE IMPORT OUR COMPONENTS
import MovieDisplay from "./components/MovieDisplay";
import Form from "./components/Form";

function App() {
  //variable with your apiKey
  const apiKey = "98e3fb1f";

  //State to hold movie data
  const [movie, setMovie] = React.useState(null);

  //Function to getMovies
  const getMovie = async (searchTerm) => {
    // make fetch request and store response
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`
    );
    // Parse JSON response into a javascript object
    const data = await response.json();
    //set the Movie state to the movie
    setMovie(data);
  };

  // USE OUR COMPONENTS IN APPs RETURNED JSX
  // We pass the getMovie function as a prop called moviesearch
  // We pass movie as props to movie display
  return (
    <div className="App">
      <Form moviesearch={getMovie} />
      <MovieDisplay movie={movie} />
    </div>
  );
}

export default App;
```

Now let's display the data in MovieDisplay.js

MovieDisplay.js

```js
// We Must Import the React Library
import React from "react";

// Define a function that is our component, always make sure to declare the props parameter so you can use props in your component
// You can also destructure your props directly from the parameter list
const MovieDisplay = ({ movie }) => {
  //The component must return some JSX
  return (
    <>
      <h1>{movie.Title}</h1>
      <h2>{movie.Genre}</h2>
      <img src={movie.Poster} alt={movie.Title} />
      <h2>{movie.Year}</h2>
    </>
  );
};

// We must export the component to use it in other files
export default MovieDisplay;
```

Now you may notice you are getting an error saying cannot read property title of null. React doesn't know to not render MovieDisplay until we have movie data so it's attempting to render a movie we haven't gotten yet the moment the website loads triggering this error.

To fix it we need to make sure movie data exists, we will do the following:

- make a loaded function that returns the JSX if the data exists

- make a loading function that returns the JSX if it doesn't

- use a ternary operator to determine which function we return

**We are using functions cause the JSX expressions aren't evaluated until the function is invoked, while just saving a JSX expression in a variable would mean they'd get evaluated right away still triggering the error.**

Form.js

```js
// We Must Import the React Library
import React from "react";

// Define a function that is our component, always make sure to declare the props parameter so you can use props in your component
// You can also destructure your props directly from the parameter list
const MovieDisplay = ({ movie }) => {
  //function to return loaded JSX
  const loaded = () => {
    return (
      <>
        <h1>{movie.Title}</h1>
        <h2>{movie.Genre}</h2>
        <img src={movie.Poster} alt={movie.Title} />
        <h2>{movie.Year}</h2>
      </>
    );
  };

  //function to return loading JSX
  const loading = () => {
    return <h1>No Movie to Display</h1>;
  };

  //Ternary operator will determine which functions JSX we will return
  return movie ? loaded() : loading();
};

// We must export the component to use it in other files
export default MovieDisplay;
```

Awesome, now our app is working! Now it would be nice if a movie showed up right away. The problem is we can't just make a call to getMovie in the body of the App component cause it would...

- it would make the fetch call
- it would update the state
- the component would re-render
- getMovie gets invoked again
- creating an infinite loop

Is there a way to have something happen when a component loads without repeating on every render?

## useEffect

The React useEffect Hook allows us to create things that only happen at certain times.

The fundamental syntax of useEffect is as follows

```js
React.useEffect(() => {}, []);
```

Notice the first argument is a function, that function will run once when the component first loads. The second argument is an array. On each render of the component the items in the array are compared to their value on the previous render and if they are a different value the function will run again. This gives you a way to create logic in a component that doesn't run on every render.

This is a perfect place to make a call to getMovie!

App.js

```js
import React from "react";
import logo from "./logo.svg";
import "./App.css";
// WE IMPORT OUR COMPONENTS
import MovieDisplay from "./components/MovieDisplay";
import Form from "./components/Form";

function App() {
  //variable with your apiKey
  const apiKey = "98e3fb1f";

  //State to hold movie data
  const [movie, setMovie] = React.useState(null);

  //Function to getMovies
  const getMovie = async (searchTerm) => {
    // make fetch request and store response
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`
    );
    // Parse JSON response into a javascript object
    const data = await response.json();
    //set the Movie state to the movie
    setMovie(data);
  };

  //This will run on the first render but not on subsquent renders
  React.useEffect(() => {
    getMovie("Clueless");
  }, []);

  // USE OUR COMPONENTS IN APPs RETURNED JSX
  // We pass the getMovie function as a prop called moviesearch
  // We pass movie as props to movie display
  return (
    <div className="App">
      <Form moviesearch={getMovie} />
      <MovieDisplay movie={movie} />
    </div>
  );
}

export default App;
```

### BONUS EXERCISE IF TIME

Take 10 minutes and change the useEffect so that way on each refresh of the page it grabs a random movie.