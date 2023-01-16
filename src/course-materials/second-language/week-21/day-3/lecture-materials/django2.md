![GA Logo](https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/General_Assembly_logo.svg/1280px-General_Assembly_logo.svg.png)

# Opinionated Framework - Models & Migrations

---

## What you will learn

- How to set the database settings
- how create models and migrations
- how to use models to add, update, and delete records

---

## Setup

- open up terminal in your django folder
- activate your virtual environment `source ./djangoenv/bin/activate`
- start a new project `django-admin startproject seconddjango`
- create a new app `django-admin startapp pets`

## Setting Up the Database Settings

In Django all settings for your application are found in settings.py. Now for our local development we can use the default settings which will create an sqlite3 database in our project folder. For deployment to Heroku, we will use the django-heroku library which will configure all the settings for heroku for us.

settings.py

```py
# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

If deploying to other environments or if wanting to use a different database locally [read the django database documentation](https://docs.djangoproject.com/en/3.1/ref/databases/#subclassing-the-built-in-database-backends)

**[Guide for Using DB URIs with Django](https://riptutorial.com/django/example/10056/using-a-database-url-from-the-environment)**

Django by default has some user and groups models we can migrate right away which will create our sqlite3 database.

**In django migrations are created based on our models, migrations are used to create, alter and destroy database tables as our project evolves**

`python manage.py migrate`

You should now see a `db.sqlite3` file in your project, that's your development database.

## Models and Migrations

To add more tables to our database we need to:

- create the model in an installed app
- make our migrations
- run our migrations

#### Installing our pets app

Head over and install the pets app in `seconddjango/settings.py`

```py

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'pets.apps.PetsConfig'
]

```

and comment out the csrf middleware

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

#### Making a Model

In your app folder should be a models.py, this is where we should make our models which are classes that specify the properties of the model.

```py
#The Model class we will inherit from
from django.db import models

#new model class
class Turtle(models.Model):
    # define a string field of max 100 characters
    name = models.CharField(max_length=100)
    # define a age that is an integer
    age = models.IntegerField()
```

#### Making a Migration

Now we run the makemigrations command which will read all our models and look for any changes since the last time it was ran. If it sees any changes (new models, modified models, removed models) it will create the migration files needed to apply those changes.

Once the migrations have been generated we can then run migrate again to update the database.

- `python manage.py makemigrations`

- `python manage.py migrate`

## Using the Model

Now that we have created the model let's learn how to use by practicing using it in the python shell.

- run the command `python manage.py shell` this will open up the python shell (just type `exit()` if you need to exit at any time)

- import our model so we can use it `from pets.models import Turtle`

- [Django Querying Docs](https://docs.djangoproject.com/en/3.1/topics/db/queries/)
- [Django QuerySet Docs](https://docs.djangoproject.com/en/3.1/ref/models/querysets/)

#### Adding a turtle

Every Django model has a "Objects Manager" object built into it that let's you query the database accessible at `Model.objects`.

- create a Turtle `Turtle.objects.create(name="Wilbert", age=5)`
- create 3 more turtles

#### Getting all the turtles

Whenever we query the database we will get back a QuerySet object.

- save all objects in a variable `all = Turtle.objects.all()`

- access the first object `all[0]`

- access the first objects name property `all[0].name`

#### Getting just one turtle

Let's grab one turtle

- `wilbert = Turtle.objects.get(id=1)`

- `wilbert.name`

- `wilbert.age`

#### Updating a Turtle

Once we query a Turtle we can update them!

- modify the object we retrieved `wilbert.name = "Dilbert"`

- commit the changes to the database `wilbert.save()`

- confirm the change was made `wilbert.name`

#### Deleting a Turtle

- `wilbert.delete()`

- confirm deletion `Turtle.objects.get(id=1).name`

#### Using your model in a view

Headover to pets/views.py and let's write a view using our model!

**Make sure to copy over your helpers.py from this morning into your pets app**

```py

from django.shortcuts import render
## For sending JSON Responses
from django.http import JsonResponse
## To serialize objects into json strings
from django.core.serializers import serialize
## To turn json strings into dictionaries
import json
## The Turtle Model
from .models import Turtle
## View class
from django.views import View
## GetBody
from .helpers import GetBody

# class for "/turtle" routes
class TurtleView(View):
    ## Route to get all Turtles
    def get(self, request):
        ## get all the Turtles
        all = Turtle.objects.all()
        ## Turn the object into a json string
        serialized = serialize("json", all)
        ## Turn the json string into a dictionary
        finalData = json.loads(serialized)
        ## Send json response, turn safe off to avoid errors
        return JsonResponse(finalData, safe=False)

    ## Route to create a turtle
    def post (self, request):
        ## get data from the body
        body = GetBody(request)
        print(body)
        ## create new turtle
        turtle = Turtle.objects.create(name=body["name"], age=body["age"])
        ## turn the new turtle into json string then a dictionary
        finalData = json.loads(serialize("json", [turtle])) #turtle in array to be serializable
        ## Send json response
        return JsonResponse(finalData, safe=False)

```

connect your class to a url

```py

from django.contrib import admin
from django.urls import path
from pets.views import TurtleView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('turtle/', TurtleView.as_view())
]

```

- test out the routes then let's add some more!

```py
# class for "/turtle/<id>" routes
class TurtleViewID(View):
    ## Function to show 1 Turtle
    def get (self, request, id):
        ## get the turtle
        turtle = Turtle.objects.get(id=id)
        ## serilize then turn into dictionary
        finalData = json.loads(serialize("json", [turtle]))
        ## send json response
        return JsonResponse(finalData, safe=False)

    ## Function for updating turtle
    def put (self, request, id):
        ## get the body
        body = GetBody(request)
        ##update turtle
        ## ** is like JS spread operator
        Turtle.objects.filter(id=id).update(**body)
        ## query for turtle
        turtle = Turtle.objects.get(id=id)
        ## serialize and make dict
        finalData = json.loads(serialize("json", [turtle]))
        ## return json data
        return JsonResponse(finalData, safe=False)

    def delete (self, request, id):
        ## query the turtle
        turtle = Turtle.objects.get(id=id)
        ## delete the turtle
        turtle.delete()
        ## serilize and dict updated turtle
        finalData = json.loads(serialize("json", [turtle]))
        ##send json response
        return JsonResponse(finalData, safe=False)
```

connect a URL

```py
from django.contrib import admin
from django.urls import path
from pets.views import TurtleView, TurtleViewID

urlpatterns = [
    path('admin/', admin.site.urls),
    path('turtle/', TurtleView.as_view()),
    path('turtle/<id>/', TurtleViewID.as_view())
]
```

You've created a full crud api! It's not perfect but tomorrow we'll introduce the djangorestframework to make this a bit simpler and smoother!

If you want run your server then in a seperate run `pytest` in this server to see if you api passes all the rest. Make sure pytest and requests are installed in your virtual environment before doing so.

---

## Resources to Learn More

---
