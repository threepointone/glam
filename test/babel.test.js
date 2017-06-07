/* eslint-disable no-useless-escape */
/* eslint-env jest */
const babel = require('babel-core')
const glamPlugin = require('../src/babel')
const { flush } = require('../src')

describe('babel plugin', () => {
  beforeEach(flush)
  test('inline', () => {
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
    const { code } = babel.transform(basic, { plugins: [[glamPlugin, { sync: true }]] })
    expect(code).toMatchSnapshot()
  })

  test('inline', () => {
    const basic = `
      const frag = fragment\`padding: 8px;\`
      const fragB = fragment\`height: \$\{heightVar\}\`
      css\`
       @apply \$\{frag\};
       @apply $\{fragB\}; 
       margin: 12px 48px;
       color: #ffffff;
    \``
    const { code } = babel.transform(basic, { plugins: [[glamPlugin, { sync: true }]] })
    expect(code).toMatchSnapshot()
  })

  test('inline', () => {
    const basic = `
      const cls = css\`font-size: 58pt;margin: $\{margin};\`
      const frag = fragment\`padding: 8px;\`
      const fragB = fragment\`height: $\{heightVar};@apply \$\{frag};\`
      const cls2 = css\`
       name: arrow;
       @apply $\{frag};
       @apply $\{fragB}; 
       margin: 12px 48px;
       color: #ffffff;
      \`
    `
    const { code } = babel.transform(basic, { plugins: [[glamPlugin, { sync: true, inline: true }]] })
    expect(code).toMatchSnapshot()
  })
})

