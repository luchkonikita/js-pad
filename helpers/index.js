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
  webpackJsTag: (filename) => {
    if (isProduction) {
      return `<script type="text/javascript" src="${assets[filename]['js']}"></script>`
    } else {
      return `<script type="text/javascript" src="http://localhost:8080/public/${filename}.js"></script>`
    }
  },
  webpackCssTag: (filename) => {
    if (isProduction) {
      return `<link rel="stylesheet" media="all" href="${assets[filename]['css']}">`
    }
  }
}
