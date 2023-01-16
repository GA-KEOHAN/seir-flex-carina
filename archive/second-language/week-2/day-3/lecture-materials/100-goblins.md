---
track: "Second Language"
title: "100 Goblins"
week: 2
day: 3
type: "lecture"
---

# 100 GOBLINS

This was an interview coding challenge used by Microsoft to challenge its interviewees. It was called 100 Doors but this time, we're using sick Goblins.

## What you should do after we read the problem:

1. Pseudo code the solution
2. Once your pseudo-code is written, write code that will solve each section of your pseudo-code and return the final result.

![goblins](https://i.imgur.com/Nq4qBwT.png)

<hr>


There are 100 Goblins suffering from acid reflux, and you are a sadistic Goblin doctor with
the cure. You want to torture the Goblins with a little game.  

* You line up all the Goblins and
give each of them the cure in turn, all 100 Goblins.  

* But then you start from the beginning of the line and go over them a second time, removing the cure for every **second** Goblin, starting with the **second** Goblin.  

* Then you do it a third time for every **third** Goblin, starting at the **third** Goblin: if the Goblin you now administer was previously cured, they are now uncured, and if the Goblin was uncured, they are now cured. You do it a fourth time, and go to every fourth Goblin starting with the fourth. The fifth time, you go to every fifth Goblin starting with the fifth ....  

> After you have gone down the line of Goblins 100 times, which Goblins are cured at the end?

Hint: set up an array of goblins first using a datatype good for setting either *true* or *false*
values. It's certainly *false* that all the all goblins are cured at the beginning . . . .


&#x1F535; **Activity**

1. Solve the 100 Goblins problem!

1. Use loops for this exercise! You will eventually need a loop within a loop.

## FINAL RESULT:

2. Once you have your goblins array populated with the final *true* and *false* values after having gone through the entire process of curing and uncuring, translate your final array to another array of numerical values of the *cured Goblins only*.

If the first Goblin is cured, the first number in the array will be 1 (not zero). If the 100th Goblin is cured, the last number in the array will be 100. The expected output (solution) will be a list of all the **perfect squares** up to and including 100.

Perfect squares:

```
=> [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
```



## TIPS
<details>
1. You could push false into an array 100 times to get your 100 goblins
<br>
2. You could iterate over the goblins as many times as the length of the array
<br>
3. You could use the current number as the starting point in a range for the inner loop
<br>
4. The Range could step by some incrementing number to skip over goblins
<br>
5. When the iterators are finished, you could get the index value of the goblins that have been cured . . .
</details>

---

# HUNGRY FOR MORE?
You now know two programming languages! Translate your solution into the other language.

# Feeling Famished?
Head on over to [codewars.com](https://codewars.com), add Ruby to your languages, and get some practice in there. 
