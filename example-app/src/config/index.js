/* Our Samson App's Development Configuration Data */

/*

  The exported config object tells Samson about our App's:

  - Name
  - Top-level Components
  - Controllers
  - Modules/Plugins
  - Pages
  - Router defaults and event methods

*/

module.exports = {

  Name: 'GA Portal',

  DEBUG: DEBUG,

  Config: require('./custom/dev'),

  Components: require('./components'),

  Extend: {

    Controllers: require('./controllers'),
    Models: require('./models')

  },

  Modules: require('./modules'),

  Pages: require('./pages'),

  Router: require('./router'),

  Setup: require('./setup')

};
