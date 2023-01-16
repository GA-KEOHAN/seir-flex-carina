---
track: "React Fundamentals"
title: "Bubble Sort"
week: 2
day: 3
type: "lecture"
---


# BUBBLE SORT

Bubble sort is one of the first sorting algorithms you should master. While it isn't particularly efficient, it's simple and intuitive.  Bubble Sort compares neighboring elements and forces larger elements to 'bubble' to the end of an array while simultaneously 'floating' smaller elements to the top/front of a list.  This sorting algorithm is what you might do if you were asked to sort a list one by one.

#### How it works:

![](https://upload.wikimedia.org/wikipedia/commons/c/c8/Bubble-sort-example-300px.gif)

Bubble sort steps through the list to be sorted, compares each pair of adjacent items, and swaps the items if they are in the wrong order. 

The algorithm passes through the list repeatedly until there are no more swaps occuring.

Given an unsorted input:

```
[4, 3, 6, 77, 0]
```

The algorithm will first check `4` and `3`, and if they are in the wrong order, it will swap them, giving the result:

```
[3, 4, 6, 77, 0]
```

(3 and 4 are now in order)

The algorithm will then check `4` and `6`, and if they are in the wrong order, it will swap them. Since `4` and `6` are in the correct order, they will not be swapped.

Traversing the array and doing the correct swaps is just a single pass: the entire array will likely not be sorted after a single pass. The algorithm has to do the process again and again until there are no more swaps. 

##### Visualize the Sort
- [Visualizer with steps (click 'Run')](https://www.hackerearth.com/practice/algorithms/sorting/bubble-sort/visualize/)
- [A more colorful visualization of many sorts!](https://imgur.com/gallery/voutF#7VfpnQp)

# Hungry for More?

Consider going through some of the myGA modules, starting with Introduction to Computer Science. There's a module for bubble sort in the Algorithms > Basic Sorting Algorithm's if you want to learn more about this sort in particular. You can also watch the module on 'Big O'.

Try this [sudoku validator](https://www.codewars.com/kata/53db96041f1a7d32dc0004d2/train/javascript)
