---
track: "Full-Stack Development"
title: "Mongoose Flights - Part 1"
week: 1
day: 4
type: "lab"
---

# Mongoose "Flights" Lab - Part 1



<br>
<br>
<br>

<iframe width="560" height="315" src="https://www.youtube.com/embed/mjzeQsHbbkE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br>
<br>
<br>



## Intro

Today in the Intro to Mongoose lesson you Created and Read documents using a `Movie` Model

In this lab, you'll do the same, except you'll create and use a `Flight` model

Similar to what we did in the lesson, you'll start by creating a `mongoose-flights` project

FYI, future lessons will expand upon the `mongoose-movies` project, and the labs will expand upon the `mongoose-flights` project!

<br>
<br>
<br>



#### The final version of `mongoose-flights` will be a deliverable, so do each part so you don't fall behind.

<br>
<br>




## Exercises

1. Create a new folder for this lab called `mongoose-flights` and initialize a git repo inside of it
2. Create a seperate remote for this repo on Github Enterprise to push your commits for this assignment; you will need to send us a URL to your remote when you're ready to turn this assignment in for feedback
3. Create your `package.json` and `server.js`
4. Create all your basic folders to get started; just as we've done with every express projects ... i.e. `models`, `routes`, `controllers`, and `views` -- prepare to create additional files (modules) inside of these folders
5. Create a **config/database.js** module inside your project that connects to a database named `flights` -- Be sure to require the module in **server.js**

6. Create a `Flight` Model with the following properties:

	| Property | Type | Validations | Default Value |
	|---|---|---|---|
	| `airline`| `String`| `enum` to include 'American', 'Southwest' & 'United' | n/a | 
	| `flightNo`| `Number`| Required<br>Between `10` and `9999` | n/a | 
	| `departs`| `Date`| n/a | One year from date created | 

4. Implement the following User Stories **(_"As A User"_ == AAU)**:
	- AAU, I want to view a list of all flights (index view) that displays each flight's airline, flight no., and departure date/time
	
	- AAU, I want to create flights by entering the information on a page (new view) that has a form and submitting it

<br>
<br>



#### Hints:

- Checkout the [`<input type="datetime-local">`
](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local) to assist users in entering valid date/time values

<br>
<br>
<br>




## Bonuses

1. Display the default departure date when displaying the new flight form 
	
	**Hints:**

1. In the flight controller's `new` action, you could create an in-memory flight like this:<br>`var newFlight = new Flight();`<br>  This in-memory flight doc would have the default departure date set properly based on the logic in the function you assigned to `default`.

2. Just like any other data you want to access/display in a view template, that data needs to be passed by the controller action when it calls `res.render`, however…

3. Although an input of type="datetime-local" will display a date assigned to its value attribute, that date value needs to be formatted as a string matching this format: yyyy-MM-ddThh:mm (yes, a “T” character is used to separate the date portion from the time portion). One way of obtaining the properly formatted string is to use the toISOString() method and use slice() to return only the first 16 characters, for example:

```javascript
	const newFlight = new Flight();
	// Obtain the default date
	const dt = newFlight.departs;
	// Format the date for the value attribute of the input
	const departsDate = dt.toISOString().slice(0, 16);
	res.render('flights/new', {departsDate});
```


1. Code these additional User Stories:
	- AAU, I want to be able to access each view via a navigation bar at the top of the page with links to:
		- `ALL FLIGHTS`, and
		- `ADD FLIGHT`
	
	- AAU, I want to view the list of flights by departure date in ascending order.
	
	- AAU, I want the flights in the list to be displayed using red text if the flight's departure date has passed.

3. Style the `index` and `new` views.

