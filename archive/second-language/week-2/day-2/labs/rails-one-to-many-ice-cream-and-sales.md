---
track: "Second Language"
title: "Rails one to many: Ice Creams and Sales"
week: 2
day: 2
type: "lab"
---


# IceScript IceCreams



## &#x1F3B8; &#x1F3B6; &#x1F3A4; &#x1F469; &#x1F3B9; IT'S THE FINAL HOMEWORK &#x1F3B9; &#x1F3BC; &#x1F3B8; &#x1F3B8;


### RAILS ONE-TO-MANY: IceCreams & Sales

#### Back End
- Make the rails server work with resource for IceCreams
- Make Pints resource
- Edit Pints routes as nested resource
- Make foreign keys and associations
- Routing - use only and except to filter the routes
- change the controllers to relfect the changes we have made


#### Front End
- Make a Create React App that consumes the API
- The user should be able to see a graph of how many pints of a specific ice cream were sold over a 12 month period


##### Start Here

###### Rails new api
- rails new app (api only, database postgresql, and skip git)


###### Scaffold Ice Cream
- rails generate scaffold IceCream name description

###### Scaffold Pints
- rails generate scaffold Pints pints_sold:integer pints_made:integer profit_per_pint:decimal month

###### Create and Migrate the DB
- create and migrate the db

###### Seed the DB
- seed the db

###### Nest the resources
- `config/routes.rb` nest :pints inside ice_creams so that when you run `rails routes`

![](https://i.imgur.com/khemhL6.png)

###### Add Foreign Key
- generate a migration AddIceCreamIdToPints
- enter the migration file and add_column to :pints
- run migration

- `models/ice_cream.rb` add `has_many :pints`
- `models/pints.rb` add `belongs_to :ice_cream`

###### Add Data
```rb
IceCream.find(1).pints.create(pints_sold: 1000, pints_made: 2000, profit_per_pint: 0.5, month: 'January')
IceCream.find(1).pints.create(pints_sold: 220, pints_made: 200, profit_per_pint: 0.2, month: 'February')
IceCream.find(1).pints.create(pints_sold: 10, pints_made: 20, profit_per_pint: 0.1, month: 'March')
IceCream.find(1).pints.create(pints_sold: 210, pints_made: 20, profit_per_pint: 0.1, month: 'April')
IceCream.find(1).pints.create(pints_sold: 400, pints_made: 200, profit_per_pint: 0.2, month: 'May')
IceCream.find(1).pints.create(pints_sold: 1000, pints_made: 100, profit_per_pint: 0.5, month: 'June')
IceCream.find(1).pints.create(pints_sold: 5000, pints_made: 4000, profit_per_pint: 0.9, month: 'July')
IceCream.find(1).pints.create(pints_sold: 9000, pints_made: 5000, profit_per_pint: 0.9, month: 'August')
IceCream.find(1).pints.create(pints_sold: 1000, pints_made: 1000, profit_per_pint: 0.5, month: 'September')
IceCream.find(1).pints.create(pints_sold: 500, pints_made: 1000, profit_per_pint: 0.4, month: 'October')
IceCream.find(1).pints.create(pints_sold: 400, pints_made: 200, profit_per_pint: 0.3, month: 'November')
IceCream.find(1).pints.create(pints_sold: 100, pints_made: 200, profit_per_pint: 0.1, month: 'December')
IceCream.find(2).pints.create(pints_sold: 10000, pints_made: 20000, profit_per_pint: 1.5, month: 'January')
IceCream.find(2).pints.create(pints_sold: 9000, pints_made: 1000, profit_per_pint: 0.5, month: 'February')
IceCream.find(2).pints.create(pints_sold: 8000, pints_made: 4000, profit_per_pint: 0.5, month: 'March')
```

Test
- `Pint.where(ice_cream_id:1)`
- `Pint.where(ice_cream_id:2)`

###### Restrict Routes
- `config/routes.rb`
  - IceCreams should *only* have Index and Show
  - Pints should have everything *except* show

  ![](https://i.imgur.com/dEhUWm2.png)

###### Configure Controllers
  - Fix index controller to only show pints assoicated with an IceCream

  ```rb
  def index
  pints = Pint.where(ice_cream_id: params[:ice_cream_id])
  render json: pints
end
  ```

check:
```
http://localhost:3000/ice_creams/
```

```
http://localhost:3000/ice_creams/1/pints
```

and

```
http://localhost:3000/ice_creams/2/pints
```

<details><summary>hint</summary>

![](https://i.imgur.com/7SgwLWW.png)

</details>

Finally


```
http://localhost:3000/ice_creams/1
```
![](https://i.imgur.com/tNS8UbJ.png)

###### Create React App and Chart.js



- keep your rails app running open a new tab
`cd` up out of your rails app
- `npx create-react-app ice_cream_client`
- `cd ice_cream_client`
- `npm install chart.js`
- `touch .env` - set PORT to 3001
- `package.json` - add proxy
- configure cors in your rails app (add rack-cors in gemfile, run bundle, `config/initializers/cors.rb` - edit)
- `npm start`

- `mkdir src/components`
- `touch src/components/LineChart.js`
- import LineChart.js to App.js

- Make fetch to rails api `/ice_creams/1`

![](https://i.imgur.com/dKzV9xm.png)

###### In LineChart Component, make a chart!

- get the data,
- prepare the data (make a graph of pints_sold)
- create a chart


##### Champion! You Win!

![](https://i.imgur.com/dpuYtgz.png)


##### Hungry For More
 - style the graph with colors and other cool things
 - Show a list of ice creams
 - When you click on an ice cream it generates a chart for each ice cream (remember, we only added fully data for the first ice cream, and 1-3 data points for the second one, feel free to use rails console to make more, or postman, or psql)
- Show a graph of how many ice cream pints were made
- generate a bar graph of how much profit was made (pints_sold times profit_per_pint)
- We carefully entered the data so that the order matched the month, create logic that you can enter new datapoints of any month and sort them
- do not allow duplicate months to be entered
- create years and allow users to click through profits through the years
