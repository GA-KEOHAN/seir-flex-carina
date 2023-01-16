![GA Logo](https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/General_Assembly_logo.svg/1280px-General_Assembly_logo.svg.png)

# Opinionated Framework Part 1 - Setup and Routing

---

## What you will learn

- What is an Opinionated Framework?
- How to start up a new project
- How to create a controller and actions
- How to connect controller actions to routes

---

## Prerequisites

- Python 3.3 or above installed *make sure to know whether the python or python3 command is needed to access the right python install, can check by running `python --version` and `python3 --version`
- Postgres installed

## What is an opinionated framework?

Most web frameworks for building full-stack websites or APIs/Microservices fall into one of two categories.

- **Minimalist:** Like express, these frameworks provide you the basic features to create a web server leaving it up to you to decide which libraries to use for connecting to databases, encryption, authentication, etc. and how to structure your files and folders in your workflow.

- **Opinionated:** These frameworks usually come with CLI tools that allow you to spin-up new projects with pre-defined projects structures, conventions and all the libraries for full functionality already built in.

These are the main web frameworks across many languages:

| Language   | Minimalist     | Opinionated       |
| ---------- | -------------- | ----------------- |
| Javascript | Express, Koa   | Nest, Foal, Sails |
| Python     | Flash, FastAPI | Django, Masonite  |
| Ruby       | Sinatra        | Ruby on Rails     |
| PHP        | Slim           | Laravel           |
| GO         | Echo           | Buffalo, Revel    |
| Rust       | Warp           | Rocket            |
| Java       |                | Spring Boot       |
| C#         |                | .Net              |
| Dart       |                | Aqueduct, Angel   |
| Kotlin     | kTor, Javalin  | Spring Boot       |
| Swift      |                | Vapor, Kitura     |

## Setting Up the Project

#### Step 1 Setting Up Our Django Environment

- Create a "django" folder from which we will be doing all of our django work

- Create a virtual environment with the command ```python -m venv djangoenv```

- activate the virtual environment with the command ```source ./djangoenv/bin/activate``` (You should now see (djangoenv) in your terminal prompt signaling the venv is active)

*You can turn off the virtual environment with the command `deactivate` at anytime, and can be reactivated with the same command above*

**WHY:** The virtual environment will create an isolated python environment for us to install our django dependencies just for our django projects. Virtual environments can be created per project or for simillar projects to isolate dependencies (kind of like package.json in node).

- install django `pip install django`

#### Creating a Django Project

Creating django projects and apps both will use the `django-admin` command. From our django folder run the following command.

```django-admin startproject firstdjango```

- cd into your new "firstdjango" folder

- start the dev server with `python manage.py` , then head over to localhost:8000 to make sure you see the default landing page.
## Creating a Controller

Django is unique in that it allows you to organize parts of your project as "apps". One app can house the following related items

- models
- migrations
- views (in django your controllers are referred to as class based views and actions as views)

While this makes the workflow quite different than many opinionated frameworks which adopt a more "Rails"-esque workflow, Django provides modularity. You can copy one app from one project to the next and have it be almost immediately usable. This has several use cases:

- build an authentication app that you can use from project to project
- build out common features like blogging and copy from project to project
- bring in the apps of other developers, [Find a List Here](https://djangopackages.org/)

#### creating our first app

- once again we'll use the `django-admin` command by running `django-admin startapp firstapp` (a firstapp folder will be created in your project)

- Your project will not recognize the app until it's "installed" to install an app go into /firstdjango/settings.py and add the following to the installed apps section.

```py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'firstapp.apps.FirstappConfig'
]
```

- `firstapp.apps.FirstappConfig` equates to the FirstappConfig class in firstapp/apps.py

Also while you are in settings.py comment out the CSRF middleware so we can make post/put/delete request without worrying about CSRF tokens for now.

```py
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    # 'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```

#### Creating Our Classed Based View

In the firstapp folder you'll see a file called view.py, this is our file for defining all our views. We will be creating a class based view (controller).

- We will import Jsonresponse so we can send back json data

```py

from django.shortcuts import render
from django.http import JsonResponse ## For Sending Json Responses
from django.views import View ## Allows our class to act as a view

class FirstView(View):
    pass
```



## Writing an Action

"Actions" usually refer to the individual function within our controllers. In this case that means we will be writing several methods in our class based view. Which methods line up with white type of request method depends on the name, go the get method will be used for get requests, etc.

```py
from django.shortcuts import render
from django.http import JsonResponse ## For Sending Json Responses
from django.views import View ## Allows our class to act as a view

class FirstView(View):
    #since the methods name is "get" it will run on "get" requests
    def get(self, request):
        return JsonResponse({"hello":"world", "method": request.method})

    #since the methods name is "post" it will run on "post" requests
    def post(self, request):
        return JsonResponse({"hello":"world", "method": request.method})

    #since the methods name is "put" it will run on "put" requests
    def put(self, request):
        return JsonResponse({"hello":"world", "method": request.method})

    #since the methods name is "delete" it will run on "delete" requests
    def delete(self, request):
        return JsonResponse({"hello":"world", "method": request.method})
```

## Creating a Route

Right now the views we've created don't do much since they aren't connected to route/url endpoint. In Django, routes are called "urls" and are defined in the urls.py file in the main project folder where your settings.py lives. (/firstdjango).

So what we will do is import our class based views and attached them to a particular endpoint so we can test them out.

urls.py
```py
from django.contrib import admin
from django.urls import path
from firstapp.views import FirstView

urlpatterns = [
    path('admin/', admin.site.urls),
    # We associate our view class with a particular endpoint
    path("first/", FirstView.as_view())
]
```

- Open up postman and make a get, post, put and delete request to "/first/"

- Then make a post request to "/first" it may error without the trailing slash, keep in mind Django can be sensitive about trailing slashes, it'll save you from spending a long time troubleshooting a request that only needed a slash to work.

## Using URL Params

Create a second view class with a get method.

firstapp/views.py
```py

class SecondView(View):
    def get(self, request, param):
        return JsonResponse({"param": param})

```

Then let's import it into urls.py and create another route

```py

from django.contrib import admin
from django.urls import path
from firstapp.views import FirstView, SecondView

urlpatterns = [
    path('admin/', admin.site.urls),
    # We associate our view class with a particular endpoint
    path("first/", FirstView.as_view()),
    # A url using a URL Param
    path("second/<param>/", SecondView.as_view())
]

```

- make a get request to `/second/someparam` then make a get request to `/second/anotherparam` 

## Accessing URL Queries

Let's make some updates to our SecondView

```py

class SecondView(View):
    def get(self, request, param):
        query = request.GET.get("query", "no query") ## Grab query from url query
        return JsonResponse({"param": param, "query": query})

    def post(self, request, param):
        query = request.GET.get("query", "no query")
        return JsonResponse({"param": param, "query": query})

    def put(self, request, param):
        query = request.GET.get("query", "no query")
        return JsonResponse({"param": param, "query": query})

    def delete(self, request, param):
        query = request.GET.get("query", "no query")
        return JsonResponse({"param": param, "query": query})

```

- Make a get, post, put, delete request to `/second/someparam/?query=myquery`

- then make the same requests to `/second/someparam/`

Notice the second argument to request.GET.get acts as a default value when then query specified doesnt exist.

## Accessing the Request Body

Last thing we need to make sure we know how to access is the request body! What we will do is create a helper method to get the body. create a new file in firstapp called helpers.py.

```py
## Library for working with json
import json

def GetBody(request):
    # decode the request body into a unicode string
    unicode = request.body.decode('utf-8')
    # turn the unicode string into a python dictionary
    return json.loads(unicode)
```

- import GetBody into views

```py
from .helpers import GetBody
```

- add a new class called ThirdView

```py
class ThirdView(View):
    def post(self, request):
        return JsonResponse(GetBody(request))
```

connect the new class to a url

```py
    # Connecting our ThirdView
    path("third/", ThirdView.as_view())
```
---

## Resources to Learn More
- [Django URL Documentation](https://docs.djangoproject.com/en/3.1/topics/http/urls/)
- [Class Based Views Docs](https://docs.djangoproject.com/en/3.1/topics/class-based-views/)
---
