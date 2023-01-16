---
track: "Frontend Fundamentals"
title: "Setting up for Success"
week: 1
day: 3
type: "lecture"
---

# Setting up for Success

<br>
<br>
<br>


## Learning Objectives

- Help us help you!
- The importance of starting good habits today
- Screen Real Estate and Window Management with Spectacle
- Mac Shortcuts
- Terminal Shortcuts
- VSCode Settings and Shortcuts
- Typing
- Misc.


<br>
<br>
<br>



## A Quick Note
We try to keep all of our notes updated with all the links working and images showing up, but sometimes things get moved around. If any links or images are broken, please let us know and we'll update them!


<br>
<br>
<br>



## Introduction

As a burgeoning web developer, you have a lot to learn. One really critical thing to focus on is starting good habits today. If you teach yourself the best ways to do things now, you won't have to go back and correct yourself later.  You'll also learn to code faster and have a better workflow, where you won't lose minutes switching between applications and windows. Utilizing keyboard shortcuts will also help you type faster and let you focus on the task at hand.

A lot of these steps will feel awkward at first, but the more you use them, the sooner they'll become second nature.  Part of succeeding is just taking a deep breath and taking a moment to practice the better way, then it'll get easier and easier.

There are hundreds, if not thousands, of little things you can do to make you a more effective coder. Here we're going to focus on a small group of things that will have the biggest impact for being ready for this course.

🔐 We will be downloading applications to your computer.  You will need the password for your Mac in order to proceed.

<hr>


<br>
<br>
<br>

## Part 1 - Spectacle
- Spectacle helps you to move and resize your screens with the a few clicks on your keypad. You no longer have to waste time using your mouse to rearrange the size of the screen.
- Not only will this help to save you time, but it will help to add to the illusion that you are a bada$$ h4ck3r.


<br>
<br>
<br>



### 💻 [Click here](https://www.spectacleapp.com/) download and install Spectacle.

Once it's installed, you should have little glasses ![spectacle](https://i.imgur.com/qyNXQn0.png) at the top, right of your screen.


<br>
<br>
<br>



### Allow Spectacle
- Spectacle needs to change your computer's privacy settings to allow this application.  To do this, in your Spotlight (open with `cmd` + `space`), type **Security & Privacy** or open **Security & Privacy** from the **System Preferences** icon in the dock.  Once open, you should see this:

![security](https://i.imgur.com/Dx1IrT4.png)

- Click on the lock in the bottom left.  You will be prompted to enter your computer password:

![lock](https://i.imgur.com/KfqESFZ.png)

- Click on Spectacle to give it permission:

![permission](https://i.imgur.com/atTt1fx.png)

- Click on the lock again to save the changes:

![save changes](https://i.imgur.com/BI6LBjA.png)

### Update Spectacle Preferences

- Now, click on the glasses at the top of your screen and select `Preferences`.

![preferences](https://i.imgur.com/uMswWwW.png)

- Enable Spectacle to load at login, or you will need to start the program every time you restart.

![Spectacle Login](https://i.imgur.com/HrU8pNq.png)

- You can update any of your spectacle preferences.  `x` on a banner and then click to 'record' your _three_ keystrokes.  
- You will likely use full screen, right half, left half and bottom half the most frequently.  

![Spectacle Shortcuts](https://i.imgur.com/9CXJWSm.png)


<br>
<br>
<br>



#### ⏳ Activity (3 minutes)

- Update some of your Spectacle preferences.


<br>
<br>
<br>



#### ⏳ Activity (3 minutes)
- Try to organize your windows using Spectacle (and then adjusting as needed) like so:




<br>
<br>
<br>



## Part 2 - Mac Keyboard Shortcuts

<br>
<br>



### Shortcuts for any occasion!

- Here are the shortcuts that you will use most often:

| Shortcut | Description |
|:---:|:----:|
|Command-A| Select **All** Items |
|Command-C| **Copy** the selected item to the Clipboard. This also works for files in Finder|
|Command-X| **Cut** (remove) the selected item and copy it to the Clipboard|
|Command-V| **Paste** the contents of the Clipboard into the current document or app. This also works for files in Finder |
|Command-Z| **Undo** the previous command/typing|
|Command-Shift-Z| **Redo** - redo something you undid (when you've used Command-Z)|
|Command-S| **Save** file |
|Command-Shift-4| Take a screenshot |
|Command-Spacebar| Open Spotlight |


<br>
<br>
<br>



#### ⏳ Activity (5 minutes)
- In terminal, navigate to your desktop or documents folder
- Make a file (index.html)
- Open index.html in VSCode (`code index.html` in terminal or  VSCode > file > open)
- In index.html type  `Lorem` and hit tab ([Lorem Ipsum](https://www.lipsum.com/) is industry standard dummy text)
- SELECT ALL (command A) the text in the file
- COPY ALL (command C) the selected text
- CUT (Command X) - the selected text
- PASTE (command V) the text back into the file
- UNDO (command Z) the last command - your text should go away
- REDO (command shift Z) the last command - your text should come back
- Stop and notice the white dot on the top tab of your file - this means you have unsaved changes
- SAVE (command S) your changes to the file - the blue dot should go away
- Take a screenshot (command shift 4) of something

💻 &nbsp;[Additional Mac Keyboard Shortcuts](https://support.apple.com/en-us/HT201236)


<br>
<br>
<br>




## Part 3 - Command Line in Terminal

- You will find yourself having to re-run applications when testing your app or you will find yourself needing to retype certain lines over and over again. Be lazy! It will give you more energy for the important stuff.

<br>
<br>
<br>



#### Command Line Shortcuts

<br>
<br>
<br>


##### The two most handy ones for you right now are the up arrow and tab:

If you would learn any two - learn these!

⬆️&nbsp;&nbsp;Are you running the same command over and over again? Use the **up arrow** to show your previous commands. Hit **enter** to run them.

⭐️ Use **tab** to autocomplete a file or folder name by beginning to type it out.  If it's not autocompleting, you may be in the wrong directory!

| Shortcut | Description |
|:---:|:----:|
|Control-A| Go to the start of the prompt |
|Control-E| Go to the end of the prompt |
|Control-U| Clear the current line |
|Control-C| Stop the running process (works for many, but not all) |
|Command-K| Clear the window |
|Command-L| Clear the last command |





<br>
<br>
<br>


#### ⏳ Activity (5 minutes)
- Open your terminal and let's try out a few terminal shortcut commands while completing the steps below.  
- You can open terminal via the dock, or by using Spotlight Search (`cmd` + `space`) and typing `terminal`.  

1. Create a folder on your desktop called `deleteme`.
    - `cd Desktop` **Tab it** only type `cd De` and then press tab
    - :eyes: `Desktop` is spelled by your computer with a capital `D`!  Case sensitive matters when searching for a directory or file!
    - `mkdir deleteme`
2. Inside `deleteme`, create a file `test.html`.  
    - `cd deleteme` **Tab it** only type `cd de` and then press tab
    - `touch test.html`
    - `ls` - make sure you successfully created touch.html
    - You can name your file whatever you want, but it must end with `.html`!
    - press the up arrow `touch test.html` should reappear
    - `control u` clear the line of text
    - `command k` clear the window
<hr>


<br>
<br>
<br>


## Part 4 - VSCode Shortcuts

Tomorrow we'll learn how to open files in VSCode from the terminal. For now, let's work on configuring VSCode for optimal productivity.

1. Under the `Code` tab, select `preferences` and then `settings`

![VSCode - Preferences > Settings](https://i.imgur.com/TPb0ABo.png)

2. Scroll down until you see `Editor: Word Wrap` and turn it on.

![VSCode - Word Wrap](https://i.imgur.com/u0XllkM.png)

3. Your long lines will now be wrapped. No more horizontal scrolling to see all of your code! <br>

![VSCode - Wrap](https://i.imgur.com/pU911Al.png)


<br>
<br>
<br>



 ### HTML Boilerplate
 - Every HTML document needs the same basic tags. There's an easy way to do this in VSCode.
 - Type `!` (this is called a 'bang' symbol) and click enter to choose the first option (the single bang).
 - File types matter.  Notice how we're in a `.html` file!

 ![html boilerplate shortcut](https://i.imgur.com/1D70i8m.png)

 Once you've done that, you should get an output like this:
 ![html boilerplate](https://i.imgur.com/M49wjNW.png)


<br>
<br>
<br>


### Commenting Code

Whether you're in an HTML, CSS, or JavaScript file, if you want to comment out your code (have the program ignore some lines of code), you can highlight your code and use one command:  `Command` + `/`.

:eyes: Commented out code looks different depending on the file type, so you'll use this shortcut frequently!

![comment code](https://i.imgur.com/GoxPKPj.png)


<br>
<br>
<br>



#### ⏳ Activity (2 minutes)

- Write some notes to yourself inside your HTML boilerplate `<body>` tag, and then comment them out using the shortcut!   



<br>
<br>
<br>



### Split Screen

- If you have more than one file that you'd like to look at in VSCode, you can go up to `View` > `Editor Layout` and then choose how you would like your panes to be displayed. There are lots of options! Play around with them. <br>

![VSCode - How to Split Panes](https://i.imgur.com/8gFkcRE.png)

Here's an example of a split pane layout:

![VSCode - Split Pane](https://i.imgur.com/IJaKfyU.png)


- You can also click and drag the tab, a 'shadow' window will appear of where the tab will go and split, if it is right, just let go, if you want it somewhere else, keep dragging it around.

![split screen](https://media.giphy.com/media/l0Iy2MnL9ejDrf73i/giphy.gif)



<br>
<br>
<br>



### Indentation

Code is indented to show parent/child relationships and emphasize hierarchy.  It also makes it a lot easier for humans to read.  Take the extra time (that you saved with all your shortcuts!) to indent your code properly _as you write it_.  

![indented code](https://i.imgur.com/RBTvNpo.png)

- If you'd like to change the size of your indents, go to `Code` > `preferences` > `settings` then scroll down to `Editor: Tab Size` and choose your desired tab length.

📕&nbsp;&nbsp;When you have time, check out the [AirBnB style guide](https://github.com/airbnb/javascript)

### Tabs Over Spaces
When indenting your code, please use the tab button. [Do not use your spacebar](https://youtu.be/SsoOG6ZeyUI).

<br>
<br>
<br>



## Typing
- Coding JavaScript often means reaching for keys that you're not used to. Take 2-5 minutes every day to practice
- Try [typing.io](https://typing.io/) that specifically lets you practice tying code
- You can also google `learn to type free` - to find the right typing practice for you, even going back and practicing touch typing regular characters can help you speed up


<br>
<br>
<br>



## Misc
- We covered a lot of different short cuts and tools today. Come back to this markdown as a reference and look up the things we did and keep practicing
- This course is intense, but it should never get in the way of self-care, make sure you are eating well, getting out of the house, stretching, sleeping enough, and finding ways to unwind that isn't in front of a screen
- There is an expression: "If you don't have time to do it right the first time, when will you have time to do it right a second time?" So take those extra moments to do it right - your future self will thank you


<br>
<br>
<br>



## Additional Resources

- [f.lux](https://justgetflux.com/)

