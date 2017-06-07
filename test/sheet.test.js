/* eslint-env jest */
const {sheet, flush} = require('../src')

describe('sheet', () => {
  beforeEach(flush)

  test('insert', () => {
    const idx = sheet.insert('#bar { color: red; }')
    expect(idx).toBeDefined()
    console.log(sheet.rules())
    expect(sheet.rules()).toMatchSnapshot()
  })

  test('insert ssr', () => {
    flush()
    const old = global.window
    global.window = undefined

    const idx = sheet.insert('#bar { color: blue; }')
    expect(idx).toBeDefined()
    expect(sheet.rules()).toMatchSnapshot()
    console.log(sheet.rules())
    global.window = old
  })
})
