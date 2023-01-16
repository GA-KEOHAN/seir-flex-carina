# Handling Input In React

| Students Will Be Able To: |
|---|
| Use "controlled" `<input>` elements in React |
| Use `<form>` elements properly in React |
| Use validation to prevent adding invalid data |
| Use a `ref` to access a DOM element directly |


<br>
<br>
<br>
<br>




## Road Map

- Set Up
- Review the Starter Code
- Controlled Inputs in React
- Adding the New Skill to State

<br>
<br>





## Set Up

Let's create a new React Project locally, `npm create-react-app dev_skills`
**Replace the existing `<App>`/App.js component with this starting code:**

```javascript
import React, { useState } from "react";

export default function App() {
  const [skills, setSkills] = useState([{ skill: "JavaScript", level: 4 }])

  function addSkill() {
    alert("ADD SKILL CLICKED");
  }

  return (
    <section>
      <h2>DEV SKILLS</h2>
      <hr />
      {skills.map((s) => (
        <article key={s.skill}>
          <div>{s.skill}</div> <div>{s.level}</div>
        </article>
      ))}
      <hr />
      <form>
        <label>
          <span>SKILL</span>
          <input name="skill" />
        </label>
        <label>
          <span>LEVEL</span>
          <select name="level">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <button>ADD SKILL</button>
      </form>
    </section>
  );
}

```

<br>


**Let's replace the contents of `index.css` with:**

		
```css
	* {
	  box-sizing: border-box;
	}
		
	body {
	  font-family: Arial, Helvetica, sans-serif;
	  height: 100vh;
	  display: grid;
	  justify-items: center;
	  align-items: center;
	}
		
	h2 {
	  color: #f17d80;
	  margin: 0;
	  text-align: center;
	}
		
	section > article {
	  display: flex;
	  justify-content: space-between;
	  min-width: 15rem;
	  color: white;
	  margin: 0.1rem;
	  background-color: #737495;
	}
		
	article > div {
	  padding: 0.5rem;
	}
		
	article > div:nth-child(2) {
	  width: 2rem;
	  background-color: #f17d80;
	  text-align: center;
	}
		
	label {
	  display: flex;
	  align-items: center;
	  margin-top: 0.5rem;
	}
		
	label span {
	  color: #737495;
	  width: 4.5rem;
	}
		
	input,
	select {
	  width: 100%;
	  font-family: Arial, Helvetica, sans-serif;
	  font-size: 1rem;
	  font-weight: bold;
	  padding: 0.4rem;
	  color: #f17d80;
	  border: 2px solid #737495;
	  border-radius: 0;
	  outline: none;
	  -webkit-appearance: none;
	}
		
	button {
	  display: block;
	  font-family: Arial, Helvetica, sans-serif;
	  font-size: 1rem;
	  margin: 0.5rem 0 0 auto;
	  padding: 0.4rem;
	  background-color: #f17d80;
	  color: white;
	  border: none;
	  outline: none;
	}
		
	button:hover {
	  color: white;
	  background-color: #737495;
	}

```
<br>
<br>
<br>
	


**The project will look something like this once the above setup is complete:**

<img src="https://i.imgur.com/ntFDX0q.png">

<br>
<br>




## Review the Starter Code

Currently the app is not functional - it doesn't add new Dev Skills to the list. 

We will implement this functionality soon.



<br>
<br>
<br>




## Controlled Inputs in React

<br>
<br>

**Controlled Inputs - The "React Way" to Handle Input**

<br>

How many times have you heard us say that things are a little different in React?

Handling **inputs** is also different - by inputs, we are talking about the `<input>`, `<textarea>` & `<select>` React elements that are commonly used to get input from a user.

React prefers that we don't access DOM elements directly. In fact, at this point, we haven't even seen _how_ to access DOM elements directly via React. However, by the end of this lesson you will.

So, if we don't access an input's value like we typically do in JS, e.g., `inputEl.value`, what's the secret?

The secret, like many things in React is `state`! React, wants the text/value of inputs to be held in `state`.

React "controlled" inputs have their value assigned to them via the `value` prop, which will be bound to the appropriate `state` property using a JSX expression.  For example, if you had a `title` property in the `state`, you could bind that `title` property to an `<input>` as follows:

```html
<input value={state.title} />
```

So for our Dev Skills app, we will create two instances of state:

- skill: an array of dev skills
- form: an object representing the value of the form inputs

```javascript
  const [skills, setSkills] = useState([{ skill: "JavaScript", level: 4 }])

  const [form, setForm] = useState({
    skill: "",
    level: "3"
  })
```

Notice that we intend to initialize the value of the `<select>` for the skills's `level` to `"3"`.

Now, we can "connect" those state properties to their respective inputs using the `value` prop:

```jsx
          <span>SKILL</span>
          <input name="skill" value={form.skill} />
        </label>
        <label>
          <span>LEVEL</span>
          <select name="level" value={form.level}>
```

As predicted, the `<select>` has been initialized to `"3"`:

<img src="https://i.imgur.com/yjQL04t.png">

**Try assigning a "default" string value to the `skill` property in `state`**


<br>
<br>
<br>




#### Updating Inputs

Since the inputs are linked to state, updating the values displayed requires us to use the setter function to update their state properties.

Go ahead and try to change their values by interacting with the inputs - denied!

The React way for controlled inputs requires using event handlers to update the state.

First add an `onChange` prop to the `<input>`:

```javascript
<span>SKILL</span>
<input name="skill" value={form.skill} onChange={handleChange}/>
```

> Unlike the `change` event in vanilla JS which is triggered only after an `<input>` or `<textarea>` loses the focus, the `onChange` prop's assigned event listener will be invoked each time the user types something.

Now add the `handleChange` function that will be called every time a character is added or deleted:

```javascript
  function handleChange(event){
    // create a copy of the current form state
    const newState = {...form}
    // modify the copy with the changes
    newState[event.target.name] = event.target.value
    // update the state
    setForm(newState)
  }
```

This could also be done in one line like so

```javascript
  function handleChange(event){
    setForm({...form, [event.target.name]: event.target.value})
  }
```

Rock and roll!

That single handler can now update state for any number of inputs - just be sure the values assigned to the `name` props match the names of the properties in the `state` object.

Okay, let's add the event handler to the `<select>`:

```javascript
<select name="level" value={form.level} onChange={handleChange}>
```

Now you know how "Controlled" inputs work in React!

<br>
<br>
<br>


## Adding the New Skill to State

Let's write the code for the the `addSkill` function.

We'll review as we go:

```javascript
  function addSkill() {
    // create a copy of the current form state
    const newState = [...skills]
    // modify the copy with the changes
    newState.push({skill: form.skill, level: form.level})
    // update the state
    setSkills(newState)
  }
```

This could be done in one line like so...

```javascript
  function addSkill() {
    setSkills([...skills, {skill: form.skill, level: form.level}])
  }
```

<img src="https://i.imgur.com/C6QvZQo.png">


<br>
<br>
<br>





#### Using Forms in React

Although forms are not required for handling input in React, they can provide benefits such as:

- Using CSS frameworks to perform styling on inputs that rely on them being wrapped in a form.
- Validation of inputs.

Currently, the `<form>` component is being rendered in the DOM:

<img src="https://i.imgur.com/ur4nSQK.png">

Note that unlike forms we've used before, there's no `action` or `method` attributes - nor, should there ever be in a SPA's forms.

However, despite those missing attributes, and despite the fact that the **[ADD SKILL]** button within the form is not of `type="submit`, the darn form will still send off an HTTP request if we press **[return]** while inputting data or click the button - triggering a full-page refresh!

In React, we need to prevent the browser from submitting forms and we first do this by **always** using the `onSubmit` prop on `<form>` components:

```javascript
<form onSubmit={addSkill}>
```

Then, **always** calling the event object's `preventDefault` function straight away:

```javascript
  function addSkill(event) {
    // prevent the refresh of the page
    event.preventDefault()
    // create a copy of the current form state
    const newState = [...skills]
    // modify the copy with the changes
    newState.push({skill: form.skill, level: form.level})
    // update the state
    setSkills(newState)
  }
```

Be sure to add a parameter (`event` in this case) to accept the event object.

Problem solved!  The `preventDefault` function does just what it says, it prevents the default submit from happening.


<br>
<br>
<br>



## Bonus Section. The following are optional reading:


#### Validating Inputs

Although the app is working as planned, we're not taking advantage of the form's HTML5 validation capabilities.

We can add a `required` and `pattern` attribute to HTML inputs to validate their data.

Let's prevent the ability to add empty skills by adding these props to the skills input:

```javascript
<input
  name="skill"
  value={newSkill.skill}
  onChange={handleChange}
  {/* Add these two additional props to set constraints */}
  required
  pattern=".{3,}"
/>
```


One of the Web APIs included in browsers is a comprehensive [constraint validation API](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation).

It's usually more convenient to perform validation at the `<form>` level because its validation status will take into consideration that of all of its inputs. In other words, we don't have to check every input's validation, just the form's since if just a single input is invalid, the form will consider itself to be invalid.

One of the useful methods provided by the API is the `checkValidity` method that returns `true` if the input/form is valid, or `false` if it's not.

However, the API's methods must be called on the actual DOM element, thus requiring a reference to that DOM element.

As an example, let's test out the `checkValidity` method on just the skills input:

```javascript
  function handleChange(event){
    // check validity
    console.log(event.target.checkValidity())
    // create a copy of the current form state
    const newState = {...form}
    // modify the copy with the changes
    newState[event.target.name] = event.target.value
    // update the state
    setForm(newState)
  }
``` 

Testing it shows that at least three characters need to be entered in the skill input before `true` is logged.

Now that we've seen how we can check an individual input's validity, let's see what it takes to check the validity of the entire form...

<br>
<br>
<br>



#### Using a `ref` to Access DOM Elements

Unfortunately, the event object's `target` property is not providing us with access to the `<form>` DOM element from within the `addSkill` method.

We could use the `element.closest(selector)` method on the inputs to find the form, however, let's take advantage of this opportunity to learn about how React provides access to DOM element by using a [ref](https://reactjs.org/docs/hooks-reference.html#useref).

> Key Point: Although using a ref has a few useful use cases like third-party library integration, they should be used sparingly and never to bypass React's way of updating the DOM, etc.

A ref is an object that provides access to a DOM element.

There's no reason to hold a ref in state, so we'll create one using a ref using the `useRef` hook like this:

```javascript
import React, { useState, useRef } from "react";

export default function App() {

  const formRef = useRef();

  const [skills, setSkills] = useState([{ skill: "JavaScript", level: 4 }])

  const [form, setForm] = useState({
    skill: "",
    level: "3"
  })
```

With the ref created, all that's left is to "link" it to a component's DOM element by using the `ref` prop:

```javascript
<form ref={formRef} onSubmit={addSkill}>
```

Let's see what a `ref` looks like by logging it out:

```javascript
  ...
  console.log(formRef);
    return (
  ...
```

Checking the console shows that the ref object has a `current` property used to access the DOM element.

Now we can prevent adding a new skill if the form's invalid like this:

```javascript
  function addSkill(event) {
    // prevent the refresh of the page
    event.preventDefault();
    // check validity
    if (formRef.current.checkValidity()) {
      // create a copy of the current form state
      const newState = [...skills];
      // modify the copy with the changes
      newState.push({ skill: form.skill, level: form.level });
      // update the state
      setSkills(newState);
    }
  }
```

Take a moment to think about how you could use the `required` and `pattern` attributes to prevent bogus data from being processed.


<br>
<br>
<br>



#### Disabling the Button if the Form is Invalid

What if we want the **[ADD SKILL]** button to be disabled depending upon the validity status of the form?

A typical React approach would be to first create a new instance of `state` to track the validity of the form:

```javascript
export default function App() {
  const formRef = useRef();

  const [skills, setSkills] = useState([{ skill: "JavaScript", level: 4 }]);

  const [form, setForm] = useState({
    skill: "",
    level: "3",
  });

  const [valid, setValid] = useState(false)
```

Use `valid` to conditionally add the `disabled` prop to the button:

```javascript
<button
  disabled={valid}
>
```

The last part requires updating `valid` each time an input changes, i.e., from within the `handleChange` function:

```javascript
  function handleChange(event) {
    // update valid based on form validity
    setValid(!formRef.current.checkValidity())
    // create a copy of the current form state
    const newState = { ...form };
    // modify the copy with the changes
    newState[event.target.name] = event.target.value;
    // update the state
    setForm(newState);
  }
```

That takes care of the functionality, however, the button won't look disabled unless we add a touch more CSS:

```css
button:disabled {
  background-color: lightgrey;
}
```

<img src="https://i.imgur.com/gYpjVm1.png">

<br>
<br>
<br>


**Nice! Congratulations on making it this far! 🎉**

<!-- 
<br>
<br>
<br>


## Essential Questions

Take a moment to review the following questions:

**❓ Where does a "controlled" `<input>` get its value from?**

**❓ True or False: All input-related components must be wrapped by a `<form>` component.**

**❓ A React "controlled" `<input>` requires both a `value` and an `________` prop.** -->

<br>
<br>
<br>



## References

- [React Docs - Forms](https://reactjs.org/docs/forms.html)

- [React Docs - Uncontrolled Components](https://reactjs.org/docs/uncontrolled-components.html)
