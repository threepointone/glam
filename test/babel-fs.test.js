/* eslint-disable no-useless-escape */
/* eslint-env jest */
const babel = require('babel-core')
const fs = require('fs')
const touch = require('touch')
const glamPlugin = require('../src/babel')
const { flush } = require('../src')

jest.mock('fs').mock('touch')

const basic = `
  css\`
    margin: 12px 48px;
    color: #ffffff;
    height: \$\{props => props.height * props.scale\};
    display: flex;
    flex: 1 0 auto;
    color: blue;
    name: class;
    width: \$\{widthVar\};
\``

let output

const cssFilename = __filename + '.css' // eslint-disable-line no-path-concat

describe('babel plugin fs', () => {
  beforeEach(flush)
  test('creates and writes to the css file when it does not exist', () => {
    fs.existsSync.mockReturnValueOnce(false)
    const { code } = babel.transform(basic, {
      plugins: [[glamPlugin, { sync: false }]],
      filename: __filename,
      babelrc: false
    })
    expect(fs.existsSync).toBeCalledWith(cssFilename)
    expect(touch.sync).toBeCalledWith(cssFilename)
    expect(fs.writeFileSync).toHaveBeenCalled()
    expect(fs.writeFileSync.mock.calls[0][0]).toBe(cssFilename)
    expect(fs.writeFileSync.mock.calls[0][1]).toMatchSnapshot()
    output = fs.writeFileSync.mock.calls[0][1]
    expect(code).toMatchSnapshot()
  })
  test('writes to the css file when it does exist ', () => {
    fs.existsSync.mockReturnValueOnce(true)
    fs.readFileSync.mockReturnValueOnce('')
    const { code } = babel.transform(basic, {
      plugins: [[glamPlugin, { sync: false }]],
      filename: __filename,
      babelrc: false
    })
    expect(fs.existsSync).toBeCalledWith(cssFilename)
    expect(touch.sync).toHaveBeenCalledTimes(1)
    expect(fs.writeFileSync).toHaveBeenCalledTimes(2)
    expect(fs.writeFileSync.mock.calls[1][0]).toBe(cssFilename)
    expect(fs.writeFileSync.mock.calls[1][1]).toMatchSnapshot()
    expect(code).toMatchSnapshot()
  })
  test('does not write to the css file when it is the same as is already written', () => {
    fs.existsSync.mockReturnValueOnce(true)
    fs.readFileSync.mockReturnValueOnce(output)
    const { code } = babel.transform(basic, {
      plugins: [[glamPlugin, { sync: false }]],
      filename: __filename,
      babelrc: false
    })
    expect(fs.existsSync).toBeCalledWith(cssFilename)
    expect(touch.sync).toHaveBeenCalledTimes(1)
    expect(fs.writeFileSync).toHaveBeenCalledTimes(2)
    expect(code).toMatchSnapshot()
  })
})
