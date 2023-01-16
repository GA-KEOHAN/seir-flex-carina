---
track: "Second Language"
title: "Ruby vs. Javascript - The Differences"
week: 1
day: 1
type: "lab"
---


# Ruby Basics Practice

For this assignment, you'll complete reps and practice problem solving with Ruby to get familiar with the language.

<br>
<br>
<br>


# Getting Started

1. Create a [Ruby Repl.it for this lab](https://repl.it/@DanielScott2/Ruby-Basics-Practice-Lab#main.rb)


<br>
<br>
<br>



### Resources

#### Ruby Documentation

The Ruby documentation is excellent, take advantage of it! Load the following pages in your browser so that you can search for any useful Ruby methods to help you solve the problems (look through the 'methods' column on the left)

- [Arrays](https://ruby-doc.org/core-2.5.3/Array.html)
- [Strings](https://ruby-doc.org/core-2.5.3/String.html)
- [Enumerators](https://ruby-doc.org/core-2.5.3/Enumerator.html) + [Enumberables](https://ruby-doc.org/core-2.5.3/Enumerable.html)
- [Hashes](https://ruby-doc.org/core-2.5.3/Hash.html)

<br>
<br>
<br>


# Deliverables

Complete all problems below in the ruby repl.it you created and submit using the usual homework submission tracker.

<br>
<br>
<br>


## Get Started With a Few Reps

### Hello World

1. Print "Hello World" to the console

After you have printed Hello World:

```ruby
adjective = "Big Bad"
```

2. Interpolate the `adjective` variable into the Hello World string using `#{}`

Expected output:

```ruby
=> Hello Big Bad World
```

3. Save "Hello World" to a variable. Without changing the letters in your code manually, permanently change "Hello World" to all uppercased letters.


<br>
<br>
<br>



### Nums Array and Enumerables

With the following array:

`nums = [5, 5, 6, 7, 2, 4, 3, 2, 1, 9, 7, 6, 0, 0, 35, 19, 66, 3, 22, 21, 4, 4, 4, 0, 1, 2, 3, 4, 12, 15]`

1. Use `.uniq` to print the array with all duplicate entries removed

2. Next, use `.push` and `.pop` , `.shift` `.unshift` and `.length` on the array as you would with javaScript (if you need to add a number, add 5)

3. Use `.include?` to check if the array contains the number 8

4. Use `.find_all` to find all the numbers greater than 10

5. use `.all?` to check if all the numbers are greater than 0?

6. use `any?` to check if there are any numbers that are divisible by 8

7. use `.count` to let you know how many numbers are greater than 4

8. use `.each_with_index` to print each item times its index

9. `.find` the number that is divisible by 7 and 5 and is greater than 0

10. `.find_index` of the number that is divisible by 5 and 7 and is greater than 0

11. return the `.first` 3 numbers

12. return the `.last` 5 numbers

13. `.group_by` the modulo of 3 ( `% 3` )

14. use `minmax` to return the smallest and largest number

15. use `.reject` to return all the numbers that are NOT divisible by 3

16. use `.select` to return all the numbers divisible by 5

<br>
<br>
<br>



### Color Array

With the following array:

`colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']`

1. Print out a random color.

1. Print out the `colors` array in reverse order.

1. Print out all of the colors in the array with all capital letters.


<br>
<br>
<br>



### Methods

Write a method named `find_area` that finds the area of a rectangle when given values for width and height
  - REMEMBER: In Ruby, the keyword `return` is implied and can be omitted!

  ```ruby
  def find_area height, width

  end
  ```

Write a method named `multiply_each_by_five` that will loop over the given `nums` array below and print each number multiplied by 5

  ```ruby
  nums = [5, 5, 6, 7, 2, 4, 3, 2, 1, 9, 7, 6, 0, 0]

  def multiply_each_by_five arr

  end
  ```

<br>
<br>
<br>



### Methods With a Hash

Use the following given hashes to solve the problems below

```ruby
# Hashes

book = {
  title: 'The Great Gatsby',
  author: 'F Scott Fitzgerald',
  year: 1925,
  price: 10
}

lamp = {
  type: 'reading',
  brand: 'Ikea',
  price: 25
}

table = {
  type: 'bed side',
  brand: 'Crate & Barrel',
  color: 'birch',
  price: 50
}
```

1. Write a method named `print_price` that will take in any hash and return the price of the item.

2. Write a method named `print_item_sums` that will take in two hashes and will return the sum of the prices for the items in the hashes.

<br>
<br>
<br>



## Solving Problems with Ruby

### Euler Problem 1

If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.

Find the sum of all the multiples of 3 or 5 below 1000.

<br>
<br>
<br>



### Primes

1. Write a method called `check_prime?` that will test whether a number is Prime. The method will return true if Prime, false if not.

1. Write another method called `get_primes` that will print all the Primes up to an arbitrary limit. For example, if you invoke your method with `get_primes 100`, it will print all the Prime numbers up to and including 100.
  - This method can call on the previous check_prime? method.

Check out the [documentation on Ruby's Prime class](https://ruby-doc.org/stdlib-2.5.3/libdoc/prime/rdoc/Prime.html)

Reminders:

> A Prime number is a number that is not evenly divisible by another number except 1 and itself.
> To test whether a number is Prime, you only need to test as far as the square root of that number. This is advisable for optimization and testing large numbers.

<br>
<br>
<br>



## Hungry For More?

### Pandigital Numbers

A number of length n is _1-to-n pandigital_ if it makes use of all the digits 1 to n exactly once.

- The number `15234` is _1-to-5 pandigital_.

- The number `333` is **not** _1-to-n pandigital_.

- The number `0` is **not** _1-to-n pandigital_.
- The number `10` is **not** _1-to-n pandigital_.

- The number `987654321` is _1-to-9 pandigital_.

Write a method that takes an argument `n` and returns `true` if the number is _1-to-n pandigital_, and `false` if it is not.


<br>
<br>
<br>



### Word Frequency

Write a method that will find the word that appears in a given sentence with the greatest frequency. If there is a tie, either of the words will do as a result.


<br>
<br>
<br>


### More?

- Finish the bonus MBTA lab from earlier.
- Solve [this problem](https://projecteuler.net/problem=13) in both Ruby & JavaScript. You can sign in to Project Euler to submit your answer and check if it's correct.
- Do a kata or two on [Codewars](https://www.codewars.com/)

