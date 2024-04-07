import {describe, expect, test} from '@jest/globals';
import { Projector } from "../src/Projector";

describe("include projection test", () => {
  test('simple single key select : value', () => {
  
    const obj = new Projector().apply({x: 'y', y: 'z', a: {b: 'c'}},{
      includes: [".x"]
    })

    expect(obj['x']).toBe('y')
    expect(obj['y']).toBe(undefined)
    expect(obj['a']).toBe(undefined)
  });

  test('simple single key select : object', () => {
  
    const obj = new Projector().apply({x: {a: 'b', c: 'd', e: 'f'}, y: 'z'},{
      includes: [".x"]
    })


    expect(obj['x']).not.toBe(undefined)
    expect(obj['x']).toMatchObject({a: 'b', c: 'd', e: 'f'})
    expect(obj['y']).toBe(undefined)
  });

  test('deep single key select : value', () => {
  
    const obj = new Projector().apply({x: {a: 'b', c: 'd', e: 'f'}, y: 'z'},{
      includes: [".x.a"]
    })

    expect(obj['x']).not.toBe(undefined)
    expect(obj['x']).toMatchObject({a: 'b'})
    expect(obj['y']).toBe(undefined)
  });

  test('deep single key select : object', () => {
  
    const obj = new Projector().apply({x: {a: {'q': 'w', 'e': 'r', 't': 'y'}, c: 'd', e: 'f'}, y: 'z'},{
      includes: [".x.a"]
    })

    expect(obj['x']).not.toBe(undefined)
    expect(obj['x']).toMatchObject({a: {'q': 'w', 'e': 'r', 't': 'y'}})
    expect(obj['y']).toBe(undefined)
  });
})
