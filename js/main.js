document.addEventListener("DOMContentLoaded", () => {
    // Navbar scroll effect
    const header = document.getElementById("main-header");
    const backToTopButton = document.getElementById("back-to-top");
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
        backToTopButton.style.display = "flex";
      } else {
        header.classList.remove("scrolled");
        backToTopButton.style.display = "none";
      }
    });
  
    // Mobile menu functionality
    const menuToggle = document.querySelector(".mobile-menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu-overlay");
    const closeMenu = document.querySelector(".close-menu");
  
    if (menuToggle) {
      menuToggle.addEventListener("click", () => {
        mobileMenu.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
      });
    }
  
    if (closeMenu) {
      closeMenu.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        document.body.style.overflow = ""; // Re-enable scrolling
      });
    }
  
    // Mobile dropdown functionality
    const mobileDropdownTriggers = document.querySelectorAll(".mobile-dropdown-trigger");
    
    mobileDropdownTriggers.forEach(trigger => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        const dropdownMenu = trigger.nextElementSibling;
        dropdownMenu.classList.toggle("active");
        
        // Toggle icon
        const icon = trigger.querySelector("i");
        if (icon.classList.contains("fa-chevron-down")) {
          icon.classList.remove("fa-chevron-down");
          icon.classList.add("fa-chevron-up");
        } else {
          icon.classList.remove("fa-chevron-up");
          icon.classList.add("fa-chevron-down");
        }
      });
    });
  
    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll(".mobile-nav-links a:not(.mobile-dropdown-trigger)");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  
    // Back to top button functionality
    if (backToTopButton) {
      backToTopButton.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    }
  
    // Multi-step form functionality
    const formSteps = document.querySelectorAll(".form-step");
    const progressBar = document.querySelector(".progress");
    const steps = document.querySelectorAll(".step");
    const nextButtons = document.querySelectorAll(".next-btn");
    const prevButtons = document.querySelectorAll(".prev-btn");
    
    if (formSteps.length > 0) {
      let currentStep = 1;
      
      // Next button functionality
      nextButtons.forEach(button => {
        button.addEventListener("click", () => {
          // Validate current step
          if (validateStep(currentStep)) {
            // Move to next step
            formSteps.forEach(step => step.classList.remove("active"));
            currentStep++;
            document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add("active");
            
            // Update progress bar
            progressBar.style.width = `${(currentStep - 1) * 50}%`;
            
            // Update step indicators
            steps.forEach(step => step.classList.remove("active"));
            document.querySelector(`.step[data-step="${currentStep}"]`).classList.add("active");
          }
        });
      });
      
      // Previous button functionality
      prevButtons.forEach(button => {
        button.addEventListener("click", () => {
          formSteps.forEach(step => step.classList.remove("active"));
          currentStep--;
          document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add("active");
          
          // Update progress bar
          progressBar.style.width = `${(currentStep - 1) * 50}%`;
          
          // Update step indicators
          steps.forEach(step => step.classList.remove("active"));
          document.querySelector(`.step[data-step="${currentStep}"]`).classList.add("active");
        });
      });
      
      // Validate form step
      function validateStep(step) {
        let isValid = true;
        const currentFormStep = document.querySelector(`.form-step[data-step="${step}"]`);
        
        // Get all required inputs in current step
        const requiredInputs = currentFormStep.querySelectorAll("input[required], select[required]");
        
        requiredInputs.forEach(input => {
          if (!input.value.trim()) {
            isValid = false;
            const errorMessage = input.nextElementSibling || input.parentElement.querySelector(".error-message");
            if (errorMessage) {
              errorMessage.textContent = "This field is required";
            }
            input.classList.add("error");
          } else {
            const errorMessage = input.nextElementSibling || input.parentElement.querySelector(".error-message");
            if (errorMessage) {
              errorMessage.textContent = "";
            }
            input.classList.remove("error");
          }
        });
        
        // Specific validation for email
        const emailInput = currentFormStep.querySelector('input[type="email"]');
        if (emailInput && emailInput.value.trim()) {
          if (!isValidEmail(emailInput.value.trim())) {
            isValid = false;
            const errorMessage = emailInput.parentElement.querySelector(".error-message");
            if (errorMessage) {
              errorMessage.textContent = "Please enter a valid email address";
            }
            emailInput.classList.add("error");
          }
        }
        
        // Specific validation for password
        if (step === 2) {
          const passwordInput = document.getElementById("password");
          const confirmPasswordInput = document.getElementById("confirmPassword");
          
          if (passwordInput.value.trim() && confirmPasswordInput.value.trim()) {
            if (passwordInput.value !== confirmPasswordInput.value) {
              isValid = false;
              const errorMessage = confirmPasswordInput.parentElement.querySelector(".error-message");
              if (errorMessage) {
                errorMessage.textContent = "Passwords do not match";
              }
              confirmPasswordInput.classList.add("error");
            }
          }
        }
        
        return isValid;
      }
    }
  
    // Password strength meter
    const passwordInput = document.getElementById("password");
    if (passwordInput) {
      const strengthBar = document.querySelector(".strength-bar");
      const strengthText = document.querySelector(".strength-text");
      
      // Password requirement elements
      const lengthReq = document.getElementById("length-req");
      const uppercaseReq = document.getElementById("uppercase-req");
      const lowercaseReq = document.getElementById("lowercase-req");
      const numberReq = document.getElementById("number-req");
      const specialReq = document.getElementById("special-req");
      
      passwordInput.addEventListener("input", function() {
        const password = this.value;
        const strength = calculatePasswordStrength(password);
        
        // Update strength bar
        strengthBar.style.width = `${strength.score * 25}%`;
        
        // Update color based on strength
        if (strength.score === 0) {
          strengthBar.style.backgroundColor = "#ff4d4d"; // Red
          strengthText.textContent = "Password strength: Very weak";
        } else if (strength.score === 1) {
          strengthBar.style.backgroundColor = "#ffa64d"; // Orange
          strengthText.textContent = "Password strength: Weak";
        } else if (strength.score === 2) {
          strengthBar.style.backgroundColor = "#ffff4d"; // Yellow
          strengthText.textContent = "Password strength: Medium";
        } else if (strength.score === 3) {
          strengthBar.style.backgroundColor = "#4dff4d"; // Green
          strengthText.textContent = "Password strength: Strong";
        } else {
          strengthBar.style.backgroundColor = "#4dffff"; // Cyan
          strengthText.textContent = "Password strength: Very strong";
        }
        
        // Update requirements
        if (password.length >= 8) {
          lengthReq.classList.add("valid");
          lengthReq.querySelector("i").classList.remove("fa-times-circle");
          lengthReq.querySelector("i").classList.add("fa-check-circle");
        } else {
          lengthReq.classList.remove("valid");
          lengthReq.querySelector("i").classList.remove("fa-check-circle");
          lengthReq.querySelector("i").classList.add("fa-times-circle");
        }
        
        if (/[A-Z]/.test(password)) {
          uppercaseReq.classList.add("valid");
          uppercaseReq.querySelector("i").classList.remove("fa-times-circle");
          uppercaseReq.querySelector("i").classList.add("fa-check-circle");
        } else {
          uppercaseReq.classList.remove("valid");
          uppercaseReq.querySelector("i").classList.remove("fa-check-circle");
          uppercaseReq.querySelector("i").classList.add("fa-times-circle");
        }
        
        if (/[a-z]/.test(password)) {
          lowercaseReq.classList.add("valid");
          lowercaseReq.querySelector("i").classList.remove("fa-times-circle");
          lowercaseReq.querySelector("i").classList.add("fa-check-circle");
        } else {
          lowercaseReq.classList.remove("valid");
          lowercaseReq.querySelector("i").classList.remove("fa-check-circle");
          lowercaseReq.querySelector("i").classList.add("fa-times-circle");
        }
        
        if (/\d/.test(password)) {
          numberReq.classList.add("valid");
          numberReq.querySelector("i").classList.remove("fa-times-circle");
          numberReq.querySelector("i").classList.add("fa-check-circle");
        } else {
          numberReq.classList.remove("valid");
          numberReq.querySelector("i").classList.remove("fa-check-circle");
          numberReq.querySelector("i").classList.add("fa-times-circle");
        }
        
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
          specialReq.classList.add("valid");
          specialReq.querySelector("i").classList.remove("fa-times-circle");
          specialReq.querySelector("i").classList.add("fa-check-circle");
        } else {
          specialReq.classList.remove("valid");
          specialReq.querySelector("i").classList.remove("fa-check-circle");
          specialReq.querySelector("i").classList.add("fa-times-circle");
        }
      });
    }
  
    // Toggle password visibility
    const togglePasswordButtons = document.querySelectorAll(".toggle-password");
    togglePasswordButtons.forEach(button => {
      button.addEventListener("click", function() {
        const inputId = this.getAttribute("data-for");
        const input = document.getElementById(inputId);
        
        if (input.type === "password") {
          input.type = "text";
          this.classList.remove("fa-eye");
          this.classList.add("fa-eye-slash");
        } else {
          input.type = "password";
          this.classList.remove("fa-eye-slash");
          this.classList.add("fa-eye");
        }
      });
    });
  
    // Helper functions
    function calculatePasswordStrength(password) {
      let score = 0;
      const feedback = [];
      
      if (!password) {
        return { score, feedback };
      }
      
      // Length check
      if (password.length >= 8) {
        score++;
      } else {
        feedback.push("Password should be at least 8 characters long");
      }
      
      // Complexity checks
      const hasLowercase = /[a-z]/.test(password);
      const hasUppercase = /[A-Z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      
      let complexityScore = 0;
      if (hasLowercase) complexityScore++;
      if (hasUppercase) complexityScore++;
      if (hasNumbers) complexityScore++;
      if (hasSpecialChars) complexityScore++;
      
      if (complexityScore >= 3) {
        score++;
      } else {
        feedback.push("Add uppercase letters, numbers, and special characters");
      }
      
      // Common patterns check
      const commonPatterns = ["123456", "password", "qwerty", "admin", "welcome", "123123", "abc123"];
      
      const containsCommonPattern = commonPatterns.some((pattern) => password.toLowerCase().includes(pattern));
      
      if (!containsCommonPattern) {
        score++;
      } else {
        feedback.push("Avoid common password patterns");
      }
      
      // Length bonus
      if (password.length >= 12) {
        score++;
      }
      
      return { score, feedback };
    }
    
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    // Cart functionality
    const cartCount = document.querySelector(".cart-count");
    const buyButtons = document.querySelectorAll(".buy-button");
    
    if (buyButtons.length > 0) {
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      updateCartCount();
      
      buyButtons.forEach(button => {
        button.addEventListener("click", function() {
          const productCard = this.closest(".product-card, .product-item");
          const productId = productCard.getAttribute("data-product-id");
          const productName = productCard.querySelector("h3").textContent;
          const productPrice = parseFloat(productCard.querySelector(".price").textContent.replace(/[^\d.]/g, ""));
          const productImage = productCard.querySelector("img").src;
          
          // Add to cart
          cartItems.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
          });
          
          // Save to localStorage
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          
          // Update cart count
          updateCartCount();
          
          // Show add to cart animation
          showAddToCartAnimation(button);
        });
      });
      
      function updateCartCount() {
        if (cartCount) {
          cartCount.textContent = cartItems.length;
        }
      }
      
      function showAddToCartAnimation(button) {
        // Create floating element
        const floater = document.createElement("div");
        floater.className = "cart-floater";
        floater.innerHTML = '<i class="fas fa-shopping-cart"></i>';
        floater.style.position = "fixed";
        floater.style.zIndex = "9999";
        floater.style.fontSize = "24px";
        floater.style.color = "#e3d03a";
        
        // Position at the button
        const rect = button.getBoundingClientRect();
        floater.style.left = `${rect.left + rect.width / 2}px`;
        floater.style.top = `${rect.top + rect.height / 2}px`;
        
        document.body.appendChild(floater);
        
        // Get cart icon position
        const cartIcon = document.querySelector(".cart-icon");
        if (cartIcon) {
          const cartRect = cartIcon.getBoundingClientRect();
          
          // Animate to cart
          floater.style.transition = "all 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55)";
          setTimeout(() => {
            floater.style.left = `${cartRect.left + cartRect.width / 2}px`;
            floater.style.top = `${cartRect.top + cartRect.height / 2}px`;
            floater.style.opacity = "0";
            floater.style.transform = "scale(0.5)";
            
            // Animate cart icon
            cartIcon.style.transform = "scale(1.5)";
            setTimeout(() => {
              cartIcon.style.transform = "scale(1)";
              document.body.removeChild(floater);
            }, 800);
          }, 10);
        } else {
          // If cart icon not found, just fade out
          setTimeout(() => {
            floater.style.opacity = "0";
            setTimeout(() => {
              document.body.removeChild(floater);
            }, 800);
          }, 500);
        }
      }
    }
  
    // Newsletter form
    const newsletterForm = document.querySelector(".newsletter-form");
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const emailInput = this.querySelector("input[type='email']");
        if (emailInput.value.trim() && isValidEmail(emailInput.value.trim())) {
          // Show success message
          const successMessage = document.createElement("div");
          successMessage.className = "newsletter-success";
          successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>Thank you for subscribing to our newsletter!</p>
          `;
          successMessage.style.color = "#4CAF50";
          successMessage.style.marginTop = "10px";
          successMessage.style.display = "flex";
          successMessage.style.alignItems = "center";
          successMessage.style.gap = "5px";
          
          // Remove any existing success message
          const existingMessage = newsletterForm.querySelector(".newsletter-success");
          if (existingMessage) {
            existingMessage.remove();
          }
          
          newsletterForm.appendChild(successMessage);
          emailInput.value = "";
          
          // Remove success message after 3 seconds
          setTimeout(() => {
            successMessage.remove();
          }, 3000);
        }
      });
    }
  });