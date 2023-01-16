![GA Logo](https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/General_Assembly_logo.svg/1280px-General_Assembly_logo.svg.png)

# Frontend - Vue

---

## Prerequisites

- Deployed Todos API
- NodeJS
- vue-cli installed `npm install -g @vue/cli`

## Setup

- In your terminal spin-up a new React Project `vue create todofrontend`

- Install support Libraries to be used `npm install vue-router@4 milligram`

- test out dev server `npm run serve` and go to localhost:8080

## Setting Up Vue Router

In src create a file called routes.js that will contain our array of routes.

```js
/////////////////////////
// Components Imports
/////////////////////////

/////////////////////////
// Array of Routes
/////////////////////////
export default [
  { path: "/", component: Home },
  { path: "/about", component: About },
];
```

- Then let's refactor main.js to add router functionality to the Vue application

```js
import { createApp } from "vue";
import App from "./App.vue";
import { createWebHistory, createRouter } from "vue-router";
import routes from "./routes";
import "milligram";

//Create our Router
const router = createRouter({
  // Create a web history
  history: createWebHistory(),
  // inject our routes
  routes,
});

//Create our vue application
const app = createApp(App);

// inject our router into our app
app.use(router);

// Mount our App to the DOM
app.mount("#app");
```

#### Scoping Our Components

- in src create a folder called pages and create these components

AllPosts.vue

```html
<template>
  <h1>AllPosts</h1>
</template>

<script>
  export default {
    name: "AllPost",
  };
</script>

<style></style>
```

SinglePost.vue

```html
<template>
  <h1>SinglePost</h1>
</template>

<script>
  export default {
    name: "SinglePost",
  };
</script>

<style></style>
```

Form.vue

```html
<template>
  <h1>Form</h1>
</template>

<script>
  export default {
    name: "Form",
  };
</script>

<style></style>
```

#### Setting Up Our Routes

src/routes.js

```js
/////////////////////////
// Component Imports
/////////////////////////
import AllPosts from "./pages/AllPosts.vue";
import SinglePost from "./pages/SinglePost.vue";
import Form from "./pages/Form.vue";
/////////////////////////
// Array of Routes
/////////////////////////
export default [
  // main page that shows all todos
  { path: "/", component: AllPosts },
  // page for seeing an individual todo
  { path: "/post/:id", component: SinglePost, name: "post" },
  // route for creating a new todo
  { path: "/new", component: Form },
  // route for updating a todo
  { path: "/edit", component: Form },
];
```

#### Setting Up The App Component

src/App.js

```html
<template>
  <div>
    <h1>Our Todos</h1>
    <router-view />
  </div>
</template>

<script>
  export default {
    name: "App",
  };
</script>

<style></style>
```

#### Getting Our Todos

We will be using the new Composition API introduced in Vue 3 which gives a React Hooks like API for setting up your Vue components. We will grab the posts when the app component mounts and pass it as an attribute to all our routes via the router-view tag.

```html
<template>
  <div class="app">
    <h1>Our Todos</h1>
    <router-view :posts="posts" :url="url" :getPosts="getPosts" />
  </div>
</template>

<script>
  import { ref, onMounted } from "vue"; // Import Composition API Hooks
  // ref hook allows use to create reactive variables
  // onMounted let's us execute code when component mounts

  export default {
    name: "App",
    // Setup property allows us to use new composition api to define properties/methods
    // Returns an object with any properties/methods the component should have
    setup(props) {
      // variable with base url for API calls
      const url = "https://api.herokuapp.com/todos/";
      // ref for holding all the posts
      const posts = ref([]);
      // method for getting posts
      const getPosts = async () => {
        const response = await fetch(url);
        const data = await response.json();
        posts.value = await data;
      };
      //run getPosts once when component loads
      onMounted(() => getPosts());
      // return component properties and methods
      return {
        posts,
        getPosts,
        url,
        ...props,
      };
    },
  };
</script>

<style>
  .app {
    text-align: center;
  }
</style>
```

Then let's render all those posts in our AllPosts component

AllPosts.vue

```html
<template>
  <div>
    <div class="post" v-for="(post, index) in $attrs.posts" v-bind:key="index">
      <router-link :to="{name: 'post', params: {id: index}}">
        <h1>{{post.subject}}</h1>
      </router-link>
      <h2>{{post.details}}</h2>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AllPost",
  };
</script>

<style>
  .post {
    text-align: center;
    border: 3px solid green;
    margin: 10px auto;
    width: 80%;
  }
</style>
```

Then let's edit SinglePost to show a SinglePost

```js
  <div class="post">
      <h1>{{post.subject}}</h1>
      <h2>{{post.details}}</h2>
      <router-link to="/"><button>Back to Main</button></router-link>
  </div>
</template>

<script>
// get useRoute hook to get access to params
import {useRoute} from "vue-router"
// getting toRefs hook to maintain props reactivity
import {toRefs} from "vue"

export default {
  name: "SinglePost",
  props: ['posts'],
  setup(props){
      // get route object to access params
      const route = useRoute()
      // retrieve posts from props
      const {posts} = toRefs(props)
      // grab target post from posts
      const post = posts.value[route.params.id]
      //return properties
      return {
          post
      }
  }
};
</script>

<style>
button {
    margin: 10px
}

</style>
```

#### Setting Up Our Form

```html
<template>
  <form v-on:submit.prevent="handleSubmit">
    <input type="text" placeholder="subject" v-model="subject" />
    <input type="text" placeholder="subject" v-model="details" />
    <input type="submit" :value="buttonLabel" />
  </form>
</template>

<script>
  // get router hooks
  import { useRoute, useRouter } from "vue-router";
  // get vue hooks
  import { ref, toRefs } from "vue";

  export default {
    name: "Form",
    props: ["posts", "url", "getPosts"],
    setup(props) {
      const route = useRoute(); //get route
      const router = useRouter(); //get router
      const { posts, url, getPosts } = toRefs(props); // get posts from props
      const subject = ref(""); // variable for subject in form
      const details = ref(""); // variable for details in form
      console.log(url);
      let buttonLabel; // label for submit button
      let handleSubmit; //variable to hold submit function
      // If edit route setup for editing, if not setup for creating
      if (route.name === "edit") {
        //get post to be edited from posts
        const post = posts.value.find((p) => p.id == route.params.id);
        // fill the form with that posts values
        subject.value = post.subject;
        details.value = post.details;
        // label for submit button
        buttonLabel = "edit todo";
        // define function to update
        handleSubmit = async () => {
          await fetch(url.value + route.params.id + "/", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              subject: subject.value,
              details: details.value,
            }),
          });

          getPosts.value();
          router.push("/");
        };
      } else {
        // label for submit button
        buttonLabel = "create todo";
        // define function to create
        handleSubmit = async () => {
          await fetch(url.value, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              subject: subject.value,
              details: details.value,
            }),
          });

          getPosts.value();
          router.push("/");
        };
      }
      return {
        subject,
        details,
        handleSubmit,
        buttonLabel,
      };
    },
  };
</script>

<style></style>
```

Add a create todo button in App

```html
<template>
  <div class="app">
    <h1>Our Todos</h1>
    <router-link to="/new"><button>New Todo</button></router-link>
    <router-view :posts="posts" :url="url" :getPosts="getPosts" />
  </div>
</template>
```

and an edit todo button in SinglePost

```html
<template>
  <div class="post">
    <h1>{{post.subject}}</h1>
    <h2>{{post.details}}</h2>
    <router-link to="/"><button>Back to Main</button></router-link>
    <router-link :to="{name: 'edit', params: {id: post.id}}"
      ><button>Edit Todo</button></router-link
    >
  </div>
</template>
```

#### Deleting Our Todos

Update Our Single Post as Follows

```html
<template>
  <div class="post">
    <h1>{{ post.subject }}</h1>
    <h2>{{ post.details }}</h2>
    <router-link to="/"><button>Back to Main</button></router-link>
    <router-link :to="{ name: 'edit', params: { id: post.id } }"
      ><button>Edit Todo</button></router-link
    >
    <button v-on:click="deletePost">Delete Todo</button>
  </div>
</template>

<script>
  // get useRoute hook to get access to params
  import { useRoute, useRouter } from "vue-router";
  // getting toRefs hook to maintain props reactivity
  import { toRefs } from "vue";

  export default {
    name: "SinglePost",
    props: ["posts", "url", "getPosts"],
    setup(props) {
      // get route object to access params
      const route = useRoute();
      // get Router
      const router = useRouter();
      // retrieve posts from props
      const { posts, url, getPosts } = toRefs(props);
      // grab target post from posts
      const post = posts.value[route.params.id];

      const deletePost = async () => {
        await fetch(url.value + post.id + "/", {
          method: "delete",
        });

        await getPosts.value();

        router.push("/");
      };

      //return properties
      return {
        post,
        deletePost,
      };
    },
  };
</script>

<style>
  button {
    margin: 10px;
  }
</style>
```

Done!

## What you will learn

---

---

## Resources to Learn More

---