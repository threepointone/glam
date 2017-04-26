import React from 'react'
import { render } from 'react-dom'
import css from '../src'

// you can define your own variant 
// function css(cls, vars){
//   return {
//     className: cls,
//     style: vars ? vars.reduce((o, va, i) => (o[`--${cls}-${i}`] = vars[i], o), {}) : {}
//   }
// }

// function merge(o1, o2){
//   return {
//     className: 
//   }
// }

let blue = 'blue'

let cls = css`display:flex; font-weight:bold; color: ${blue}; &:hover { color: red }`

let cls2 = css`name: green; color: green;`

let cls3 = css`color: ${'yellow'};`

class App extends React.Component{
  render(){
    return <div className={cls}>
      what up
    </div>
  }
}

render(<App/>, window.root)

// let cls1 = css`color:red; font-weight:${'bold'}`;
// let cls2 = css`color:red; font-weight:${'bold'}`;