---
track: "Second Language"
title: "Rails API With React Frontend"
week: 2
day: 1
type: "lecture"
---

# Rails API With React Frontend


### Lesson Objectives
_After this lesson, students will be able to:_

- Use Flexbox to lay out a page
- Post data to our API using React
- Update the page with new data
- LAB: Deploy Rails API

<hr>

## SETUP

Open the `noticeboard_app` directory from this morning.

Inside it should be `noticeboard_app_api` and `noticeboard_app_frontend`.

<br>
<hr>



# &#x1F4D0; React

* Let's format our data on our page


### Display the AJAX'ed stuff

Notice, we have some placeholder html elements, that we'll fill in later.

In `App.js`

```js
import React from 'react';
import logo from './logo.svg';
import './App.css';
import Notices from './components/Notices.js';

function App() {
  return (
    <div className="App">
      <div className="container">
          <nav>
            <h4>Post a Notice </h4>
          <form>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" />
            <label htmlFor="title">Title</label>
            <input type="text" id="title" />
            <label htmlFor="content">Content</label>
            <input type="text" id="content" />
            <input type="submit" className="submit" />
          </form>
        </nav>
        <main>
          <Notices />
          </main>
        <aside></aside>
      </div>
    <footer />
  </div>
  );
}

export default App;

```
In `Notices.js`

```js
export default function Notices (props) {

    const [notices, setNotices] = useState([])
    const getNotices = async () => {
       try {
         const response = await fetch('https://localhost:3000/notices')
         const data = await response.json()
         setNotices(data)
        } catch(error){
          console.error(error)
        }
      } 
    useEffect(()=>{
      (async function (){
        await getNotices()
          })()
        },[])
        return (
            <div>
                {notices.map( notice => {
                    return  (
                        <div key={notice.id} className="notice">
                            <h3>{ notice.title }</h3>
                            <p>{ notice.content }</p>
                            <small>{notice.author }</small>
                        </div>
                    )
                })}
            </div>
        )
}
```

![](https://i.imgur.com/3JYfYBI.png)

<br>
<hr>


# &#x1F3CB; &#x1F371; STYLE

With React now 'consuming' our API, let's make a webpage using what was known as the "Holy Grail" layout with a header, footer, main section, and two sidebars.

## CSS

- Create a `style.css` file in your `public` folder
- Link the CSS to your index.html: `<link rel="stylesheet" href="style.css"/>`

Use the following **Flexbox** CSS:

```css
/* for development - check layout */
/* comment out */
/* header, div, main, nav, aside, footer {
  border: 1px solid red;
} */

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

![](https://i.imgur.com/KPejcOC.png)
<br>
<hr>

## POST REQUEST
### Add a Notice to the Database

We'll have to give our inputs functionality, just like we have before. With one update - we'll put all the inputs in one object so it's clear that this state belongs to an input. This means our handleChange will have to be updated to match the new object. Everything else works the same

```js
export default function App (props) {
    const [notices, setNotices] = useState([])
    const [formInputs, updateFormInputs] = useState({
      author: '',
      content: '',
      title: ''
    })
    
  const handleChange = (event) => {
    const updateInput = Object.assign({}, formInputs, { [event.target.id]: event.target.value })
    updateFormInputs(updateInput)
  }

  const handleSubmit  = (event) =>{
    event.preventDefault()
    console.log(formInputs)
  }
  return (
    ....
  )
}
  ```

Let's finish up our form

```js
<div className="App">
  <div className="container">
    <nav>
      <h4>Post a Notice </h4>
    <form onSubmit={handleSubmit}>
      <label htmlFor="author">Author</label>
      <input
        type="text"
        id="author" value={formInputs.author}
        onChange={handleChange}
      />
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title" value={formInputs.title}
        onChange={handleChange}
      />
      <label htmlFor="content">Content</label>
      <input
        type="text"
        id="content" value={formInputs.content}
        onChange={handleChange}
      />
      <input type="submit" className="submit" />
    </form>
    </nav>
    <main>
      <Notices />
    </main>
    <aside></aside>
    </div>
    <footer />
  </div>
```




### SEND THE AJAX REQUEST

```javascript
  const handleSubmit  = async (event) =>{
    event.preventDefault()
    try{
      const response = await fetch('http://localhost:3000/notices', {
        body: JSON.stringify(formInputs),
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      updateFormInputs({
        author: '',
        content: '',
        title: ''
      })
      setNotices([data, ...notices])
    }catch(error){
      console.error(error)
    }
  }
```

## Refactoring

We are able to create new notices but they are not going to our Notice component. We need to move our state up and out of Notices

This code should now go in App.js
```js
    const getNotices = async () => {
       try {
         const response = await fetch('https://localhost:3000/notices')
         const data = await response.json()
         console.log(data)
        } catch(error){
          console.error(error)
        }
      } 
    useEffect(()=>{
      (async function (){
        await getNotices()
          })()
        },[])
```

And we can remove the constructor function from Notices as well, since this component won't have it's own state any more.


We'll swap this.state for `props`


```js
export default function Notices (props) {
    return (
      <>
      {props.notices.map( notice => {
       return  (
         <div key={notice.id} className="notice">
            <h3>{ notice.title }</h3>
            <p>{ notice.content }</p>
            <small>{notice.author }</small>
          </div>
       )
      })}
      </>
    )
}


```

Finally we have to pass notices down
**App.js**
```js
<main>
  <Notices notices={notices}/>
</main>
```
# Newer notices first

* Rails: Change the Notice index controller to `reverse` the array

We want newer notices to show first. `reverse` the result server side.

Rails server:

```ruby
  # GET /notices
  def index
    @notices = Notice.all.reverse

    render json: @notices
  end
```
