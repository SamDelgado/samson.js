module.exports = {
  "*, *:before, *:after": {
    "-webkit-box-sizing": "border-box",
    "box-sizing": "border-box"
  },
  "::-webkit-scrollbar": {
    "display": "none"
  },
  "html, body, #samson_app": {
    "position": "relative",
    "width": "100%",
    "height": "100%",
    "background-color": "#FFF"
  },
  "#samson_faded_overlay, #samson_transparent_overlay": {
    "background-color": "#000",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    "z-index": 10,
    opacity: 0,
    visibility: "hidden"
  },
  "#samson_faded_overlay": {
    transition: "opacity 0.2s linear, visibility 0s linear 0.2s"
  },
  "#samson_faded_overlay.show": {
    opacity: "0.6",
    visibility: "visible",
    "transition-delay": "0s"
  },
  "#samson_transparent_overlay.show": {
    visibility: "visible"
  },
  "#samson_pages": {
    "position": "absolute",
    "top": "0",
    "left": "0",
    "right": "0",
    "bottom": "0",
    "z-index": 1,
    "overflow": "hidden"
  },
  ".samson-page": {
    "position": "absolute",
    "top": "0",
    "left": "0",
    "right": "0",
    "bottom": "0",
    "opacity": 1,
    "Transform": "translate3d(0,0,0)"
  },
  ".samson-page.active": {
    "z-index": 2
  }
};
