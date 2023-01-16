---
track: "Second Language"
title: "Frontend App With CRA"
week: 2
day: 1
type: "lecture"
---

# Frontend App With CRA



Remember, our Rails API is just that, an API. Our Rails server is a giant data farm. This data farm can be made accessible to any client or platform.

For now, we are done with our API. Let's make a frontend that can interact with it.

![](https://i.imgur.com/zm4EeFX.png)

## &#x1F684; CREATE REACT APP

* Keep your Rails server running.

* On the command line, open new tab. Exit the Rails directory into the parent `noticeboard_app`

* We are going to make a separate _client_ server for our front end. It's not unusual to do so. Imagine a large company like facebook and all the data they manage. They have both a desktop app and a mobile app. These apps share the databases. It would be a lot of duplication to copy all the data over from the desktop to mobile and then update everything everywhere.

* Inside `noticeboard_app` run `cd noticeboard_app_frontend` then `npx create-react-app .` - this will create a new folder that will be a sibling to our `noticeboard_api` folder that has our rails server.

* `cd noticeboard_app_frontend`

* `rm -rf .git` - since we are working inside the class repository we have to remove this. In your projects you will **NOT** need to do this step.

* `mkdir src/components`

* `touch src/components/Notices.js`
* `lets refactor start script`
*  "start": "PORT=3001 react-scripts start",`
* `yarn add node-sass`
* `yarn start` 



**We're (Almost) Ready To Go!**

<br>
<hr>

## Create React App
Create React App does a few really nice things for us. It builds us a server that is tailored to our needs. It does 'hot-reloading' - every time we save we see our changes in the browser update. It also does testing for us and give us helpful messages in the browser console.

Like Rails, Create React App is a bit magical and will handle a lot of things for us behind the scenes. As you continue to grow as developers, you can explore what the different parts of create react app are doing. For now, we'll focus on building something that interacts with our Rails backend.

![create react app file structure](https://i.imgur.com/bzf5feu.png)


Remember, we could use any frontend library or framework. (At least, one that can work with HTTP requests). But we'll stick with `React`.


Let's build our Notices component in 3 steps

**Step 1**

**src/components/Notices.js**

Import React

```js
import React , { useState, useEffect } from 'react';

```
**Step 2**

Write our component like we're used to

```js
function Notices (props) {
  return (
    <h1>Notices</h1>
  )
}
```

**Step 3**

Export our component

```js
export default function Notices (props) {
  return (
    <h1>Notices</h1>
  )
};
```

Altogether:

```js
import React, { useState, useEffect } from 'react';

export default function Notices (props) {
  return (
    <h1>Notices</h1>
  )
};
```

Now let's customize our `App.js` to be for our app.

We'll remove the unnecessary imports and import our Notices component instead.

We'll render our Notices component inside the App component

```js
import React, { useState, useEffect } from 'react';
import Notices from './components/Notices.js'

export default function App (props) {
    return (
      <div className="App">
        <Notices />
      </div>
    );
}
```

And that should do it!

We should see our Notices component render in the browser

### React Fetch

Let's make the AJAX request to our Rails server to get data. The data will be an index of all the **notices**. With it, we can make a data-drive app.

Two things to keep in mind:

1. Make sure your Rails server is running.
2. This AJAX request **should not** work. This is due to CORS, a basic security feature. We will talk about CORS specifically later.

Make a request to the Rails server and console log the response. Note that the URL is not relative, it is an absolute path. Our API is on a different origin therefore the path cannot be relative:

```javascript
import React, { useState, useEffect } from 'react';


export default function Notices (props) {
const getNotices = async () => {
 try {
   const response = await fetch('http://localhost:3000/notices')
   const data = await response.json()
   console.log(data)
  } catch(error){
    console.error(error)
  }
} 
 useEffect(()=>{
  (
  async function (){
  await getNotices()
  }
  )()
  },[])

  return(<h1>Notices</h1>)
}

```

If you get this:

![](https://i.imgur.com/l8VZfgv.png)

It means your Rails server is not running.

If you get a response like this, then you have the expected CORS issue:

```
No 'Access-Control-Allow-Origin' header is present on the request resource.
```

![](https://i.imgur.com/jowW1st.png)

![](https://i.imgur.com/s2ruqcN.png)

> Otherwise, you should see your API data showing up in your browser console. This might happen if somehow your browser is ignoring the `same-origin policy` OR has `localhost:3000` cached already.
>
> Try emptying your cache and see what happens.

<br>
