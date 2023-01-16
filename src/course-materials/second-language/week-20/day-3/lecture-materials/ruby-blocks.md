---
track: "Second Language"
title: "Ruby Blocks"
week: 1
day: 1
type: "lecture"
---


# Ruby Blocks

<br>
<br>
<br>


## Lesson Objectives

1. Compare JS forEach with Ruby each
1. Compare JS map with Ruby map
1. Bonus: Create custom functions that use blocks
1. Bonus: Describe and use a proc


<br>
<br>
<br>



## Compare JS forEach with Ruby each

Here's our JS forEach

```javascript
const myArray = ['one', 'two', 'three'];
myArray.forEach((str)=>{
	console.log('the value is ' + str);
});
```

Here's the ruby version of the same code.

```ruby
['one', 'two', 'three'].each do |str|
	puts 'the value is ' + str
end
```

All code from `do` to `end` is called a ruby "block", since it's a block of code that the call function executes.  It's just like the anonymous functions of JavaScript.

There's even a version of the code that takes only one line

```ruby
['one', 'two', 'three'].each { |str| puts 'the value is ' + str } #short form
```

<br>
<br>
<br>


## Compare JS map with Ruby map

Here's our JS map

```javascript
const basicArray = [1,2,3];
const timesTwo = basicArray.map((num)=>{
  return num * 2;
});

console.log(timesTwo);
```

Here's the ruby version of the same code

```ruby
times_two = [1,2,3].map do |num|
	num * 2
end

p times_two
```

Here's the version that takes only one line

```ruby
p [1,2,3].map {|num| num * 2}
```


<br>
<br>
<br>


## Bonus Content (self study):

While ruby looks simple at first, you can accomplish some very complex tasks in it - even extend the language. Here are a couple of those advanced features. You can code without them in most cases, but you have these powerful options for when you need them.

<br>
<br>

## Creating your own blocks

You can create functions that execute blocks.

let's create our own "each" function.  Here's the JS version:

```javascript
const each = (array, callback)=>{
	for(let i = 0; i < array.length; i++){
		callback(array[i]);
	}
}

each([1,2,3,4], (currentNum)=>{
	console.log(currentNum);
});
```

```ruby
def each(arr, &blk) #&blk must always be the last parameter
	for elem in arr
		blk.call(elem)
	end
end

each 0...5 do |currentNum|
	puts currentNum
end
```

- The `&blk` is just a variable that comes in
- The `&` means pass by reference
	- This means that the variable `&blk` points to something and is not a copy of whatever was passed in
- Therefore &blk is just a reference to the block of code between `do` and `end`
- We can execute that code by calling blk.call()

If we don't want to bother with &blk, we have a shortcut:

```ruby
def each(arr)
	for elem in arr
		yield(elem) #use this instead of &blk.call
	end
end

each 0...5 do |currentNum|
	puts currentNum
end
```


<br>
<br>
<br>


## Describe and use a proc

- A block is just a type of variable called a proc
- procs are just ways to save functions into variables for later use

Ruby methods don't act like JS first-class functions by default, however, if you want to use a similar pattern to pass methods around, create an anonymous method, or store a method in a variable then look no further than `proc`!

```ruby
log = Proc.new do |el|
	puts el
end
log.call(5)
```

short version:

```ruby
log = Proc.new {|el| puts el}
log.call(5)
```

Making callbacks work in JS

```javascript
const foo = ()=>{
	console.log('hi');
}

const bar = (callback)=>{
	callback();
}
bar(foo)
```

Making callbacks work in ruby 

```ruby
foo = Proc.new do
    puts 'hi'
end

def bar(callback)
    callback.call()
end

bar(foo)
```
