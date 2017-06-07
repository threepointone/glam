/* eslint-disable no-useless-escape */
/* eslint-env jest */
const path = require('path');
const babel = require('babel-core')
const pluginTester = require('babel-plugin-tester')
const glamPlugin = require('../src/babel')

pluginTester({
  plugin: glamPlugin,
  snapshot: true,
  fixtures: path.join(__dirname, '__fixtures__'),
  tests: [
    `
      css\`
       margin: 12px 48px;
       color: #ffffff;
       height: \$\{props => props.height * props.scale\};
       display: flex;
       flex: 1 0 auto;
       color: blue;
       width: \$\{widthVar\};
    \``,
    `
      const frag = fragment\`padding: 8px;\`
      const fragB = fragment\`height: \$\{heightVar\}\`
      css\`
       @apply \$\{frag\};
       @apply $\{fragB\}; 
       margin: 12px 48px;
       color: #ffffff;
    \``
  ]
})

describe('babel plugin', () => {
  test('attr kitchen sink', () => {
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

