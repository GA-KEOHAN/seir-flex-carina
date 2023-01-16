---
track: "Frontend Fundamentals"
title: "BONUS: AlpineJS & HTMX"
week: 4
day: 3
type: "lecture"
---

## What is AlpineJS & HTMX?

AlpineJS is a lightweight library for interactive UI management meant for enabling writing more of your interactivity in your html and avoid writing as much javascript. This has become popular among non-javascript programmers (Ruby, Python, PHP) for writing interactivity into their server rendered templates. This will be useful for you in unit two when you work with server-side rendered pages through express and EJS! This can even be useful for adding easy interactivity in your unit 1 projects!

In a similar fashion, HTMX is made to reduce the need for javascript by giving you a way to swap out html on your page from other HTML sources.

## Let's try it out

- create a folder called "AlpineHTMX"
- create an index.html file

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
```

- add the Alpine JS script tag

`<script src="//unpkg.com/alpinejs" defer></script>`

- add the HTMX script tag

`<script src="https://unpkg.com/htmx.org@1.5.0"></script>`

## Trying out Alpine

[ALPINE DOCUMENTATION](https://alpinejs.dev/)

Add the following code in the body tag of index.html

```html
    <!-- MAIN BLOCK USING ALPINEJS DIRECTIVES -->
    <main id="trying-alpine" x-data="{ image: false }">
      <img
        x-show="image"
        src="https://i.pinimg.com/564x/c0/89/63/c0896320d81707bee35bae7b331a6656.jpg"
        alt="an image"
      />

      <button x-on:click="image = !image">Click Me to Reveal Image</button>
    </main>

    <!-- STYLE TAG USED FOR SOME BASIC STYLING -->
    <style>
      img {
        display: block;
        height: 400px;
        width: 400px;
        object-fit: cover;
        margin: auto;
      }

      div {
          width: 600px;
          height: 600px;
          border: 4px solid black;
          margin: auto;
          text-align: center;
      }

      main{
          text-align: center;
      }
    </style>
```

Summary of these special html attributes also called "directives":

- x-data: a javascript object which can be referred to by any directives within that html element
- x-show: html element is visible if the variable specified is true or false
- x-on:click: runs an expression on the click on the element that can alter the x-data variables (state)

See how easy that was without writing almost any javascript! There are a total of 14 directives Alpine gives you, checkout the alpine documentation to learn more!

## Trying out HTMX

[HTMX Documentation](https://htmx.org/docs/)

Create another file in the same folder called cheese.html in same folder with just the following:

```html
<h1>This is Cheese!</h1>
```

Add the following in your index.html between your AlpineJS code and the Script tag

```html
<!-- main block that uses HTMX directives -->
    <main id="trying-htmx">
      <div id="target"></div>
      <button
        hx-get="./cheese.html"
        hx-trigger="click"
        hx-target="div#target"
        hx-swap="innerHTML"
      >
        Click Me
      </button>
    </main>
```

Summary of the special attributes from HTMX:
- hx-get: request the html from another file or url
- hx-trigger: when should the request be triggered
- hx-target: where should the html be injected
- hx-swap: how should it be injected (innerHTML or outerHTML)

## Conclusion

With these two libraries you have tools to take allow those who may write templates in other languages to avoid the need to go to deep into javascript to build out frontend interactivity.