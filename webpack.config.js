const isDevelopment = (process.env.NODE_ENV === 'development')
const isProduction = (process.env.NODE_ENV === 'production')

const webpack = require('webpack')
const AssetsWebpackPlugin = require('assets-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

const plugins = []

if (isProduction) {
  plugins.push(new AssetsWebpackPlugin())
  plugins.push(new webpack.optimize.UglifyJsPlugin())
  plugins.push(new ExtractTextPlugin('[name]-[contenthash].css'))
}

function styleLoader(loader) {
  if (isProduction) {
    const loaders = loader.split('!')
    return ExtractTextPlugin.extract(loaders.shift(), loaders.join('!'))
  } else {
    return loader
  }
}

module.exports = {
  entry: {
    application: './front/index'
  },
  output: {
    path: path.resolve(__dirname, './public/'),
    publicPath: isDevelopment ? 'http://localhost:8080/public/' : '/public/',
    filename: isDevelopment ? '[name].js' : '[name]-[hash].js',
    chunkFilename: isDevelopment ? '[id].js' : '[id]-[chunkhash].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.sass$/,
        loader: styleLoader('style!css!autoprefixer!sass-loader?indentedSyntax')
      },
      {
        test: /\.css$/, loader: 'style!css'
      },
      {
        test: /\.(ttf)$/,
        loader: 'url-loader?limit=100000&name=./public/fonts/[hash].[ext]'
      },
      {
        test: /\.svg$/,
        loader: 'url-loader'
      }
    ],
    noParse: [
      /node_modules\/sinon/,
    ]
  },
  plugins: plugins,
  noInfo: true
}
