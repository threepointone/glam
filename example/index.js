import React from 'react'
import { render } from 'react-dom'
import css, { fragment } from '../src'

// function css(cls, vars, make){
//   console.log(cls, vars, make)
// }

// let blue = 'blue'
// let myColor = 'green'

// // input
// let example = css`
//   color: red;
//   &:hover {
//     color: ${myColor}
//   }
// `
// // generated
// let example = css('css-wbh6ke', [myColor], (x0) =>
//   [
//     `.css-wbh6ke { color: red; }
//     .css-wbh6ke:hover { color: ${x0}}`
//   ]
// );

// let cls = css`
//   display:flex;
//   font-weight:bold;
//   font-size: calc(${20} * 2px);
//   &:hover {
//     color: red
// }`

// let cls2 = css`name: green; color: green;`

// let cls3 = css`color: ${'yellow'};`

// let cls4 = css`
//   @media screen {
//     color: gray
//   }
// `

import('./index.js.css')

let chunk = fragment`
  background-color: gray;
  border-radius: ${'50px'};
`

let frag = fragment`
  @apply ${chunk};
  font-size: ${'50px'};
  color: red;
`

let cls = css`
 @apply ${frag};
 font-weight: bold;
`

class App extends React.Component {
  render () {
    return <div className={cls}>
      what up
    </div>
  }
}

render(<App />, window.root)
