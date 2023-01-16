---
track: "React-Fundamentals"
title: "Project Three"
type: "Project Prompt"
topics: "Unit Projects"
---

# Project #3: MERN Stack - Group Project

<br>
<br>
<br>

## Overview

**You’ve come a long way, and it's time to show it.** This will be your most advanced project to date.

## Attendance

You must check in with your squad lead at the start of each class session. This can be via slack or standups. You will be expected to be working during regular class time hours.

## Stand-ups

Have stand-ups with your group every day to keep track of how your project progress is coming along. Consider the following points to talk about:
  - What did I work on yesterday
  - What am I trying to get done today
  - What is preventing me from getting this done.

[Here](https://git.generalassemb.ly/sei-stamford/cerf/blob/master/projects/working_in_groups.md) are some helpful tips/advice to working in groups as a developer.

## Technical Requirements

### &#x1F534; Mandatory to pass:
#### MVP - Minimum Viable Product

For this project, you will be making another full CRUD app using the technologies outlined below. When thinking of an app idea, try to frame the project in terms of trying to solve a "problem" and think about the purpose of the app, who would use it, etc. The problem doesn't have to be anything intense and can be something small and simple! For example:

>Problem: I have a huge enamel pin collection and want to organize it all in one place<br>
>General App Idea/Purpose: An app that allows me to catalogue all my pins by category <br>
>Who Would Use It: Pin collectors<br>

**If you see anything below that you would like to implement in a different way, please talk to an instructor or IA before starting work on the project.**

* A working full-stack application, built by you and your group members, using the MERN stack: **Mongoose, Express, React, and Node.js**.  

- Backend Express API using Mongo with at least full crud (Index, Show, Create, Update, Delete) routes for one model deployed to render or railway.

- Frontend React app using React Router that provides a UI to view all items, view a single item, create a new item, delete an item and update an item from at least one model using your API. Deployed to Vercel, Render or Netlify.


   - *At least* one GitHub commit per day *per person*.
* Use some sort of **daily tracker** that all group members use to help organize your workflow (e.g. Trello).
* **Two `README.md` files** (one for the back end, and another for the front end) with explanations of the technologies used, the approach taken, unsolved problems, user stories, and notes to yourself so you can come back to your project later in the course and be able to pick up your train of thought, etc
  - Have a **link to your hosted working app** in the `README.md` file in each of your github repos
  - Include User Stories in at least one `README`
  - Include **wireframes** that you designed during the planning process in at least one `README`

### &#x1F535; Stretch Goals (Not Mandatory):
#### Recommended Features

* Use React Router, SASS, Styled-Components, etc
* Include portfolio-quality styling
* Use a CSS framework like Skeleton or Bootstrap
* Incorporate **Google Maps**
* Use `socket.io` for real-time updates (like gmail) and collaborative interaction (like chat rooms).  

#### :heavy_exclamation_mark: Important note about External APIs!

When you are calling External APIs **server-side** that require a key, you should store those keys somewhere private. They are the only proof that you are you and you are allowed to call that API, after all.

For example, it is very important that you not push your API keys to a public Github repo. Keep them in a `.env` file and make sure you add `.env` to your `.gitignore`. Note that since it won't be pushed into the github repo, your partner won't be able to pull it either. So, make sure both partners write their own local `.env` file with the key!

This is especially true when working with Amazon Web Services (AWS). Here's an example of a [stolen key horror story](https://wptavern.com/ryan-hellyers-aws-nightmare-leaked-access-keys-result-in-a-6000-bill-overnight).

## Make New Repos & Setup for Heroku Deployment

Before you begin coding, make new GitHub repos for your project. _Take the following steps to ensure you have the right set up in order to deploy your site to Heroku. If you need a reminder on deploying a server to Heroku, look at the deployment notes_

:heavy_exclamation_mark: You will be using GitHub, **not** GitHub Enterprise!

1. *One* group member will make new github repos (client and server) for your project **outside** of our class repo on GitHub (likely the `release manager`).  This person will be the *owner*. The *owner* should add other members of the group as *collaborators* under the `Settings` tab of the repos. Collaborators should clone the repos.

2. Inside the server repo, create a `.gitignore` file in the root of the repository directory. Put `node_modules` as the content of this file.
     - :arrow_right: _After installing express, do a `git status` before adding and committing.  Make sure node modules are not being pushed up to the repo and are correctly in your `.gitignore`!  You can also copy the [class repo's .gitignore](/.gitignore)_
     - If you see the node_modules folder on your github repo, you haven't properly ignored it!
        - Read [here](https://github.com/Krafalski/probable-meme/blob/master/README.md) on how to get rid of node_modules if you didn't ignore properly

3. On `npm init`, specify `server.js` as your entry point

4. If you did not set up your `entry point` in `package.json` correctly, make sure that you edit your `package.json` so that `main` is set to `server.js`

5. Make sure your `server.js` and `package.json` are in the **root** of your project repository

[Here](frontend_deploy.md) is a link to client side setup for deployment of your React app.

<!-- <details><summary> Expected File Structure </summary>


![Suggested File Structure](https://i.imgur.com/FbxjDNo.png)

</details> -->

## Project Approvals

- Be less than 1 minute
- Address the "problem to be solved" as described above
- Illuminate the "general idea / purpose" as described above
- Identify "who would use it" as described above

## Project Assignment and Roles

Once teams are set, groups should decide upon the following roles. Everyone must have **at least one** of these roles, but smaller groups will have a member with two roles. We **do not advise one person to be both release manager and product manager**, as it is a direct conflict of interest ("let's get those features out--no, we need to make sure the code is clean first!").

- Release manager (responsible for handling branches, keeping `master` safe, and resolving merge conflicts if the developers cannot resolve them)
- Product manager (responsible for prioritizing tasks so that the user gets the most out of the app -- this will usually be the originator of the project idea)
- Lead front-end dev (responsible for breaking ties when the group has disagreements on front-end coding, and for designing a general plan for front-end development, e.g. file structure and `state` management)
- Lead back-end dev (responsible for breaking ties when the group has disagreements on back-end coding, and for designing a general plan for back-end development, e.g. file structure and schema definitions)

These roles may not seem important now, but when disagreements inevitably enter the dialog, it is important for someone to be responsible for specific parts of the application.

## Technical Demonstration

All projects will be presented to the class.  Your presentation should:

* Be approximately 5-10 minutes in length
* Show off all features of the app
* Explain the technical details
* Explain the technical challenges
* Explain which improvements you might make

Additionally, *each* group member must talk, and must answer *at least one* of the following questions:

1. What went well for your group?
2. What was your group's biggest struggle?
3. What was the most useful tool that your group relied on the most?
4. What was the most surprising aspect of working in a group?

You will be sharing your app and your code.  Be prepared to answer questions from the instructors and other students.  *All group members should speak during presentation*.

## Project Approval

Your group will meet with your dedicated project instructor for ~15 minutes to get your app idea approved. Be sure to write out what features you will need to build in order to meet MVP and some stretch goal ideas. Come prepared with:

- A repo with a `README` for the back end
- A repo with a `README` for the front end
- A Trello with sized user stories that encompass all major features of the project
- A role assignment for all group members (at least one)

## How to Submit Your Project
Your group will present your project and show your code to classmates and instructors.

## Where to go for help during project week
1. Seek out help online
2. Seek out help with your classmates
3. Seek out help with our class TA
  * We will have normal TA hours during project week.

## Etc.

<details><summary><strong>Suggested Ways to Get Started</strong></summary>

* **Wireframe** Make a drawing of what your app will look like in all of the stages of the app(what does it look like as soon as you log on to the site? What does it look like while the player is playing? What does it look like when the player wins / loses?).

* **Break the project down into different components** (data, presentation, views, style, DOM manipulation) and brainstorm each component individually.

* **Commit early, commit often.** Don’t be afraid to break something because you can always go back in time to a previous version.

* **Consult documentation resources** (MDN, jQuery, etc.) at home to better understand what you’ll be getting into.
</details>

<details><summary><strong>Think about...</strong></summary>

- **Creativity**  
Did you add a personal spin or creative element into your project submission? Did you deliver something of value to the end user?

- **Code Quality**  
Did you follow code style guidance and best practices covered in class, such as spacing, indentation, modularity, and semantic naming? Did you comment your code as your instructors have in class?

- **Problem Solving**  
Are you able to defend why you implemented your solution in a certain way? Can you demonstrate that you thought through alternative implementations?
</details>

<details><summary><strong>Useful Resources</strong></summary>

* **[Heroku](http://www.heroku.com)**
* **[Writing Good User Stories](http://www.mariaemerson.com/user-stories/)**
* **[Presenting Information Architecture](http://webstyleguide.com/wsg3/3-information-architecture/4-presenting-information.html)**
* **[Mongo Documentation](https://docs.mongodb.com/manual/)**
* **[Mongoose Documentation](http://mongoosejs.com/docs/guide.html)**
* **[Mongo Cheatsheet](https://git.generalassemb.ly/Web-Development-Immersive-Remote/WDIR-Adi/wiki/Mongo-Cheatsheet)**
</details>
<hr>  
