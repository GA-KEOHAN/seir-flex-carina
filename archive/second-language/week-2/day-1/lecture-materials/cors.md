---
track: "Second Language"
title: "CORS"
week: 2
day: 1
type: "lecture"
---



# &#x1F34E; CORS

You should have received this error message when getting your `localhost:3001` server to query your `localhost:3000` server:

![](https://i.imgur.com/jowW1st.png)

What's going on, here?

## same-origin policy

Browsers implement a security feature called **same-origin policy**. The idea is that Javascript requests to a server are rejected if they come from a different origin. AJAX requests can't make requests to other servers than the one they're coming from. **For security reasons, by default, Ajax requests must have the same origin as the server to which they are making requests.**

> An origin is the combination of port, protocol and host.

In Unit 3, your React was in the public folder of your Express app and therefore had the same origin, so no worries.

To allow the browser to make a request to a different origin, we have to tell the server to accept cross-origin requests.

## Cross-Origin Resource Sharing

> Cross-Origin Resource Sharing (CORS) is a technique for relaxing the same-origin policy, allowing Javascript on a web page to consume a REST API served from a different origin.
>
> [Understanding CORS](https://spring.io/understanding/CORS)

Any production API has to deal with the **same-origin policy** and enable CORS if a frontend server is to consume that API.

You might run into CORS issues when you try to consume a third-party API. Many projects have floundered because of third-party API CORS issues.

> Side note: If you run into CORS issues querying a third-party API in Express, look into the `request` module. `npm install request --save`

So even if your Rails data showed up in your frontend app, you are likely at some point with your deployments to run into a CORS issue. It's a standard internet security feature that everyone runs into with APIs.

<br>
<hr>

# &#x1F527; CONFIGURE RAILS FOR CORS

Let's tell Rails to send through that `Access-Control-Allow-Origin` header that our browser is freakin' out about.

* Uncomment the rack-cors gem in the Gemfile `gem 'rack-cors'` around line 28.

`Gemfile`

![](https://i.imgur.com/8WNSCuB.png)

[More on the rack-cors Gem](https://github.com/cyu/rack-cors)

* Run `bundle` on the command line to install the Gemfile gems

![](https://i.imgur.com/NgpDIoY.png)

In the file `config/initializers/cors.rb`

* Uncomment the code in `cors.rb` that begins with

`Rails.application.config.middleware.insert_before 0, Rack::Cors`

![](https://i.imgur.com/Fq9Fr6U.png)

The address after origins is a _whitelist_ of domains where requests are allowed to originate. We can add as many as we like, separated by commas.

Change origins to the address where your frontend requests will be coming from. In our case let's whitelist `localhost:3001` (or whatever default port Create React App is using)

![](https://i.imgur.com/ghxY51s.png)

We could whitelist

* the local version of the frontend end app
* a hosted version of your frontend app
* an 'admin' version of the frontend app that makes alterations to the db and block other apps from doing so
* everything at once using `*`.

For now let's keep all of the methods (:get, :post, :put, etc.). In the future, we might want to block apps from being able to alter the database in any way. In that case we would omit :post, :put, etc.


**IMPORTANT: RESTART THE SERVER**

The changes will not apply if the server does not restart


## MAKE AJAX REQUEST

In your frontend app, make the request to the backend app.

> In Chrome and other browsers, the origin will be 'remembered' even if you change the CORS settings in the backend app. To reset, empty the browser's cache.

You can to this on a `mac` by typing:
`shift + command + r`

The request should work:

![](https://i.imgur.com/bHMV4wJ.png)

The data will be in the **data** object (100 notices).

If it does not, you might have to start your browser with **same-origin policy** disabled:

`open -a Google\ Chrome --args --disable-web-security --user-data-dir`
