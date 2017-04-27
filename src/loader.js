let postcss = require('postcss')

function toIndex(str, {line, column}){

  let regex = /\n/gm, index = 0
  for(let i = 0 ; i < line - 1; i++ ){
    index = regex.exec(str).index
  }
  return index + column
}

function extract(css, start, end){  
  return css.substring(toIndex(css, start) - 1, toIndex(css, end) + 1).trim()
}

module.exports = function(content) {
  let callback = this.async()
  
  postcss().process(content).then(ast => { // todo - from, to
    let rules = ast.root.nodes.map(n => 
      extract(content, n.source.start, n.source.end)
    )
    let newSrc = `var sheet = require(${this.query.modulePath || '@threepointone/glam'}).sheet;
      [${rules.map(rule => JSON.stringify(rule)).join(',\n')}].forEach(function(rule){ sheet.insert(rule) });
    `
    callback(null, newSrc)

  }, err => callback(err))
  
}



