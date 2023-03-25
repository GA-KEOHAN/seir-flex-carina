<br>
Title: Passing Props<br>
Duration: 1hr+<br>
Creator:  Joe Keohan<br>

---

## Recreating WeatherForecast in React

In this exercise, you will practice creating reusable React Components.

Use the following [CodeSandbox Starter](https://codesandbox.io/s/adoring-goodall-mhive) code

#### React Hierarchy 

Here is the React Hierarchy you will be implementing:

<img src="https://i.imgur.com/7YlFsU7.png" width=500/><br>

#### Getting Started

In `src/index.html` you will find five weather elements that generate the output you are seeing now.

Perform the following to complete the lab:

**Creating The `WeatherForecast` Component**
* Look over the HTML structure used to create the weather icons
* Create a `WeatherForecast`  Component based on the HTML structure 
* Make sure to set the Component up to accept props and update the JSX to work with those props

**Rendering The `WeatherForecast` Component**
* Import the `WeatherForecast` Component into `App`
* Loop over the weatherData array data and create a `WeatherForecast` Component for each element passed
* In the loop pass the element the props it needs for `img`, `conditions` and `time`. 
* App will then render those `WeatherForecast` Components


**Bonus**
- Try creating the following additional Components:
  - WeatherIcon - contains only the img 
  - WeatherData - contains both the `conditions` and `time`

  If successful your React Hierarchy will now look like the following:

  <img src="https://i.imgur.com/ffkXBPi.png" width=600/>
