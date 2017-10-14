
const path = require('path');
const webpack = require('webpack');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  
  entry: './index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'samson.js',
    library: 'Samson',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

  /* Extra Configuration */
  devtool: 'source-map',

  plugins: [

    new UglifyJSPlugin({
      compress: true,
      mangle: true,
      comments: false, // set to true to preserve comments
      sourceMap: true // set to true to create a source map
    })

  ]

};