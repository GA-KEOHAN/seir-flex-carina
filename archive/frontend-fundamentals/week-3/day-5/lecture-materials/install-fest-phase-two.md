---
track: "Frontend Fundamentals"
title: "Install-fest Phase Two"
week: 3
day: 5
type: "lecture"
---

# Install-fest Phase Two

For the Second phase of "install-fest", we'll install or verify the installation of the following tools on our machines:

- Node.js/npm & nodemon
- MongoDB
- Postman
- Heroku/Heroku CLI
- Robo3T (Robomongo) - (Optional)

<br>
<br>
<br>

**PLEASE NOTE:** ***if you have a linux machine, [here are some resources](/additional-resources/install-fest-linux) that might be more ideal for your computer***

<br>


## Node.js

Node is a JavaScript engine for the backend. We use it to power our web servers and connect to our databases.

`brew install node`

Verify the installation afterwards by running:

```shell
node -v
npm -v
```

The above commands should display versions without any errors. To verify that all the required permissions are set correctly, try to install a package such as the useful nodemon globally:

`npm install -g nodemon`

<br>
<br>
<br>


## Installing MongoDB
Install MongoDB using Homebrew using the following commands:

`brew tap mongodb/brew`

The above command might take a moment or two to complete. When finished, install MongoDB with:

`brew install mongodb-community`


<br>
<br>
<br>


### Starting the MongoDB Server
You start the Mongo database server with the following command:

`brew services start mongodb-community`

The above command also ensures that the MongoDB engine runs after restarting your computer.

More info about installing MongoDB using Homebrew can be found [here](https://github.com/mongodb/homebrew-brew).


<br>
<br>
<br>


## Installing Postman

Postman is a collaboration platform for API development. We can use it to design, build, and test APIs in conjunction with our teammates, and to support developer adoption.

We'll mostly use Postman to test API's in SEIR-Flex.

[Click here](https://www.postman.com/downloads/) to navigate to the download page for Postman.



<br>
<br>
<br>



## Heroku

**What is Heroku? ... the Website says it best!**

_Heroku is a platform as a service based on a managed container system, with integrated data services and a powerful ecosystem, for deploying and running modern apps. The Heroku developer experience is an app-centric approach for software delivery, integrated with today’s most popular developer tools and workflows_ **- Heroku.com**

[Click here](https://signup.heroku.com/t/platform?c=70130000000NZToAAO&gclid=EAIaIQobChMI1LzI6u6r6QIV8PfjBx0EFgqPEAAYASAAEgLo__D_BwE) to sign up for heroku!


<br>
<br>
<br>



### Installing the Heroku CLI
> The following instructions are sourced from devcenter.heroku.com

You must have node and npm installed already.

`npm install -g heroku`


### Verifying your installation
To verify your CLI installation, use the `heroku --version` command:

```shell
heroku --version
heroku/7.0.0 (darwin-x64) node-v8.0.0
```
You should see `heroku/x.y.z` in the output. 


### Getting started
After you install the CLI, run the heroku login command. 

You’ll be prompted to enter any key to go to your web browser to complete login. The CLI will then log you in automatically.

```shell
heroku login
heroku: Press any key to open up the browser to login or q to exit
 ›   Warning: If browser does not open, visit
 ›   https://cli-auth.heroku.com/auth/browser/***
heroku: Waiting for login...
Logging in... done
Logged in as me@example.com
```

If you’d prefer to stay in the CLI to enter your credentials, you may run heroku `login -i`.

```shell
heroku login -i
heroku: Enter your login credentials
Email: me@example.com
Password: ***************
Two-factor code: ********
Logged in as me@heroku.com
```

The CLI saves your email address and an API token to `~/.netr`c for future use. 

For more information, see [Heroku CLI Authentication](https://devcenter.heroku.com/articles/authentication).

Now you’re ready to create your first Heroku app! We'll learn how to do this later on in Unit 2!


<br>
<br>
<br>


## Robo 3T (Robomongo)

 Robo 3T is a visual tool helping you manage MongoDB Databases; some might refer to it as a GUI (Graphical User Interface). It is a part of free open source software supporting MacOS & Linux!

[Click here](https://robomongo.org/download) to navigate to the download page
