---
track: "Second Language"
title: "Stacks and Queues"
week: 1
day: 3
type: "lecture"
---


# Stacks and Queues


![Q](https://media.git.generalassemb.ly/user/15881/files/1cedbf00-f7ac-11ea-87dc-8600a2322951)


## Lesson Objectives

1. Explain what a Stack and Queue Are
1. LIFO vs FIFO
1. Demonstrate what a Stack and Queue do
1. Use a Linked List of Nodes to Model a Queue


## Review What is a Linked List?
  1. A simple often used data structure that has 3 necessary properties
  1. A head
  1. A tail
  1. A size or length property

## Review Linked List Architecture
  1. Linked List consist of element known as nodes
  1. Each node points to the next node in the list if there is no next node it point to null
  1. Nodes have one property known as value or data and contain some primitive value or object value

# Stacks and Queue Big O
1. Constant Time Insertion O(1)
1. Constant Time Deletion O(1)

# Stacks
![stack-data-structure](https://media.git.generalassemb.ly/user/15881/files/5a058180-f7ab-11ea-8fcd-c9fc942979c5)

## Array Implementation 
```js
class Stack {
  constructor() {
    this.data = [];
  }

  push(record) {
    this.data.push(record);
  }

  pop() {
    return this.data.pop();
  }

  top() {
    return this.data[this.data.length - 1];
  }
}
```

## This is fine to use an Array to describe a Stack

# Queue

![QUEUE](https://media.git.generalassemb.ly/user/15881/files/4f4aec80-f7ab-11ea-88b5-e03632b35b5b)

## A Queue with an Array

```js
class Queue {
  constructor() {
    this.data = [];
  }

  enqueue(record) {
    this.data.unshift(record);
  }

  dequeue() {
    return this.data.pop();
  }
}

```

### Problem with using an array with a Queue
1. shift and Unshift with arrays isn't constant time
1. We could fix this by using 2 Arrays or 2 Stacks but then we are using double the Memory
1. To rectify this we can use a linked_list implementation instead of an array

![linked-list](https://media.git.generalassemb.ly/user/15881/files/c1409700-692a-11ea-98b9-15dab7ba6fff)


<body>
  <h1>Node Class API</h1>
  <table class="table">
    <thead>
      <tr>
        <td>Function</td>
        <td>Arguments</td>
        <td>Returns</td>
        <td>Directions</td>
        <td>Example</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>constructor</td>
        <td>(Data, Node)</td>
        <td>Node</td>
        <td>
          Creates a class instance to represent a node.  The node should
          have two properties, 'data' and 'next'.  Accept both
          of these as arguments to the 'Node' constructor, then
          assign them to the instance as properties 'data' and 'next'.
          If 'next' is not provided to the constructor, then default its
          value to be 'null'.
        </td>
        <td>
          <pre>
            const n = new Node('Hi');
            n.data // 'Hi'
            n.next // null
            const n2 = new Node('There', n);
            n.next // returns n
          </pre>
        </td>
      </tr>
    </tbody>
  </table>

  <h1>LinkedList Class API</h1>
  <table class="table">
    <thead>
      <tr>
        <td>Function</td>
        <td>Arguments</td>
        <td>Returns</td>
        <td>Directions</td>
        <td>Example</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>constructor</td>
        <td>-</td>
        <td>(LinkedList)</td>
        <td>
          Create a class to represent a linked list.  When created,
          a linked list should have *no* head node associated with it.
          The LinkedList instance will have one property, 'head', which
          is a reference to the first node of the linked list.  By default
          'head' should be 'null'.
        </td>
        <td>
          <pre>
            const list = new LinkedList();
            list.head // null
          </pre>
        </td>
      </tr>
      <tr>
        <td>insertFirst</td>
        <td>(data)</td>
        <td>-</td>
        <td>
          Creates a new Node from argument 'data' and assigns the resulting
          node to the 'head' property.  Make sure to handle the case in which
          the linked list already has a node assigned to the 'head' property.
        </td>
        <td>
          <pre>
            const list = new LinkedList();
            list.insertFirst('Hi There'); // List has one node
          </pre>
        </td>
      </tr>
      <tr>
        <td>size</td>
        <td>-</td>
        <td>(integer)</td>
        <td>
          Returns the number of nodes in the linked list.
        </td>
        <td>
          <pre>
            const list = new LinkedList();
            list.insertFirst('a');
            list.insertFirst('b');
            list.insertFirst('c');
            list.size(); // returns 3
          </pre>
        </td>
      </tr>
      <tr>
        <td>getFirst</td>
        <td>-</td>
        <td>(Node)</td>
        <td>
          Returns the first node of the linked list.
        </td>
        <td>
          <pre>
            const list = new LinkedList();
            list.insertFirst('a');
            list.insertFirst('b');
            list.getFirst(); // returns Node instance with data 'a'
          </pre>
        </td>
      </tr>
      <tr>
        <td>
          getLast
        </td>
        <td>
          -
        </td>
        <td>
          (Node)
        </td>
        <td>
          Returns the last node of the linked list
        </td>
        <td>
          <pre>
            const list = new LinkedList();
            list.insertFirst('a');
            list.insertFirst('b');
            list.getLast(); // returns node with data 'a'
          </pre>
        </td>
      </tr>
      <tr>
        <td>
          clear
        </td>
        <td>
          -
        </td>
        <td>
          -
        </td>
        <td>
          Empties the linked list of any nodes.
        </td>
        <td>
          <pre>
            const list = new LinkedList();
            list.insertFirst('a');
            list.insertFirst('b');
            list.clear();
            list.size(); // returns 0
          </pre>
        </td>
      </tr>
      <tr>
        <td>
          removeFirst
        </td>
        <td>
          -
        </td>
        <td>
          -
        </td>
        <td>
          Removes only the first node of the linked list.  The list's head should
          now be the second element.
        </td>
        <td>
          <pre>
            const list = new LinkedList();
            list.insertFirst('a');
            list.insertFirst('b');
            list.removeFirst();
            list.getFirst(); // returns node with data 'a'
          </pre>
        </td>
      </tr>
      <tr>
        <td>
          removeLast
        </td>
        <td>
          -
        </td>
        <td>
          -
        </td>
        <td>
          Removes the last node of the chain
        </td>
        <td>
          <pre>
            const list = new LinkedList();
            list.insertFirst('a');
            list.insertFirst('b');
            list.removeLast();
            list.size(); // returns 1
            list.getLast(); // returns node with data of 'b'
          </pre>
        </td>
      </tr>
      <tr>
        <td>
          insertLast
        </td>
        <td>
          (Data)
        </td>
        <td>
          -
        </td>
        <td>
          Inserts a new node with provided data at the end of the chain
        </td>
        <td>
          <pre>
            const list = new LinkedList();
            list.insertFirst('a');
            list.insertFirst('b');
            list.insertLast('c');
            list.getLast(); // returns node with data 'C'
          </pre>
        </td>
      </tr>
      <tr>
        <td>
          getAt
        </td>
        <td>
          (integer)
        </td>
        <td>
          (Node)
        </td>
        <td>
          Returns the node at the provided index
        </td>
        <td>
          <pre>
            const list = new List();
            list.insertFirst('a');
            list.insertFirst('b');
            list.insertFirst('c');
            list.getAt(1); // returns node with data 'b'
          </pre>
        </td>
      </tr>
      <tr>
        <td>
          removeAt
        </td>
        <td>
          (integer)
        </td>
        <td>
          -
        </td>
        <td>
          Removes node at the provided index
        </td>
        <td>
          <pre>
            const list = new List();
            list.insertFirst('a');
            list.insertFirst('b');
            list.insertFirst('c');
            list.removeAt(1);
            list.getAt(1); // returns node with data 'a'
          </pre>
        </td>
      </tr>
      <tr>
        <td>
          insertAt
        </td>
        <td>
          (Data, integer)
        </td>
        <td>
          -
        </td>
        <td>
          Create an insert a new node at provided index.
          If index is out of bounds, add the node to the end
          of the list.
        </td>
        <td>
          <pre>
            const list = new List();
            list.insertFirst('a');
            list.insertFirst('b');
            list.insertFirst('c');
            list.insertAt('Hi', 1)
            list.getAt(1); // returns node with data 'Hi'
          </pre>
        </td>
      </tr>
    </tbody>
  </table>
</body>


``` javascript
// Linked list

class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
  }
  insertFirst(data) {
    const newNode = new Node(data, this.head)
    if(this.head) return (this.head = newNode)
    if(!this.head){
       this.head = newNode
       this.tail = this.head
       return
    }
  }
  size() {
    let counter = 0
    let node = this.head
    while (node) {
      counter++
      node = node.next
    }
    return counter
  }

  getFirst() {
    return this.head
  }

  getLast() {
    return this.tail
  }

  clear() {
    this.head = null
    this.tail = null
  }

  removeFirst() {
    if (!this.head) {
      return
    }
    const removed = this.head
    this.head = this.head.next
    return removed
  }

  removeLast() {
    if (!this.head) {
      return
    }

    if (!this.head.next) {
      this.head = null
      this.tail = null
      return
    }

    let previous = this.head
    let node = this.head.next
    while (node.next) {
      previous = node
      node = node.next
    }
    previous.next = null
    this.tail = previous
  }

  insertLast(data) {
    const last = this.getLast()

    if (last) {
      // There are some existing nodes in our chain
      last.next = new Node(data)
      this.tail = last.next
    } else {
      // The chain is empty!
      this.head = new Node(data)
      this.tail = this.head
    }
  }

  getAt(index) {
    let counter = 0
    let node = this.head
    while (node) {
      if (counter === index) {
        return node
      }

      counter++
      node = node.next
    }
    return null
  }

  removeAt(index) {
    if (!this.head) {
      return
    }

    if (index === 0) {
      this.head = this.head.next
      return
    }

    const previous = this.getAt(index - 1)
    if (!previous || !previous.next) {
      return
    }
    previous.next = previous.next.next
    this.setTail()
  }

  insertAt(data, index) {
    if (!this.head) {
      this.head = new Node(data)
      return
    }

    if (index === 0) {
      this.head = new Node(data, this.head)
      return
    }

    const previous = this.getAt(index - 1) || this.getLast()
    const node = new Node(data, previous.next)
    previous.next = node
    this.setTail()
  }
  setTail() {
    if (!this.head) {
      return null;
    }
      let node = this.head;
    while (node) {
      if (!node.next) {
        this.tail = node;
        return node;
      }
      node = node.next;
    }
  }
  // If your hungry for more
 forEach(fn) {
   let node = this.head;
   let counter = 0;
   while (node) {
     fn(node, counter);
     node = node.next;
     counter++;
   }
 }
// If your absolutely starving
 *[Symbol.iterator]() {
   let node = this.head;
   while (node) {
     yield node;
     node = node.next;
   }
 }
}

```
