const Node = require('./index').Node
const LinkedList = require('./index').LinkedList
const Q = require('./index').Queue

test ( 'Node is a Class or Constructor Function', () => {
   expect( typeof Node ).toEqual('function')
  }
)

test ( 'LinkedList is a Class or Constructor Function', () => {
   expect( typeof LinkedList ).toEqual('function')
  }
)

test (' Q is a Class or Constructor', ()=>{
  expect( typeof Q).toEqual('function')
})

describe( 'A Node', () =>{
    test('has a data and a next property', ()=>{
       const node = new Node('a', {});
       expect(node.data).toEqual('a');
       expect(typeof node.next === "object" && Object.keys(node.next).length === 0).toBeTruthy()
    })
  }
)

describe('InsertFirst', ()=>{
  test('add a new node to the start of the List', ()=>{
    const l = new LinkedList();
      l.insertFirst('maha')
      expect(l.head.data).toEqual('maha')
     l.insertFirst('is awesome')
     expect(l.head.data).toEqual('is awesome')
     expect(l.head.next.data).toEqual('maha')
  })
})

describe('Size', ()=>{
  test('returns number of nodes in Linked List', ()=>{
    const list = new LinkedList();
    list.insertFirst('a');
    list.insertFirst('b');
    list.insertFirst('c');
    expect(list.size()).toEqual(3)
  })
  test('returns large numebr of nodes', ()=>{
    const list = new LinkedList();
    const count = 2364
    for(let i =0; i < count; i++){
      list.insertFirst(i)
    }
    expect(list.size()).toEqual(count)
  })
})
/*
  describe (heading::String, testSuite::function) -> void
      ***body : test (heading::String, test::function) [numerous]
*/
describe('GetFirst', ()=>{
  test('Returns the correct Head', ()=>{
    const list = new LinkedList()
    list.insertFirst('a')
    list.insertFirst('b')
    list.insertFirst('c')
    expect(list.getFirst().data).toEqual('c')
  })
})

describe('GetLast', ()=>{
  test('Returns the proper tail', ()=>{
    const list  = new LinkedList()
    list.insertLast('a')
    list.insertLast('b')
    list.insertLast('c')
    expect(list.getLast().data).toEqual('c')
  })
})

describe('Q', ()=>{
  const q = new Q()
  q.enqueue('a')
  q.enqueue('b')
  q.enqueue('c')
  test('enqueue adds a new record to the end of the queue', ()=>{
    expect(q.data.getLast().data).toEqual('c')
  })
  test('dequeue removes the first record from the queue', ()=>{
    const expectedRemoved = q.peek()
    const removed = q.dequeue()
    expect(expectedRemoved.data === removed.data).toBeTruthy()
  })
})
