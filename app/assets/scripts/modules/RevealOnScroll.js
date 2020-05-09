import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class RevealOnScroll {
  constructor(els, thresholdPercent) {
    this.itemsToReveal = els;
    this.thresholdPercent = thresholdPercent;
    this.browserHeight = window.innerHeight;
    this.hideInitially();
    // throttle the scroll - function to be called no more than every 200ms (5 times per sec)
    // bind to ensure this keeps pointing to overall object
    // Make it a named function so we can call it again to remove it
    this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
    this.events();
  }

  // When a scroll occurs, call the named function scrollThrottle
  // Use debounce to group sequential resize event calls - update the value of browserHeight
  events() {
    window.addEventListener("scroll", this.scrollThrottle);
    window.addEventListener("resize", debounce(() => {
      console.log("Resize just ran");
      this.browserHeight = window.innerHeight;
    }, 300))
  }

  // Method - if items have not been scrolled to yet then run the calculation
  calcCaller() {
    console.log("Scroll function ran");
    this.itemsToReveal.forEach(el => {
      if (el.isRevealed == false) {
        this.calculateIfScrolledTo(el);
      }
    })
  }

  // method - if el in bottom 25% of the screen viewport then make visible. Then forEach mark isRevealed as true, and if it is the last el then remove the eventListener
  calculateIfScrolledTo(el) {
    // scollY is how far has been scrolled (px), offsetTop says how far down el is on page (px)
    if ((window.scrollY + this.browserHeight) > el.offsetTop) {
      console.log("Element was calculated");
      // Measure how far away top edge of el is from the top edge of browser viewport.
      // Find when top edge of el is 25% in view at the bottom of screen using the screen height
      let scrollPercent = (el.getBoundingClientRect().y / this.browserHeight) * 100;
      if (scrollPercent < this.thresholdPercent) {
        el.classList.add("reveal-item--is-visible");
        el.isRevealed = true;
        if (el.isLastItem) {
          window.removeEventListener("scroll", this.scrollThrottle);
        }
      }
    }
  }

  // Method - hide elements to start and set up properties isRevealed and isLastItem 
  hideInitially() {
    this.itemsToReveal.forEach(el => {
      el.classList.add("reveal-item");
      el.isRevealed = false;
    })
    this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;
  }
}

export default RevealOnScroll;