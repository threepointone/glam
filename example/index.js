import React from 'react'
import { render } from 'react-dom'
// import css from '../src'

// you can define your own variant 
function css(cls, vars){
  return {
    className: cls,
    style: vars ? vars.reduce((o, va, i) => (o[`--${cls}-${i}`] = vars[i], o), {}) : {}
  }
}

let blue = 'blue'

let cls = css`name: main; font-weight:bold; color: ${blue}`

let cls2 = css`name: green; color: green;`

let cls3 = css`color: ${'yellow'};`

class App extends React.Component{
  render(){
    return <div {...cls}>
      what up
    </div>
  }
}

render(<App/>, window.root)