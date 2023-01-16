---
track: "Frontend Fundamentals"
title: "Response Design"
week: 4
day: 1
type: "lecture"
---

## Responsive Design 

Nowadays, more and more people use mobile phones for their web browsing, so making responsive web designs matter more and more. There are several tools for making this happen.

- CSS Layout Systems such as Flexbox and Grid
- Relative Measuring Units such as %, fr, rem, em
- Media Queries to make conditional styles based on device

[GRID/FLEXBOX/MEDIA QUERIES PRACTICE SQUARES](https://codesandbox.io/s/squares-and-containers-275jx)
*Click the link above and fork the code sandbox*

OR

Local setup:

- create two folders "flexbox" and "grid" and inside each of them...

- create an index.html with the following

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Static Template</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="container">
      <div class="square one"></div>
      <div class="square two"></div>
      <div class="square three"></div>
      <div class="square four"></div>
    </div>
  </body>
</html>
```

- in the same folder create a style.css with the following:

```css
/* ***************************
** CONTAINER DIV
*************************** */

.container {
  display: block;
  background-color: gray;
  width: 400px;
  height: 400px;
  margin: auto;
}

/* ***************************
** Square Shape
*************************** */

.square {
  height: 100px;
  width: 100px;
}

/* ***************************
** Square Colors
*************************** */

.one {
  background-color: red;
}

.two {
  background-color: green;
}

.three {
  background-color: blue;
}

.four {
  background-color: yellow;
}

/* ***************************
** Tablet Media Query
*************************** */

@media screen and (min-width: 480px){

}

/* ***************************
** Desktop Media Query
*************************** */

@media screen and (min-width: 769px){

}
```

## CSS Flexbox

The default behavior of block elements (div, header, main, footer, article, p, h1-6, aside, nav) is to stack on top of each other and fill the whole width available to them. Sometimes it would be nice to be able to instead have them stack into rows. Flexbox changes the default behavior of how block elements in a containing flexbox are treated.

Very useful for laying out cards like these shoes on the Adidas Website.

![Adidas Website](https://lh3.googleusercontent.com/proxy/RrxKYgjnTn5Yy427myO8f_X9kGfxPVV0I89zjCEsLWBiyTW792uH8BKpB9YpkQW-lAFAkVcjqDSd_gZzklX3-ZGK8Uz2fJtBJUn2K5yc3K5AK7LcjLvZiX-YdlnCwkbZVyBS96lmvq9-SVzdIqR-mFBhYmisiuUdOSKxq1dNqzWly3aoK9c)

Notice on the HTML

```html

    <div class="container">
      <div class="square one"></div>
      <div class="square two"></div>
      <div class="square three"></div>
      <div class="square four"></div>
    </div>

```

The four colored "square" divs are all children of the gray "container" div. They are currently stacked on top of each other as block elements do by default. By changing the display property of the "container" div to flex we can change this behavior.


```css
/* ***************************
** CONTAINER DIV
*************************** */

.container {
  display: flex;
  background-color: gray;
  width: 400px;
  height: 400px;
  margin: auto;
}
```

Now you may noticed they are now in a row.

### Flexbox and Wrapping

Right now the square fit perfection. Let's make them wider and see what happens.

```css
/* ***************************
** Square Shape
*************************** */

.square {
  height: 100px;
  width: 200px;
}
```

Notice nothing has changed. By default the container will force them to fit the width of the container. If we don't want the width to be distorted we can have them wrap to the next row by setting the flex-wrap property on the container to wrap.

```css
/* ***************************
** CONTAINER DIV
*************************** */

.container {
  display: flex;
  flex-wrap: wrap;
  background-color: gray;
  width: 400px;
  height: 400px;
  margin: auto;
}
```

Let's make the squares 50x50 and see what happens.

```css
/* ***************************
** Square Shape
*************************** */

.square {
  height: 50px;
  width: 50px;
}
```

notice can now fit all on the same row but they all are flush to the left. We can change how the rows space themselves horizontally with the justify-content property on the container. Try setting it to the following and see their effect.

- flex-start
- flex-end
- space-around
- space-between
- center

```css
/* ***************************
** CONTAINER DIV
*************************** */

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: gray;
  width: 400px;
  height: 400px;
  margin: auto;
}
```

- you can set the vertical alignment the same way using align-items
- if you set flex-direction property to column, justify-content and align-items switch which axis they align.

## CSS Grid

Let's make another fork of the squares starter

[GRID/FLEXBOX/MEDIA QUERIES PRACTICE SQUARES](https://codesandbox.io/s/squares-and-containers-275jx)

CSS Grid is another Layout tool in CSS. Instead of changing how the container stacks it's child blocks, grid allows you to define a literal grid within the container then define which cells in the grid the children fill. 

**TWO APPROACHES**

- Defining Template Rows and Columns
- Defining Template Area

### Approach 1 - Template Columns and Rows

In this approach we define the space alotted to each row and column. We use a relative measurement called fr (fractional units). The way it works, is the space is divided evenly by the number of fractional units used among all rows or all columns and then distributes the result based on the number of units.

So let's do two things
- Set the container divs display property to grid to turn on grid
- set two rows and two columns giving each 1fr, giving each line a semantic name

```css
/* ***************************
** CONTAINER DIV
*************************** */

.container {
  display: grid;
  grid-template-columns: [left] 1fr [mid] 1fr [right];
  grid-template-rows: [top] 1fr [center] 1fr [bottom];
  justify-content: center;
  background-color: gray;
  width: 400px;
  height: 400px;
  margin: auto;
}
```

Then we can specify where each square is in the grid.

```css

.one {
  background-color: red;
  grid-column: mid/right;
  grid-row: center/bottom;
}

```

### Approach #2 - Grid Template Areas

In this approach you sketch out areas of the grid and then assign them.

```css
/* ***************************
** CONTAINER DIV
*************************** */

.container {
  display: grid;
  grid-template-areas: 
  "one two"
  "three four";
  background-color: gray;
  width: 400px;
  height: 400px;
  margin: auto;
}
```

We then assign the children divs to the different areas.

```css
/* ***************************
** Square Colors
*************************** */

.one {
  background-color: red;
  grid-area: one;
}

.two {
  background-color: green;
  grid-area: two;
}

.three {
  background-color: blue;
  grid-area: three;
}

.four {
  background-color: yellow;
  grid-area: four;
}
```





## Mobile First

The mantra in modern design is mobile first. Your website should default to a single column design then using min-width media queries adjust the design for larger viewports. In the CSS we have two media queries for tablets and desktop.

```css
/* ***************************
** Tablet Media Query
*************************** */

@media screen and (min-width: 480px) {
}

/* ***************************
** Desktop Media Query
*************************** */

@media screen and (min-width: 769px) {
}
```

