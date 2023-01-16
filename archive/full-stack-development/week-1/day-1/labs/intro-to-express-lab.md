---
track: "Full-Stack Development"
title: "Intro to Express Lab"
week: 1
day: 1
type: "lab"
---

# Intro to Express Lab

<br>
<br>
<br>

<iframe width="560" height="315" src="https://www.youtube.com/embed/McUFQ1nFfuA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br>
<br>
<br>



## Intro

It's been a long day and you've covered a lot of ground.

It's natural, in fact, **expected**, to feel "uncomfortable" and confused by Node.js & Express at this point.

As always, the journey toward competence requires practice - so let's get on with it!

<br>
<br>

## Exercise

The goal of the exercise is to put in a rep doing everything that you did during the Express lesson!

However, instead of To Dos, change up the data resource to something else, like `students` - your call.

#### This lab is not a deliverable

<br>
<br>

## Bonuses

- Use EJS partial views to make your templates more DRY (see link in Reference section of the lesson) and/or [this link](https://www.npmjs.com/package/ejs#includes).

- Include Materialize, or another CSS framework, if you want your app to look better quickly.

<br>
<br>

## Super Bonus

This is an advanced bonus that previews what we will soon learn in class...

Create a route and view dedicated to displaying a single data resource, such as a single student.

We refer to this as the `show` route/view, vs. the `index` route/view.

The key to implementing this feature is **route parameters** documented in the **Route parameters** section of the [Express Routing guide](https://expressjs.com/en/guide/routing.html).

Basically, you can define a route as follows:

```javascript
app.get('/students/:id', function(req, res) {
  console.log(`The value for the :id route parameter is: ${req.params.id}`);
  res.render('students/show', {student: studentDb.getOne(req.params.id)});
});
```

To send a matching route from the browser, you can use EJS that generates a hyperlink that looks like:

```html
<a href="/students/<%= student.id %>">
  Click for Details for Student <%= student.id%>
</a>
```
