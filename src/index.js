import { StyleSheet } from './sheet'
import hashArray from './hash'

export const sheet = new StyleSheet()
sheet.inject()

let inserted = {}

function values(cls, vars){
  let hash = hashArray([cls, ...vars])
  if(inserted[hash]) {
    return `vars-${hash}`
  }
  
  let src = vars.map((val, i) => `--${cls}-${i}: ${val}`).join('; ')
  sheet.insert(`.vars-${hash} {${src}}`)  
  inserted[hash] = true

  return `vars-${hash}`

}

export function flush(){
  sheet.flush()
  inserted = {}
  sheet.inject()
}


export default function css(cls, vars){
  return cls + ((vars && vars.length > 0) ?  (' ' + values(cls, vars)) : '')
}

export function hydrate(ids){
  ids.forEach(id => inserted[id] = true)
}
