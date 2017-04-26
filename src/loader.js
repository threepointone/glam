let postcss = require('postcss')

function toIndex(str, {line, column}){

  let regex = /\n/gm, index = 0
  for(let i = 0 ; i < line - 1; i++ ){
    index = regex.exec(str).index
  }
  return index + column
}

function substr(css, start, end){  
  return css.substring(toIndex(css, start) - 1, toIndex(css, end) + 1).trim()
}

module.exports = function(content) {
  let callback = this.async()
  
  postcss().process(content).then(x => {
    let rules = []
    x.root.nodes.forEach(n => {

      rules.push(substr(content, n.source.start, n.source.end))
    })
    let newSrc = `const sheet = require(${this.query.modulePath || '@threepointone/glam'}).sheet;
      [${rules.map(x => JSON.stringify(x)).join(',\n')}].forEach(function(rule){ sheet.insert(rule) });
    `
    callback(null, newSrc)

  }, err => console.error(err))
  
  
}

