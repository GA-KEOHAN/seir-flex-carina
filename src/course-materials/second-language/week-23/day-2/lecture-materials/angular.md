![GA Logo](https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/General_Assembly_logo.svg/1280px-General_Assembly_logo.svg.png)

# Frontend-Angular

---

## Prerequisites

- Deployed Todos Api
- NodeJS
- Installed Angular CLI `npm install -g @angular/cli`

## Setup

- Generate a new project `ng new todofront`

- say yes to routing

- css for styling

- cd into todofront folder

- run dev server with command `ng serve` and see project on localhost:4200

## Creating Our TodoService

We will manage the fetching, creating, updating and deleting of todos from a service we will inject in our components.

When an app start up it will create an instance of our service we can inject in our components to use the same instance across components.

- create the service with command `ng generate service Todo`

- create a file called types.ts in src with the following

```ts
// Todo Type
export type Todo = {
  id?: number;
  subject: string;
  details: string;
};
```

- in src todo.service.ts

```ts
import { Injectable } from "@angular/core";
import { Todo } from "../types";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  // url of API
  url = "https://api.herokuapp.com/todos/";
  // property to hold array of todos from api
  todos: Array<Todo> = [];

  //get todos when service is contructed
  constructor() {
    this.getTodos();
  }

  // method to get todos
  async getTodos() {
    const response = await fetch(this.url);
    const data = await response.json();
    this.todos = data;
    return data;
  }
  // method to create todos
  async createTodo(todo: Todo) {
    await fetch(this.url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    this.getTodos();
  }
  // method to update todos
  async updateTodo(todo: Todo) {
    await fetch(this.url + todo.id + "/", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    this.getTodos();
  }
  // method to delete todos
  async DeleteTodo(todo: Todo) {
    await fetch(this.url + todo.id + "/", {
      method: "delete",
    });

    return this.getTodos();
  }
}
```

#### Generate our components

- `ng generate component AllPosts`

- `ng generate component SinglePost`

- `ng generate component Form`

#### Setup Our Routes

src/app-routing.module.ts

```ts
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AllPostsComponent } from "./all-posts/all-posts.component";
import { SinglePostComponent } from "./single-post/single-post.component";
import { FormComponent } from "./form/form.component";

const routes: Routes = [
  { path: "post/:id", component: SinglePostComponent },
  { path: "new", component: FormComponent },
  { path: "edit/:id", component: FormComponent },
  { path: "", component: AllPostsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

#### Showing All Our Todos

src/app/all-posts/app-posts.component.ts

```ts
import { Component, OnInit } from "@angular/core";
import { TodoService } from "../todo.service";

@Component({
  selector: "app-all-posts",
  templateUrl: "./all-posts.component.html",
  styleUrls: ["./all-posts.component.css"],
})
export class AllPostsComponent implements OnInit {
  //property to receive TodoService
  tdsrv: TodoService;

  constructor(todoService: TodoService) {
    // Assign the service as a property of component
    this.tdsrv = todoService;
  }

  ngOnInit(): void {
    // grab the todo on component initialization
    this.tdsrv.getTodos();
  }
}
```

src/app/all-posts/all-posts.component.html

```html
<div *ngFor="let todo of tdsrv.todos; index as i">
  <a [routerLink]="'/post/' + todo.id"><h1>{{ todo.subject }}</h1></a>
  <h2>{{ todo.details }}</h2>
</div>
```

#### Show a Single Todo

src/app/single-post/single-post.component.ts

```ts
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { TodoService } from "../todo.service";
import { Todo } from "../../types";

@Component({
  selector: "app-single-post",
  templateUrl: "./single-post.component.html",
  styleUrls: ["./single-post.component.css"],
})
export class SinglePostComponent implements OnInit {
  id: number | null = null; // variable for param id
  route; // variable for route service
  tdsrv; // variable for todo service
  post: Todo = {
    subject: "",
    details: "",
  }; // variable to hold the selected post

  constructor(route: ActivatedRoute, todoService: TodoService) {
    //assign services to properties
    this.route = route;
    this.tdsrv = todoService;
  }

  ngOnInit(): void {
    //get the URL Param
    this.route.params.subscribe((params) => {
      // store the id in our properties
      this.id = params["id"];
      // find post from our service with the to selected todo
      const post = this.tdsrv.todos.find((p) => p.id == params.id);
      // if post exists assign it to post property
      if (post) {
        this.post = post;
      }
    });
  }
}
```

src/app/single-post/single-post.component.ts

```html
<div>
  <h1>{{post.subject}}</h1>
  <h2>{{post.details}}</h2>
  <a routerLink="/"><button>Go Back</button></a>
</div>
```

#### Edit and Create Todo With Our Form

/src/app/form/form.component.ts

```ts
import { Component, OnInit } from "@angular/core";
import { TodoService } from "../todo.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"],
})
export class FormComponent implements OnInit {
  subject: string = ""; // variable for subject form field
  details: string = ""; // variable for details form field
  tdsrv: TodoService; // variable for todo service
  route: ActivatedRoute; // variable for route service
  id: number | null | undefined = null; // variable for edited post if editing
  buttonLabel = "create todo";
  router: Router; // variable for router service

  constructor(todoService: TodoService, route: ActivatedRoute, router: Router) {
    this.tdsrv = todoService;
    this.route = route;
    this.router = router;
  }

  // check to see if a post need to be edited by looking for an id
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      // fetch post from todoservice if there is an id in url
      const post = this.tdsrv.todos.find((p) => p.id == params["id"]);
      if (post) {
        this.subject = post.subject;
        this.details = post.details;
        this.id = post.id;
        this.buttonLabel = "edit todo";
      }
    });
  }

  async handleSubmit() {
    console.log("test");
    //if there is an id, edit the post, if not, create a new post
    if (this.id) {
      //update the todo with the form data
      this.tdsrv.updateTodo({
        id: this.id,
        subject: this.subject,
        details: this.details,
      });
    } else {
      //create the todo with the form data
      this.tdsrv.createTodo({
        subject: this.subject,
        details: this.details,
      });
    }
    // send back to main page
    this.router.navigate(["/"]);
  }
}
```

/src/app/form/form.component.html

```html
<input type="text" placeholder="subject" [(ngModel)]="subject" />
<input type="text" placeholder="details" [(ngModel)]="details" />
<button (click)="handleSubmit()">{{buttonLabel}}</button>
```

add a create button in src/app/app.component.html

```html
<h1>Our Todo List</h1>
<a routerLink="/new"><button>Create a New Todo</button></a>

<router-outlet></router-outlet>
```

add an edit button in single-post.component.html

```html
<div>
  <h1>{{ post.subject }}</h1>
  <h2>{{ post.details }}</h2>
  <a routerLink="/"><button>Go Back</button></a>

  <a [routerLink]="'/edit/' + post.id"><button>Edit Todo</button></a>
</div>
```

#### Deleting Our Todos

In Single-Post we need to...

- add the router service
- create a deleteTodo function
- attach it to a delete todo button

src/app/single-post/single-post.components.ts

```ts
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { TodoService } from "../todo.service";
import { Todo } from "../../types";

@Component({
  selector: "app-single-post",
  templateUrl: "./single-post.component.html",
  styleUrls: ["./single-post.component.css"],
})
export class SinglePostComponent implements OnInit {
  id: number | null = null; // variable for param id
  route; // variable for route service
  tdsrv; // variable for todo service
  post: Todo = {
    subject: "",
    details: "",
  }; // variable to hold the selected post
  router: Router; // variable to hold router service

  constructor(route: ActivatedRoute, todoService: TodoService, router: Router) {
    //assign services to properties
    this.route = route;
    this.tdsrv = todoService;
    this.router = router; // variable for todo service
  }

  ngOnInit(): void {
    //get the URL Param
    this.route.params.subscribe((params) => {
      // store the id in our properties
      this.id = params["id"];
      // find post from our service with the to selected todo
      const post = this.tdsrv.todos.find((p) => p.id == params.id);
      // if post exists assign it to post property
      if (post) {
        this.post = post;
      }
    });
  }

  // function to delete a todo
  async deleteTodo() {
    await this.tdsrv.DeleteTodo(this.post);
    this.router.navigate(["/"]);
  }
}
```

single-post.component.html

```html
<div>
  <h1>{{ post.subject }}</h1>
  <h2>{{ post.details }}</h2>
  <a routerLink="/"><button>Go Back</button></a>

  <a [routerLink]="'/edit/' + post.id"><button>Edit Todo</button></a>

  <button (click)="deleteTodo()">Delete Todo</button>
</div>
```

Crud Functionality achieved!

---

## Resources to Learn More

---