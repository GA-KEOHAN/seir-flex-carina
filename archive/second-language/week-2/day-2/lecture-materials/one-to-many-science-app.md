---
track: "Second Language"
title: "ONE TO MANY - Science App"
week: 2
day: 2
type: "lecture"
---

# ONE TO MANY - Science App


## &#x1F52D; &#x1F4D0; ONE TO MANY - Science App &#x1F914; &#x1F4A1; &#x1F4A1; &#x1F4A1;

Let's build a relationship between models.

We are going to make an app to visualize data for **temperatures** that _belong to_ **locations**.

Each **location** will _have many_ **temperatures**

---
### Lesson objectives:

* scaffold two independent models
* set up a one-to-many relationship between the models
* use nested routes
* design the api endpoints

---

# SETUP

Create the top-level directory called `temperatures` that will house both our rails api and the frontend.

The app will have a **one-to-many** relationship between Locations and Temperatures. For each location we can log changes in the climate.

Create the Rails API:

```bash
$ rails new temperatures_api --api -d postgresql --skip-git
```

`cd` into the Rails directory and create the database.

<br>
<hr>

# Generate App

<!--SEI1 4:39 -->

Scaffold **Locations** with `lat` and `lng` as decimals, and also a `name` column.

<details><summary>Click for Full Command</summary>

```bash
$ rails g scaffold location lat:decimal lng:decimal name
```

</details>

Scaffold **Temperatures** with `average_high_f`
and `average_low_f` as integers and month as a string

<details><summary>Click for Full Command</summary>

```bash
$ rails g scaffold temperature average_high_f:integer average_low_f:integer month

```
</details>

This has added boilerplate files and code to

* `db/migrate`
* `app/models`
* `config/routes.rb`
* `app/controllers`

Check that the **migration files** are correct.

![](https://i.imgur.com/2byNjnP.png)

![](https://i.imgur.com/B8XKvIQ.png)

We have two fully-formed but independent resources: Locations and Temperatures. What we need to do next is **relate** them together.
<br>
<hr>

<!--SEI1 4:46 -->

# Add foreign key

**One-to-many relationship**

Let's generate a migration to add the foreign key for our **one-to-many** relationship.

If **Locations** have many **Temperatures**, and

A **Temperature** belongs to a **Location** ...

<details><summary>Which model should have the foreign key?</summary>

Answer: The foreign key always goes in the many. In this case there will be many temperatures. Each temperature will reference its single location via its foreign key.

</details>

**Locations table:**
![](https://i.imgur.com/iPDwBBA.png)

**Temperatures table:**
![](https://i.imgur.com/ZHZGdbq.png)

![](https://i.imgur.com/q3KqO1D.png)

Inside the migration we want to **add a column** that is a foreign key connecting to `temperatures` called `location_id` that is an `integer`.

<details><summary>Click for Migration Code</summary>

![](https://i.imgur.com/7vMizUm.png)

</details>

We have three migrations pending, let's run them and generate our schema.

**schema.rb**

![](https://i.imgur.com/dpVEaCI.png)

<br>
<hr>

# ActiveRecord Relations

<!--SEI1 5:06 --had to get somebody "back on the rails" which took 5-10 minutes-->

Now we need to clarify that the `Location` model `has_many` `:temperatures` and the `Temperature` model `belongs_to` `:location`.

<details><summary>Click for Model Code</summary>

**models/location.rb**

![](https://i.imgur.com/7DkIqsS.png)

**models/temperature.rb**

![](https://i.imgur.com/uEvVl9y.png)

Note Rails's plural / singular conventions.

</details>

<br>
<hr>

<!--SEI1 5:09 -->

# Seed data

Next, let's add some seed data:

**seeds.rb**

```
Location.create([
  { lat: 40.7128, lng: 74.0059, name: 'New York City' },
  { lat: 78.2232, lng: 15.6267, name: 'LongYearByen' }
])

Temperature.create([
  { average_high_f: 39, average_low_f: 26, month: 'January', location_id: 1 },
  { average_high_f: 42, average_low_f: 29, month: "February", location_id: 1 },
  { average_high_f: 50, average_low_f: 35, month: 'March', location_id: 1 },
  { average_high_f: 61, average_low_f: 45, month: 'April', location_id: 1 },
  { average_high_f: 71, average_low_f: 54, month: 'May', location_id: 1 },
  { average_high_f: 79, average_low_f: 64, month: 'June', location_id: 1 },
  { average_high_f: 84, average_low_f: 69, month: 'July', location_id: 1 },
  { average_high_f: 83, average_low_f: 68, month: 'August', location_id: 1 },
  { average_high_f: 75, average_low_f: 61, month: 'September', location_id: 1 },
  { average_high_f: 64, average_low_f: 50, month: 'October', location_id: 1 },
  { average_high_f: 54, average_low_f: 42, month: 'November', location_id: 1 },
  { average_high_f: 43, average_low_f: 48, month: 'December', location_id: 1 },
  { average_high_f: -6, average_low_f: -12, month: 'January', location_id: 2 },
])
```

Then run the seed file in Terminal.

<br>
<hr>

<!--SEI1 5:11 -->

# Rails console

Open the Rails console.

Use `ActiveRecord` to see all temperatures belonging to a location:

![](https://i.imgur.com/pPMz4CB.png)

Use `ActiveRecord` to see a temperature's associated location:

![](https://i.imgur.com/JpRLxlC.png)

<br>
<hr>

<!--SEI1 5:20 had to help someone with seeding-->

# &#x21A9; &#x1F690; &#x1F69B; ROUTES &#x1F6E3; &#x1F500; &#x21AA;

## Design considerations

What do you want your API to do?

**Locations**

* I don't want anyone to be able to add or edit locations on my API.

* I do want there to be a list of locations (index), and information for each location (show).

Therefore the only routes I need are **index** and **show** for Locations. In Express, this is easy, I just write them in and I'm done. In Rails, there is a more specific procedure.

#### Limit location routes _only_ to index and show

**config/routes.rb**

![](https://i.imgur.com/9S1AqeH.png)

**Temperatures**

* I want my API to send an index of temperature records associated with a location.

* I want my user to be able to add temperature data to the API for a given location.

All I need are **index** and **create** for Temperatures.

#### Limit temperature routes _only_ to index and create

**config/routes.rb**

![](https://i.imgur.com/2IKEv6T.png)

![](https://i.imgur.com/nkt52i8.png)

![](https://i.imgur.com/Y6rtmGY.png)

The _only_ keeps it nice and tidy.

<br>
<hr>

<!--SEI1 5:24 -->

# CONTROLLER ACTIONS

## Locations controller

We want only an **index** and a **show** for Locations. Let's remove everything else except the boilerplate `set_location` method, and edit the `before_action` call just to have `[:show]`:

![](https://i.imgur.com/zhBsWwz.png)

**Run the server with `rails s` and check out the index and show routes in the browser.**

<!--SEI1 5:32 -->

## Locations with related temperatures

### Locations show

Currently, our locations routes deliver data for locations, but there is no temperature data included.

Why not have our Locations show route also deliver the Temperatures for that location? It would be convenient for a front-end developer to query:

```
locations/1
```

And receive JSON for the location that includes the temperatures for that location:

![](https://i.imgur.com/Vb5Xs6E.png)

The frontend developer would get location data from `result` and temperatures with `result.temperatures`.

We can format our data this way with the `.to_json` method that takes a hash as an argument that we can use to include the temperatures.

```ruby
render json: @location.to_json(include: :temperatures)
```

![](https://i.imgur.com/A5d3Bf4.png)

<br>

<!--but why would we want this? an index should be a quick list, it seems like show is the only place we'd want temps

### Locations index

We can do the same for our Locations index if we want:

![](https://i.imgur.com/Jw4nmKk.png)

We get an array of locations, each with related temperatures data.

-->

<br>
<hr>

## Temperatures controller

We want to have an **index** and a **create** in our `temperature` routes. Let's remove everything else. Remove the `before_action` call and the `set_temperature` method, too, since we won't be needing them.

![](https://i.imgur.com/JVoAF85.png)

### Temperatures create

# BRAIN BUSTER

When we create a Temperature:

* Do we want a Temperature to exist without belonging to a Location?

* At which point do we associate a Temperature with a Location?

* Where would the Location even come from?

# FIRST PART OF THE ANSWER

We want the location to come in from a param. The user will decide which location when they make the request to the server.

A hypothetical request from the client-side would look like:

```javascript
fetch('/locations/1/temperatures', {
	method: 'POST',
	data: this.formdata
})
```

The user wants a temperature added for location `1`.

In Express this location id would come in as `req.params.id`.

How do we get it in Rails? There is no params hash in `rails routes` for our temperatures#create action.

# SECOND PART OF THE ANSWER

### Nested routes

To resolve this issue, we will **nest** our create action inside the `locations` routes:

```ruby
Rails.application.routes.draw do
  resources :temperatures, only: [:index]
  resources :locations, only: [:index, :show] do
    resources :temperatures, only: [:create]
  end
end
```

When we run `rails routes`, we will get this:

```bash
               Prefix Verb URI Pattern                                    Controller#Action
         temperatures GET  /temperatures(.:format)                        temperatures#index
location_temperatures POST /locations/:location_id/temperatures(.:format) temperatures#create
            locations GET  /locations(.:format)                           locations#index
             location GET  /locations/:id(.:format)                       locations#show
```

<!--SEI1 5:46 -->

Our create action URI has changed to reflect that we are creating a Temperature only in relation to a Location. The param we receive is **location_id**.

We will want to add the incoming `location_id` to our new temperature record:

```ruby
@temperature.location_id = params[:location_id]
```

Finally, we will remove `location: @temperature`, because it will try to force a redirect and may give us errors in Postman if it stays.

![](https://i.imgur.com/KYTWXYR.png)

**temperatures_controller.rb**

![](https://i.imgur.com/0LhS7m4.png)

 * Here we create a new Temperature using `temperature_params`
 * On the new temperature, we set the id column to the `location_id` from the url
 * If save is successful, we send a 201
 * If unsuccessful, we send a 422

<br>

## TEST CREATE ROUTE WITH POSTMAN

![](https://i.imgur.com/AFrC64b.png)

We want to send the following temperature object to the API:

`{ average_high_f: 46, average_low_f: 39, month: 'January' location_id: 2 }`

How would we write this as `form-data` in a Postman request?

We will add this new temperature record for location 2.

`POST http://localhost:3000/locations/2/temperatures`

<details><summary>Successful Postman Request</summary>

![](https://i.imgur.com/qeg3dNf.png)

Note that the temperature was saved with a `location_id` as intended.

</details>

**Location 2 in the browser should now have the new temperature:**

![](https://i.imgur.com/HNtmSWz.png)

<!--But again, why? This seems unnecessary

**Temperatures index in the browser has the new temperature:**

![](https://i.imgur.com/qt0d7p0.png)

-->

### Under the hood: params hash again

Whenever we make a CREATE request with Postman, we should see the following in the Terminal tab running `rails s`:

![](https://i.imgur.com/sKDIr4N.png)

This is like the `request object` in Express.

Our `req.body` is within `temperature`, and our `req.params` is within `location_id`. That's just the way Rails formats it. Body and params go into the **params** hash.

<br>
<hr>
License
<hr>

<!--SEI1 6:02 -->
	
