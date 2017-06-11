/* eslint-env jest */
const {sheet, flush} = require('../src')

// These don't work
describe.skip('sheet', () => {
  beforeEach(flush)

  test('insert', () => {
    const idx = sheet.insert('#bar { color: red; }')
    expect(idx).toBeDefined()
    expect(sheet.rules()).toMatchSnapshot()
  })

  test('insert ssr', () => {
    const old = global.window
    global.window = undefined

    const idx = sheet.insert('#bar { color: blue; }')
    expect(idx).toBeDefined()
    expect(sheet.rules()).toMatchSnapshot()
    global.window = old
  })
})
