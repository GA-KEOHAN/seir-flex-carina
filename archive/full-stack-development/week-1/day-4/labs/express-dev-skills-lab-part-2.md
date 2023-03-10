---
track: "Full-Stack Development"
title: "Express Dev Skills Part 2"
week: 1
day: 4
type: "lab"
---

# My Dev Skills - Part 2

<br>
<br>
<br>



## Intro

In the last lesson you saw how to use HTML forms and Express middleware, such as:

- `express.urlencoded` 
- `method-override`

to perform **Create**, **Update** & **Delete** data operations in an Express application.

This lab builds upon the `express-dev-skills` project you created in the _My Dev Skills - Part 1_ lab where the **Read** data operation was implemented.

#### This Lab is a Deliverable

<br>
<br>
<br>




## Exercises

The goal of the lab is to do put in a rep doing everything that you did during the _Express - Middleware_ lesson by adding the following functionality to the `express-dev-skills` project:

1. Display an _Add Skill_ link on the **index** view that when clicked, displays a **new** view that displays a form for entering a new Dev Skill.

2. When a new Dev Skill is submitted, the skill is added to the "database" and redirect the user to the **index** view.

3. On the **show** view, display a _Delete Skill_ link that when clicked, deletes the skill from the "database" and redirects to the **index** view.

Note: All routes should follow those described in the [RESTful/Resourceful routing chart](https://gist.github.com/myDeveloperJourney/dfb5b8728c54fce5e0e997ac3ce466a0)

##### Hints

- Be sure to install, require & mount the `method-override` middleware.

<br>
<br>
<br>




## Bonus Exercises

1. On the **show** view, display an _Edit Skill_ link that when clicked, displays an **edit** view that displays a form for editing that Dev Skill.

2. When the edit Dev Skill form is submitted, the skill should be updated in the "database" and redirect the user back to the **show** view.

<br>
<br>
<br>



##### Hints

- The controller action will need to get the Dev Skill being edited using the `Skill` Model and pass it to the **edit** view.
- Pre-fill `<input>` elements by using the `value` attribute and some EJS tags to write out the data properties of the skill passed in.
