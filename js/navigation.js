document.addEventListener("DOMContentLoaded", () => {
    // Navbar scroll effect
    const header = document.getElementById("main-header")
    const backToTopButton = document.getElementById("back-to-top")
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
        backToTopButton.style.display = "block"
      } else {
        header.classList.remove("scrolled")
        backToTopButton.style.display = "none"
      }
    })
  
    // Mobile menu functionality
    const menuToggle = document.querySelector(".mobile-menu-toggle")
    const mobileMenu = document.querySelector(".mobile-menu-overlay")
    const closeMenu = document.querySelector(".close-menu")
  
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.add("active")
      document.body.style.overflow = "hidden" // Prevent scrolling when menu is open
    })
  
    closeMenu.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      document.body.style.overflow = "" // Re-enable scrolling
    })
  
    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll(".mobile-nav-links a")
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active")
        document.body.style.overflow = ""
      })
    })
  
    // Back to top button functionality
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  
    // Set current year in footer
    const currentYearElement = document.getElementById("current-year")
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear()
    }
  })
  