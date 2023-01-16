---
track: "Frontend Fundamentals"
title: "Install-fest Phase One"
week: 1
day: 1
type: "lecture"
---

# Install-fest 

<br>



For "install-fest", we'll install or verify the installation of the following tools on our machines:

- Slack
- Zoom
- Homebrew (For Mac and Linux)
- Xcode (For MAC Only and this can take sometime)
- VS Code
- Node (Go to Nodejs.org and download LTS version, or google how to install Node Version Manger on your OS so you can switch versions on the fly)
- Git / Github / Github Enterprise
- Global Gitignore (Optional)
- Spectacle (MAC Only)
- Imgur (MAC Only)

<br>
<br>





**PLEASE NOTE:** ***if you have a linux machine, [here are some resources](/additional-resources/install-fest-linux) that might be more ideal for your computer***

## Slack

We'll use slack to communicate throughout the course. <br>By the time you are reading this, you should have received an invite to the relevant channels via e-mail. <br>Although you can login via the web browser, downloading / installing the app is highly recommended.

<br>
<br>

## Zoom

[Download the Zoom client](https://zoom.us/download#client_4meeting) and install it.

[Download Slack](https://slack.com/downloads)

Remember to drag the Slack app into the Applications folder when you open the downloaded archive.

<br>
<br>

## Homebrew (Mac and Linux)

[Homebrew is a package manager](https://brew.sh/) that we will use to install various command line tools in our class.

### Confirm if Homebrew has already been installed.
Open up terminal and paste the following:

```shell
brew update
```

### And then check to see if everything is in working order

```shell
brew doctor
```

### Install Homebrew
If brew is not installed than paste the following command to install Homebrew. You might be prompted to install XCode Command Line Tools during the install process.

```shell
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

If you are prompted to install the XCode CLI, say yes and your homebrew installation will continue.

Please make sure to following the **Next steps:** instructions to add the two commands to your terminals PATH.  The actual path will contain your user account info as in **/Users/billieheidelberg/**

![](https://i.imgur.com/tHkIUO5.png)

After the installation process, run the command `brew doctor`. If any warnings or errors are displayed, we will need to resolve them before proceeding with the rest of the install fest.

Also try running `brew update` to make sure you have the latest lists of available software.


<br>
<br>

## Xcode (Mac Only)

We do not use Xcode in class but some other applications that we do use require some Xcode libraries. Normally, all you need is the Xcode CLI which should have already been installed when you installed Homebrew. If it didn't get installed, you can use this command:

```shell
xcode-select --install
```

If you need to, you can install Xcode through the App Store. (You probably don't need to.) [Link here](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)

If **Xcode** is already installed you will see the message below and nothing more is required at this time.

```shell
xcode-select: error: command line tools are already installed, use "Software Update" in System Settings to install updates (what does it mean?
```

## Visual Studio Code

Text editors are a personal choice. One of the most popular open source text editors these days, for good reason, is Visual Studio Code.

> Note: VS Code's _keyboard shortcuts_ are different than the shortcuts used by the Sublime or Atom editors. If you already know Sublime's shortcuts and don't want to learn those of VS Code, it's possible to configure VS Code to use Sublime's.

Download and install VS Code from [https://code.visualstudio.com/](https://code.visualstudio.com/).

**Important**: Be sure that VS Code is in your Mac's `Applications` folder.
#### Add Ability to Launch VS Code by typing `code` (Mac Only)

1. Launch VS Code using spotlight (`command + space` - then start typing `vs c` until you see the app, then press enter).
2. Hold `shift + command + P` to open the command palette.
3. Start typing `shell command` and when you the<br>`Shell Command: Install 'code' command in PATH` command - click it!

![](https://i.imgur.com/etKvCh3.png)
4. Quit VS Code and Terminal.
5. Relaunch Terminal
6. You should now be able to open a folder to edit by typing `code .`

Check [this link](https://code.visualstudio.com/docs/setup/mac) for troubleshooting if you run into issues.

## Git

Git may already be installed, you can check by running  in terminal

```shell
git --version
`````

Git is the version control software we will be using - it's extremely popular.

You should have already installed Git as instructed to complete the pre-work.

If it's not installed, we can use Homebrew to install it:

```shell
brew install git
```

<br>
<br>

#### Github

[Github](https://github.com/) provides a way to host Git repos in the cloud.  It enables collaboration and is wildly popular.

You should have already opened a personal Github account, however, you need to have a General Assembly Github Enterprise account as well. <br>You can get one by signing up here: [https://git.generalassemb.ly/join](https://git.generalassemb.ly/join)


#### Configuring a Global gitignore (Optional Step)

Everyone should have a global **git ignore** file so that you don’t have to worry about making the appropriate entries in a project’s git ignore.

First, create the file
```shell
touch ~/.gitignore_global
```  

Next, configure git to use this file

```shell
git config --global core.excludesfile ~/.gitignore_global
```  

Open the file in VSCode
```shell
code ~/.gitignore_global
```  

Finally, copy/paste the following into the file.  

```shell
# This is a list of rules for ignoring files in every Git repositories on your computer.
# See https://help.github.com/articles/ignoring-files

# Compiled source #
###################
*.class
*.com
*.dll
*.exe
*.o
*.so

# Packages #
############
# it's better to unpack these files and commit the raw source
# git has its own built in compression methods
*.7z
*.dmg
*.gz
*.iso
*.jar
*.rar
*.tar
*.zip

# Logs and databases #
######################
*.log

# OS generated files #
######################
._*
.DS_Store
.DS_Store?
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Testing #
###########
.rspec
capybara-*.html
coverage
pickle-email-*.html
rerun.txt
spec/reports
spec/tmp
test/tmp
test/version_tmp

# node #
########
node_modules

# Rails #
#########
**.orig
*.rbc
*.sassc
.project
.rvmrc
.sass-cache
/.bundle
/db/*.sqlite3
/log/*
/public/system/*
/tmp/*
/vendor/bundle


# Ruby #
########
*.gem
*.rbc
.bundle
.config
.yardoc
_yardoc
doc/
InstalledFiles
lib/bundler/man
pkg
rdoc
tmp

# for a library or gem, you might want to ignore these files since the code is
# intended to run in multiple environments; otherwise, check them in:
# Gemfile.lock
# .ruby-version
# .ruby-gemset

# CTags #
#########
tags

# Env #
#######
.env

# Python #
#######
*.pyc
__pycache__/
```

<br>
<br>

## Installing Spectacle (Mac Only)

Install [Spectacle](https://www.spectacleapp.com/) for resizing windows.

This free "productivity" tool is invaluable when it comes to minimizing the time spent sizing windows using the mouse.


## Installing Imgur (Mac Only)

Create an account on [imgur.com](https://imgur.com/) and install [mac2imgur](https://github.com/mileswd/mac2imgur) to ease uploading screenshots and other images from your computer to your imgur account.

## Install Node Version Manager

Node is a Javascript runtime that allows us to run javascript code out of the browser. Other Javascript runtimes include deno and bun. Node is by far the most popular and used.

- Google how to install Node Version Manager on your operating system


## Other Optional Cool things worth installing
- Starship.rs: Make your terminal prompt more coloful and useful (google how to install)
- Notable: Great application for taking notes using markdown syntax (the same syntax you'll be using for writing docs)
- Discord: Works like slack, many cohorts create their own discord or slack workspaces for talking amongst themselves and group work/study.