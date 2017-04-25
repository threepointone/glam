import { StyleSheet } from './sheet'
import hashify from './hash'
const inserted = {}

const sheet = new StyleSheet()
sheet.inject()

// todo - weakmap cache here 
function toClass(cls, spec){
  let hash = hashify(spec)
  if(inserted[hash]) {
    return `y-${hash}`
  }
  inserted[hash] = true

  let src = spec.map((val, i) => `--${cls}-${i}: ${val}`).join(';')
  if(src){
    sheet.insert(`.y-${hash} {${src}}`)  
  }  
  return `y-${hash}`

}

export default function css(className, dynamic){
  return className + (dynamic.length > 0 ?  (' ' + toClass(className, dynamic)) : '')
}