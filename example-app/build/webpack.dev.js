// Development Build - SourceMap and Rebuild on File Changes

const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {

  devtool: 'inline-source-map',
  //watch: true,
  watchOptions: {
    aggregateTimeout: 1000, // in ms - aggregates multiple changes to a single rebuild
    poll: true, // enables polling mode for watching
    poll: 500 // intervall in ms
  },

  plugins: [

    new webpack.DefinePlugin({
      'DEBUG': JSON.stringify(true)
    })

  ]

});
