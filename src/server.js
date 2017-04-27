
export function extract(html) {
  // parse out ids from html
  // reconstruct css/rules/cache to pass
  
  let o = { ids: [], css: '', rules: [] }
  let regex = /vars\-([a-zA-Z0-9]+)/gm
  let match, ids = {}
  while((match = regex.exec(html)) !== null) {
    if(!ids[match[1] + '']) {
      ids[match[1] + ''] = true
    }
  }

  o.rules = sheet.rules().filter(x => {
    let regex = /css\-([a-zA-Z0-9]+)/gm
    let match = regex.exec(x.cssText)
    if(match && ids[match[1] + '']) {
      return true
    }
    if(!match) {
      return true
    }
    return false
  })
  o.ids = Object.keys(inserted).filter(id => !!ids[id + ''] || styleSheet.registered[id].type === 'raw')
  o.css = o.rules.map(x => x.cssText).join('')

  return o
}