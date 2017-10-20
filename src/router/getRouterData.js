// get the router's current page and animation data

export default function getRouterData() {

  return {
    currentPage : this.currentPage,
    previousPage : this.previousPage,
    nextPage : this.nextPage,
    isAnimating : this.isAnimating,
    activePage : this.activePage,
    inactivePage : this.inactivePage,
    currentAnimation : this.currentAnimation
  };

}
