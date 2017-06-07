/* eslint-env jest */
const hashArray = require('../src/hash').default

describe('hash', () => {
  test('str length: 1', () => {
    const cls = '1'
    const vars = ['a', 'b', 'c', 'd']
    expect(hashArray([cls, ...vars])).toMatchSnapshot()
  })

  test('str length: 2', () => {
    const cls = '12'
    const vars = ['a', 'b', 'c', 'd']
    expect(hashArray([cls, ...vars])).toMatchSnapshot()
  })

  test('str length: 3', () => {
    const cls = '123'
    const vars = ['a', 'b', 'c', 'd']
    expect(hashArray([cls, ...vars])).toMatchSnapshot()
  })

  test('str length: >= 4', () => {
    const cls = '1234'
    const vars = ['a', 'b', 'c', 'd']
    expect(hashArray([cls, ...vars])).toMatchSnapshot()
  })
})
