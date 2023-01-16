## Capstone Ideas

In this markdown I'll list possible new technologies you may want to try based on difficulty.

## GOOD ADVICE
Whatever tech you decide on do a brief one day mini project (a todo list) and deploy it before you undertake your main project. This will allow you to work through deployment issues, understanding the new tech and other issues on a smaller scale so you don't lose a lot of time later. Common issues students run into...

- They don't try to deploy till the very end and find out they can't do it on time and that deployment is a lot more complicated than expected and hard to abstract after building a complex project(this is especially important if you are using an M1 mac, a lot of students have to jump through extra hoops to deploy from an M1).

- Get frustrated with their progress and try to downgrade at the last minute, a mini project will make it clear if you need to adjust early so your not rushing at the end.

## New Language (Difficulty Level: 4 or 5)

Learning a new languages can be the most difficult choice as not only do you need to learn a new language but a web framework as well to build a backend API (you can't really use other languages on the frontend except for some niche exceptions (ReScript, Purescript, ELM)).

My Recommendation is if you go this route to try one of the 8 languages in this repository which has lessons on the languages, web framework and deployment to help get up and running easier. 

- [THE POLYGLOT REPO](https://git.generalassemb.ly/SEIR-Jedi/SEIRPolyglot)

#### Level 4 Difficulty Languages

| Language | Minimalist Framework (Like Express) | Opinionated Framework (Like Rails) |
|----------|-------------------------------------|------------------------------------|
| Python | Flask, FastAPI, Bottle | Django, Masonite, Pyramid |
| PHP | Slim | Laravel, Symphony |

#### Level 5 Difficulty Languages
** Not for the faint of heart **

| Language | Minimalist Framework (Like Express) | Opinionated Framework (Like Rails) |
|----------|-------------------------------------|------------------------------------|
| Go | Echo, Revel | Buffalo |
| Rust | Actix | Rocket |
| Java | | Spring, Play |
| Kotlin | Ktor | Spring |
| Groovy | | Spring |
| Scala | | Play |
| Dotnet (C#, F#) | | .NET 5/6 |
| Dart | Shelf | Jaguar |
| Swift | | Vapor, Kitura |
| Clojure || Luminus |
| Haskell || IHP |
| Erlang || Zotonic, Chicago Boss |
| Elixir || Phoenix |
| Ballerina | ? | ? |
| Lisp | [Caveman](https://8arrow.org/caveman/) | |

#### Level 4 Frontend New Language Ideas

- Flutter is a compiler for the Dart Programming languages that can now build web applications along with a mobile apps from the same code.

- Purescript & ReasonML are both functional transpile to javascript languages. So essentially you can write your frontend code in these languages and it then compiles very efficient type safe javascript on the other end.

- ELM is a functional languages for building your frontend applications, it compiles down to HTML/CSS/JS.

- Typescript (Level 3 difficulty) of these "Transpile to Javascript" Languages, Microsofts Typescript is by far the most popular as it essentially keeps javascript as is and just adds a few new features for typing your code.

## Switching up your backend Framework (Level 3/4 Difficulty)

Try out different frameworks in the language you know:

#### Javascript Backend Frameworks

- Sails
- NestJS
- Fastify
- Koa
- Loopback
- FoalTS (Typescript Based)

#### Ruby Backend Frameworks

- Sinatra
- Hanami
- Grape

## Switching up your Database (Level 3 or 4)

**Level 3 Ideas**
- Use Express with Postgres (Sequalize or Objection would be the ORM)

**Level 4 Ideas**
- Use a Graph Database via FaunaDB, Neo4J, dGraph, Amazon Neptune or GUN.io with Express or Rails
- Use Redis with Express or Rails

## Frontend Framework Ideas (Levels 2-4)
*these ideas assume you build an api with express/mongo to rails/postgress*

**Level 2 Ideas**
- Use Vue or Svelte as your frontend framework
- Use React but use Styled Components for Styling

**Level 3 Ideas**
- Use Angular as your frontend framework
- Use React with Redux, MobX or StateMachines for state management
- Build your frontend in pure javascript web components

**Level 4 Ideas**
- Use NextJS
- Use SvelteKit (Svelte Version of NextJS)
- Use Nuxt (Vue version of NextJS)
- use Angular Universion (Angular Version of NextJS)
- Use SolidJS (Cutting edge new framework borrowing the best parts of React and Svelte)

## Build a JAMStack Website (4/5)
This is a great project especially if you plan on doing a lot of freelancing. Essentially it works like this:

- You use a headless CMS as your backend, these provide you graphical interface for building your backend data and deliver it through a pre-built API (that's right a backend without coding).

- You then use a Static Site Generator that pulls the information in via the api and render a bunch of pages into static html/css. There is a static generator that allows you to use any of the major frontend frameworks to build out your pages.

**Headless CMS Options**
- ButterCMS
- Contentful
- GraphCMS
- AgilityCMS
- Sanity.io

**Static Site Generators**
- Gatsby (React)
- Gridsome (Vue)
- ElderJS (Svelte)
- Scully (Angular)

## Level 2/3 Ideas
*assuming React Frontend with either Rails/PG or Express/Mongo for backend api*

- Try incorporating emails or text messaging into your app with ZendGrid or Twilio
- Dates heavy app using the Date-FNS Javascript library Library
- Do info graphics with Charts.js, D3, or three.js


## Level 1
Use a CSS Library you haven't used during the course

- Foundation
- Materialize
- UIKit
- [...More](https://hackr.io/blog/best-css-frameworks)
- [...Even More](https://graygrids.com/best-css-frameworks/)