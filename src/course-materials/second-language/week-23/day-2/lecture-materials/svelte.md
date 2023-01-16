![GA Logo](https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/General_Assembly_logo.svg/1280px-General_Assembly_logo.svg.png)

# Frontend - Svelte

---

## Prerequisites

- deployed todos api
- nodejs

## Setup

**We will be using the Snowpack/Svelte Template, Snowpack is a new bundler that takes advantage of ES Modules for a smoother hot reload experience as your app gets bigger**

- generate a new project `npx merced-spinup@latest snowsvelte todofrontend`
- cd into new todofrontend folder
- run `npm install`
- run dev server with npm start
- install some extra dependencies `npm i svelte-routing milligram`
- import milligram in index.js to have some default styling

```js
import App from "./App.svelte";
import "milligram";

let app = new App({
  target: document.body,
});

export default app;

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(() => {
    app.$destroy();
  });
}
```

##### Create Our Components

- create a pages folder in src and create the follow

AllPosts.svelte

```html
<div>
  <h1>All Posts</h1>
</div>

<style></style>

<script></script>
```

SinglePost.svelte

```html
<div></div>

<style></style>

<script></script>
```

Form.svelte

```html
<div></div>

<style></style>

<script></script>
```

#### App.svelte

Let's do the following

- setup our routes
- grab the list of todos when App mounts

App.svelte

```html
<script>
  import { onMount } from "svelte";
  import { Router, Route, Link } from "svelte-routing";
  import AllPosts from "./pages/AllPosts.svelte";
  import SinglePost from "./pages/SinglePost.svelte";
  import Form from "./pages/Form.svelte";

  export let url = ""; // prop for router to url
  let todos; // variable to hold todo
  let baseURL = "https://api.herokuapp.com/todos/"; //api url

  //function to get todos
  const getTodos = async () => {
    const response = await fetch(baseURL);
    const data = await response.json();
    todos = data;
  };

  onMount(() => getTodos());
</script>

<style>
  .app {
    text-align: center;
  }
</style>

<Router url="{url}">
  <div class="app">
    <h1>Our Todos</h1>
    <main>
      <Route path="/post/:id" let:params
        ><SinglePost
          todos="{todos}"
          id="{params.id}"
          getTodos="{getTodos}"
          url="{baseURL}"
      /></Route>
      <Route path="/new"
        ><form todos="{todos}" url="{baseURL}" getTodos="{getTodos}"
      /></Route>
      <Route path="/edit/:id" let:params
        ><form
          todos="{todos}"
          id="{params.id}"
          url="{baseURL}"
          getTodos="{getTodos}"
      /></Route>
      <Route path="/"><AllPosts todos="{todos}" /></Route>
    </main>
  </div>
</Router>
```

#### AllPosts.svelte

In this component we will...

- receive the todos prop
- Loop through the todos and render them
- Link to the SinglePost route

```html
<div>
{#each todos as todo, index}
<article>
<Link to="{'/post/' + todo.id}"><h1>{todo.subject}</h1></Link>
<h2>{todo.details}</h2>
</article>
{/each}
</div>

<style>
</style>

<script>
import {Link} from "svelte-routing"
export let todos = []; //receive todos props
</script>
```

#### SinglePost.svelte

In this post we will...

- we receive the todos array and id and as props
- we will find the post to display
- display the post
- add a button to link to the main page

```html
<div>
<h1>{post.subject}</h1>
<h2>{post.details}</h2>
<Link to="/"><button>Back to Main</button></Link>
</div>

<style>
</style>

<script>
import {Link} from "svelte-routing"
// gets posts and id props
export let todos;
export let id;
export let getTodos; // receive getTodos as props
export let url; // get url as prop

const post = todos.find(p => p.id == id)
</script>
```

#### Form.svelte

We will be using this form for editing and creating

- receive the todos array, url and id as props
- if id is defined, we will set for editing, if not it'll default to creating

```html
<div>
  <form on:submit="{handleSubmit}">
    <input type="text" placeholder="subject" bind:value="{subject}" />
    <input type="text" placeholder="details" bind:value="{details}" />
    <input type="submit" bind:value="{buttonLabel}" />
  </form>
</div>

<style></style>

<script>
  import { navigate } from "svelte-routing";

  export let todos; // receive todos array prop
  export let id; // receive id prop
  export let url; // receive url prop
  export let getTodos; // receive getTodos prop

  let buttonLabel = "Create Todo"; //default for submit button text
  let subject = ""; //default for subject field
  let details = ""; //default for subject field
  // default value of handle submit for creating todos
  let handleSubmit = async (event) => {
    event.preventDefault();

    await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
        details,
      }),
    });

    getTodos();
    navigate("/", { replace: true });
  };

  // if id is defined, reconfigure for editing
  if (id) {
    buttonLabel = "edit a todo";
    const post = todos.find((p) => p.id == id);
    subject = post.subject;
    details = post.details;
    handleSubmit = async (event) => {
      event.preventDefault();

      await fetch(url + id + "/", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          subject,
          details,
        }),
      });

      getTodos();
      navigate("/", { replace: true });
    };
  }
</script>
```

In App.svelte add a Create Todo Button

```html
<Router url="{url}">
<div class="app">
<h1>Our Todos</h1>
<Link to="/new"><button>Make New Todo</button></Link>
<main>
<Route path="/post/:id" let:params><SinglePost todos={todos} id={params.id}/></Route>
<Route path="/new"><Form todos={todos} url={baseURL} getTodos={getTodos}/></Route>
<Route path="/edit/:id" let:params><Form todos={todos} id={params.id} url={baseURL} getTodos={getTodos}/></Route>
<Route path="/"><AllPosts todos={todos}/></Route>
</main>
</div>
</Router>
```

in SinglePost.svelte let's add a Edit a Todo Button!

```html
<div>
<h1>{post.subject}</h1>
<h2>{post.details}</h2>
<Link to="/"><button>Back to Main</button></Link>
<Link to={'/edit/' + post.id}><button>Edit the Todo</button></Link>
</div>
```

#### Last, delete button in SinglePost.svelte

```html
<div>
<h1>{post.subject}</h1>
<h2>{post.details}</h2>
<Link to="/"><button>Back to Main</button></Link>
<Link to={'/edit/' + post.id}><button>Edit the Todo</button></Link>
<button on:click={deleteTodo}>Delete Todo</button>
</div>

<style>
</style>

<script>
import {Link, navigate} from "svelte-routing"
// gets posts and id props
export let todos;
export let id;
export let url;
export let getTodos;

const post = todos.find(p => p.id == id)

// delete todo function
const deleteTodo = async () => {
    await fetch(url + id + "/", {
        method: "delete",
    })

    getTodos()

    navigate("/", {replace: true})
}
</script>
```

Done! You did it, full crud on the frontend!
---

## Resources to Learn More

---