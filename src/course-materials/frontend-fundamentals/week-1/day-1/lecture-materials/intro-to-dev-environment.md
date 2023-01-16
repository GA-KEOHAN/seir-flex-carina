---
track: "Frontend Fundamentals"
title: "Intro to the Dev Environment"
week: 1
day: 1
type: "lecture"
---


# Intro to the Dev Environment

<br>
<br>
<br>
<br>




## Learning Objectives

Students will be able to:

- Be more productive by using the keyboard vs. the mouse

- Use the _Terminal_ Command Line Interface (CLI) to navigate and manipulate the filesystem

- Use the _VS Code_ text editor to open and edit files


<br>
<br>



## Using the _Terminal_<br>Command Line Interface

<br>

### What is _Terminal_?

- _Terminal_ is the developers' choice for entering commands and navigating the filesystem

- _Terminal_ is also known as a _shell_.  The default shell in Mac OS X is _Bash_. You will find the terms _terminal_ and _bash_ often used interchangeably

- Go ahead and open _Terminal_ (remember - use Spotlight!)


### Command Line Basics
<p>Here are the basic command tasks we'll try out:</p>

- Change directories (folders)
- List a directory's contents
- Create a directory
- Create a file
- Move files and directories
- Copy files and directories
- Rename files and directories
- Delete files & directories
- Command history & clearing the window

<br>
<br>

#### Change Directories

- We use the `cd` command to change directories

- Let's change to the _home_ directory of the logged in user:

	```shell
	$ cd ~
	```

- Here are a few common shortcut characters used when navigating the filesystem:
	- `~` The logged in user's _home_ directory
	- `/` The _root_ (top-level) directory on the hard drive
	- `.` The current directory
	- `..` The parent directory of the current directory

- The `pwd` command "prints" the current (working) directory


<br>
<br>

#### List a Directory's Contents

- Use the `ls` command to display a concise list

- `ls` does not display hidden files by default, adding the `-a` option will show them

<!-- - `tree` is a nice utility for displaying a graphical representation of a directory and its nested directories.<br/>Install it by typing `brew install tree` -->

<br>
<br>

#### Create a Directory

- Use the `mkdir` command to create directories

- Let's create a `drawers` directory inside of the _home_ directory:

	```shell
	$ mkdir ~/drawers
	```

- Note that you don't have to specify the _full path_ if we are already in the _home_ directory


<br>
<br>

#### Using Tab Auto-Completion

- Change to the _home_ directory

- Now let's change to our newly created `drawers` directory, however, only type `cd d`,<br/>then press `tab` which will auto-complete directory name(s)

- You can cycle between matching directory names by continuing to press `tab`


<br>
<br>

#### Creating Files

- We use the `touch` command to create empty files

- Let's move to the `drawers` directory and create a directory named `socks`. Here is how we can create the directory **and** change to it using a single command:
	
	```shell
	$ mkdir socks && cd socks
	```

- Now let's create a `dress.socks` file:

	```shell
	$ touch dress.socks
	```

<br>
<br>


#### Practice Creating Directories and Files

1. Create this directory: `~/drawers/pjs`

2. Create two files in the new `pjs` folder named `warm.pjs` and `favorite.socks`


<br>
<br>

#### Moving Files
- Okay, so we have a messy `drawers/pjs`, let's move our `favorite.socks` file out of the `pjs` folder and into the `drawers/socks` folder where it belongs!

- Here's how we can do the move regardless of which directory we're currently in by using absolute paths:

	```shell
	$ mv ~/drawers/pjs/favorite.socks ~/drawers/socks/
	```
	Be sure to use tab-completion!

> Note that you have the option to use _absolute_ and/or _relative_ paths.


<br>
<br>

#### Moving Directories

- Moving directories is just as easy using the same `mv` command

:alarm_clock: Try it out:
	1. Create a `~/shorts` directory
	2. Move the newly created `shorts` directory into the `drawers` directory


<br>
<br>

#### Renaming Files

- Guess what - there's no dedicated bash command to rename files and directories!

- Don't panic!  The `mv` command is very flexible!

- Here's how we can rename the `warm.pjs` file to `summer.pjs` from anywhere:
	
	```shell
	$ mv ~/drawers/pjs/warm.pjs ~/drawers/pjs/summer.pjs
	```
- Of course, you can actually move and rename simultaneously!


<br>
<br>

#### Deleting Files

- We use the `rm` command to delete both files and directories

- Let's first use it to delete the `dress.socks` file. Here's one way:
	
	```shell
	$ cd ~/drawers/socks && rm dress.socks
	```

- Using the `*` wildcard character, it's possible to delete and move multiple files. For example, typing `*.socks` would match all files with an extension of `.socks`...


<br>
<br>

#### Deleting Directories

- Deleting directories is almost the same as deleting files except you must use the `-r` option, which runs the `rm` command "recursively" to delete a directory and it's contents.

- To delete the `pjs` folder we could use this command:

	```shell
	$ rm -r ~/drawers/pjs
	```


<br>
<br>

#### Moving Multiple Files
- To demonstrate moving multiple files, re-create the `dress.socks` file we just deleted from the `socks` directory

- Now let's move all of the `.socks` files out of the `socks` folder into our _home_ folder. The following command assumes we're inside the `socks` folder:

	```shell
	$ mv *.socks ~
	```

- Now, without changing directories, return the socks files back to where they belong


<br>
<br>

#### Copying Files & Directories
- Use the `cp` command to copy files and directories

- Here's how we can copy all **.js** files:

	```shell
	$ cp *.js ~/dest-folder
	```

- And entire directories by adding the `-R` option:

	```shell
	$ cp -R ./sample-code ~/dest-folder
	```
	
<br>
<br>

#### Command History & Clearing the Window
- Pressing the up and down arrows in Terminal will cycle through previously entered commands.  This can be a huge time saver!

- If you'd like to clear the Terminal window, simply press `cmd+k`

<br>
<br>

## Using _VS Code_ to Open and Edit Files

<br>



### What is _VS Code_?

- _VS Code_ is a popular open-source text-editor maintained by Microsoft

- It's very customizable and capable

- VS Code's functionality can be extended using _extensions_, however, most useful features are built-in

- To try it out, let's use VS Code to open and edit a file...


<br>
<br>

### Add _VS Code_ to <code>$PATH</code>

- We want to be able to type in `code .` in Terminal and have VS Code open the current directory for editing

- First, open VS Code's **Command Palette** by pressing `⇧⌘P`

- Next, type "shell command" and select the `Shell Command: Install 'code' command in PATH` command

- Restart Terminal for the new $PATH to take effect

> For the above to work, VS Code must be installed in the **Applications** folder


<br>
<br>
<br>


## Going Forward
- Today, we have only scratched the surface of tools such as _Terminal_ and _VS Code_

- Rest assured that throughout your time in SEIR, we will help you to get to know these tools much better!