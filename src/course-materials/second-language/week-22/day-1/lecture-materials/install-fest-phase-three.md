---
track: "Second Language"
title: "Install-fest Phase Three"
week: 19
day: 1
type: "activity"
---

The Instructions below are for installing on Mac, if installing on Linux or Windows use the following:
- [Install Ruby/Postgres on Windows](https://gorails.com/setup/windows/10)
- [Install Ruby/Postgres on Ubuntu](https://gorails.com/setup/ubuntu/20.04)
- [Install Ruby/Postgres on M1 Mac](https://kemalmutlu.medium.com/installing-ruby-on-rails-macbook-pro-m1-4272da855fb3) | [In Case You need to Reinstall Homebrew if Rbenv doesn't install](https://5balloons.info/correct-way-to-install-and-use-homebrew-on-m1-macs/)

# Ruby - Environment

## &#x26A0; Uninstall RVM (Ruby Version Manager)

To check if you have RVM installed simply run the command `rvm`. If it is not intalled you'll see the message `command not found: rvm`

<img src="https://i.imgur.com/Vs12OwE.png" alt width=400 />

If it is installed then uninstall rvm by following these instructions: 
- [uninstall rvm](https://installvirtual.com/how-to-uninstall-rvm-implode-rvm-on-mac/)

Once you have removed rvm close and reopen the terminal.  Then test running the rvm command and confrim it's been removed.

## Homebrew


### Confirm Homebrew Install

- See if brew is already installed by typing:


```sh
brew -v
```

You should get a message similar to the following:

<img src="https://i.imgur.com/CpwMwUi.png" alt width=400 />

### Install Homebrew
- If [Homebrew](http://brew.sh/) is not installed then copy/paste this into the terminal:

```text
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### Homebrew Installed Already
- If brew is installed, run `brew upgrade` to upgrade to the latest version of homebrew
	* Might take a while, might upgrade stuff for postgres, node, heroku, etc.
- Run `brew update` to update the list of installable programs by homebrew
	* Might say Already up-to-date

## Install rbenv

rbenv is a version manager for Ruby. We don't want to use our system Ruby because we can mess with it. Instead, let's get an up to date version of Ruby that is safe to mess with.

- Check if rbenv already installed: `rbenv`
- If already exists, upgrade with:

```sh
brew upgrade rbenv ruby-build
```

Otherwise:

```sh
brew install rbenv ruby-build
```

## View Possible Ruby Versions
**See which versions of Ruby you can download**
```sh
rbenv install --list
```
There will be stuff like `rbx` and `jruby`, we are only interested in the ones that start with numbers.  
You should see outputs similar to the following:

<img src="https://i.imgur.com/lVhFWiW.png" alt width=400 />

Or you can try using the `rbenv install --list-all` command to list all the versions. In the middle of the list, you will see outputs like: 

<img src="https://i.imgur.com/XNvBwbh.png" alt width=200 />

Either command is fine, you need to choose the version of ruby before `jruby-someversion` or `-dev`

## Install Latest Ruby
**Install the latest version of Ruby**

At the time of updating this readme the current version was 3.0.1. 


```sh
rbenv install 3.0.1
```

* There is no way within rbenv just to get the latest stable version
* You **must** install Ruby 3.0.1 or greater for Rails 6.
* Install might take a long time -- Terminal could just look like it's hanging

> ruby-build: use readline from homebrew
>
> Installed ruby-3.0.1 to /usr/local/var/rbenv/versions/3.0.1

## View Installed Versions of Ruby

```sh
rbenv versions
```

![](https://i.imgur.com/ZEICt8R.png)

* system is your system Ruby
* asterisk is next to the version that you are using

## View Currently Running Version of Ruby

```sh
rbenv version
```

## Switch rbenv to a different Version of Ruby

```sh
rbenv global 3.0.1
```

Check with `rbenv versions`. Asterisk should be next to 3.0.1

Tell the computer we've switch versions of ruby and confirm:

```sh
rbenv rehash

rbenv versions
```

**CLOSE AND RESTART TERMINAL**

## Update Environment to use new Ruby

Confirm ruby version _now in use by the system_ is `3.0.1` or something similar

```sh
ruby -v
```

**IF NOT**

```sh
echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
```

* (replace `.bash_profile` with `.zshrc` if you're using zsh)

```sh
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bash_profile
```

* (replace `.bash_profile` with `.zshrc` if you're using zsh)
	
`$ echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bash_profile`
	* (replace `.bash_profile` with `.zshrc` if you're using zsh)
	
Close and repoen the terminal and confirm ruby version _now in use by the system_ is `3.0.1` or something similar
```sh
ruby -v
```

## Install a gem

Gems are like NPM packages for Ruby, but they're installed globally, as opposed to multiple times for each application that you build.

The steps below will confirm that you are able to install a gem.  The gem is called `pry` which is one of the available ruby terminal shells we can use to run ruby commands via the terminal. 

1. List gems with `gem list`
1. Run `gem install pry` to install a gem called pry.  It's a ruby REPL command
1. Run `rbenv rehash` to tell computer we've installed a new gem
1. List gems with `gem list` look for `pry`
1. Run `pry` to start pry command
1. Inside pry type `2 + 2`
1. If that works, type quit

Note: 
- If you are getting a permissions error you can aadd `sudo` in front of the command for now.
- Might need to update the gem manager with `gem update --system`


## Install Rails 6

1. Run `gem install rails` to install the rails commands
2. `rbenv rehash`
3. `rails -v`


<img src="https://i.imgur.com/LgInpgn.png" alt width=200 />



Note: if Rails already installed, might need to run `bundle update rails`

## Test Rails
1. Run `rails new blog --api` to create a new app
2. `cd blog`
3. Run `rails s` to start the server
4. Now, everything should be good. 
<img src="https://i.imgur.com/yvr70Hj.png" alt width=400 />
5. Ready to see something cool? Go to `http://localhost:3000`

<img src="https://i.imgur.com/ig6BSe5.png" alt width=400 />

## Install Postgres on Mac

Follow the directions [HERE](https://postgresapp.com/)
