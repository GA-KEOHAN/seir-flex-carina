---
track: "React Fundamentals"
title: "React Hooks Group Discussion"
week: 2
day: 1
type: "lecture"
---


# React Hooks Group Discussion

For a long time React developers lamented the need to bind event handlers and always having to use the this keyword in class components. In 2018, React introduced hooks, new syntax that allows Function based components to use features like state, lifecycle, Refs and more that previously only existed in class components. So while understanding class components is still important in reading a lot of existing React code, Hooks is key to understanding the patterns in newer React code.

### Setup

-   Create a new react app using `lets-code` and choosing project 3 starter, feel free to use your fruits app as an example of how to update.
- name the project hooks_practice
-   cd into the new folder, hooks_practice
-   run npm run dev

### Rules of hook

To avoid some common frustrations when getting started with hooks, remember two things:

-   Only calls hooks from the top level of functional components

-   Never call hooks in loops, conditionals and standard functions

### Create our Functional components

Create a file called sample.js in th src folder of your react project

sample.js

```
import React from 'react';

const Sample = (props) => {
    return <h1>Hello World</h1>;
};

export default Sample;
```

app.js

```jsx
import React from 'react';
import Sample from './sample';

function App() {
    return (
        <>
            <Sample />
        </>
    );
}

export default App;
```

### Hook #1 - useState

The useState hook allows us to create variables that like state will trigger a render of the component when changed use the "setState" function. You can create as many of these variables as you want and the syntax looks like this:

```js

//store our initial state in a variable
initialState = {word: "hello world"}

//invoke useState and pass our initialState as an argument
const [state, setState] = React.useState(initialState)

//Log our current state
console.log(state)

//Alter out state
setState({word: "Goodbye World"})

//Log the new state
console.log(state)
```

change sample.js to:

```jsx
import React from 'react';

const Sample = (props) => {
    const [greet, setGreet] = React.useState("Hello, I'm using React Hooks");

    return <h1>{greet}</h1>;
};

export default Sample;
```

So now you should see "Hello, I'm using React Hooks" on the screen, success! Now to test changing the state. Turn sample.js into:

```jsx
import React from 'react';

const Sample = (props) => {
    const [greet, setGreet] = React.useState("Hello, I'm using React Hooks");

    const handleClick = () => {
        setGreet('Hey, you just changed state using React Hooks');
    };

    return (
        <>
            <h1>{greet}</h1>
            <button onClick={handleClick}>Click Me</button>
        </>
    );
};

export default Sample;
```

### useEffect hook

this is the equivalent of lifecycle functions in class components. The Syntax is as follows.

```js

React.useEffect(()=>{

  console.log("anything in this function will run when the component loads and this effect is retriggered")

  return () => {console.log("anything in the returned function is run when the component dismounts")}

  }, [])//any variable passed into the array will be watched and will retrigger the above function if changed

```

change sample.js to this:

```jsx
import React from 'react';

const Sample = (props) => {
    const [greet, setGreet] = React.useState("Hello, I'm using React Hooks");

    React.useEffect(() => {
        alert(greet);
    }, [greet]);

    const handleClick = () => {
        setGreet('Hey, you just changed state using React Hooks');
    };

    return (
        <>
            <h1>{greet}</h1>
            <button onClick={handleClick}>Click Me</button>
        </>
    );
};

export default Sample;
```

You'll notice onload the page will send the alert, but since greet is in the dependency array the alert happens again when it changes. This allows us to only trigger the function when specific pieces of state are altered.

### Forms with useRef

A ref allows you to create a variable linked to a Dom element so you can access the properties of the element, in particular form values. The useRef hook allows you to create a variable that can do this exact thing.

Change sample.js to:

```jsx
import React from 'react';

const Sample = (props) => {
    const [greet, setGreet] = React.useState("Hello, I'm using React Hooks");

    const input = React.useRef(null);

    React.useEffect(() => {
        alert(greet);
    }, [greet]);

    const handleClick = () => {
        setGreet('Hey, you just changed state using React Hooks');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setGreet(input.current.value);
    };

    return (
        <>
            <h1>{greet}</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" ref={input} />
                <input type="submit" value="click me" />
            </form>
        </>
    );
};

export default Sample;
```

so now we are able to grab the value of the input element via the ref, instead of having to create a bunch of state and onChange handlers.

### the useContext hook

Context is a feature in react that allows you to pass data down several layers of components without constantly having to pass the data as props to the children. The hooks version of context

first we'll store our context in a separate file called context.js

```js
import React from 'react';

export const OurContext = React.createContext(null);
```

to use the context to send data down a family of components we need to define a provider, so sample.js should now look like this:

```jsx
import React from 'react';
import { OurContext } from './context';
import Samplejr from './samplejr';

const Sample = (props) => {
    const [greet, setGreet] = React.useState("Hello, I'm using React Hooks");

    const input = React.useRef(null);

    React.useEffect(() => {
        alert(greet);
    }, [greet]);

    const handleClick = () => {
        setGreet('Hey, you just changed state using React Hooks');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setGreet(input.current.value);
    };

    return (
        <OurContext.Provider value={greet}>
            <h1>{greet}</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" ref={input} />
                <input type="submit" value="click me" />
            </form>
            <Samplejr />
        </OurContext.Provider>
    );
};

export default Sample;
```

then create a new components in a file called samplejs.js

```jsx
import React from 'react';
import { OurContext } from './context';

const Samplejr = (props) => {
    const context = React.useContext(OurContext);

    return <h1>My Context is {context} </h1>;
};

export default Samplejr;
```

As you see the provider provides the greet state to the children of Sample, so now we can bring in greet using the useContext hook and be able to use that state. This is particular useful in deeply nested components.

### useReducer

What if we need nested components to be able to trigger changes to state of their parent components, in the past we'd use state managements libraries like Redux but the useReducer hook brings much of that functionality right into React. Essentially the way this works is the hook will create a piece of state and a reducer. A reducer is a function that does anything you want and in the returned value becomes the new state.

Make your sample.js look like this:

```jsx
import React from 'react';
import { OurContext } from './context';
import Samplejr from './samplejr';

const Sample = (props) => {
    const greetReducer = (state, action) => {
        switch (action) {
            case 'happy':
                return 'I am feeling happy';
                break;

            case 'sad':
                return 'Feeling sad';
                break;

            case 'goodbye':
                return 'Time to say goodbye';
                break;
        }
    };

    const [greet, reduceGreet] = React.useReducer(
        greetReducer,
        "Hello, I'm using React Hooks"
    );

    return (
        <OurContext.Provider value={[greet, reduceGreet]}>
            <Samplejr />
        </OurContext.Provider>
    );
};

export default Sample;
```

make your samplejr.js look like This

```jsx
import React from 'react';
import { OurContext } from './context';

const Samplejr = (props) => {
    const [greet, reduceGreet] = React.useContext(OurContext);

    return (
        <>
            <h1>{greet} </h1>
            <button onClick={() => reduceGreet('happy')}>Happy</button>

            <button onClick={() => reduceGreet('sad')}>sad</button>

            <button onClick={() => reduceGreet('goodbye')}>goodbye</button>
        </>
    );
};

export default Samplejr;
```

So the great thing about a reducer it allows to take steps before setting the new state and combined with context makes it very easy to pass to deep component trees. In this example, when you click a button the reducer is called passing the action (happy, sad, goodbye) and changes the state different based on which action is chosen.

### Conclusion

There is a huge world of hooks out there including an endless world of custom hooks, but this lesson should give you the tools to do most React design patterns using functional components and hooks. So you can kiss the "this" keyword goodbye!!!
