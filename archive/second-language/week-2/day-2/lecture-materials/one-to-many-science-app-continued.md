---
track: "Second Language"
title: "Science App Continued"
week: 2
day: 2
type: "lecture"
---

# &#x1F52D; &#x1F4D0; Science App Continued &#x1F914; &#x1F4A1; &#x1F4A1; &#x1F4A1;

Now, let's make the front-end for our Temperatures app.



### OUR GOAL IS TO:

* Interact with our Rails API
* Display all of a single location's **average high temperatures** on a chart.

### Lesson objectives

At the end of this lesson, students will be able to:

* Use **fetch** for AJAX requests
* Configure CORS
* Make a line graph with `Chart.js`

This is the final product we're shooting for:

**Temperatures for Location 1**
![](https://i.imgur.com/OC4GolP.png)
---

# SETUP

Make our Frontend server.

In the top-level `temperatures`
- `create-react-app temperatures_client`
- `cd temperatures_client`
- `touch .env`
    - insisde `.env` type `PORT=3001` (set default port to always be 3001, since rails default port is 3000 - notice: no spaces, no quotes, port is all caps)
    - ![](https://i.imgur.com/9sgKZDq.png)
- in `package.json` set `proxy` to be `http://localhost:3000`
    - ![](https://i.imgur.com/f6o4zfB.png)
- install chart.js
  - `yarn add chart.js`
  - `mkdir src/components`
  - `touch src/components/BarChart.js`

<!--SEI1 4:50  -->

**BarChart.js**

```js
import React, {useEffect } from 'react';
import Chart from 'chart.js'

const BarChart = () => {
	return (
	  <>
	    <h1>Temperatures</h1>
	    <canvas id="temperatures" width="300" height="100"></canvas>
	  </>
	)
}

export default BarChart
```

<!--SEI1 5:03 -->

**App.js**

```js
import React from "react";
import BarChart from "./components/BarChart.js";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <BarChart />
    </div>
  );
};

export default App;
```

# FETCH

Using Chrome's **fetch** command we can make AJAX requests with 'vanilla' javaScript instead of importing some framework or library to do so.

[Great article on using Fetch](https://css-tricks.com/using-fetch/)

Let's get all of our locations from our Rails API.

Make an AJAX request to get locations in `App.js`:

```javascript
const getData = () => {
  fetch('/locations')                                        
    .then(response => response.json())                                            
    .then(json => console.log(json))                                              
    .catch(err => console.log(err))  
}

getData();
```

If you get this...

![](https://i.imgur.com/k7dxkEa.png)

...then restart rails (control c and `rails s`) and restart create react app (control c and `yarn
start`).

We may get our single-origin policy obstruction. (And if we don't, we would definitely get it when we deploy to production.)

![](https://i.imgur.com/GzmHqb3.png)

<!--SEI1 5:15 -->

# CORS

Switch over to `temperatures_api` for the next couple steps.

Uncomment rack-cors in `Gemfile`:

![](https://i.imgur.com/mzc0HBi.png)

Run `bundle`.

Allow all origins in `config/initializers/cors.rb`

![](https://i.imgur.com/aXEXx9E.png)

**Restart the Rails server.**

>**Note:** When you deploy your projects to production, make sure you are not allowing all origins as we are above.  You should only allow traffic from your local server and your production front-end (e.g. GitHub Pages).

<br>

# CONFIGURE FETCH

Now, switch back to `temperatures_client`.

Let's change our `fetch` to get a **single location** and also to console.log it. We want a single location so that we can display a chart of climate data just for that location.

Change the URL to get `/locations/1`:

In the developer console, you should see something like this:

![](https://i.imgur.com/N9oPpus.png)

**fetch** worked! We received location 1 along with that location's temperatures.

<br>

# CHART.JS

We want to display a chart that graphs all the average high temperatures for a given location.

`Chart.js` is a library that renders charts using HTML5's [Canvas](http://www.w3schools.com/html/html5_canvas.asp) capability.

[Here's a Canvas tutorial if you want to learn more another day](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial).

`Chart.js` can do all the heavy lifting with Canvas. All we have to do is plug in some data.

[Chart.js documentation](http://www.chartjs.org/docs/#getting-started)

We already put a `canvas` element in our `BarChart` component:

`<canvas id="temperatures" width="300" height="100"></canvas>`

Now let's bring in our data:

```js
const getData = () => {
  fetch('/locations/1')
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log(err))
}

useEffect(() => {
	getData();
}, []);
```

We'll want to prepare our data. Currently our data isn't arranged to go into our bar chart. We could always look up how to make the correctly shaped object in the chart.js docs, but for now let's trust that the code below will do the trick.

Our data object at minimum should have two arrays:

* labels - for the x axis
* datasets - for the y axis

```js
const prepareData = (data) => {
	const chartData = {
		labels: [],
		datasets: [
			{
				label: 'Avg high temps',
				data: []
			}
		]
	}

	data.temperatures.forEach(temperature => {
		chartData.labels.push(temperature.month)
		chartData.datasets[0].data.push(temperature.average_high_f)
	})
	return chartData
}

const getData = () => {
	fetch("/locations/1")
	  .then((response) => response.json())
	  .then((jData) => prepareData(jData))
	  .catch((err) => console.log(err));
};
```

* Instantiate a new Chart object. The Chart constructor takes the canvas context and an options object as arguments.

```js
const getData = () => {
  fetch("/locations/1")
    .then((response) => response.json())
    .then((jData) => prepareData(jData))
    .then((data) => createChart(data))
    .catch((err) => console.log(err));
};

// ...further down ...
const createChart = (data) => {
  const ctx = document.querySelector("#temperatures");
  const tempsChart = new Chart(ctx, {
    type: "line",
    data: data,
  });
};
```

If it's working, we should see something like the chart below:

![](https://i.imgur.com/ndle1zg.png)

All the code:

```js
import React, { useEffect } from "react";
import Chart from "chart.js";

const BarChart = () => {
	const prepareData = (data) => {
		const chartData = {
			labels: [],
			datasets: [
				{
					label: 'Avg high temps',
					data: []
				}
			]
		}
	
		data.temperatures.forEach(temperature => {
			chartData.labels.push(temperature.month)
			chartData.datasets[0].data.push(temperature.average_high_f)
		})
		return chartData
	};

  const createChart = (data) => {
    const ctx = document.querySelector("#temperatures");
    const tempsChart = new Chart(ctx, {
      type: "line",
      data: data,
    });
  };

  const getData = () => {
    fetch("/locations/1")
      .then((response) => response.json())
      .then((jData) => prepareData(jData))
      .then((data) => createChart(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1>Temperatures</h1>
      <canvas id="temperatures" width="300" height="100"></canvas>
    </>
  );
};

export default BarChart;
```

<!--SEI1 5:48 -->

## Second dataset

Add in a second dataset for `Avg low temps`.
We'll push in the `average_low_f` data.

```javascript
  const chartData = {
  	labels: [],
  	datasets: [
  		{
  			label: 'Avg high temps',
  			data: []
  		},
  		{
  			label: 'Avg low temps',
  			data: []
  		}
  	]
  };
```

Push in the low temps:

```javascript
  json.temperatures.forEach((temperature) => {
    chartData.labels.push(temperature.month);
    chartData.datasets[0].data.push(temperature.average_high_f);
    chartData.datasets[1].data.push(temperature.average_low_f);
  });
```

Possible Result:

![](https://i.imgur.com/nDipjm9.png)

<br>
<hr>

## Datasets options

Each 'datasets' object can have more options than just `label` and `data`. You can choose how to display each dataset. And as you might have guessed, you can have more than one dataset on a chart.

Try hardcoding each one of these into your chartData options separately and seeing the results

Example:

![](https://i.imgur.com/sD21kGI.png)

Result:

![](https://i.imgur.com/C71r4FA.png)

## Change the chart type

Bar chart

![](https://i.imgur.com/xD2IKNJ.png)

Result:

![](https://i.imgur.com/FSnnmBW.png)

## Chart options

Here are some advanced chart options for reference:

```
const chartData = {
    labels: [],
    datasets: [
        {
            label: 'Avg high temps',
            data: [],
            fill: false,
            lineTension: 0,

            backgroundColor: "rgba(192, 77,77,.5)",
            borderColor: "rgba(192, 77,77,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(192, 77,77,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(192,77,77,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            spanGaps: false,
        },
        {
          label: 'Avg low temps',
          data:[],
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          spanGaps: false,
        }
    ]
}
```


<br>
<hr>

## Bonus

- Create a form that lets us POST new temperatures to `/locations/1`
- Have the chart update after the POST request

## Other things our app could do:

* show all of a location's data on a single chart
* have separate charts for each dataset
* display the location in Google Maps using lat and lng
* have an index of selectable locations
* use React Router to tab between charts
* use React Router to tab between locations

<br>
<hr>
<hr>
License
<hr>


