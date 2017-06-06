import css, { sheet } from '../src'

let cls = css` color: red; font-weight:${'bold'} `

import('./index.js.css').then(() => {
  console.log(sheet.rules())
})
