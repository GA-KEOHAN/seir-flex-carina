// Linked list
class Node {
  constructor(data, next = null) {
    this.data = data
    this.next = next
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
class Stack {
  constructor(){
    this.data = []
  }
  push(record){
    this.data.push(record);
  }
  pop(){
    return this.data.pop()
  }
  top(){
    return this.data[this.data.length - 1]
  }
}
class Queue {
  constructor(){
    this.data = new LinkedList()
  }
  enqueue(record){
    this.data.insertLast(record)
  }
  dequeue(){
    return this.data.removeFirst()
  }
  peek(){
    return this.data.getFirst()
  }
}

module.exports = {Node, LinkedList, Queue};

// const list = new LinkedList()
// list.insertFirst('c')
// console.log(list.tail)
// console.log('The heads is %s',list.head)
// list.insertFirst('b')
// list.insertFirst('a')
// console.log(list.tail)
// console.log(list.head)
// list.insertLast('d')
// console.log(list.tail)
// console.log(list.head)
// for(let i of list){
//   console.log(i.data)
// }
// list.insertAt('e', 4)
// for(let i of list){
//   console.log(i.data)
// }
// console.log(list.tail)
// list.removeAt(4)
// console.log(list)
// for(let i of list){
//   console.log(i.data)
// }
// class Queue {
//   constructor(){
//     this.data = new LinkedList ()
//   }
//
//   enqueue(record){
//     this.data.insertLast(record)
//   }
//   dequeue(){
//     return this.data.removeFirst()
//   }
// }

// const list = new LinkedList()
//
// console.log(list)
//
// list.insertFirst(5)
// console.log(list)
// list.insertFirst(5)
// console.log(list)
