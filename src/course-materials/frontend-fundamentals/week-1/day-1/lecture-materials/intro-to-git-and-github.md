---
track: "Frontend Fundamentals"
title: "Intro to Git and Github"
week: 1
day: 1
type: "lecture"
---


# Intro to Git and Github


## Learning Objectives

| Student will be able to: |
|---|
| Describe what a Version Control System is |
| Describe the difference between Git and GitHub |
| Distinguish between local and remote repositories |

### What is version control, and why should you care?

A Version Control System (VCS) records changes to files over time so that you can recall specific versions later. It also makes working in teams easier, because it enables developers to submit changes to be merged into the codebase.

More specifically, a VCS allows you to:

- Revert files back to a previous state
- Review changes made over time
- Collaborate on a set of files with others
- Create separate "branches" of the codebase to develop new features on without impacting the "main", or production, branch.

In SEI, we'll be using the world's most popular version control system - [Git](https://git-scm.com/). Git was created by [Linus Torvolds](https://en.wikipedia.org/wiki/Linus_Torvalds) in 2005 to help with the development of his main project at the time - developing Linux.

## Git vs. GitHub

GitHub is not the same as Git. **GitHub** is a social network built around Git. It has completely changed the way we, as programmers, share and work on code. GitHub is now the largest online storage space of collaborative works, and it works with Git in order to keep track of versions, issues, and requests for changes.

GitHub also plays the important role of a cloud-based backup system - a safe place for all your work! Your code, and the time you spent writing it, is valuable, therefore, you don't want to risk losing it to hardware failure, etc. So we "connect" our local Git repo to a "remote" repo on GitHub where we can then "push" code to, and "pull" code from - on demand.

In summary:

- Git provides us with local repositories on our computers
- GitHub provides us with remote repositories stored in the cloud
- A local repository is "linked" to a remote repository by adding a "remote" with this command
    
    ```bash
    git remote add <name of remote> <URL of repo on GitHub>
    ```
    

## Summary of Common Git Commands

In SEI, you'll get plenty of practice using Git, especially during project week because each of your projects will be stored in its own directory and will be made a Git repository in that directory tracking the changes.

[Here](https://training.github.com/downloads/github-git-cheat-sheet.pdf) is a Git Cheat Sheet from GitHub for your convenience; however, the following summary of commands will "git" you far:

### `git init`

Initializes a local repository. Used in lieu of cloning a GitHub repo. All local repos contain a hidden **.git** directory responsible for holding repo-related data.

### `git status`

Checks and reports on the status of your repo. It will inform you what changes to tracked (staged) files will be included in next commit, if there are any untracked files that have been added to the project or have changes, etc.

### `git add <path>`

Adds an entire directory or individual file (or files using a * as a wildcard) to the "staging area" for the next commit.

### `git add .`

Adds all changes within the repo to the staging are for next commit.

### `git commit -m "<message>"`

Commits all staged changes to the local repo. The message should be in worded such that it describes what the commit does, not what it did. For example, "Style nav bar" instead of "Styled nav bar".

## The flow of making changes to a repo

![The GIt Workflow. Move work from the working directory into the Git staging area with `git add`. Move everything in the staging area to the local repo with `git commit`. Push from the local repo to a remote repository with `git push`. Pull to the local repository from the remote repository with `git pull`.](https://i.imgur.com/MGQoFYo.png)

The GIt Workflow. Move work from the working directory into the Git staging area with `git add`. Move everything in the staging area to the local repo with `git commit`. Push from the local repo to a remote repository with `git push`. Pull to the local repository from the remote repository with `git pull`.

This is the basic Git/GH workflow. Things get a bit more complex when you start sharing code and manage larger codebases.

<aside>
🚨 IMPORTANT: Do not create a repo within an existing repo!  If you find your computer very sluggish, it might be because you have "nested" repos. It's not uncommon for students to accidentally make their home folder (~) a repo - so start there if you suspect something is wrong. Another common mistake is trying to add/commit/push from the wrong directory, make sure you’re in the same directory where your .git is (you can check that by using the command: ls -a).

</aside>

## Fork & Clone the Daily Code Challenges Repo

Let's practice forking, cloning, and saving work to a repo by setting up and completing today's Daily JS Code Challenge!

1. First, browse [here.](https://github.com/SEIR-1031-Resources/daily-js-code-challenges)
2. Follow the instructions and set up the repo.
3. Move to the `daily-code-challenges` directory.
4. Open in VS Code: 
    
    ```bash
    code .
    ```
    
5. Edit the `challenges.js` file to solve the `01-addOne` challenge.
6. Be sure you have turned Auto Save on and that the changes you are making are being saved.
7. Check the status of the repository:
    
    ```bash
    git status
    ```
    
8. You'll see that there are changes not staged for commit - let's stage them with this command:
    
    ```
    git add .
    ```
    
    Then check the status again. You'll see that there are now changes to be committed. Let's do so:
    
    ```bash
    git commit -m "Solve addOne"
    ```
    
    Check the status one last time. You'll see now that there are no changes to commit. We're ready to push the committed changes up to GitHub.
    
    ```
    git push origin main
    ```
    

Congrats on solving the first daily code challenge, saving your changes to the local repo and pushing it to GitHub!
