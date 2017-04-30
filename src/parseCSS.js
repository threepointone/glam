import parse from 'styled-components/lib/vendor/postcss-safe-parser/parse'
import postcssNested from 'styled-components/lib/vendor/postcss-nested'
import stringify from 'styled-components/lib/vendor/postcss/stringify'
import autoprefix from 'styled-components/lib/utils/autoprefix'


export default function parser(css){
  const root = parse(css)
  postcssNested(root)
  autoprefix(root)

  return root.nodes.map((node, i) => {    
    let str = ''
    stringify(node, x => str+= x)
    return str
  })
  
}