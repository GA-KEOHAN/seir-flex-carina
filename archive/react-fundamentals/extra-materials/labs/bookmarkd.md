---
track: "React Fundamentals"
title: "Bookmark'd"
week: 2
day: 1
type: "lab"
---



# Bookmark'd 

![](https://fthmb.tqn.com/N8UHZxApLqho5sUDbpSRyEy1tV8=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/Bookmarks-56d0cca45f9b5879cc7123a4.jpg)

Your goal for this week's homework is to build a bookmark app that lets users add a title and a link to save websites in one neat list.

#### Prerequisites

- Git
- JavaScript
- Node / Express
- Mongo / Mongoose
- React

---

## The Bookmarks App

You will be building an app that lets users add a title and a link to save websites in one neat list. When users click on a title, it should take them to the linked website. 

> :exclamation: GOTCHA - when testing it out, note that your links must start with http or https or else it will error!

_Example:_

![](https://i.imgur.com/yq9Ygeu.png)

✨ Fun Fact: This homework was inspired by a coding challenge used during a company's hiring process. So, treat it like you're trying to get that job!

## MVP 

Listed below is the basic required functionality that your Bookmark'd app should have. Some of the user stories are purposefully ambiguous to allow you all to ‘solve’ the problems in a way that is intuitive and makes sense to you, as opposed to just checking off specific steps from homework. 

#### Express API
  - You should have a model for bookmarks that has the following schema:
      ```
      title: string
      url: string
       ```
   - You should have routes for...
      - Index: Getting all bookmarks
      - Create: Posting a new bookmark
      - Delete: Deleting a bookmark
      - Update: Updating a bookmark
      - **Make sure you TEST ALL ROUTES with postman or CURL BEFORE you move onto creating the frontend!** 

#### React Frontend User Stories
  - As a user, I can see a list of all my bookmarks when I visit the page
  - As a user, I can click on one of my bookmarks and have it take me to the linked website
  - As a user, I can create a new bookmark and see that it immediately loads on the page so that I know I successfully added a bookmark
  - As a user, I can delete a bookmark so I can keep my list relevant
  - As a user, I can update a bookmark in case I made a typo or the URL changed

#### Additional Requirements
- Your app must have styling! If you're maxing out on your 4 hours per night, spend 10 minutes adding some basic styling just so we know you know how, and leave a note in your git issue. If you're not maxing out on your 4 hours per night, you app should have portfolio quality styling or basic styling and H4M attempts. 

:red_circle: **Remember to commit often!**
Because your workflow & the way you decide to tackle finishing this app is up to you, it's also up to you what you commit! Commit often and write helpful commit messages. 

## Need Some Guidance?

While we suggest just trying to build off the user stories and specifications given above, it can be hard to know where to get started! So provided below are some slightly more guided steps to get you started.

  <details>
   <summary><strong>Start with the back end</strong></summary>

   - Create an express app
     - what npm packages do you need?
   - Connect it to mongo with mongoose
   - Create a schema that has the following
      ```
      title: string
      url: string ( remember: the links must start with http/https )
      ```
   - Create the routes (full CRUD)
   - Test the routes using Postman (or using cURL)
  </details>

   <details>
   <summary><strong>Move on to the front end</strong></summary>

   - Your front end should display:
      - An index of a clickable list of the title of each bookmark that takes you to the url of your bookmark
      - A working form to add a new record to the database.
        - When the data is submitted and processed, the page should immediately reflect the changes

  </details>

## Hungry for More?

  - Make a searchbox that will filter the bookmark titles
  - Order the bookmarks alphabetically by title using mongoose or react
  - Make it so that the form clears after submit
  - Add an array of tags to the schema so you can organize your bookmarks by tags
  - As a user, I should not be able to add a duplicate bookmark so I can keep my list clean
  - Add some authorization to your app. Some possible user stories you can try:
      - As a user, I can only use the app if I am logged in
      - As a user, I can see everyone's bookmarks
      - As a user, I can only update/delete my own bookmarks

---

## Deliverables

A completed bookmarks app that meets all the MVP requirements outlined above by the dates below.

## Submission Guidelines 

This assignment is due Friday @10am ET.

- **READ and CREATE should be completed by Tuesday @ 10am ET**. If you want or need feedback on this part of the assignment, create a git issue and submit it. If this part of the assignment is working 100% and you don't want feedback, do not create a git issue yet.
- **UPDATE and DELETE should be completed by Wednesday @ 10am ET** On Tueaday, you will have an addition assignment. Schedule accordingly. Again, if you want feedback on any of this, feel free to create a git issue. If it's working 100% and you don't want feedback, do not create a git issue yet.
- **Authentication and the final app submission is due Friday @10am ET** Everyone must create a git issue. 

## Technical Requirements

1. Your app (both back and frontend) MUST run without syntax errors. If there are errors you can't solve, comment them out and leave a comment above explaining what is wrong
  

