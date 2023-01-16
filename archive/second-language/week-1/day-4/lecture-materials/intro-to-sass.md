---
track: "Second Language"
title: "Sass - Semantically Awesome Style Sheets"
week: 1
day: 4
type: "lecture"
---



# Sass - Semantically Awesome Style Sheets
![Sass logo](https://www.interactivesearchmarketing.com/wp-content/uploads/2014/04/sass.png)

## Intro
Sass is a CSS pre-processor, meaning it allows you to use some features that don't exist in CSS just yet and compiles it all into usable CSS. For example you can use: nesting, mixins, functions and more!

> [More info at the Sass Website](https://sass-lang.com/documentation)

#### So how does SASS work?

Sass is its own stylesheet language based off of CSS. To use the language, you must create files with a suffix of `.scss`, in which we can use all those nifty features like listed above. Browsers, however, can't understand `.scss` files. Thus in order for the scss you write to be used, the files have to be _translated_ (or, in other words, compiled) into plain CSS in a file with a normal extension of `.css` so that the browser can read them. We will learn how to translate Sass to CSS in this lesson.

*Note:* Sass can be written with two different syntaxes! The original syntax is known as Sass, and looks quite different from css syntax (it has no curly braces or no semi-colons). The other syntax is SCSS and it is very similar to the CSS syntax. Today's lesson will use SCSS syntax as it's much more familiar to us and thus easier to jump into it.

## Getting Started

### Install Sass

Sass used to only be installable via Ruby, but the times have changed drastically since it was created and the Ruby version is actually no longer supported. This is fine because it's [much easier to install now](https://sass-lang.com/install), across any system even without Ruby. For our purposes, we'll install what's called Dart Sass globally via homebrew.

**In terminal** (you can run this from any location)

- To install: `brew install sass/sass/sass`
- Quit terminal and reopen it
- To check that it installed: `sass --version`
<details><summary>Expected Output</summary>
 1.23.7
 </details>
 <br/>

> Note: If you're on windows, you can install it via Chocolatey with `choco install sass`

### Set up Sass with the Morning Exercise Project

#### IMPORTANT! File organization matters! Make sure you are working in the correct file/folder/building your files in the correct location

#### In terminal

- First, <a href="/downloads/second_language/sass-warmup/starter-code.zip" download>download</a> to starter code

- If you're a Linux user, please <a href="/downloads/second_language/sass-warmup/linux-starter-code.zip" download>download</a> this starter code

- Unzip the file, and then navigate to the same level as the `index.html` file.

- `touch css/main.scss` to create a `.scss` file inside the `css` folder

- Open a new terminal tab at this level and type:

- `sass --watch css/main.scss css/main.css`
  
- `sass --watch` will watch for changes and update - much like `nodemon` for node!

- `css/main.scss` the first argument is the file we want it to watch

- `css/main.css` the second argument is the file we want it to compile the scss into css

- Just a fun rumor - the creator of Sass chose `sass --watch` as the command name because of its similarity to the word `Sasquatch`

<details><summary> Expected output after sass --watch</summary><p>

```
Compiled css/main.scss to css/main.css.
Sass is watching for changes. Press Ctrl-C to stop.
```
</p></details>

#### Set up our workspace and check our files

 - Go back to your other tab in terminal (don't cancel the `sass --watch`, we always want that to be running when we write sass) and open the entire `starter-code` folder in your text editor.
 - You should now see some new files/folders
  - Folder: ` .sass-cache`
  - Inside the `css` folder there should now be
    - `main.css`
    - `main.css.map`
    - `main.scss`
    - `_finishing_touches.scss`
- `open index.html`

<details><summary>Expected File Structure</summary><p>

![](https://i.imgur.com/LTc8r5T.png)

</p></details>
<br>

> *Thought Question* - which file should the `index.html` link to: `main.scss` or `main.css`. Why?

## Write some Sass

### First, let's investigate how it works

Let's start small so we can see how Sass compiles .scss into .css. If we look at our index, we can see that the Space Ghost image is far too large. That's simple enough to fix, so let's start there.

##### In your text editor, in the `main.scss` file:

```
img {
  width: 100px;
}
```
- `⌘S` to save the file

##### In your text editor, open `main.css`. It should look like this:

```
img {
  width: 100px; }

/*# sourceMappingURL=main.css.map */

```

Refresh the index in the browser, Space Ghost should've shrunk!

*Note:*  Everything in the `main.css` file should be compiled from `main.scss`, meaning **do not write directly into `main.css`.** Whenever you make a change and save it in your `.scss` file, sass will compile the _whole_ file into the `.css` file. So, any code you directly write into `main.css` would then be **overwritten** after the compilation. You wouldn't want that! So, again, when using sass, do **not** write directly into your regular css files!

##### Close `main.css` right now so you don't accidentally work in this file.

### Errors!

Have you ever wished for errors in css? Look no further, Sass will give you errors for some things!

Check out this one that I got, for example

![Sass error](https://i.imgur.com/dOcRLUz.png)

- Go ahead and mistype something in `main.scss` save it and reload your browser
- Fix it, save it, reload it!

> Note: Not every misspelling will throw an error, unfortunately, but it's still better than none at all!

### Variables

CSS has since introduced variables as you've learned so far, but in case you hate writing the `var(--` opening every time, Sass has its own, slightly shorter variable functionality as well.

Let's set some color variables. Space Ghost's color scheme is fantastic - let's be sure we can easily reuse those colors

**In your text editor, in `main.scss`, starting on line 1 add:**

```
$sg-grey   : gainsboro;
$sg-black  : #515358;
$sg-white  : #FCFCFC;
$sg-yellow : #FFCF73;
$sg-red    : #F1534E;
```

Now let's apply our $sg-black color to all the text and set a background color of `$sg-grey`

```
body {
  background-color : $sg-grey;
  color            : $sg-black;
}

```

Save the file and reload the browser. Ta-da! Regular CSS variables still work just fine, but these will save you a little bit of typing.

### Functions

Yes, it's true! SCSS has funcitons. You can use some built in ones or write your own! We could probably spend days learning about all the awesome stuff about Sass. But for today we will just use the `ligthen()` and `darken()` functions, which allow us to lighten and darken colors on the fly!

Let's set up the container div first. We'll make it a flex container and let's just quickly change the color so we can see our div.

```
.featured {
  display: flex;
  width : 98%;
  margin : auto;
  justify-content: space-around;
  background-color : darken($sg-grey, 30%);
}

```

### Nesting

Additionally, we're going to want our beef log and cheese log featured product divs to have the same width. Do we want 50%? 45%? 30%? Oh gosh! We just don't know yet! Let's set it to a variable we can change.

Put it at the top, with our other variables

```
$featured-content-width: 35%;
```

Our beef log and cheese log divs are inside the `.featured` div - there are a few ways we access this in regular css. Some more verbose than others. Some more readable than others.

But with Sass we can nest it! Writing it this way can be more readable and maintainable.

First, let's add a border to see what our elements look like (feel free to change the border color to whatever works for. you, we'll just be using it for testing):

```
* {
  border : 1px solid gold;
}
```

Now let's target our divs inside .featured

```
.featured {
  display: flex;
  width : 98%;
  margin : auto;
  justify-content: space-around;
  background-color : darken($sg-grey, 30%);

  div {
    width : $featured-content-width;
  }
}

```

Let's refresh our browser to see the changes

Maybe, that's a bit narrow for our divs. Let's update our variable

```
$featured-content-width: 40%;
```

Neato!

### Extend/Inherit

Our beef log and cheese log divs are going to be similar in a lot of ways, but we want them to be a little different too.

We can write some nice DRY css code by using extend/inheritance.

Let's write the shared properties

```
.featured-content {
  border: 1px solid rgba (200, 200, 200, .5);
  box-shadow: 0 0 8px silver;
  background-color: lighten($sg-grey, 50%);
  text-align: center;
  padding: .5em;
}

```

*Note:* Your page should **NOT** have changed with this CSS, yet.


Let's give these properties to the beef-log div

```
.beef-log {
  @extend .featured-content;
}

```

- refresh your browser and you should see just the beef-log div has changed

Now, let's give the same properties to the cheese log div

```
.cheese-log {
  @extend .featured-content;
}
```

Let's make the Beef Log and Cheese Log divs look different

```
.beef-log {
  @extend .featured-content;
  color : $sg-red;
}

.cheese-log {
  @extend .featured-content;
  color: $sg-yellow;
}

```

Nice work!

### Import/Partials

Modularizing your CSS has many benefits. It helps organize code and it can allow teammates to work in different files.

CSS has an @import feature. But each @import is another get request to the server. You can use Sass to compile all your partials into one file first.

#### Add Your Own Partial

*In terminal, in the `css` directory:*
- `touch _fonts.scss`

*In your text editor, open the `_fonts.scss` file*
- Let's bring in some fonts from our `assets` folder

```
@font-face {
  font-family: "Afta-Sans";
  src: url("../assets/fonts/afta-sans/AftaSansThin-Regular.otf") format("truetype");
}

@font-face {
  font-family: "Chunk";
  src: url("../assets/fonts/ChunkFive/Chunkfive.otf") format("truetype");
}

@font-face {
  font-family: 'Speck';
  src: url("../assets/fonts/Speck-Display.otf") format('truetype');
}
```
*In `main.scss`: put the following with the other `@import`*
- `@import "fonts";`

*Note*: Partial files start with an `_` but when you `@import` them, do not include the `_`

Fantastic! Now let's add our new fonts!

- update the body font:

```
body {
  font-family      : "Afta-Sans";
  background-color : $sg-grey;
  color            : $sg-black;
}
```
- update the h1 font and center it

```
h1 {
	font-family: "Speck";
  text-align : center;
}
```
- update the h3 font inside the `.featured` div

```
.featured {
  display: flex;
  width : 98%;
  margin : auto;
  justify-content: space-around;
  background-color : darken($sg-grey, 30%);

  div {
    width : $featured-content-width;
  }

  h3 {
    font-family: "Chunk";
  }
}
```

#### Adding another partial!

- Let's make our page a little more refined
- comment out or remove
```
* {
  border: 1px solid gold;
}
```

- After the other `@import`s
- `@import "finishing_touches";`

Fantastic! We did a lot of CSS and kept it organized and DRY!

## Hungry for More

### Keep on using Sass to update this page more
- You can remove the `finishing_touches` partial and work on your own finishing touches
- Or build on top of the `finishing_touches` partial - warning - that file has some naughty worst practices in there - you may want to check it out/rewrite it/ first

### Explore Mixins

##### Mixins - another super powerful feature of Sass

Mixins are similar to @expand. However, they can take arguments.

The short version of good practices of when to use @expand and when to use @mixin: @expand should be used for related elements (similar divs in a container). @mixns should be used for unrelated elements, for example, a header and a button or if you would like to pass an argument(s). [More info](https://csswizardry.com/2014/11/when-to-use-extend-when-to-use-a-mixin/)

Inside `_finishing_touches.scss` You'll find a mixin at the bottom:

```
@mixin float( $translate ){
  0% {
      transform: translate(0px);
  }
  20% {
    transform: translate($translate , -$translate ) scale(1.01) ;
  }
  40% {
    transform: translate(- $translate , - $translate ) scale(.99);
  }
  60% {
    transform: translate ( 0px  ,  $translate ) ;
  }
  80% {
    transform: translate( - $translate , 0px ) scale(.99);
  }
  100% {
    transform: translate(- $translate, - $translate ) ;
  }
}

```
As you can see, these are properties of an `@keyframes`.

By passing in a variable, it can be customized for different elements.

In this case, I have used this to give the h1 a floating in space animation moving 14 pixels. The buttons will also float, but only on a hover, and only 2px.

```
@keyframes float {
  @include float( 14px )
}

@keyframes float-button {
  @include float ( 2px )
}
```
### Write Your Own Sass Function
You can create your own functions!

From the Sass Docs:
```
@function my-calculation-function($some-number, $another-number){
  @return $some-number + $another-number
}
```
[Learn more](https://sass-lang.com/documentation/values/functions)
