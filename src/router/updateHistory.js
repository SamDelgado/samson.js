

import { SamsonApp } from '../index.js';

export default function updateHistory(kind, message) {

  var self = this;

  var history_object = {};
  history_object.date = new Date();

  // if we are navigating forward
  if (kind === "navigate") {

    history_object.kind = kind;
    history_object.page = this.nextPage;
    this.History.push(history_object);

    // check if the currentPage is safe to go back to from anywhere
    var back_safe = this.currentPage ? SamsonApp.Pages[this.currentPage].isBackSafe : false;

    // if the currentPage is back safe, then set it as the previousPage, otherwise set the configured previousPage
    this.previousPage = back_safe ? this.currentPage : SamsonApp.Pages[this.nextPage].previousPage;

    // set our currentPage as the page we are going to
    this.currentPage = this.nextPage;


  } else if (kind === "back") {

    history_object.kind = kind;
    history_object.page = this.previousPage;
    this.History.push(history_object);

    // we are going back, so set our currentPage as our previousPage
    this.currentPage = this.previousPage;

    // we are going back, so set the previousPage to the current Page's previousPage
    this.previousPage = SamsonApp.Pages[this.currentPage].previousPage;

  } else if (kind === "failed") {
    SamsonApp.DEBUG && SamsonApp.log('The Samson Router event failed: ' + message);
  }

  // if it wasn't just a page update, then switch the activePageElement and inactivePageElement values
  if (kind !== "update" && kind !== "failed") {
    var new_active_page = this.inactivePage;
    this.inactivePage = this.activePage;
    this.activePage = new_active_page;
  }

  this.nextPage = false;

  // check to see if there is another router event in the queue
  var queue_event = this.Queue.shift();
  if (queue_event) {

    if (queue_event.kind === "navigate") {

      // added a 20ms delay due to some weird behavior with css animations not working without it
      setTimeout(function() {
        self.isBusy = false;
        self.navigate(queue_event.next_page, queue_event.animation, queue_event.callback);
      }, 20);

    } else {
      this.back(queue_event.callback);
    }

  } else {
    this.isBusy = false;
  }

}
