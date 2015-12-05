const fs = require('fs')

const isProduction = (process.env.NODE_ENV === 'production')
var assets

if (isProduction) {
  try {
    var data = fs.readFileSync(process.cwd() + '/webpack-assets.json')
    console.log('Webpack assets loaded: ' + data)
    assets = JSON.parse(data)
  } catch (e) {
    console.warn(e)
  }
}

module.exports = {
  webpackJsEntry: (filename) => {
    return isProduction ? assets[filename]['js'] : `http://localhost:8080/public/${filename}.js`
  },
  webpackCssEntry: (filename) => {
    return isProduction ? assets[filename]['css'] : `http://localhost:8080/public/${filename}.css`
  }
}
