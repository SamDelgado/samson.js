// Production Build

const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {

  devtool: 'cheap-module-source-map',

  plugins: [

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
      'DEBUG': JSON.stringify(false)
    }),

    new UglifyJSPlugin({
      compress: {
        warnings: false
      },
      mangle: true,
      comments: false, // set to true to preserve comments
      sourceMap: true // set to true to create a source map
    })

  ]

});
