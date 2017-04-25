import * as babylon from 'babylon'
import touch from 'touch'
import fs from 'fs'

import hashify from './hash'

function parse(src){
  return src
}

function parser(path) {
  let code = path.hub.file.code
  let strs = path.node.quasi.quasis.map(x => x.value.cooked)
  let hash = hashify(strs)
  

  let stubs = path.node.quasi.expressions.map(x => code.substring(x.start, x.end))          
  let ctr = 0


  let src = strs.reduce((arr, str, i) => {
    arr.push(str)
    if(i !== stubs.length) {
      arr.push(`var(--x-${hash}-${i})`)
    }
    return arr
  }, []).join('')
  let parsed = parse(src.trim())
  return { hash, parsed, stubs }
}

module.exports = function({ types: t }){
  return {
    visitor: {
      // Program(path){

      // }
      TaggedTemplateExpression(path){
        let { tag } = path.node            
        let code = path.hub.file.code
        // console.log(path.hub.file)
        if(tag.name === 'css') {
          let file = path.hub.file.opts.filename
          touch.sync(file + '.css')
          
          // import css file 
          // assume style/css loader somewhere
          // css(/* ...css */ 'x-[hash]', [val1, val2])
          let { hash, parsed, stubs } = parser(path)
          fs.appendFileSync(file + '.css', `.x-${hash} { ${parsed} }` )
          let cls = `'x-${hash}'`
          let dynamic = `[${stubs.join(', ')}]`
          let newSrc = `css(${cls}, ${dynamic})`
          path.replaceWith(babylon.parse(newSrc, {plugins: ['*']}).program.body[0].expression)
          
        }
      }
    }
  }
}