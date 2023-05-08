## React Router BitCoin PriceFinder

Purpose of this lesson is to Build A Crypto Price Discovery App and learn

- How to setup react router
- How to create use Router Components
- How to use URL Params and Data API features of React Router

## The Problem

We are often used to making websites with several "pages" which would be split across several html delivered statically or rendered by templates on a server. When making a React app, the application is a single page with one html file. We can have components conditionally render to make the illusion of pages but it doesn't quite feel as intuitive as using a tags to link to different html files.

What the React-Router library does is allow us to define components that render based on the url in the address bar. We link to them with Link components which feel similar to the a tags we are used to. It allows to create a single page application in a way that feels like a multi-page application.

With React Router 6.4 and above many new Data API features have been added that make data fetching and form handling much easier than in the past.

## Setup

In your React folder do the following

- run command `npx create-react-app cryptoprices`
- cd into the cryptoprices folder
- run `npm install react-router-dom`
- run `npm start` to begin development server

## Setting Up Router

To setup router we need two things:

- a router that defines all of our routes
- the RouterProvider to render those routes

Let's first define our router, create a file called `src/router.js` with the following:

router.js

```js
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom"

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<h1>Hello World</h1>}>
            
        </Route>
    )
)


export default router 
```

We create one main route that is essentially our layout with the stuff that should always be visible and then we will child routes under that route to represent the different pages.

index.js

```js
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider} from 'react-router-dom';
import router from './router';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

## Components vs Pages

A common convention is to create two folders, components and pages. Any component that is used as a piece of UI goes in the components folder, any component meant to act as a "page" of the website goes in pages.

- create a components and pages folder
- create a currencies.js, main.js, price.js file in the pages folder
- create the component boilerplate in each component

main.js

```js
const Main = (props) => {
  return <h1>This is the Main Component</h1>;
};

export default Main;
```

currencies.js

```js
const Currencies = (props) => {
  return <h1>This is the Currencies Component</h1>;
};

export default Currencies;
```

price.js

```js
const Price = (props) => {
  return <h1>This is the Price Component</h1>;
};

export default Price;
```

## Creating Our Routes

Now we will setup up our App component to be our main wrapper. The Outlet component will determine where all our child routes will show up on the page.

App.js

```js
import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  // We will use the Route component to specify each route
  return (
    <div className="App">
    <Outlet/>
    </div>
  );
}

export default App;
```

Now to update our router with our routes.

router.js
```js
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom"
import App from "./App"
import Main from "./pages/main"
import Currencies from "./pages/currencies"
import Price from "./pages/price"

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
            <Route path="" element={<Main/>}/>
            <Route path="currencies" element={<Currencies/>}/>
            <Route path="price" element={<Price/>}/>
        </Route>
    )
)
```

Right now only the Main component is rendering cause we are on the main page, "/". To change the URL bar, we need some links so lets create a navigation.

## Navigation

In your components folder create a nav.js

components/nav.js

```js
import React from "react";
import { Link } from "react-router-dom";

const Nav = (props) => {
  return (
    <div className="nav">
      <Link to="/">
        <div>CRYPTO PRICES</div>
      </Link>
      <Link to="/currencies">
        <div>CURRENCIES</div>
      </Link>
    </div>
  );
};

export default Nav;
```

Next add the following styles to index.css

```css
.nav {
  display: flex;
  justify-content: space-between;
  background-color: black;
  color: white;
  padding: 15px;
  font-size: 2em;
}

.nav a {
  color: white;
  text-decoration: none;
}
```

import the nav component into app.js

```js
import { Outlet } from "react-router-dom";
import Nav from "./components/nav";
import "./App.css";

function App() {
  // We will use the Route component to specify each route
  return (
    <div className="App">
      <Nav />
      <Outlet />
    </div>
  );
}

export default App;
```

A Few things to notice:

- The function of the link tags is to change the URL bar to match the "to" prop, look at the change in the URL bar when you click on them. The reason we don't use an a tag is cause clicking an a tag triggers the browser to make a request and refresh the page which will break router (cause there is no server to respond to the browsers request, the url is merely a simulation of multiple pages).


## Params

We are going to soon build out our currencies component which will allow us to select which currencies price we'd like to see. We will do this by injecting a variable in our Price routes path, so edit the Price route like so...

```js
<Route path="price/:symbol" element={<Price/>}/>
```

The :symbol part is a URL Param, a variable in the url. Whatever is in that spot in the path will be accessible by using the useParams hook.

## The Currencies Component

In this component we will be doing the following

- Creating an array of the currencies our app can find prices for
- Looping over that array to generate a link for each one to the price route
- The currency symbol should be placed in the :symbol part of the URL

currencies.js

```js
import { Link } from "react-router-dom";

const Currencies = (props) => {
  const currencies = [
    { name: "Bitcoin", symbol: "BTC" },
    { name: "Litecoin", symbol: "LTC" },
    { name: "Ethereum", symbol: "ETH" },
    { name: "Ethereum Classic", symbol: "ETC" },
    { name: "Stellar Lumens", symbol: "XLM" },
    { name: "Dash", symbol: "DASH" },
    { name: "Ripple", symbol: "XRP" },
    { name: "Zcash", symbol: "ZEC" },
  ];

  return (
    <div className="currencies">
      {currencies.map((coin) => {
        const { name, symbol } = coin;

        return (
          <Link to={`/price/${symbol}`}>
            <h2>{name}</h2>
          </Link>
        );
      })}
    </div>
  );
};

export default Currencies;
```

Notice when we click any of the links it takes us to the price component, use the React devTools to look for the router props and you should be able to find the value of the symbol param in there.

## The Price Component

Before we create this component take a moment to get your FREE Api key from coinapi.io. Keep in mind you can only make 100 requests per day with your free apiKey.

Once you have your api key here is what we will do:

- store the apikey and currency symbol in different variables
- create a loader function for our price route
- interpolate the apikey and symbol in the fetch URL
- return the data and use the useLoader hook to use it in our component

First let's create our loader function, let's create a file called `src/loader.js`

```js
export const priceLoader = async ({params}) => {

 const symbol = params.symbol

 const apiKey = "xxxxxxxx"

 return (await fetch(`http://rest-sandbox.coinapi.io/v1/exchangerate/${symbol}/USD?apikey=${apiKey}`)).json()
} 
```
let's update our route to use the loader
```js
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom"
import App from "./App"
import Main from "./pages/main"
import Currencies from "./pages/currencies"
import Price from "./pages/price"
import { priceLoader } from "./loader"

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
            <Route path="" element={<Main/>}/>
            <Route path="currencies" element={<Currencies/>}/>
            <Route path="price/:symbol" element={<Price/>} loader={priceLoader}/>
        </Route>
    )
)


export default router 
```

price.js

```js
import { useLoaderData } from "react-router-dom";

const Price = (props) => {
  // get the data fetched by our loader
  const coin = useLoaderData();

  return (
    <div>
      <h1>
        {coin.asset_id_base}/{coin.asset_id_quote}
      </h1>
      <h2>{coin.rate}</h2>
    </div>
  );
};

export default Price;
```

Your App Should now be working! Voila!
