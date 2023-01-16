---
track: "Frontend Fundamentals"
title: "Classes"
week: 2
day: 3
type: "lab"
---


[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Dojo Fighter JS

By Alex Merced

![Ken & Ryu Battling Akuma](https://media.giphy.com/media/5h9rfUCaJf916/giphy.gif)

*If you get stuck at anypoint look up the Ken v Ryu videos in this playlist to give you an idea on how to approach this homework => https://youtube.com/playlist?list=PLY6oTPmKnKbagncvwQeIvSmHlirSGNCUO*

## Objectives

- Practice Creating Classes 
- Instantiating Objects
- Having Objects Interact with Each Other

## Game Synopsis

Two Fighters do battle till one wins

*** 

## Step 1

- Create a fighter class

#### PROPERTIES

- name: The fighters name

- health: represents the fighters health, they lose when this reaches, should always start at 10

- strength: represents the offensive strength of the fighter, random number between 5-10

- defense: represents the ability of the fighter to take a hit, random number between 5-10

#### Methods

- attack: one fighter attacks the other, the damage dealth should be the attackers strength - defenders defense. After the attack the following should be logged "|Attacker| did |x| damage to |defender| who is left with |y| health" use interpolation or concatenation. Make sure to check so you don't accidentally do negative damage.


## Step 2

Create the following game logic

- Generate two fighters

- Create a loop that does the following
    - The Two fighters attack each other
    - If one fighters life hits 0 the loop should break

- log the winner after the loop breaks
