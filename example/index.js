import React from 'react'
import { render } from 'react-dom'
import css from '../src'

// function css(cls, vars, make){
//   console.log(cls, vars, make)
// }

let blue = 'blue'

let cls = css`
  display:flex; 
  font-weight:bold; 
  font-size: calc(${20} * 2px); 
  &:hover { 
    color: red 
}`

let cls2 = css`name: green; color: green;`

let cls3 = css`color: ${'yellow'};`

let cls4 = css`
  @media screen {
    color: gray
  }
`

class App extends React.Component{
  render(){
    return <div className={cls}>
      what up
    </div>
  }
}

render(<App/>, window.root)
