
const path = require('path');
const webpack = require('webpack');

/* Extract our compiled .css to a separate file */
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var PROJECT_ROOT = path.resolve(__dirname, '..'); // top-level project folder
var APP_ROOT = path.resolve(PROJECT_ROOT, 'src'); // src folder containing all app code
var WWW_ROOT = path.resolve(PROJECT_ROOT, 'www'); // www folder that the built code will be copied to

module.exports = {

  entry: path.resolve(APP_ROOT, 'index.js'),

  output: {
    path: WWW_ROOT,
    filename: 'build/main.js'
  },

  resolve: {

    alias: {
      'app': path.resolve(APP_ROOT),
      'assets': path.resolve(APP_ROOT, 'assets'),
      'components': path.resolve(APP_ROOT, 'components'),
      'config': path.resolve(APP_ROOT, 'config'),
      'controllers': path.resolve(APP_ROOT, 'controllers'),
      'models': path.resolve(APP_ROOT, 'models'),
      'modules': path.resolve(APP_ROOT, 'modules'),
      'pages': path.resolve(APP_ROOT, 'pages'),
      'setup': path.resolve(APP_ROOT, 'setup'),
      'styles': path.resolve(APP_ROOT, 'styles')
    }

  },

  module: {
  
    rules: [

      /* Add your html template loader here */
      {
        test: /\.pug$/,
        use: [{ loader: 'pug-loader', options: {} }]
      },

      /* Add your css preprocessor loader here */
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
            { loader: "css-loader" },
            {
              loader: "less-loader",
              options: {
                plugins: [
                  new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
                  new (require('less-plugin-clean-css'))({advanced: true})
                ] 
              }
            }
          ]
        })
      }

    ]

  },

  plugins: [

    new ExtractTextPlugin('build/main.css')

  ],

  /* Extra Configuration */
  target: "web",
  cache: false

};
