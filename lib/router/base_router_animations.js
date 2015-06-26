
var animationAmount = "100%";
var animationDuration = "0.4s";

module.exports = {

  names: {

    "top" : { current: "move-to-bottom", next: "move-from-top" },
    "bottom" : { current: "move-to-top", next: "move-from-bottom" },
    "left" : { current: "move-to-right", next: "move-from-left" },
    "right" : { current: "move-to-left", next: "move-from-right" },
    "scale" : { current: "scale-out", next: "scale-in" },
    "fade" : { current: "fade-out", next: "fade-in" }

  },

  styles: {

    ".move-to-top": {
      "animation-name": "moveToTop",
      "animation-duration": animationDuration,
      "animation-timing-function": "ease-out"
    },

    ".move-from-top": {
      "animation-name": "moveFromTop",
      "animation-duration": animationDuration,
      "animation-timing-function": "ease-in"
    },

    ".move-to-bottom": {
      "animation-name": "moveToBottom",
      "animation-duration": animationDuration,
      "animation-timing-function": "ease-in"
    },

    ".move-from-bottom": {
      "animation-name": "moveFromBottom",
      "animation-duration": animationDuration,
      "animation-timing-function": "ease-in"
    },

    ".move-to-left": {
      "animation-name": "moveToLeft",
      "animation-duration": animationDuration,
      "animation-timing-function": "ease-out"
    },

    ".move-from-left": {
      "animation-name": "moveFromLeft",
      "animation-duration": animationDuration,
      "animation-timing-function": "ease-out"
    },

    ".move-to-right": {
      "animation-name": "moveToRight",
      "animation-duration": animationDuration,
      "animation-timing-function": "ease-out"
    },

    ".move-from-right": {
      "animation-name": "moveFromRight",
      "animation-duration": animationDuration,
      "animation-timing-function": "ease-out"
    },

    ".scale-out": {
      "animation-name": "scaleOut",
      "animation-duration": animationDuration,
      "animation-timing-function": "ease-in-out"
    },

    ".scale-in": {
      "animation-name": "scaleIn",
      "animation-duration": animationDuration,
      "animation-timing-function": "ease-in-out"
    },

    ".fade-out": {
      "animation-name": "fadeOut",
      "animation-duration": animationDuration,
      "animation-timing-function": "ease-in-out"
    },

    ".fade-in": {
      "animation-name": "fadeIn",
      "animation-duration": animationDuration,
      "animation-timing-function": "ease-in-out"
    },

    "@keyframes moveToTop" : {
      to : {
        "Transform": "translateY(-" + animationAmount + ")"
      }
    },

    "@keyframes moveFromTop" : {
      from : {
        "Transform": "translateY(-" + animationAmount + ")"
      }
    },

    "@keyframes moveToBottom" : {
      to : {
        "Transform": "translateY(" + animationAmount + ")"
      }
    },

    "@keyframes moveFromBottom" : {
      from : {
        "Transform": "translateY(" + animationAmount + ")"
      }
    },

    "@keyframes moveToLeft" : {
      to : {
        "Transform": "translateX(-" + animationAmount + ")"
      }
    },

    "@keyframes moveFromLeft" : {
      from : {
        "Transform": "translateX(-" + animationAmount + ")"
      }
    },

    "@keyframes moveToRight" : {
      to : {
        "Transform": "translateX(" + animationAmount + ")"
      }
    },

    "@keyframes moveFromRight" : {
      from : {
        "Transform": "translateX(" + animationAmount + ")"
      }
    },

    "@keyframes scaleOut" : {
      to : {
        opacity: "0",
        "Transform": "scale(.1)"
      }
    },

    "@keyframes scaleIn" : {
      from : {
        opacity: "0",
        "Transform": "scale(.1)"
      }
    },

    "@keyframes fadeOut" : {
      to : {
        opacity: "0"
      }
    },

    "@keyframes fadeIn" : {
      from : {
        opacity: "0"
      }
    }

  }

};
