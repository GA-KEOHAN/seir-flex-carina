---
track: "Second Language"
title: "Ruby Classes and Objects"
week: 1
day: 2
type: "lecture"
---



# Ruby Classes and Objects

In Ruby, key-value pairings are often referred to as hashes, in Python: dictionaries, in JavaScript: objects.

Let's start with an abstraction of Classes:

> A template by which Objects can be constructed
>
> A blueprint (or recipe) of how to build an object and information about what defines an object.

<br>
<br>
<br>

## Everything is an object

Caveat: [Not quite](https://rubylearning.com/blog/2010/09/27/almost-everything-is-an-object-and-everything-is-almost-an-object/)

Deeper Dive: [What is an object?](https://rubymonk.com/learning/books/4-ruby-primer-ascent/chapters/39-ruby-s-object-model/lessons/127-object-identity-what-is-an-object)


* create a file `classes.rb` in `student_examples`

Let's do a simple test with a string. If a string is just text, how come we can use methods on it? When programming in Ruby, a string looks like text but is really an object.

A giveaway that something is an object is if it takes a method.

```ruby
"Hello World".upcase
```

It looks suspiciously like "Hello World" is an object, i.e. it exhibits behavior like `upcase`.

An even bigger giveaway is if that object belongs to a class.

```ruby
"Hello World".class
```
> String

Not only are we using a method but we are also looking at an instance of a class!

<br>
<br>
<br>

## Classes

A **class** is a template for creating objects.

The string "Hello World" is an object that is an _instance_ of the `String` class. Just like the string "Cherish the cabin" is an object that is an _instance_ of the `String` class. They are both different objects, but they are both strings.

What if we make up our own method for every instance of the `String` class?

Ruby has "open classes", meaning, you can add to the classes that already exist.

We can write our own `is_palindrome?` method and add it to the string class.

A palindrome is a word that has the same letters when reversed.

For example, `radar` is a palindrome. `Borscht` is not a palindrome.

We can write some logic to accomplish this

```ruby
  p "radar".reverse == "radar"
```

What about `radar` and `Radar` that should also be true. Let's update our logic

```ruby
  p "Radar".upcase.reverse == "radar".upcase
```

```ruby
class String
  def is_palindrome? word
    word.upcase.reverse == word.upcase
  end
end

p "Borscht".is_palindrome?
```

Hrmm, I get an error of wrong number of arguments. I can add an argument?


```ruby
class String
  def is_palindrome? word
    word.upcase.reverse == word.upcase
  end
end

p "Borscht".is_palindrome? "Borscht"
p "Borscht".is_palindrome? "radar"
```

Oh it works, but that looks **WEIRD** - currently it can take _any_ string as the first part and the thing we are checking is the argument - which is far worse than weird. It's really **horrendous** what future dev could look at that and understand what that function is doing or how it _should_ work

How can we just do `"radar".is_palindrome?` and have that work?

We'll need to use `self` so that our function refers to itself.

```ruby
class String
  def is_palindrome?
    self.upcase.reverse == self.upcase
  end
end

p "Borscht".is_palindrome?
p "radar".is_palindrome?
```


**Deep Dive:** [Self in Ruby](https://www.jimmycuadra.com/posts/self-in-ruby/)

If you've ever wondered how a string can take a method, it's because a string is secretly an **object** with **methods**.

In Ruby, an **object** is an _instance_ of a **class**.

>**Note:** The word "object" is not used the same way in JavaScript.  In JS, it is simply a key-value pairing, which is **sometimes** an _instance_ of a **class**.  In Ruby, it is **always** an _instance_ of a **class**.

From one class, you can make myriad objects all with the same methods.

**Exercise:** Create you own `is_uppercase?` method for `String` which checks if `self.upcase == self`, and test with a couple strings.

<br>
<br>
<br>

## Make our own objects

We can make our _own_ objects. They will be very similar to the JavaScript ones we are used to, the ones that have properties and methods that can be accessed and altered with **dot notation**.

Let's make a template for our objects. The template is called a **class**. Remember how in JavaScript we used classes to create objects?

This is a similar thing, but in Ruby we code it like below:

```ruby
class World
  def name
    "Nothing But Shrimp"
  end
end

world1 = World.new

p world1
p world1.name
p world1.class
```

>**Note:** It may be tempting to see `.name` as a simple property, but notice that it is actually a **method**: one that returns the value "Nothing But Shrimp".

> `#<World:0x007ff2f90277b0>`
>
> `"Nothing But Shrimp"`
>
> `World`

The first thing we see is the object itself. It looks strange, but that's OK. We're not going to worry about those extra letters and numbers for now.

The next thing is the name of that world.

Last, we see that `world1` is an object created by the **World** class.

<br>
<br>
<br>


## Make it so we can update properties

```ruby
world1.name = "Tatooine"
```

Does not work, instead we have to make a **setter method** in the class.

First, let's put `name` into an **instance variable** that will have scope over all methods in the class.

We can make an **initialize** method in our class that will automatically run when we instantiate an object.
Let's test our code:

```ruby
class World
  def initialize
    @name = "Nothing But Shrimp"
  end

  def name
    @name
  end
end

world1 = World.new
p world1.name
```

The **initialize** method is just like the **constructor** method we used in JavaScript classes.

Now let's work on being able to update the name:

Let's make a setter method with special
`something=input` syntax:

```ruby
class World
  def initialize
    @name = "Nothing But Shrimp"
  end

  def name
    @name
  end

  def name=value
    @name = value
  end
end

world1 = World.new
world1.name = "Tatooine"
p world1.name
```

We are getting closer to learning how to make objects that have all the functionality that our js objects had!

**Exercise:** Make a class called `Galaxy` that has a `name` and `name=value` method similar to above. In the `initialize` method, have the `name` set to "Andromeda". Make a `new` `Galaxy`, test that the `name` is "Andromeda", set it to "Milky Way", and make sure it updates.

<br>
<br>
<br>

## Behavior

Let's make it so the worlds we make will do something (add a method).

Let's make it so a world can populate itself with people.

**Object Specs:**

* A world can have many people, but starts with none
	* This means we should initialize the object with an empty array to hold the people in.

* `World` can populate itself with one person at a time.
 * A person has properties `name` (string), `age` (int) - for now we'll make a default person, later we'll upgrade the method to allow customization
* Make a method `populate` that will push a hash (object) into the people array.

```ruby
class World
  def initialize
    @name = "Nothing But Shrimp"
    @people = []
  end

  def name
    @name
  end

  def people
    @people
  end

  def name=value
    @name = value
  end

  def populate
    @people << { name: "Shrimpy McShrimpsky", age: 20 }
  end
end

world1 = World.new

p world1.people

world1.populate
world1.populate
world1.populate

p world1.people
```

> [{:name=>"Shrimpy McShrimpsky", :age=>20}, {:name=>"Shrimpy McShrimpsky", :age=>20}, {:name=>"Shrimpy McShrimpsky", :age=>20}]


<br>
<br>
<br>


## Provide data to new object

All the worlds we make will start out the same. What if we want to start off with different worlds?

We can provide input to the **initialize** method:

```ruby
  def initialize name
    @name = name
    @people = []
  end
```

Now we can easily create many new worlds with the same properties and methods

```ruby
world1 = World.new "Panthelassa"
world2 = World.new "Tatooine"
world3 = World.new "Nothing But Shrimp"
world4 = World.new "San Junipero"
```

```ruby
p world1.name
p world2.name
p world3.name
p world4.name
```

>"Panthalassa"
"Tatooine"
"Nothing But Shrimp"
"San Junipero"

We can also update another attribute in our class (blueprint/template) in one place and thus keep our code DRY (Don't Repeat Yourself)
Add in `shape`

```ruby
  def initialize name, shape
    @shape = shape
    @name = name
    @people = []
  end
```

We can also add a default values, so if a shape value is not inputted, it will have a default value

```ruby
  def initialize name, shape='oblate spheroid'
    @shape = shape
    @name = name
    @people = []
  end
```

```ruby
world1 = World.new "Panthalassa"
world2 = World.new "Tatooine" , "sphere"
world3 = World.new "Nothing But Shrimp" , "dome"
world4 = World.new "San Junipero", "cylinder"
```

<br>
<br>
<br>



## Access shape property

- above, we could access the name property.
- but when we try:

`p world1.shape`

- we get an error
- we have to either create a method to see the value OR we can use a shorthand. We used a method for the `name` property, let's use the shorthand for shape.

Convention is to put this 'shorthand' at the top of the class, before the initialize method

```ruby
class World
  attr_reader :shape
```

Great, let's go and change the shape

world1.shape = 'cube'

We fail again! We must explicitly state that this property can be overwritten

```ruby
class World
  attr_reader :shape
  attr_writer :shape
```

We can also condense our code for properties that can be read and overwritten by using

`attr_accessor`


```ruby
class World
  attr_accessor :shape
```

`attr_accessor` allows us to read and write a property

<br>
<br>
<br>


## Create a Method that Adds Data to the Array

We can use the `<<` method to push new people into our `people` array:

```ruby
  def populate name, age
    @people << { name: name, age: age }
  end
```

But wait! We want to be able to see the people array, so we need to add an `attr_reader` for `:people`.

```ruby
world3.populate "Eleanor ShellStrop", 36
world3.populate "Chidi Anagonye", 32
world3.populate "Tahani Al-Jamil", 34
world3.populate "Jianyu", 31

p world3.people
```

>  [{:name=>"Eleanor ShellStrop", :age=>36}, {:name=>"Chidi Anagonye", :age=>32}, {:name=>"Tahani Al-Jamil", :age=>34}, {:name=>"Jianyu", :age=>31}]



**Exercise:**

- Add an `attr_accessor` for `shape` to your `Galaxy` class
- Test that you can add a `shape` and print it out
- Add an `insert_planet` method for `@planets` and an `attr_reader` for `:planets` (planets have two properties: `name` and `shape`)
- Test `.insert_planet` with a few of the planets above, and test that you inserted them correctly by printing out `.planets`.

<br>
<br>
<br>


## Automate Object Creation into an Array

Sometimes you need to create a number of objects at once (remember factories from JS?). Let's look at a code example:

```ruby
planets = %w(Mercury Venus Earth Mars Jupiter Saturn Uranus Pluto)
# populate milky way with worlds from our planets array
milky_way = []

planets.each do |planet|
  world = World.new planet
  milky_way << world
end

p milky_way
```

<br>
<br>
<br>


## Calling Methods on a Class

<!--We've talked about adding methods to the String class but you can also create a class from scratch, and add methods to it.-->

Let's do one more example. Let's say we are building our own math library called `Mathy`. For organizational purposes, we want to group these methods together and call them.

Let's say we need to have:

- `formula_1`: `a + b * c`
- `subtract_and_divide`: `(a - c ) / b`
- `powers_of_3`: `a * a * a / 3`

We can write:

```ruby
def formula_1 (a, b, c)
   a + b * c
end
def subtract_and_divide (a , b, c)
  (a - c ) / b
end
def powers_of_3 a
   a * a * a / 3
end
```

Then we can call these functions globally. But imagine you've built a sizable project. How do you find where these are defined? How can you add more and then find what you've added?



It would make sense to make a `class` for these
```ruby
class Mathy
  def formula_1 (a, b, c)
     a + b * c
   end
  def subtract_and_divide (a , b, c)
    (a - c ) / b
  end

  def powers_of_3 a
     a * a * a / 3
  end
end
```

Great! But we don't want to create an instance of this class. We just want to use these functions.

We don't want to do this every time:

```ruby
mathy = Mathy.new
mathy.forumula_1(2, 3, 4)
```

We just want to do:

```ruby
p Mathy.forumula_1(2, 3, 4)
```

But when we try to run this, we get an error that this method is undefined. We want this method to be called not on an instance, but rather the class itself.

We can do this, using `self`:

```ruby
class Mathy
  def self.formula_1 (a, b, c)
     a + b * c
   end
  def self.subtract_and_divide (a , b, c)
    (a - c ) / b
  end

  def self.powers_of_3 a
     a * a * a / 3
  end
end
```

Now we can use the method on the class without having to instantiate a new instance!

```ruby
p Mathy.forumula_1(2, 3, 4)
```

As we continue, look for examples of this usage in default Rails methods.


<br>
<br>
<br>


## Extra

### Named arguments

Sometimes, our methods (especially `initialize`) can get pretty complicated, and remembering arguments based on their order is a bit much. For this, we can use named arguments.

The syntax for this is basically the reverse of a Ruby symbol.  That is, the `:` comes **after** the variable name.

We still need to set the value of the instance variables in `initialize`.

Then we can pass in the values for initialize as a key-value pairing.

```ruby
class Person
  attr_reader :name, :age, :favorite_color, :height

  def initialize(name:, age:, favorite_color:, height:)
    @name = name
    @age = age
    @favorite_color = favorite_color
    @height = height
  end
end

me = Person.new(name: 'David', age: 35, favorite_color: :blue, height: 68)
me.favorite_color #=> :blue
```

<br>
<br>
<br>


### Inheritance

Classes can *inherit* behavior from each other. In Rails, we'll generally use this to pull in a bunch of methods and behaviors from the *superclass* into our classes, but here we'll look at some more basic examples.

Below here we have an Animal class. Both Cat and Dog classes are sub-classes of Animal and get their shared behavior about `age` from it.

<!--Don't type this -->

```ruby
class Animal
  attr_reader :age

  def initialize
    @age = 0
  end

  def get_older
    @age = @age += 1
  end
end

class Cat < Animal
  def sound
    'meow'
  end
end

class Dog < Animal
  def sound
    'woof'
  end
end

jade = Cat.new
jade.class #=> Cat
Cat.superclass #=> Animal
jade.age #=> 0
jade.get_older
jade.sound #=> 'meow'
jade.age #=> 1
```

**Exercise:** Create a `class` called `Person` that is otherwise identical to the `Animal` class above.  Then create a subclass called `Student` that has a method called `slogan` that returns the string `'Ruby is cool'`.

<br>
<br>
<br>


#### Class Constant

You can also have a constant in your class (much like in JS). This can be helpful for keeping track of data that never changes. You can access it from inside your class, or from outside.

Unlike in JS, where we have to say `const`, constants in Ruby are created by using `UPPER_SNAKE_CASE`.

```ruby
class Spider
  NUMBER_LEGS = 8

  def num_legs
    NUMBER_LEGS
  end
end

charlotte = Spider.new
charlotte.num_legs

# You may also see this syntax to access items in a class directly

Spider::NUMBER_LEGS #=> 8
```

<br>
<br>
<br>


### Review

#### Optional and Default Arguments

Sometimes you don't want to have to set all values manually in a method. For that, you can use optional arguments with a default. These can be used with methods in classes too.

```ruby
class Car
  attr_reader :miles

  def initialize(miles=0)
    @miles = miles
  end
end

new_car = Car.new
new_car.miles #=> 0

used_car = Car.new(1000000)
used_car.miles #=> 1000000
```

#### Arrays and Classes

You can use classes and arrays together.

```ruby
class Student
  attr_reader :friends

  def initialize
    @friends = []
  end

  def add_friend(name)
    @friends << name
  end
end
```

<br>
<br>
<br>


#### Class Methods

You can have methods that don't act on an instance of the class. These are often used in your Rails models to help find specific instances of your class, or perform operations on multiple instances of your class. You don't need to call `.new` to make an instance of the class here. We won't use these much until we get into Rails.

You define these by putting `self` at the beginning of the method name.

```ruby
class Math
  def self.square(number)
    number * number
  end
end

Math.square(2) #=> 4
```

