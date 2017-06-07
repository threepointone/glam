/* eslint-disable no-useless-escape */
/* eslint-env jest */
const path = require('path');
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
