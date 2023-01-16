![GA Logo](https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/General_Assembly_logo.svg/1280px-General_Assembly_logo.svg.png)
# Full Stack Build Part 1 - Building and Deploying an API
-------

## What you will learn
- Creating an API
- Setting Cors Headers
- Testing an API
- Deploying an API

-------

## Setup

- Open up terminal to a blank folder

- create a virtual environment `python -m venv venv`

- activate your virtual environment `source ./venv/bin/activate`

- install dependencies `pip install django dj-database-url psycopg2-binary djangorestframework`

- generate a new django project `django-admin startproject todoproject`

- cd into the todoproject folder

- test your dev server `python manage.py runserver`

## Creating the API

- create a new app `django-admin startapp todos`

#### DjangoRestFramework

When creating an API previously we did without any external help and making basic crud routes ended being a bit tedious...

- write all crud functions individually

- we had to convert our data to json then back to a dictionary to send back as json

- the shape of the data isn't we would traditionally would expect

- we had to turn off CSRF security and other security features to make work

DjangoRestFramework fixes all the above and creates a nice abstraction for creating REST API's with django. Let's do it!

**[DJANGO REST FRAMEWORK DOCUMENTATION](https://www.django-rest-framework.org/)**

- install djangorestframework `pip install djangorestframework`

- install djangorestframework and the todos app in settings.py

```py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'todos.apps.TodosConfig',
    'rest_framework'
]
```

## Configuring Our Database

We will use dj-database-url which will automatically look for our database url in the DATABASE_URL environment variable.

At the top of `settings.py` let's import it:

```py
import dj_database_url
```

Then we'll update the database configuration which by default look like:

```py
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}
```

We will replace this with:

```py
DATABASES = {
    'default': dj_database_url.config(
        conn_max_age=600,
        conn_health_checks=True,
    ),
}

```

So now we just have to define our environmental variable with our connection string.

If your not familiar with the format of a connection string the formula is:

```
protocol://username:password@host/database?option1=value&option2=value
```

Essentually the dj_database_url will be able to configure the entire connection based on our connection string.

For example a postgres database from bit.io may have a conection string that looks like this:

```
postgresql://dbuser:dbpassword@db.bit.io/username/databasename
```

Since we are not using a .env file, we'll just manually define the environmental variable in our terminal. (Keep in mind, whenever you open a new terminal, you'll have to define the variable again.)

```
export DATABASE_URL=postgresql://dbuser:dbpassword@db.bit.io/username/databasename
```


#### Creating our Model

todos/models.py

```py
from django.db import models

class Todo(models.Model):
    subject = models.CharField(max_length=100)
    details = models.CharField(max_length=100)
```
#### Make and Run Migrations

- `python manage.py makemigrations`
- `python manage.py migrate`

#### Making Our Serializer

Serializing objects into json strings and then turning them back into python dictionaries can be a tedious process. With djangorestframework, we can build a serializer for our model that handles all this for us along with arranging the data in a more traditional form.

- create a serializers.py in our todos app

```py
from .models import Todo
from django.contrib.auth.models import User, Group
from rest_framework import serializers

# Our TodoSerializer
class TodoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        # The model it will serialize
        model = Todo
        # the fields that should be included in the serialized output
        fields = ['id', 'subject', 'details']
```

#### Creating Our Viewset

djangorestframework has classes for building out views called ViewSets. With these we can wire up all our CRUD routes pretty easily.

in todos/views.py

```py

from .models import Todo
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import TodoSerializer


class TodoViewSet(viewsets.ModelViewSet):
    ## The Main Query for the index route
    queryset = Todo.objects.all()
    # The serializer class for serializing output
    serializer_class = TodoSerializer
    # optional permission class set permission level
    permission_classes = [permissions.AllowAny] #Coule be [permissions.IsAuthenticated]

```

#### Setting Up Our Router

To make sure all of the ViewSets methods connects to the rights urls, djangorestframework provides with a router to wire it all up. Let's head over to our urls.py.

```py

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from todos.views import TodoViewSet

# create a new router
router = routers.DefaultRouter()
# register our viewsets
router.register(r'todos', TodoViewSet) #register "/todos" routes


urlpatterns = [
    # add all of our router urls
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
]

```

## Testing the API

- fire up postman

- create 3-4 todos with post requests to `/todos/`

- get the full list with a get request to `/todos/`

- see one todo with a get request to `/todos/<id>`

- edit a todo with a put request to `/todos/<id>`

- delete a todo with delete request to `/todos/<id>`

## Deploying the API

Now it's time to deploy the API, so first we have setup to do...

- install the libraries we need... `pip install gunicorn django-cors-headers`

    - gunicorn: web server to run in production
    - [django-cors-headers](https://pypi.org/project/django-cors-headers/): will be used to handle cors

    **If you have any issues with installing psychopg2 (django-heroku dep), it is either cause you don't have x-code installed on mac or on linux you need to install "libpq-dev", on ubuntu based systems the command would be `sudo apt-get install libpq-dev`**

#### setting up django-cors-headers

In settings.py

- install the django-cors-headers app

```py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'todos.apps.TodosConfig',
    'rest_framework',
    'corsheaders'
]
```

- add the cors middleware

```py
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware', ## <---- add here
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```

- after the middleware section add this line to allow all origins

```py
CORS_ALLOW_ALL_ORIGINS = True ## <---- will allow all origins, read cors docs to limit
```

## Few More Env Variables in Settings.py

In settings.py we want our DEBUG and SECRET_KEY to come from our environment not be hard coded.

So at the top of settings.py import the os module which lets us access environmental variables.

```py
import os
```

update the secret key to this:

```py
SECRET_KEY = os.environ.get('SECRET_KEY', default='localkey2022')
```

This will use the SECRET_KEY environment variable, if not defined will use "localkey2022".

Update DEBUG

```py
DEBUG = 'RENDER' not in os.environ
```

This leans on a environment variable render defines, if it exists DEBUG will be False and if it doesn't it will be True.

Last we need to update the allowed host section as the following:

```py
ALLOWED_HOSTS = []

## Handling Allowed Hosts on Render
RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)
```


#### Additional Setup

- We need to create a list of dependencies which is usually loaded into a requirements.txt or dependencies.txt

```
pip freeze > dependencies.txt
```

- We need to create a bash script to setup our environment when we deploy it. Make a file called `setup.sh` this should be in the main project folder.

```bash
#!/usr/bin/env bash

# exit on error
set -o errexit

## Install dependencies
pip install -r dependencies.txt

## Run migrations in case any migrations hadn't been run yet
python manage.py migrate
```

We need to make the file above executable.

```
chmod a+x setup.sh
```

keep in mind the command we will want to use to run this application in production is:

```
gunicorn todoproject.wsgi
```

#### Getting it on Render

- upload your project to github, the root folder should be the parent `todoproject` folder.

- create a new web service using render and this repo

- set the build command to

```
./setup.sh
```

set the start command to

```
gunicorn todoproject.wsgi
```

From the Render dashboard make sure to define your DATABASE_URL variable with your database connection string and also define SECRET_KEY with any string you'd like.

The build will fail because it will by default use an older version of Python, to fix define the PYTHON_VERSION environmental variable to the version you are using.

```
python --version
```

will show you what version you are using.

Your now deployed!


-------
## Resources to Learn More

-------
