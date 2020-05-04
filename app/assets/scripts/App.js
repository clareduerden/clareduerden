// Import our CSS file
import '../styles/styles.css'
import MobileMenu from './modules/MobileMenu'

// Hot module replacement
if (module.hot) {
  module.hot.accept()
}

// Create a new instance of MobileMenu
let mobileMenu = new MobileMenu();




