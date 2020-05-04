class MobileMenu {
  constructor() {
    this.menuIcon = document.querySelector(".site-header__menu-icon");
    this.menuContent = document.querySelector(".site-header__menu-content");
    this.siteHeader = document.querySelector(".site-header");
    this.events();
  }

  // events method
  // The arrow function prevents this keyword being amended to point to what was clicked on by addEeventListerner
  events() {
    this.menuIcon.addEventListener("click", () => this.toggleTheMenu());
  }

  // toggleTheMenu method
  toggleTheMenu() {
    // the toggle method belongs to the classList object will toggle the class specified
    this.menuContent.classList.toggle("site-header__menu-content--is-visible");
    this.siteHeader.classList.toggle("site-header--is-expanded");
    this.menuIcon.classList.toggle("site-header__menu-icon--close-x");
  }
}

export default MobileMenu;