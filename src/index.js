import { StyleSheet } from './sheet'
import hashify from './hash'

const sheet = new StyleSheet()
sheet.inject()

const inserted = {}

function dynamics(cls, vars){
  let hash = hashify(vars)
  if(inserted[hash]) {
    return `vars-${hash}`
  }
  
  let src = vars.map((val, i) => `--${cls}-${i}: ${val}`).join(';')
  sheet.insert(`.vars-${hash} {${src}}`)  
  inserted[hash] = true

  return `vars-${hash}`

}

export default function css(cls, vars){
  return cls + (vars && vars.length > 0 ?  (' ' + dynamics(cls, vars)) : '')
}