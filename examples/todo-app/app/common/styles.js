
module.exports = {

  /* Remove the scrollbar */
  "::-webkit-scrollbar": {
    "display": "none"
  },

  "select, input, textarea, button": {
    appearance: "none"
  },

  /*
  "input:focus, textarea:focus": {
    "outline-style": "none",
    "outline-width": "0"
  },
  */

  /* Set the base font size to 10px and use the Exo font */
  "html": {
    "font-size": "10px",
    "font-family": "Exo",
    "font-style": "normal",
    "font-weight": "normal",
    color: Colors.black
  },

  /* Set the background color of the app to our chosen lightGray color */
  "#samson_app": {
    "background-color": Colors.lightGray
  }
};
