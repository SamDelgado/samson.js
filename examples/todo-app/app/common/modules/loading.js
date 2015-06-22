// /loading.js - App Loading Indicator

module.exports = {

    show : function(header) {

        var loadingBoxHeader = document.getElementById("loading-box-header");

        if (header) {
            loadingBoxHeader.textContent = header;
        } else {
            loadingBoxHeader.textContent = "Loading...";
        }

        App.DOM.loadingBox.classList.add("show-loading");

    },

    hide : function() {

        App.DOM.loadingBox.classList.remove("show-loading");

    }

};
