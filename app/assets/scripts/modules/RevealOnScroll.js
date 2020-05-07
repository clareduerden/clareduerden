class RevealOnScroll {
  constructor() {
    this.itemsToReveal = document.querySelectorAll(".feature-item");
    this.hideInitially();
    this.events();
  }

  events() {
    window.addEventListener("scroll", () => {
      this.itemsToReveal.forEach(el => {
        this.calculateIfScrolledTo(el);
      })
    })
  }

  calculateIfScrolledTo(el) {
    // Measure how far the top edges of the el is from the top edge of the current bounding rectangle - i.e. the browser's viewport.
    // Measure when the top edge of the el is 25% in view at the bottom of screen
    let scrollPercent = (el.getBoundingClientRect().y / window.innerHeight) * 100;
    if (scrollPercent < 75) {
      el.classList.add("reveal-item--is-visible");
    }
  }

  hideInitially() {
    // loop through each of the elements and add the class .reveal-item
    this.itemsToReveal.forEach(el => el.classList.add("reveal-item"));
  }
}

export default RevealOnScroll;