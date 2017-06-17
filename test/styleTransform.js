const path = require('path')
const crypto = require('crypto')

module.exports = {
  process (src, filename) {
    return `
    if (!global.stylesMocked) global.mockedCssImports = {}
    global.mockedCssImports[${JSON.stringify(path.basename(filename))}] = ${JSON.stringify(src)}
    `
  },
  getCacheKey (src, file, configString) { // sometimes this breaks so you need to do npm run test -- --no-cache
    const styleTransformVersion = '1' // change this whenever you update the process function
    return crypto.createHash('md5')
    .update(styleTransformVersion)
    .update(src + file + configString)
    .digest('hex')
  }
}
