---
track: "Second Language"
title: "Bonus Lecture on Rails and JWT"
week: 2
day: 3
type: "lecture"
---


# Rails 5+ API Authentication


Restrict access to your Rails API unless a user provides a JSON Web Token generated by the server.

Rails API does not store a 'session' server-side. Sessions aren't really what APIs are about: they just serve information, setting restrictions with API keys.

Instead of storing the 'session' on the server, we will store it in the browser. However, the server will need to generate some kind of secret message to trade with the browser so we can pair them up. For the secret message we will trade between server and browser, we will use a JSON Web Token which is an encrypted piece of JSON data.

* How it would work with a front-end

![](https://i.imgur.com/hZcoOia.png)

This lesson is for JWT on the backend only. You will need to store this JWT on the front end in `localStorage`.

<br>
<hr>

## Setting up Rails to create a User with hashed password

Let's create a sandbox project for testing. (Create this outside of any existing repos).

```bash
rails new auth_test_api --api -d postgresql
```

![](https://i.imgur.com/nJzHECx.png)

Create a user with two columns:

* `username` and
* `password_digest`

```bash
rails g scaffold user username password_digest
```

![](https://i.imgur.com/gI8fIbG.png)

Let's use an [Active Model method](http://api.rubyonrails.org/classes/ActiveModel/SecurePassword/ClassMethods.html) `has_secure_password` in our user model to "to set and authenticate against a BCrypt password".

> app/models/user.rb

```ruby
class User < ApplicationRecord                                                     
  has_secure_password                                                                
end  
```

![](https://i.imgur.com/CgVseg8.png)

To use `has_secure_password`, we must have provided the `password_digest` column and included the `bcrypt gem` (we will do this next).

![](https://i.imgur.com/2F7QnwE.png)

Uncomment the bcrypt line in the Gemfile.

> Gemfile

```
gem 'bcrypt', '~> 3.1.7'
```

![](https://i.imgur.com/hKBD5XU.png)

```bash
bundle
```

Create the database and migrate the users database.

```bash
rails db:create
rails db:migrate
```

Schema:

> db/schema.rb

```ruby
ActiveRecord::Schema.define(version: 2018_01_13_000311) do                         

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"                                                       

  create_table "users", force: :cascade do |t|                                     
    t.string "username"                                                            
    t.string "password_digest"                                                     
    t.datetime "created_at", null: false                                           
    t.datetime "updated_at", null: false                                           
  end                                                                              

end
```

![](https://i.imgur.com/lKEqwD9.png)

Now that our user resource has been created, we can begin to create some users.

<br>
<hr>

# SIGN UP

Test User in rails console - password is hashed for us when we create a user.

**Create a user**

Even though we called our password column `password_digest` when we created the user table, we **never** directly enter anything into a column called `password_digest`. Instead, we enter our passwords into a column called `password` as we are already used to doing:

```ruby
user = User.new( username: 'Thomas', password: 'Thomas')
```

![](https://i.imgur.com/y0ZcIGk.png)

You can see that the hashed password was saved in `password_digest`. Again, we never directly add a password here, instead passing it to **password**.

Save the user.

```ruby
user.save
```

![](https://i.imgur.com/2ac7bC4.png)

[has secure password validation](http://api.rubyonrails.org/classes/ActiveModel/SecurePassword/ClassMethods.html#method-i-has_secure_password)

Documentation

![](https://i.imgur.com/5COikd7.png)

Great, we successfully created a user with username and hashed password.

<br>
<hr>

# LOGIN

If you look in `app/controllers/users_controller.rb` you'll see we do not have a method to handle login. We will have to create that method, but first we should tell the router to allow a `login` route.

Let's add a new collection to our existing users routes.

> config/routes.rb

```ruby
Rails.application.routes.draw do                                                
  resources :users do                                                            
    collection do                                                                
      post '/login', to: 'users#login'                                            
    end                                                                          
  end                                                                                
end
```

![](https://i.imgur.com/nOzz6Tz.png)

Add a **collection** not a **member**. A member will add a param to the route, which we don't want. With this collection, we are manually telling rails to run the login method within the user controller upon a POST request to `/login`.

In you `rails routes` you should see the login route added.

We're going to add a login action to our `users_controller`. Within this action, we will authenticate our user.

Because we are using `has_secure_password`, we are given an `.authenticate()` method on our user for free.

```ruby
def login
    user = User.find_by(username: params[:user][:username])
    if user && user.authenticate(params[:user][:password])
      render json: {status: 200, user: user}
    else
      render json: {status: 401, message: "Unauthorized"}
    end
end
```

![](https://i.imgur.com/KSV5MHR.png)

Run your server, and let's test login from an HTTP client (Postman is good). Login as the user you previously created. If successful, should get the user info in response. If unsuccessful, should get a 401 (Unauthorized).

Send the username and password through

* `user[username]`
* `user[password]`

Remember to use **password** and not `password_digest`.

![](https://i.imgur.com/DQqnV4B.png)

Successful request:

![](https://i.imgur.com/ncKwWKQ.png)

Username or password is wrong:

![](https://i.imgur.com/jc27IJA.png)

Where does that very useful `.authenticate()` method come from? It comes from [`has_secure_password`](http://api.rubyonrails.org/classes/ActiveModel/SecurePassword/ClassMethods.html#method-i-has_secure_password).

Now that we can log in, let's keep track of our logged-in users using **JSON Web Tokens** or **JWT**.

<br>
<hr>

# Tokens

When our user logs in, we will want to track them somehow. The old way to do this is with **stateful** authentication where the server maintains a **session**.

An API like this really just wants to be a place to manage data and not maintain sessions. Rails API does not have sessions, it is **stateless**.

So instead, we will use **stateless authentication** with tokens.

We will generate an encrypted token to send to the client. The token will be stored on the client. When the client makes further requests, it will send the token to be verified on the server.

[More on stateful vs stateless auth](https://auth0.com/blog/stateless-auth-for-stateful-minds/)

Let's install the following gems:

```
gem 'jwt'
```

This is so we can generate and decode JSON Web Tokens on our Rails server.

```
gem 'dotenv-rails'
```

This is so we can set Environment Variables for use in our JSON Web Tokens. (You might have used dotenv in Express. This is the Rails version).

From the docs:

> What is JSON Web Token?

> JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.

Good reading here:

[JSON Web Tokens](https://jwt.io/introduction/)

![](https://i.imgur.com/obNqWIa.png)

All we are really sending is an encoded piece of information. When the information is decoded, it's a good ole Javascript Object with keys and values and such. Useful stuff.

Another picture of the Auth process using JWT (from the docs):

![](https://i.imgur.com/YVoufUm.png)

We will be encoding and decoding our JWTs using the `jwt-ruby` gem that we installed earlier:

[jwt-ruby gem docs](https://github.com/jwt/ruby-jwt)

## Generate a JWT

After we have authenticated our user, we want to generate a JWT for them so we can keep them in our 'stateless session'.

### Payload

Under private, write a method that returns a hash. The hash will contain the payload including the user's id and username to be encrypted:

```ruby
  def payload(id, username)
    {
      exp: (Time.now + 30.minutes).to_i,
      iat: Time.now.to_i,
      iss: ENV['JWT_ISSUER'],
      user: {
        id: id,
        username: username
      }
    }
  end
```

Note that this method will take an env variable that we will configure soon.

### Create token

Also under private, write a method that creates the token with the payload:

```ruby
def create_token(id, username)
  JWT.encode(payload(id, username), ENV['JWT_SECRET'], 'HS256')
end
```

![](https://i.imgur.com/2PhVUWf.png)

`JWT` is how we use use the `jwt` gem. `JWT.encode` is a method within the `jwt` gem. It will encode / generate a JSON Web Token for us. A token has a

* **payload**
* **header**
* **signature**.

These correspond to the three arguments that you can see we have passed to the `JWT.encode` method.

Our create_token also requires an env variable we will do soon.

Our create_token method is calling on the `payload` method we defined earlier.

![](https://i.imgur.com/goZUFdu.png)

<br>
<hr>

### ENV Variables

Environment variables, or ENV for short, are variables that exist _outside_ of your app. They should not exist within your code. This is to prevent people from seeing secret credentials on Github and whatnot. Rather, these secret variables exist in the 'environment' in which the app is located.

We can set Environment Variables with the `dotenv-rails` gem we installed earlier. It allows us to set secrets inside of a file `.env`.

* `touch .env` in the root of your rails project.

![](https://i.imgur.com/6dwe4bQ.png)

* Write your environment variables into the `.env` file.

```
JWT_SECRET=whateversecretyouwant
JWT_ISSUER=whoeveryouwant
```

![](https://i.imgur.com/oLGXkG2.png)

* Write `.env` in to your `.gitignore`. This will prevent your secrets being pushed to github. This is the entire point of using dotenv, so add it to your gitignore now.

* Make sure `dotenv-rails` has been bundled.

* In rails console, you can write `ENV` and see a hash of all environment variables.

* In rails console enter `ENV['JWT_SECRET']` to check that particular env variable exists. It's the _same one_ you entered into the .env file.

![](https://i.imgur.com/mFtIzRh.png)

**BUG**  

If you get **nil**

* Make sure `gem 'dotenv-rails'` is in your Gemfile
* Bundle and make sure it's in the list
* Quit rails console
* Re open rails console and try again

If for some reason it stubbornly refuses to work, try writing this into your `config/application.rb` file, inside the module:

```
require "dotenv-rails"
```

![](https://i.imgur.com/2wB7C1E.png)

<br>
<hr>

## Test: GENERATE A TOKEN

In our login route, let's send a token to our user when they authenticate.

Create and save a token to a variable:

```ruby
token = create_token(user.id, user.username)
```

![](https://i.imgur.com/2KaOQaA.png)

Put it into the rendered json with login authentication:

```ruby
  def login                                                                        
    user = User.find_by(username: params[:user][:username])                        
    if user && user.authenticate(params[:user][:password])                         
      token = create_token(user.id, user.username)                                 
      render json: { status: 200, token: token, user: user }                       
    else                                                                           
      render json: { status: 401, message: "Unauthorized" }                        
    end                                                                            
  end
```

![](https://i.imgur.com/cLoyMAJ.png)


## Test: Postman

Make sure your rails server is running.

![](https://i.imgur.com/Jz17VdD.png)

The response has all the stuff it had before, plus a JWT string

![](https://i.imgur.com/BxFiOll.png)

Congrats! We can send a token through to our client when they login.

<br>

# ACCESS: AUTHENTICATE ROUTES
## Authentication methods

We have done sign up and log in, now we need to think about using those for accessing resources.

We want our server to stop our user from accessing routes if the user does not have a valid JSON Web Token.

Add the following methods to your ApplicationController. This controller is the parent of all your other controllers. All methods that are written in here will be inherited by all others.

Let's make a method that is available to all of our controllers that will authenticate the JWT, and tell us if the user is allowed.

Test method in ApplicationController:

> app/application_controller.rb

```ruby
   def authenticate_token                                                        
     puts "AUTHENTICATE JWT"                                                     
   end
```

![](https://i.imgur.com/zqqhDL4.png)

In the `users_controller`, we can run the `authenticate_token` method. Let's run it for all user actions except login and create:

> app/users_controllers.rb

```ruby
before_action :authenticate_token, except: [:login, :create]
```

![](https://i.imgur.com/AAXDdc5.png)

[Controller filters, such as: before_action](http://guides.rubyonrails.org/action_controller_overview.html#filters)

[Active Record callbacks](http://api.rubyonrails.org/classes/ActiveRecord/Callbacks.html)

If you now visit `/localhost:3000/users`, the puts statement in the console appears (the authenticate method runs):

![](https://i.imgur.com/6CAhvSE.png)

What we want to do is send a 401 if the incoming token does not exist (if there is no Authorization header) or is not a valid token:

```ruby
render json: { status: 401, message: 'Unauthorized' } unless decode_token(bearer_token)
```

![](https://i.imgur.com/oJu05nt.png)


What we are doing is passing the result of a method `bearer_token` into a method `decode_token`. We need to write these methods.

Let's get `bearer_token` working and just have a shell for `decode_token` for now. All we want `bearer_token` to do is parse the incoming header from the frontend.

![](https://i.imgur.com/BOPeon0.png)

```ruby
class ApplicationController < ActionController::API

  def authenticate_token
    puts "AUTHENTICATE JWT"
    render json: { status: 401, message: 'Unauthorized' } unless decode_token(bearer_token)
  end

  def bearer_token
    puts "BEARER TOKEN"
    puts header = request.env["HTTP_AUTHORIZATION"]
  end

  def decode_token(token_input)
    puts "DECODE TOKEN"
  end

end
```

request.env:

> request.env is a ruby array that contains information about a visiting user.

[request.env](http://blogofchirag.blogspot.com/2008/09/variables-in-request-env-ruby-on-rails.html)

## Passing tokens via postman

Log in through Postman like you did before. POST request to users/login.

* `user[username]`
* `user[password]`

**Copy** the token in the response (no quotes).

Let's send a GET request to see `localhost:3000/users`. Try it now, you should be denied. In Postman you should see your 404, and in Terminal, puts statements verifying the methods are running.

Let's then prepare for the real thing. Under headers:

The key is `Authorization` the value is `Bearer <token>`. Note: this is right there in the [docs](https://jwt.io/introduction/).

We will be denied, but we should see the console output for the `request.env` Authorization header.

![](https://i.imgur.com/QFxwqTI.png)

We should see the puts statements, including the one that shows us what was in the Authorization header:

![](https://i.imgur.com/cwqRYJ0.png)

## regex

Use Regular Expressions to pass just the token without the 'Bearer':

![](https://i.imgur.com/kQtkcNA.png)

Make another request to GET `/users`, and see the result in Terminal (you should be able to see the token without 'Bearer':

![](https://i.imgur.com/6kgmf8n.png)

## decode token

Make it so that `bearer_token` returns its result, and that we send a puts to test that `decode_token` receives the JWT

![](https://i.imgur.com/fPInUVe.png)

Terminal:

![](https://i.imgur.com/lVxh88c.png)

Add in the decode method and send a response with the decoded token stuff:

![](https://i.imgur.com/LYuxzyU.png)

**NOTE** If you get an error like:

```bash
JWT::IncorrectAlgorithm (An algorithm must be specified):

app/controllers/application_controller.rb:21:in `decode_token'
app/controllers/application_controller.rb:8:in `authenticate_token'
```

You will need to pass a fourth argument to the `JWT.decode()` method:

```ruby
    token = JWT.decode(token_input, ENV["JWT_SECRET"], true, { :algorithm => 'HS256'})
```

Postman response. The decoded token information looks like this:

![](https://i.imgur.com/NGXWngZ.png)

Make it so that `decode_token` returns the decoded token. If the decode fails, the method will error, meaning that the original authentication will fail. Otherwise, you should have access to the users route:
![](https://i.imgur.com/Zy5inkb.png)

Add in a convenient message in case of failure (rescue the error)

![](https://i.imgur.com/shwyZK8.png)

* Remove the test messages when auth works.

**Application Controller with console messages removed**

```ruby
class ApplicationController < ActionController::API                                

  def authenticate_token                                                           
    render json: { status: 401, message: 'Unauthorized' } unless decode_token(bearer_token)
  end                                                                              

  def bearer_token                                                                 
    header = request.env['HTTP_AUTHORIZATION']                                     
    pattern = /^Bearer /                                                           
    header.gsub(pattern, '') if header && header.match(pattern)                    
  end                                                                              

  def decode_token(token_input)                                                    
    JWT.decode(token_input, ENV['JWT_SECRET'], true)                                           
  rescue                                                                           
    render json: { status: 401, message: 'Unauthorized' }                          
  end                                                                              
end
```

<br>
<hr>

## Currently logged in user

See the currently logged in user's details server-side. In application_controller.rb, add a method to retrieve the current user from the db:

> app/controllers/application_controller.rb

```ruby
  def get_current_user                                                           
    return if !bearer_token                                                      
    decoded_jwt = decode_token(bearer_token)                                     
    User.find(decoded_jwt[0]["user"]["id"])                                                     
  end
```

![](https://i.imgur.com/GLHXSPL.png)

Use the method in the show route:

> app/controllers/users_controller.rb

![](https://i.imgur.com/d1XoPzI.png)

Go to the the show route in Postman (sending  the currently logged in token) and just see who's logged in `localhost:3000/users/1`.

![](https://i.imgur.com/1U3wKrW.png)

<br>

## Authorization

User 1 can visit `/users/1` if they are logged in, but should user 2 be able to see that route even if logged in?

Restrict a user from user-params routes if they are the wrong user with an **authorize user** method:

```ruby
  def authorize_user                                                             
    render json: { status: 401, message: "Unauthorized" } unless get_current_user.id == params[:id].to_i                                                         
  end
```

![](https://i.imgur.com/Cq4qUOk.png)

```
  before_action :authorize_user, except: [:login, :create, :index]
```

![](https://i.imgur.com/502WNUL.png)

* Create a second user in Rails console.

```ruby
User.create( username: 'Gollum', password: 'Gollum' )
```

* Log in as this second user through Postman, and copy the token

![](https://i.imgur.com/aAswlxT.png)

* Using the Bearer token as before in the Authorization header, try to access the same show route as the user's id:

Success (user 2 visits `/users/2`) :

![](https://i.imgur.com/CUP47en.png)

But if this logged-in user tries to see another user's data (user 2 visits `/users/11`) :

![](https://i.imgur.com/Jefxn95.png)

No access.

Authentication and Authorization complete!