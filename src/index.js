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
  let src = spec.map((val, i) => `--${cls}-${i}: ${val}`).join(';')
  src = `.y-${hash} {${src}}`
  inserted[hash] = true
  sheet.insert(src)
  return `y-${hash}`

}

export default function css(className, dynamic){
  return className + ' ' + toClass(className, dynamic)
}