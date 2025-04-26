document.addEventListener("DOMContentLoaded", () => {
    // Set minimum date for delivery/pickup to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('delivery-date').min = today;
    document.getElementById('pickup-date').min = today;
  
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
  
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Hide all tab contents
        tabContents.forEach(content => content.style.display = 'none');
        
        // Show the selected tab content
        const tabId = button.getAttribute('data-tab') + '-tab';
        document.getElementById(tabId).style.display = 'block';
        
        // Update delivery fee based on selected tab
        updateDeliveryFee();
      });
    });
  
    // Delivery time radio buttons
    const asapRadio = document.getElementById('asap');
    const scheduledRadio = document.getElementById('scheduled');
    const scheduledTimeDiv = document.querySelector('.scheduled-time');
  
    asapRadio.addEventListener('change', () => {
      scheduledTimeDiv.style.display = 'none';
    });
  
    scheduledRadio.addEventListener('change', () => {
      scheduledTimeDiv.style.display = 'block';
    });
  
    // Pickup time radio buttons
    const pickupAsapRadio = document.getElementById('pickup-asap');
    const pickupScheduledRadio = document.getElementById('pickup-scheduled');
    const pickupScheduledTimeDiv = document.querySelector('.pickup-scheduled-time');
  
    pickupAsapRadio.addEventListener('change', () => {
      pickupScheduledTimeDiv.style.display = 'none';
    });
  
    pickupScheduledRadio.addEventListener('change', () => {
      pickupScheduledTimeDiv.style.display = 'block';
    });
  
    // Payment method change
    const paymentMethodSelect = document.getElementById('payment-method');
    const creditCardDetails = document.getElementById('credit-card-details');
    const gcashDetails = document.getElementById('gcash-details');
    const bankDetails = document.getElementById('bank-details');
  
    paymentMethodSelect.addEventListener('change', () => {
      // Hide all payment details
      creditCardDetails.style.display = 'none';
      gcashDetails.style.display = 'none';
      bankDetails.style.display = 'none';
      
      // Show selected payment details
      const selectedPayment = paymentMethodSelect.value;
      if (selectedPayment === 'credit-card') {
        creditCardDetails.style.display = 'block';
      } else if (selectedPayment === 'gcash') {
        gcashDetails.style.display = 'block';
      } else if (selectedPayment === 'bank-transfer') {
        bankDetails.style.display = 'block';
      }
    });
  
    // Credit card formatting
    const cardNumberInput = document.getElementById('card-number');
    const cardExpiryInput = document.getElementById('card-expiry');
    
    cardNumberInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      let formattedValue = '';
      
      for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
          formattedValue += ' ';
        }
        formattedValue += value[i];
      }
      
      e.target.value = formattedValue;
    });
    
    cardExpiryInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      
      if (value.length > 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
      }
      
      e.target.value = value;
    });
  
    // Load cart items
    function loadCartItems() {
      const cartItemsContainer = document.getElementById('cart-items');
      const subtotalElement = document.getElementById('subtotal');
      const deliveryFeeElement = document.getElementById('delivery-fee');
      const totalElement = document.getElementById('total');
      
      // Check if cart exists and has items
      if (typeof window.cart !== 'undefined' && window.cart.items && window.cart.items.length > 0) {
        // Clear empty cart message
        cartItemsContainer.innerHTML = '';
        
        // Add each cart item
        window.cart.items.forEach(item => {
          const cartItemElement = document.createElement('div');
          cartItemElement.className = 'cart-item';
          cartItemElement.setAttribute('data-id', item.id);
          
          cartItemElement.innerHTML = `
            <div class="cart-item-image">
              <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
              <h4 class="cart-item-name">${item.name}</h4>
              <p class="cart-item-price">₱${item.price.toFixed(2)}</p>
              <div class="cart-item-quantity">
                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
              </div>
            </div>
            <div class="cart-item-remove" data-id="${item.id}">
              <i class="fas fa-times"></i>
            </div>
          `;
          
          cartItemsContainer.appendChild(cartItemElement);
        });
        
        // Add event listeners to quantity buttons and remove buttons
        const minusButtons = document.querySelectorAll('.cart-item-quantity .minus');
        const plusButtons = document.querySelectorAll('.cart-item-quantity .plus');
        const removeButtons = document.querySelectorAll('.cart-item-remove');
        
        minusButtons.forEach(button => {
          button.addEventListener('click', () => {
            const itemId = button.getAttribute('data-id');
            const item = window.cart.items.find(item => item.id === itemId);
            
            if (item && item.quantity > 1) {
              item.quantity--;
              updateCartDisplay();
            }
          });
        });
        
        plusButtons.forEach(button => {
          button.addEventListener('click', () => {
            const itemId = button.getAttribute('data-id');
            const item = window.cart.items.find(item => item.id === itemId);
            
            if (item && item.quantity < 10) {
              item.quantity++;
              updateCartDisplay();
            }
          });
        });
        
        removeButtons.forEach(button => {
          button.addEventListener('click', () => {
            const itemId = button.getAttribute('data-id');
            window.cart.removeItem(itemId);
            updateCartDisplay();
          });
        });
        
        // Update totals
        updateOrderTotals();
      } else {
        // Show empty cart message
        cartItemsContainer.innerHTML = '<div class="empty-cart-message">Your cart is empty. Add some products to place an order.</div>';
        subtotalElement.textContent = '₱0.00';
        deliveryFeeElement.textContent = '₱0.00';
        totalElement.textContent = '₱0.00';
      }
    }
  
    // Update cart display after changes
    function updateCartDisplay() {
      // Save cart to localStorage
      localStorage.setItem('cartItems', JSON.stringify(window.cart.items));
      
      // Reload cart items
      loadCartItems();
      
      // Update cart count
      window.cart.updateCartCount();
    }
  
    // Update order totals
    function updateOrderTotals() {
      const subtotalElement = document.getElementById('subtotal');
      const deliveryFeeElement = document.getElementById('delivery-fee');
      const discountElement = document.getElementById('discount');
      const discountRow = document.querySelector('.discount-row');
      const totalElement = document.getElementById('total');
      
      // Calculate subtotal
      const subtotal = window.cart.getTotal();
      subtotalElement.textContent = `₱${subtotal.toFixed(2)}`;
      
      // Set delivery fee based on tab
      const deliveryFee = updateDeliveryFee();
      
      // Check if discount is applied
      const promoCode = document.getElementById('promo-code').value;
      let discount = 0;
      
      if (promoCode === 'WELCOME10') {
        discount = subtotal * 0.1; // 10% discount
        discountElement.textContent = `-₱${discount.toFixed(2)}`;
        discountRow.style.display = 'flex';
      } else if (promoCode === 'FREESHIP') {
        discount = deliveryFee;
        discountElement.textContent = `-₱${discount.toFixed(2)}`;
        discountRow.style.display = 'flex';
      } else {
        discountRow.style.display = 'none';
      }
      
      // Calculate total
      const total = subtotal + deliveryFee - discount;
      totalElement.textContent = `₱${total.toFixed(2)}`;
    }
  
    // Update delivery fee based on selected tab
    function updateDeliveryFee() {
      const deliveryFeeElement = document.getElementById('delivery-fee');
      const activeTab = document.querySelector('.tab-btn.active').getAttribute('data-tab');
      let deliveryFee = 0;
      
      if (activeTab === 'delivery') {
        deliveryFee = 50; // Standard delivery fee
      }
      
      deliveryFeeElement.textContent = `₱${deliveryFee.toFixed(2)}`;
      
      // Update total
      const subtotal = parseFloat(document.getElementById('subtotal').textContent.replace('₱', ''));
      const discount = document.querySelector('.discount-row').style.display === 'none' ? 0 : 
                      parseFloat(document.getElementById('discount').textContent.replace('-₱', ''));
      const total = subtotal + deliveryFee - discount;
      document.getElementById('total').textContent = `₱${total.toFixed(2)}`;
      
      return deliveryFee;
    }
  
    // Apply promo code
    const applyPromoButton = document.getElementById('apply-promo');
    
    applyPromoButton.addEventListener('click', () => {
      const promoCode = document.getElementById('promo-code').value;
      
      if (promoCode === 'WELCOME10' || promoCode === 'FREESHIP') {
        // Valid promo code
        showNotification('Promo code applied successfully!', 'success');
        updateOrderTotals();
      } else if (promoCode.trim() === '') {
        // Empty promo code
        showNotification('Please enter a promo code.', 'warning');
      } else {
        // Invalid promo code
        showNotification('Invalid promo code. Please try again.', 'error');
      }
    });
  
    // Update cart button
    const updateCartButton = document.getElementById('update-cart-btn');
    
    updateCartButton.addEventListener('click', () => {
      updateCartDisplay();
      showNotification('Cart updated successfully!', 'success');
    });
  
    // Form validation
    const orderForm = document.getElementById('order-form');
    
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Check if cart is empty
      if (typeof window.cart === 'undefined' || !window.cart.items || window.cart.items.length === 0) {
        showNotification('Your cart is empty. Please add products before placing an order.', 'error');
        return;
      }
      
      // Validate form
      if (validateOrderForm()) {
        // Show success modal
        showOrderSuccessModal();
        
        // Clear cart
        window.cart.clearCart();
        updateCartDisplay();
      }
    });
  
    // Validate order form
    function validateOrderForm() {
      let isValid = true;
      const activeTab = document.querySelector('.tab-btn.active').getAttribute('data-tab');
      
      // Validate delivery address if delivery tab is active
      if (activeTab === 'delivery') {
        const deliveryAddress = document.getElementById('delivery-address');
        const city = document.getElementById('city');
        const zip = document.getElementById('zip');
        
        if (deliveryAddress.value.trim() === '') {
          showError(deliveryAddress, 'Please enter your delivery address');
          isValid = false;
        } else {
          clearError(deliveryAddress);
        }
        
        if (city.value.trim() === '') {
          showError(city, 'Please enter your city');
          isValid = false;
        } else {
          clearError(city);
        }
        
        if (zip.value.trim() === '') {
          showError(zip, 'Please enter your ZIP code');
          isValid = false;
        } else if (!/^\d{4,5}$/.test(zip.value.trim())) {
          showError(zip, 'Please enter a valid ZIP code');
          isValid = false;
        } else {
          clearError(zip);
        }
        
        // Validate scheduled delivery time if selected
        if (document.getElementById('scheduled').checked) {
          const deliveryDate = document.getElementById('delivery-date');
          const deliveryTimeSlot = document.getElementById('delivery-time-slot');
          
          if (deliveryDate.value === '') {
            showError(deliveryDate, 'Please select a delivery date');
            isValid = false;
          } else {
            clearError(deliveryDate);
          }
          
          if (deliveryTimeSlot.value === '') {
            showError(deliveryTimeSlot, 'Please select a delivery time');
            isValid = false;
          } else {
            clearError(deliveryTimeSlot);
          }
        }
      } else if (activeTab === 'pickup') {
        // Validate pickup location
        const pickupLocation = document.getElementById('pickup-location');
        
        if (pickupLocation.value === '') {
          showError(pickupLocation, 'Please select a pickup location');
          isValid = false;
        } else {
          clearError(pickupLocation);
        }
        
        // Validate scheduled pickup time if selected
        if (document.getElementById('pickup-scheduled').checked) {
          const pickupDate = document.getElementById('pickup-date');
          const pickupTimeSlot = document.getElementById('pickup-time-slot');
          
          if (pickupDate.value === '') {
            showError(pickupDate, 'Please select a pickup date');
            isValid = false;
          } else {
            clearError(pickupDate);
          }
          
          if (pickupTimeSlot.value === '') {
            showError(pickupTimeSlot, 'Please select a pickup time');
            isValid = false;
          } else {
            clearError(pickupTimeSlot);
          }
        }
      }
      
      // Validate contact information
      const contactName = document.getElementById('contact-name');
      const contactEmail = document.getElementById('contact-email');
      const contactPhone = document.getElementById('contact-phone');
      
      if (contactName.value.trim() === '') {
        showError(contactName, 'Please enter your full name');
        isValid = false;
      } else {
        clearError(contactName);
      }
      
      if (contactEmail.value.trim() === '') {
        showError(contactEmail, 'Please enter your email address');
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.value.trim())) {
        showError(contactEmail, 'Please enter a valid email address');
        isValid = false;
      } else {
        clearError(contactEmail);
      }
      
      if (contactPhone.value.trim() === '') {
        showError(contactPhone, 'Please enter your phone number');
        isValid = false;
      } else if (!/^\d{10,11}$/.test(contactPhone.value.replace(/\D/g, ''))) {
        showError(contactPhone, 'Please enter a valid phone number');
        isValid = false;
      } else {
        clearError(contactPhone);
      }
      
      // Validate payment method
      const paymentMethod = document.getElementById('payment-method');
      
      if (paymentMethod.value === '') {
        showError(paymentMethod, 'Please select a payment method');
        isValid = false;
      } else {
        clearError(paymentMethod);
        
        // Validate payment details based on selected method
        if (paymentMethod.value === 'credit-card') {
          const cardNumber = document.getElementById('card-number');
          const cardExpiry = document.getElementById('card-expiry');
          const cardCvv = document.getElementById('card-cvv');
          
          if (cardNumber.value.replace(/\s/g, '').length < 16) {
            showError(cardNumber, 'Please enter a valid card number');
            isValid = false;
          } else {
            clearError(cardNumber);
          }
          
          if (!/^\d{2}\/\d{2}$/.test(cardExpiry.value)) {
            showError(cardExpiry, 'Please enter a valid expiry date (MM/YY)');
            isValid = false;
          } else {
            clearError(cardExpiry);
          }
          
          if (!/^\d{3}$/.test(cardCvv.value)) {
            showError(cardCvv, 'Please enter a valid CVV');
            isValid = false;
          } else {
            clearError(cardCvv);
          }
        } else if (paymentMethod.value === 'gcash') {
          const gcashNumber = document.getElementById('gcash-number');
          
          if (!/^\d{11}$/.test(gcashNumber.value.replace(/\D/g, ''))) {
            showError(gcashNumber, 'Please enter a valid GCash number');
            isValid = false;
          } else {
            clearError(gcashNumber);
          }
        }
      }
      
      return isValid;
    }
  
    // Show error message
    function showError(input, message) {
      const errorElement = input.nextElementSibling;
      errorElement.textContent = message;
      input.classList.add('error');
    }
  
    // Clear error message
    function clearError(input) {
      const errorElement = input.nextElementSibling;
      errorElement.textContent = '';
      input.classList.remove('error');
    }
  
    // Show notification
    function showNotification(message, type) {
      const notification = document.createElement('div');
      notification.className = `notification ${type}`;
      notification.textContent = message;
      
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.classList.add('show');
        
        setTimeout(() => {
          notification.classList.remove('show');
          setTimeout(() => {
            document.body.removeChild(notification);
          }, 300);
        }, 3000);
      }, 10);
    }
  
    // Show order success modal
    function showOrderSuccessModal() {
      const modal = document.getElementById('order-success-modal');
      const orderNumber = document.getElementById('order-number');
      const confirmationEmail = document.getElementById('confirmation-email');
      const orderDate = document.getElementById('order-date');
      const orderType = document.getElementById('order-type');
      const orderTotal = document.getElementById('order-total');
      
      // Generate random order number
      const randomOrderNumber = 'NC' + Math.floor(100000 + Math.random() * 900000);
      orderNumber.textContent = randomOrderNumber;
      
      // Set confirmation email
      confirmationEmail.textContent = document.getElementById('contact-email').value;
      
      // Set order date
      const now = new Date();
      orderDate.textContent = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
      
      // Set order type
      const activeTab = document.querySelector('.tab-btn.active').getAttribute('data-tab');
      orderType.textContent = activeTab === 'delivery' ? 'Delivery' : 'Pickup';
      
      // Set order total
      orderTotal.textContent = document.getElementById('total').textContent;
      
      // Show modal
      modal.style.display = 'block';
      
      // Close modal event
      const closeModal = modal.querySelector('.close-modal');
      closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
      });
      
      // Close modal when clicking outside
      window.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });
    }
  
    // Initialize
    loadCartItems();
  });