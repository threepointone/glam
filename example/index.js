import React from 'react'
import { render } from 'react-dom'
import css from '../src'

let blue = 'blue'

let cls = css`font-weight:bold; color: ${blue}`

let cls2 = css`color: green;`

let cls3 = css`color: ${'yellow'};`

class App extends React.Component{
  render(){
    return <div className={cls3}>
      what up
    </div>
  }
}

render(<App/>, window.root)