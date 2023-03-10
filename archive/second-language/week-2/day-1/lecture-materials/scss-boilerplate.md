---
track: "Second Language"
title: "Boilerplate code for SCSS"
week: 2
day: 1
type: "lecture"
---




# Add Main.SCSS


`touch src/main.scss`

## Put the code from style.css in the sass file

```scss
body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: #FAEBD7;
  font-family: Verdana, Geneva, sans-serif;
}

.container {
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: #FEFBF7;
  border-radius: 5px;
}

header {
  text-align: center;
  font-size: 50px;
  color: #4d5052;
}

main {
  flex: 1;
}

nav {
  order: -1;
}

nav, aside {
  background-color: #C2C8CD;
}

form {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
input[type="text"] {
  flex-basis:50%;
  padding: .2em;
}
input[type="submit"] {
  flex-basis:51%;
  padding: .5em;
  margin: .5em;
  margin-top: 1.5em;
}
label {
  flex-basis: 51%;
  text-align: center;
}
.notice {
  margin: 5px;
  padding: 5px 15px 5px 15px;
  background-color: #E4E1DE;
  border-radius: 5px;
}

@media (min-width: 768px) {
  .container {
    flex-direction: row;
    flex: 1;
  }
  nav, aside {
    flex: 0 0 12em;
  }
}

```

## change src/index.js to import the scss file

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './main.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

## Remove the link tag and delete style.css and index.css
