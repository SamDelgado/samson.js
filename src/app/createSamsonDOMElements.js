
export default function createSamsonDOMElements() {

  // add the core divs to the body
  // #App, #Pages, #Page_1, #Page_2
  App.DOM.App = document.createElement("div");
  App.DOM.App.id = "App";

  App.DOM.Pages = document.createElement("div");
  App.DOM.Pages.id = "Pages";

  App.DOM.Page_1 = document.createElement("div");
  App.DOM.Page_1.id = "Page_1";
  App.DOM.Page_1.classList.add("Page", "active");
  App.DOM.Pages.appendChild(App.DOM.Page_1);

  App.DOM.Page_2 = document.createElement("div");
  App.DOM.Page_2.id = "Page_2";
  App.DOM.Page_2.classList.add("Page");
  App.DOM.Pages.appendChild(App.DOM.Page_2);

  App.DOM.App.appendChild(App.DOM.Pages);

  document.body.appendChild(App.DOM.App); // add the base divs to the body

}
