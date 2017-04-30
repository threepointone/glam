import parse from 'styled-components/lib/vendor/postcss-safe-parser/parse'
import postcssNested from 'styled-components/lib/vendor/postcss-nested'
import stringify from 'styled-components/lib/vendor/postcss/stringify'

import autoprefixer from 'autoprefixer'



// import postcss from 'postcss'
// import cssnext from 'postcss-cssnext'

export default function parser(css){
  const root = parse(css)
  postcssNested(root)
  autoprefixer(root)

  return root.nodes.map((node, i) => {    
    let str = ''
    stringify(node, x => str+= x)
    return str
  })
  
}