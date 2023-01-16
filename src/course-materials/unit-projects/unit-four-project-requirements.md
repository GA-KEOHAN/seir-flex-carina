---
track: "Second Language"
title: "Project Four"
type: "Project Prompt"
topics: "Unit Projects"
---

# Mini Project #4: Python on Django with React

## Overview

You will build a Django & React App for one more repetition to solidify this unit and prepare you for your final project.

Keep the scope of this small and polish it well! You'll only have a week to work on it, and you may be busy with Outcomes and job search work.

## Technical Requirements
### &#x1F534; Mandatory to pass:
#### MVP - minimum viable product

* **Django backend**: Serve a JSON API with all CRUD operations available across your models. The Django API must be deployed online via Heroku.
	* Must have at least one model with full CRUD
* **React frontend**: Serve a React frontend that consumes your Django API. The React frontend must be deployed online via Heroku or (more likely) Vercel, Netlify, or GitHub Pages.
	* Tip if you're using Heroku: Be sure to configure it to serve up the react static site or use the [mars/create-react-app buildpack](https://github.com/mars/create-react-app-buildpack) to do it automatically.
	* To use the create-react-app buildpack on Heroku, use this command line when creating your app from the terminal: `heroku create yourappname --buildpack mars/create-react-app` where `yourappname` is the name you want for your app/url.
* **Two git repositories** hosted on Github, with a link to the relevant live sites, and frequent commits dating back to the very beginning of the project. Commit early, commit often!
* At **least** one Github commit per day.
* **A ``README.md`` file** with explanations of the technologies used, the approach was taken, unsolved problems, and notes to yourself/group members so you can come back to your project later and be able to pick up your train of thought, etc. As well as a **link to your hosted working app**

---

### Presentation Via Video (Unlisted On Youtube):
#### Practice Speaking About Your Work

- Since this is one of the projects that should be heavily featured on your portfolio we want you to record your presentation by whatever means you feel best. The video should be uploaded to the youtube (make it unlisted if you don't want it public and submit the link). 

How to Record the Video (Suggestions):
- Do a solo zoom call and record it (recommended)
- Download the free Software OBS Studio [Video About How To Use OBS](https://www.youtube.com/watch?v=bWjV4leo6DI)
- (MacOS only) Open up QuickTime Player and go to File > New Screen Recording

You don't have to add the video to your portfolio later, but it would be a good way to standout and show recruiters and employers you can talk about your code and see your project in action so they are more comfortable bringing you in for an interview.

**Video, Github Repos, and Deployed Urls must be submitted by the presentation due date**

---

---

### &#x1F535; Not mandatory:
#### Recommended features - choose two or more

* Configure CORS in your rails API so that **only** your frontend app can access your API
* Use Sass
* Include **two or more models** (additional models do not require full CRUD)
* Include either a one-to-many or a many-to-many relationship (full CRUD not required)
* Use a **third party API** with a gem
* Add **graphs or visuals** on your data with `Chart.js` or `D3.js`
* **Include portfolio-quality styling**
* **Use a CSS framework** like skeleton or bootstrap
* **Include User Stories**
* **Include wireframes** that you designed during the planning process (uploaded to your github repo)
* **Authentication**
* **Implement React Router**

---

## Meetings with instructors

_We will do quick approval meetings in the first half of class on project week kickoff_

## How to Submit Your Project
**Video, Github Repos, and Deployed Urls must be submitted by the presentation due date**

- Submit on Project Worksheet Pinned to Classroom

### Suggested Ways to Get Started

<details><summary>List of ways to get started</summary>

* **Wireframe** Make a drawing of what your app will look like on each page of your application (what does it look like as soon as you log on to the site? What does it look like once a user logs in, etc.).

<br>

* **Break the project down into different components** (data, presentation, views, style, DOM manipulation) and brainstorm each component individually.

<br>

* Create your **user stories**

<br>

* Create a **Trello board** and break down the user stories into cards

<br>

* **Use your Development Tools** (console.log, inspector, alert statements, etc) to debug and solve problems

<br>

* Work through the lessons in class for help and inspiration! Think about adding relevant code to your application each day - you are given a week so that you can work on it in small chunks, so COMMIT OFTEN. We will be looking at your commit dates and comments are part of your scoring.

<br>

* **Commit early, commit often.** Don’t be afraid to break something because you can always go back in time to a previous version.

<br>

* **Consult documentation resources** (MDN, jQuery, etc.) at home to better understand what you’ll be getting into.

<br>

* **Don’t be afraid to write code that you know you will have to remove later.** Create temporary elements (buttons, links, etc) that trigger events if real data is not available. For example, if you’re trying to figure out how to change some text when the game is over but you haven’t solved the win/lose game logic, you can create a button to simulate that until then.

</details>

### Useful Resources

- [DEPLOYMENT OF DJANGO TO RENDER](https://render.com/docs/deploy-django)

* **[Heroku](http://www.heroku.com)** _(for hosting your project)_
* **[Writing Good User Stories](http://www.mariaemerson.com/user-stories/)** _(for a few user story tips)_
* **[Presenting Information Architecture](http://webstyleguide.com/wsg3/3-information-architecture/4-presenting-information.html)** _(for more insight into wireframing)_
