const fs = require('fs')
const path = require('path')

const css = require('../src').default
const { sheet, flush } = require('../src')

test('returns a class for a string', () => {
  expect(css`color:red`).toMatchSnapshot()
})

test('returns 2 classes for a dynamic string', () => {
  expect(css`color:red, font-weight:${'bold'}`).toMatchSnapshot()
})

test('receives a class and array of var values', () => {
  let css = function(a, b){
    return [a,b]
  }
  expect(css`color:red, font-weight:${'bold'}`).toMatchSnapshot()
})

test('requires css file corresponding to module', () => {
  expect(global.styleMocked).toBe('alphabetaomega')
}) // ???

test('injects dynamic values into a sheet', () => {
  flush()
  let cls = css`color:red; font-weight:${'bold'}`
  expect(sheet.rules()).toMatchSnapshot()
})

test('dudupe static sections', () => {
  flush()
  let cls1 = `color:red, font-weight:${'bold'}`
  let cls2 = `color:red, font-weight:${'normal'}`
  expect(cls1.split(' ')[0]).toBe(cls2.split(' ')[0])
  expect([cls1,cls2].map(x => x.split(' ')[1])).toMatchSnapshot()
})

test(`extracts css into a css file`, () => {
  let file = path.join(__dirname,'./index.test.js.css')
  expect(fs.existsSync(file)).toBe(true)
  expect(fs.readFileSync(file, 'utf8')).toMatchSnapshot()
})