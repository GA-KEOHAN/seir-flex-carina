---
track: "Second Language"
title: "Intro to Ruby"
week: 1
day: 1
type: "lecture"
---

# Intro to Ruby

<br>
<br>
<br>

## Lesson Objectives

*By the end of this lesson, students will be able to:*

1. Use Basic Ruby Syntax
1. Work with Ruby in the terminal
1. Utilize Ruby primitives
1. Use some Ruby methods
1. Understand Ruby Control Flow

<br>
<br>
<br>


## Basic Syntax

- We don't need the keyword `var` anymore
- We don't need to end statements with semi-colons
- Single line comments are a `#`
- Most variables use `snake_case` naming conventions

Open up `pry` in your Terminal, but please only type if your instructor tells you to.
> NOTE: If you don't have pry installed, you can use `irb` instead.

```ruby
long_variable_name = 1 #assign long_variable_name the value of 1. Note snake_case naming convention
```

<br>
<br>
<br>

## Working with the terminal

- The equivalent of `console.log()` is `puts`
- Functions in ruby don't need parentheses, but you **can** use them

```ruby
puts('hi'); #JavaScript way
puts 'hi'
p 'hi' #shorter syntax
```

We can also retrieve values from user input using `gets`

```ruby
some_var = gets
puts some_var
```

**Exercise:** `gets` a value from the command line, and save it into a variable called `command_line`. Then print it out with the "shorter syntax" above.

<br>
<br>
<br>


## Primitives

There are primitive data types in Ruby (int, string, etc), just like in JavaScript.

<br>
<br>
<br>


### Types

Ruby gives us the standard types, plus a few extras.


<br>
<br>
<br>


#### Strings

```ruby
puts "Ruby" #double quotes
puts 'Python' #single quotes

puts "Ruby".size #string method to get length of string
puts "Ruby".length #also works to get length of string
puts "Ruby".upcase #uppercase a string

puts 23.to_s #convert a number to a string

foo = "bar"
puts "oh hai #{foo}" #string interpolation
puts 'oh hai #{foo}' #string interpolation doesn't work with single quotes

#multi line strings use a different syntax
long_string = <<-EOF
asdfkajsdf;alsdf
asdfkajsdfsdf
asdfjkasdfa
sdfjasdf
EOF
puts long_string
```

<br>
<br>
<br>


#### Booleans

Ruby booleans work essentially the same as in JavaScript:

```ruby
a = false
b = true
p a && b #false
p a || b #true
```

**Exercise:** Print the length of the string "JavaScript", then save the value `true` to two variables, and make sure the value of both the first variable `&&` the second variable together evaluate to `true`.

<br>
<br>
<br>


#### Integers

`puts` does some interesting things to numbers. These are consistent, but somewhat different from the interesting things that JavaScript does.

```ruby
puts 5 / 2 #rounds
puts 122 #normal
puts 0x7a #hex value
puts 0172 #octal
puts 0b1111010 #binary
puts 23_482_345_629 #long numbers: substitute _ for ,
```

<br>
<br>
<br>


#### Floats

```ruby
p 5.0 / 2 #force a float
p 5.fdiv 2 #float division
p 12.to_f #convert to float
p sprintf "%.4f" % (1/3.0) #format a value
p 1.2e-3 #scientific notation
```

**Exercise:** Print out the decimal/float version of `7 / 2` (make sure there is a decimal point).

<br>
<br>
<br>


#### BigDecimal and `require`

Ruby, much like Node, can `require` packages (gems) to augment the default functionality of Ruby.  Some of these packages need to be downloaded (`gem install`), but some are available by default, like `bigdecimal`.

```ruby
puts 1.2 - 1.0 #outputs 0.19999999999999996
```

```ruby
require 'bigdecimal'
puts BigDecimal("1.2") - BigDecimal("1.0") #outputs 0.2E0 - scientific notation
```

```ruby
require ('bigdecimal');
puts BigDecimal('0.0000000000001') #output in scientific notation
```


<br>
<br>
<br>


#### Rational Numbers

```ruby
p 2.to_r #outputs (2/1)
p Rational 0.5 #outputs (1/2)
p 2/3r #can use fraction notation
p 2/3r+1 #can combine fraction notation with other math
```

>**Note:** This is, depending on whom you ask, one of the best or worst parts of Ruby--you can write things in A LOT of different ways. You can pick whichever way makes the most sense to you for project 4, but just make sure that you are consistent.


<br>
<br>
<br>


#### nil

```ruby
a = nil #same as null
puts a
```

#### Symbols

Symbols can be substituted for strings

```ruby
light = 'on' #could do this
light = :on #better to do this
```

When using values that won't change, we can use symbols.  Symbols are like strings, but are faster for the following reasons:

- For each symbol value, there is only one instance.  Symbols with the same value reference the same chunk of memory.

	```ruby
	p :name.object_id
	p :name.object_id #:name is the same object in memory as :name on the previous line
	p "name".object_id
	p "name".object_id #this is a different string, and therefore a different place in memory than "name" above
	```

- Symbols cannot be changed at runtime

	```ruby
	foo = :bar
	foo = :baz #completely different symbol than :bar
	```

- `Symbol` is smaller than `String`

	```ruby
	p :name.methods.size
	p "name".methods.size
	```

**Exercise:** Print out the `object_id` of `:hello` twice, then the `object_id` of `"hello"` twice. Make sure the symbol `object_id`s are the same, but the ones for the string versions are different.

<br>
<br>
<br>


#### Arrays

Arrays in Ruby are similar to JS, but have a couple extra shortcuts:

```ruby
a = [1,4,6]
b = Array(1..6) # 1-6 - called a range
c = Array(1...6) # 1-5 (all numbers up to, but **not including** the second one)
p a
p b
p c
```

#### Hashes

Ruby hashes are essentially like JS objects, but without methods:

```ruby
domains = { 'location' => "United States" } #could do this
domains = { :location => "United States" } #better to do this

domains = { 'de' => "Germany", 1 => "Slovakia", :us => "United States" }
p domains
p domains['de']
p domains[1]
p domains[:us]

# Shortcut syntax:
countries = { de: "Germany", us: "United States" }
# Produces this hash: { :de => "Germany", :us => "United States" }
```

<br>
<br>
<br>


### Everything is an Object

Every possible value in Ruby has properties and methods that we can access with "dot notation":

```ruby
p true.class, false.class
p "Ruby".class
p 1.class
p 4.5.class
p 3_463_456_457.class # like 3,463,456,457
p :age.class
p [1, 2, 3].class
p({ :name => "Jane", :age => 17 }.class)
```

**Exercise:** Make a hash called `me` that has a symbol key of `:name` and value of your name (string or symbol), and a numerical key of `1` with a boolean value that represents whether you like the TV show "Stranger Things".  Print this hash, then print its `class`.


<br>
<br>
<br>


### Conversion

With Ruby, we can easily convert between data types:

```ruby
p '4'.to_i #to integer
p 4.to_s #to string
p 5.to_f #to float
p 0.5.to_r #to rational
p "Jane".to_sym #to symbol
```

<br>
<br>
<br>


## Methods

In Ruby, methods are not objects like they are in JavaScript:

```ruby
def h
	puts 'Hello World!'
end
h()
h # also calls the function
h.class # NilClass
```

with params:

```ruby
def h(name)
	puts "Hello #{name}!"
end
h("Matt")
h "Matt"
```


<br>
<br>
<br>


## Control Flow

### If/Else

In Ruby, we do not need parentheses for our truth conditions, and we spell `elsif` a little differently than in JavaScript:

```ruby
a = 5
if a > 1
	p 'greater than 1'
elsif a == 1
	p 'equals 1'
else
	p 'less than 1'
end
```

We can also use opposite truth conditions:

```ruby
a = 5
unless a >= 1
	p "less than 1"
end
```

We can also write Ruby conditionals on one line:

```ruby
a = 1
puts 'equals 1' if a == 1
puts 'not greater than 1' unless a > 1
```

<br>
<br>
<br>



### While

```ruby
a = 0
while a < 5 do
	p a
	a+=1 # ++ does not exist. must do +=1 or another increment number
end
```

The `while` equivalent of `unless` is `until`. Just give it a stop condition like below:

```ruby
a = 0
until a == 5 do
	p a
	a+=1
end
```

<br>
<br>
<br>


### For

```ruby
for i in 0...5 do
	puts i
end
```

**Exercise:**

- Create an `if/elsif/else` conditional that prints "too long" if a string is longer than 10 characters, "just right" if it is between 5 and 10 characters (inclusive), and "too short" if it is less than 5 characters.
- Create a loop that prints "1st time through", "2nd time through", ..., `until` the 10th time.
- Create a `for` loop that prints all numbers (inclusive) from 20 through 40.
