---
track: "Second Language"
title: "One to Many Relationships (Frontend)"
week: 2
day: 3
type: "lecture"
---


# One to Many Relationships (Frontend)

Now, let's make the front-end for our Temperatures app.

<br>
<br>
<br>

## Roadmap

<!-- At the end of this lesson, students will be able to: -->

* Display all of a single location's **average high temperatures** on a chart.
* Interact with our Rails API
* Use **fetch** for AJAX requests
* Configure CORS
* Make a line graph with `Chart.js`

This is the final product we're shooting for:

**Temperatures for Location 1**
![screenshot](https://i.imgur.com/OC4GolP.png)


<br>
<br>
<br>

### Setup

Make our Frontend app.

In the top-level `temperatures`
- `npx create-react-app temperatures_client`
- `cd temperatures_client`
- Open with VS Code `code .`
- `touch .env`
    - inside `.env` type `PORT=3001` (set default port to always be 3001, since rails default port is 3000 - notice: no spaces, no quotes, port is all caps) - _You can also do this with one command like this: `echo 'PORT=3001' > .env`_
    - ![screenshot](https://i.imgur.com/9sgKZDq.png)
- in `package.json` set `proxy` to be `http://localhost:3000`
    - ![screenshot](https://i.imgur.com/f6o4zfB.png)
- install chart.js
  - `npm install chart.js`
  - `mkdir src/components`
  - `touch src/components/BarChart.js`
- Get your Dev Server started with `npm start`


<br>
<br>
<br>


**BarChart.js**

```js
import Chart from 'chart.js';

function BarChart() {
    return (
      <>
        <h1>Temperatures</h1>
        <canvas id="temperatures" width="300" height="100"></canvas>
      </>
    );
}


export default BarChart;
```



<br>
<br>
<br>

**App.js**

```js
import BarChart from './components/BarChart.js';
import './App.css';

function App() {
    return (
      <div className="App">
        <BarChart />
      </div>
    );
}


export default App;
```


<br>
<br>
<br>

### Fetch

Using Chrome's **fetch** command we can make AJAX requests with 'vanilla' javaScript instead of importing some framework or library to do so.

[Great article on using Fetch](https://css-tricks.com/using-fetch/)

Let's get all of our locations from our Rails API.

Make an AJAX request to get locations in `BarChart.js`:

```javascript
// make sure we import the useEffect hook from react
import { useEffect } from 'react';
```

```javascript


// Make the AJAX request using helper function below once the component mounts to the DOM
useEffect(() => {
  getAppData();
});


// Define a helper for making our AJAX request
function getAppData() {
  fetch('/locations')                                        
    .then(response => response.json())                                            
    .then(data => console.log(data))                                              
    .catch(err => console.log(err)) ; 
}

```

<br>
<br>
<br>


If you get this...

![screenshot](https://i.imgur.com/k7dxkEa.png)

...then restart rails (control c and `rails s`) and restart create react app (control c and `npm start`).

We may get our single-origin policy obstruction. (And if we don't, we would definitely get it when we deploy to production.)

![screenshot](https://i.imgur.com/GzmHqb3.png)


<br>
<br>
<br>


### CORS

Switch over to `temperatures_api` for the next couple steps.

Uncomment rack-cors in `Gemfile`:

![screenshot](https://i.imgur.com/mzc0HBi.png)

Run `bundle`.

Allow all origins in `config/initializers/cors.rb`

![screenshot](https://i.imgur.com/aXEXx9E.png)

<br>
<br>
<br>


**Restart the Rails server.**

>**Note:** When you deploy your projects to production, make sure you are not allowing all origins as we are above.  You should only allow traffic from your local server and your production front-end (e.g. GitHub Pages).

<br>
<br>
<br>


### Configure Fetch

Now, switch back to `temperatures_client`.

Let's change our `fetch` to get a **single location** and also to console.log it. We want a single location so that we can display a chart of climate data just for that location.

Change the URL to get `/locations/1`:

In the developer console, you should see something like this:

![screenshot](https://i.imgur.com/N9oPpus.png)

**fetch** worked! We received location 1 along with that location's temperatures.

<br>
<br>
<br>


### Chart.JS

We want to display a chart that graphs all the average high temperatures for a given location.

`Chart.js` is a library that renders charts using HTML5's [Canvas](http://www.w3schools.com/html/html5_canvas.asp) capability.

[Here's a Canvas tutorial if you want to learn more another day](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial).

`Chart.js` can do all the heavy lifting with Canvas. All we have to do is plug in some data.

[Chart.js documentation](http://www.chartjs.org/docs/#getting-started)

We already put a `canvas` element in our `BarChart` component:

`<canvas id="temperatures" width="300" height="100"></canvas>`

Now let's bring in our data:


```javascript

useEffect(() => {
  getAppData();
});


function getAppData() {
  fetch('/locations/1')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err)); 
}

```

We'll want to prepare our data. Currently our data isn't arranged to go into our bar chart. We could always look up how to make the correctly shaped object in the chart.js docs, but for now let's trust that the code below will do the trick.

Our data object at minimum should have two arrays:

* labels - for the x axis
* datasets - for the y axis



```javascript
function getAppData() {
  fetch('/locations/1')
    .then(response => response.json())
    .then(data => prepareData(data))
    .catch(err => console.log(err));
}

function prepareData(data) {
	const chartData = {
		labels: [],
		datasets: [
			{
				label: 'Avg high temps',
				data: []
			}
		]
	};

	data.temperatures.forEach(temperature => {
		chartData.labels.push(temperature.month)
		chartData.datasets[0].data.push(temperature.average_high_f)
	});
	return chartData;
}
```
<br>
<br>
<br>


* Instantiate a new Chart object. The Chart constructor takes the canvas context and an options object as arguments.


```javascript

useEffect(() => {
  getAppData();
});

function getAppData() {
  fetch('/locations/1')
    .then(response => response.json())
    .then(data => prepareData(data))
    .then(preparedData => createChart(preparedData))
    .catch(err => console.log(err));
}

function prepareData(data) {
	const chartData = {
		labels: [],
		datasets: [
			{
				label: 'Avg high temps',
				data: []
			}
		]
	};

	data.temperatures.forEach(temperature => {
		chartData.labels.push(temperature.month)
		chartData.datasets[0].data.push(temperature.average_high_f)
	});
	return chartData;
}

function createChart(data) {
  const ctx = document.getElementById('temperatures');
  new Chart(ctx, {
    type: 'line',
    data
  });
}


```

If it's working, we should see something like the chart below:

![screenshot](https://i.imgur.com/ndle1zg.png)

All the code:

```js
import { useEffect } from 'react';
import Chart from 'chart.js';

function BarChart() {

  useEffect(() => {
     getAppData();
  });

  function getAppData() {
    fetch('/locations/1')
      .then(response => response.json())
      .then(data => prepareData(data))
      .then(preparedData => createChart(preparedData))
      .catch(error => console.log(error));
  }
  
  function prepareData(data) {
    const chartData = {
        labels: [],
        datasets: [
            {
                label: 'Avg high temps',
                data: []
            },
            {
              label: 'Avg low temps',
              data:[]
            }
        ]
    };

    data.temperatures.forEach(temperature => {
        chartData.labels.push(temperature.month)
        chartData.datasets[0].data.push(temperature.average_high_f)
    });
    return chartData;
  }
  
  function createChart(data) {
      const ctx = document.getElementById('temperatures')
      new Chart(ctx, {
          type: 'line',
          data,
      });
  }
    return (
      <>
        <h1>Temperatures</h1>
        <canvas id="temperatures" width="300" height="100"></canvas>
      </>
    );
}

export default BarChart;
```

<br>
<br>
<br>


### Second dataset

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
  data.temperatures.forEach(temperature => {
    chartData.labels.push(temperature.month);
    chartData.datasets[0].data.push(temperature.average_high_f);
    chartData.datasets[1].data.push(temperature.average_low_f);
  });
```

Possible Result:

![screenshot](https://i.imgur.com/nDipjm9.png)

<br>
<br>
<br>

### Datasets options

Each 'datasets' object can have more options than just `label` and `data`. You can choose how to display each dataset. And as you might have guessed, you can have more than one dataset on a chart.

Try hardcoding each one of these into your chartData options separately and seeing the results

Example:

![screenshot](https://i.imgur.com/sD21kGI.png)

Result:

![screenshot](https://i.imgur.com/C71r4FA.png)
<br>
<br>
<br>


### Change the chart type

Bar chart

![screenshot](https://i.imgur.com/xD2IKNJ.png)

Result:

![screenshot](https://i.imgur.com/FSnnmBW.png)

<br>
<br>
<br>

### Chart options

Here are some advanced chart options for reference:

```javascript
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
};
```


<br>
<br>
<br>


### Bonus

- Create a form that lets us POST new temperatures to `/locations/1`
- Have the chart update after the POST request

<br>
<br>
<br>

### Other things our app could do:

* show all of a location's data on a single chart
* have separate charts for each dataset
* display the location in Google Maps using lat and lng
* have an index of selectable locations
* use React Router to tab between charts
* use React Router to tab between locations

