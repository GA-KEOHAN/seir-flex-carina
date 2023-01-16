---
track: "React Fundamentals"
title: "The Fruits Remix"
week: 2
day: 1
type: "lecture"
---


<p align="center">
    <img width="1241" alt="remix" src="https://media.git.generalassemb.ly/user/15881/files/49e47580-eb0e-11ea-858d-999ddab88aa5">
</p>



# Note Reinstall Big Poppa Code React Starter 
1. `sudo npm i -g big-poppa-code-react-starter`

# Get Started
1. Run `lets-code`
1. Choose Lesson 2
1. Name project fruits-mern-app

Lets look at a Web Developer Starter Kit built from scratch and dissect what it is doing

```
cd fruits-mern-app

```


# Today we are going to open up the blackbox
    - No CDN's
    - No Create React App
    - We are going to see how to do these features from Scratch
    - If you open up express or react you will see that they have there own dependencies and that developers just like you built these applications the same way you have been building yours.
    - Today I am going to show you how to build your own True Web Development Infrastructure for building Single page Applications
    
# What does Gulp do and hows it used in the industry today in production applications

<p align="center">
      <img width="241" alt="webpack" src="https://media.git.generalassemb.ly/user/15881/files/cf040c00-1f38-11ea-9236-4aa440fba591">
</p>

    - Gulp is what is known as a task runner.
    - Task runners are used to conduct complicated tasks and put them in a pre-defined list of operations
    - It allows to not only stay DRY in our code but also in our work flow...
    - For example if every time I need to change code, I need to recompile it and ship it to the browser and then delete the old files and then call nodemon , i can just put that string of commands in a gulp task.
    - Gulp is a tool that helps us code, unlike something like React or Express that we actually use to write the code that creates our app.


# What does Webpack do and is it used in the industry today in production applications

<p align="center">
<img width="1241" alt="webpack" src="https://media.git.generalassemb.ly/user/15881/files/c90e2b00-1f38-11ea-80c9-a30904d18c7e">
</p>

    - Webpack is a module bundler it solves numerous problems.
    - You have all used node and express and you have seen how convenient it is to use `require` instead of creating bloated        files, the problem is that can't be used in the browser just like window can't be used in node.
    - webpack lets us use require and still ship browser safe code and it also tree shakes our code.
    - Lets take a look at big library like Lodash..... 
   [__lodash__](https://lodash.com/docs/4.17.15#cloneDeep)
    - You see all these lodash methods what if i only need 1. without webpack you would end up adding all this useless code to your codebase to only use one function.

# What does Babel do and is it used in the industry in production applications
![babel](https://media.git.generalassemb.ly/user/15881/files/379fb880-1f3a-11ea-9cb7-9a5ab6e60c33)

        - Babel lets us take new JS and turn it into browser safe ES5 JS.... It's that simple.
        - Let's go to the babel website and see what happens when we use JSX and how it is compiled to the browser
   [__Babel example__](https://babeljs.io/repl#?browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=DwCwjAfCCWwPTgkA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.7.5&externalPlugins=)
        - Does this look fammiliar.    

![gulp webpack and babel 1](https://media.git.generalassemb.ly/user/15881/files/dd151400-46c1-11ea-96fc-16e5a3e5fd3f)
![gulp webpack and babel 2](https://media.git.generalassemb.ly/user/15881/files/e0100480-46c1-11ea-8e68-257aee85a500)
![gulp webpack and babel 3](https://media.git.generalassemb.ly/user/15881/files/e3a38b80-46c1-11ea-8987-24dcf82d35cd)
# From experience now we know
    - It doesn't scale..... what if we have 555 js files to add
    - It becomes unmaintainable
    - Each script shares the global namespace so we have to think about naming even deeper

# Node JS
![gulp webpack and babel 4](https://media.git.generalassemb.ly/user/15881/files/e7371280-46c1-11ea-80f7-2dd0695cf6f7)
- But modules are not supported by the browser

![gulp webpack and babel 5](https://media.git.generalassemb.ly/user/15881/files/ea320300-46c1-11ea-9916-e94f37979e07)
 - Node tries to solve this modules
 - But there is no browser support for require


# Now let's see how you would put these tools together 

![together](https://media.git.generalassemb.ly/user/15881/files/92d1ab00-1f3a-11ea-93be-b7fcc6901778)



# 4 Files We want to start with
1. gulpfile.js
1. webpack.config.js
1. .babelrc
1. Look at server.js ( Notice Express.json Middleware )
1. Models and Controllers ( Models are the same and Controllers use res.json)
1. Refactor main.js using react router

# Lets talk about SASS
1. Nested CSS
1. variables
1. Importing SCSS `show example`



