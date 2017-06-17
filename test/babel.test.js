/* eslint-disable no-useless-escape */
/* eslint-env jest */
const babel = require('babel-core')
const path = require('path')
const fs = require('fs')
const glamPlugin = require('../src/babel')
const { flush } = require('../src')

describe('babel plugin', () => {
  beforeEach(flush)
  test('normal', () => {
    const basic = `
      css\`
       margin: 12px 48px;
       color: #ffffff;
       height: \$\{props => props.height * props.scale\};
       display: flex;
       flex: 1 0 auto;
       color: blue;
       width: \$\{widthVar\};
    \``
    const { code } = babel.transform(basic, {
      plugins: [[glamPlugin, { sync: false }]],
      filename: path.join(__dirname, './babel.test.1.js'),
      babelrc: false
    })
    expect(code).toMatchSnapshot()
    const file = path.join(__dirname, './babel.test.1.js.css')
    expect(fs.existsSync(file)).toBe(true)
    expect(fs.readFileSync(file, 'utf8')).toMatchSnapshot()
  })
  test('normal kitchen sink', () => {
    const basic = `
      const cls = css\`font-size: 58pt;margin: $\{margin};\`
      const frag = fragment\`padding: 8px;\`
      const fragB = fragment\`height: $\{heightVar};@apply \$\{frag};\`
      const cls2 = css\`
       @apply $\{frag};
       @apply $\{fragB}; 
       margin: 12px 48px;
       color: #ffffff;
      \`
    `
    const { code } = babel.transform(basic, {
      plugins: [[glamPlugin, { sync: true }]],
      filename: path.join(__dirname, './babel.test.2.js'),
      babelrc: false
    })
    expect(code).toMatchSnapshot()
    const file = path.join(__dirname, './babel.test.2.js.css')
    expect(fs.existsSync(file)).toBe(true)
    expect(fs.readFileSync(file, 'utf8')).toMatchSnapshot()
  })

  test('inline simple', () => {
    const basic = `
      css\`
       margin: 12px;
       color: \$\{colorVar};
       height: \$\{heightVar};
      \`
    `
    const { code } = babel.transform(basic, {
      plugins: [[glamPlugin, { sync: true, inline: true }]]
    })
    expect(code).toMatchSnapshot()
  })

  test('inline kitchen sink', () => {
    const basic = `
      const cls = css\`font-size: 58pt;margin: $\{margin};\`
      const frag = fragment\`padding: 8px;\`
      const fragB = fragment\`height: $\{heightVar};@apply \$\{frag};\`
      const cls2 = css\`
       @apply $\{frag};
       @apply $\{fragB}; 
       margin: 12px 48px;
       color: #ffffff;
      \`
    `
    const { code } = babel.transform(basic, {
      plugins: [[glamPlugin, { sync: true, inline: true }]]
    })
    expect(code).toMatchSnapshot()
  })
})
