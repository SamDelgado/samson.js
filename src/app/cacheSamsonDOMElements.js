
import { SamsonApp } from '../index.js';

export default function cacheSamsonDOMElements() {

  SamsonApp.DOM.App = document.getElementById('App');

  SamsonApp.DOM.Pages = document.getElementById('Pages');

  SamsonApp.DOM.Page_1 = document.getElementById('Page_1');

  SamsonApp.DOM.Page_2 = document.getElementById('Page_2');

}
