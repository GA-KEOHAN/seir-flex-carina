---
track: "Frontend-Fundamentals"
title: "Project One"
type: "Project Prompt"
topics: "Unit Projects"
---


# Project One: Your First Web Application

<br>
<br>


## Attendance

For project week, the classroom will break into squads, so students can work on their projects independently and check in via slack or a 1:1 zoom with their squad leader as needed/scheduled.


There are typically no classes taught during project week with the exception of an occasional concept review or bonus workshop. 


Additionally, we still take normal attendance during project period, so you are still expected to be available for a morning & after-lunch check-in from your squad leader. 


<br>
<br>



## Project Details

### &#x1F534; Mandatory To Pass:
#### MVP - Minimum Viable Product

#### Your application must meet these requirements:

  1. Built with HTML, CSS, JavaScript and *jQuery* 
  2. Hosted on github pages/netlify.com/vercel.com/render.com<br>
  3. Frequent Commits to github (at least one per day)<br>
  4. A `README.md` file with explanations of the technologies used, the approach taken, a link to your live site, installation instructions, unsolved problems, etc.
  5. Use AJAX to make a request to an external data source like OMDBapi and insert some of the data retrieved into the DOM

  [START HERE: THIS VIDEO WILL GUIDE YOU ON SETUP AND DEPLOYMENT](https://youtu.be/gKoNZUhwmEM)

  [THIS VIDEO WILL HELP IN HOW TO SELECT & TEST AN API](https://www.youtube.com/watch?v=nksiK9qzqB0)


<br>
<br>



#### Here are some "bonus features" but not required:
  1. Have one or more complex user interface modules such as a [modal](https://www.youtube.com/watch?v=R9aBDO5OsRw), carousel, drag and drop, a sticky nav, tooltips, etc
  2. Look into <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" target="_blank">localstorage</a> so you can save data to the user's browser 



<br>
<br>




### 📋 List of API's

Below is a non-exhaustive list of some free API's you can use. There are _many_ API's out there, however, so if you find one not on this list that you'd like to use, feel free! Please note that some may require signing up for an API key (e.g. the Marvel API).

  1. Super Hero API: <a href="https://superheroapi.com/" target="_blank">https://superheroapi.com/</a>
  2. Weather: <a href="https://openweathermap.org/api" target="_blank">https://openweathermap.org/api</a>
  3. News: <a href="https://newsapi.org/" target="_blank">https://newsapi.org/</a>
  4. Giphy: <a href="https://developers.giphy.com/">https://developers.giphy.com/</a>
  5. Pokemon: <a href="https://pokeapi.co/">https://pokeapi.co/</a>
  6. Card Deck: <a href="https://deckofcardsapi.com/" target="_blank">https://deckofcardsapi.com/</a>
  7. Google Books: <a href="https://developers.google.com/books/" target="_blank">https://developers.google.com/books/</a>
  8. City of Chicago: <a href="https://data.cityofchicago.org/" target="_blank">https://data.cityofchicago.org/</a>
  9.  Beer: <a href="https://www.brewerydb.com/developers" target="_blank">https://www.brewerydb.com/developers</a>
  10. Rick and Morty: <a href="https://rickandmortyapi.com/documentation/#rest" target="_blank">https://rickandmortyapi.com/documentation/#rest</a>
  11. Open Trivia DB: <a href="https://opentdb.com/" target="_blank">https://opentdb.com/</a>
  
Lastly, the following sites congregates a bunch of API's together, so you can take a look through their libraries and try to find an API that interests you! <br>Note, however, that not all API's are free and many listed may require payment. <br>We **highly suggest** to use a free API for your first project dealing with one. 

  1. <a href="https://github.com/toddmotto/public-apis" target="_blank">https://github.com/toddmotto/public-apis<a>
  1. <a href="https://rapidapi.com/" target="_blank">https://rapidapi.com/</a>
   

<br>
<br>



## Final Note on Selecting an API

Please be extremely thorough when finding an API you'd like to use for your project. In other words, please ensure you have properly vetted your API, by taking the time to read it's documentation and even "hitting a few endpoints". 

- practice some of the urls in the browser and make sure you can see the data
- make a practice ajax request see if you can console.log the data requested

Do this **BEFORE** you decide to seek instructor approval. 

This ensures you're taking the time to test the API and see how you can get it to respond with data and what that data looks like.

<br>
<br>



## Make A New Repo

You will be using GitHub, **not** GitHub Enterprise!

**Do not** begin your project within the class repo.

**Do not** clone your project into the class repo.

1. After your project has been approved, [make a new github repo for your project](https://help.github.com/articles/create-a-repo/). You will be deploying this project onto github pages, so you **must** name your repo `yourgithubusername.github.io` (for example, if my github username was octocat I would do: octocat.github.io)

![screenshot](https://i.imgur.com/bzBJdZ5.png)

From there, follow the instructions outlined by github themselves on [github.io](https://pages.github.com/)


**Extra: want your own domain name?**

You can also host your github pages with your own domain name.<br>[Here is a walkthrough from namecheap, one web hosting service](https://www.namecheap.com/support/knowledgebase/article.aspx/9645/2208/how-do-i-link-my-domain-to-github-pages)


<br>
<br>




## How to Submit Your Project
You will present your project and show your code to classmates and instructors.



<br>
<br>



## Where to go for help during project week
1. Seek out help online
2. Seek out help with your classmates
3. Seek out help with our class Instructor Associate 



<br>
<br>



## Suggested Ways to Get Started

* **Wireframe** Make a drawing of what your app will look like in all of its stages (what does it look like as soon as you log on to the site? What does it look like once data is retrieved?).

* **Break the project down into different components** (data, presentation, views, style, DOM manipulation) and brainstorm each component individually.

* **Commit early, commit often.** Don’t be afraid to break something because you can always go back in time to a previous version.

* **Consult documentation resources** (MDN, jQuery, etc.) at home to better understand what you’ll be getting into.

<br>
<br>



### Think about...

- **Creativity**  
Did you add a personal spin or creative element into your project submission? Did you deliver something of value to the end user?

- **Code Quality**  
Did you follow code style guidance and best practices covered in class, such as spacing, indentation, modularity, and semantic naming? <br>Did you comment your code as your instructors have in class?

- **Problem Solving**  
Are you able to defend why you implemented your solution in a certain way? <br> Can you demonstrate that you thought through alternative implementations?

<br>
<br>


## Example Project Functionality

Below is a very simple project idea using OMDB and jQuery, notice how functionality was emphasized over style? <br>**(please note, your project should include more styling than this):** 

![Example Project](https://i.imgur.com/L6hwHMR.gif)

Consider framing your project around a problem. For example, if I were to create an app similar to the one above, maybe the problem is my friends and I always have weekly movie nights and we're starting to run out of movies to watch. So, I thought about creating an app where I can search for movies and see their summaries. Or just thought about creating an app to help schedule the movie nights with what movie we'll be watching, etc. 


<br>
<br>


## Example README.md

Here's an example readme for inspiration:
![Example Readme](https://imgur.com/Xyu5ngf.png)

<br>
<br>


## Useful Resources

* **[MDN Javascript Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)**
* **[jQuery Docs](https://api.jquery.com)**
* **[GitHub Pages](https://pages.github.com)**
* **[Trello](trello.com)**

<hr>  
