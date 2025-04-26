document.addEventListener("DOMContentLoaded", () => {
  // Product data
  const productData = {
    "chicken-original": {
      id: "chicken-original",
      name: "Chicken Pastil Original",
      price: 149.00,
      category: "Chicken Pastil",
      image: "images/chickenpastiloriginal.png",
      rating: 5,
      reviews: 30,
      description: "The original chicken pastil that started it all. Made with tender chicken, aromatic spices, and our secret family recipe. Perfect for any meal or occasion.",
      sku: "CP-001"
    },
    "chicken-classic": {
      id: "chicken-classic",
      name: "Chicken Pastil Classic",
      price: 149.00,
      category: "Chicken Pastil",
      image: "images/chickenpastilclassic.png",
      rating: 4,
      reviews: 21,
      description: "Our classic chicken pastil recipe, a timeless favorite. Made with premium chicken and traditional spices for an authentic taste experience.",
      sku: "CP-002"
    },
    "chicken-salted": {
      id: "chicken-salted",
      name: "Chicken Pastil Salted Egg",
      price: 149.00,
      category: "Chicken Pastil",
      image: "images/chickenpastilsaltedegg.png",
      rating: 5,
      reviews: 12,
      description: "A unique fusion of chicken pastil with rich salted egg flavor. The perfect blend of traditional and modern tastes for a delightful culinary experience.",
      sku: "CP-003"
    },
    "chicken-spicy": {
      id: "chicken-spicy",
      name: "Chicken Pastil Spicy",
      price: 159.00,
      category: "Chicken Pastil",
      image: "images/chickenpastiloriginal.png",
      rating: 4.5,
      reviews: 18,
      description: "For those who love a kick of heat! Our spicy chicken pastil combines the traditional recipe with hot chili peppers for an exciting flavor experience.",
      sku: "CP-004"
    },
    "laing-original": {
      id: "laing-original",
      name: "Laing Original",
      price: 149.00,
      category: "Laing",
      image: "images/laing.png",
      rating: 5,
      reviews: 24,
      description: "Traditional Bicolano dish made with taro leaves in coconut milk. Rich, creamy, and full of authentic Filipino flavor.",
      sku: "LG-001"
    },
    "laing-spicy": {
      id: "laing-spicy",
      name: "Laing Spicy",
      price: 159.00,
      category: "Laing",
      image: "images/laing.png",
      rating: 4,
      reviews: 16,
      description: "Our spicy version of the classic Laing. Made with taro leaves, coconut milk, and an extra kick of chili for those who enjoy heat in their meals.",
      sku: "LG-002"
    },
    "bangus-original": {
      id: "bangus-original",
      name: "Spanish Bangus Original",
      price: 189.00,
      category: "Spanish Bangus",
      image: "images/bangusspanish.png",
      rating: 5,
      reviews: 28,
      description: "Premium milkfish marinated in Spanish-style sauce, perfect for any occasion. A delicious fusion of Filipino and Spanish culinary traditions.",
      sku: "SB-001"
    },
    "bangus-spicy": {
      id: "bangus-spicy",
      name: "Spanish Bangus Spicy",
      price: 199.00,
      category: "Spanish Bangus",
      image: "images/bangusspanish.png",
      rating: 4,
      reviews: 14,
      description: "Our Spanish Bangus with an added kick of spice. The perfect balance of savory and spicy flavors for those who enjoy a bit of heat.",
      sku: "SB-002"
    },
    "chili-original": {
      id: "chili-original",
      name: "Chili Garlic Original",
      price: 159.00,
      category: "Chili Garlic",
      image: "images/chiligarlic.png",
      rating: 4,
      reviews: 20,
      description: "Homemade chili garlic sauce, perfect for adding heat to any dish. Made with fresh garlic and quality chili peppers for the best flavor.",
      sku: "CG-001"
    },
    "chili-extra-hot": {
      id: "chili-extra-hot",
      name: "Chili Garlic Extra Hot",
      price: 169.00,
      category: "Chili Garlic",
      image: "images/chiligarlic.png",
      rating: 4.5,
      reviews: 15,
      description: "For the true spice lovers! Our extra hot chili garlic sauce packs a serious punch of heat while maintaining a delicious garlic flavor.",
      sku: "CG-002"
    },
    "chili-calamansi": {
      id: "chili-calamansi",
      name: "Chili Garlic with Calamansi",
      price: 179.00,
      category: "Chili Garlic",
      image: "images/chiligarlic.png",
      rating: 5,
      reviews: 10,
      description: "A unique twist on our classic chili garlic sauce with the addition of calamansi for a tangy, citrusy kick. Perfect for seafood dishes!",
      sku: "CG-003"
    }
  };

  // Filter functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');
  const productCount = document.getElementById('product-count');
  const searchInput = document.getElementById('product-search');
  const sortSelect = document.getElementById('sort-select');

  // Apply filters and update product count
  function applyFilters() {
    const selectedCategory = document.querySelector('.filter-btn.active').getAttribute('data-category');
    const searchTerm = searchInput.value.toLowerCase();
    const sortValue = sortSelect.value;
    
    let visibleCount = 0;
    
    // Filter products
    productCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const name = card.getAttribute('data-name').toLowerCase();
      
      // Check if product matches category and search term
      const matchesCategory = selectedCategory === 'all' || category === selectedCategory;
      const matchesSearch = name.includes(searchTerm);
      
      if (matchesCategory && matchesSearch) {
        card.style.display = 'block';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });
    
    // Update product count
    productCount.textContent = `Showing ${visibleCount} product${visibleCount !== 1 ? 's' : ''}`;
    
    // Sort products
    sortProducts(sortValue);
  }

  // Sort products
  function sortProducts(sortValue) {
    const productGrid = document.getElementById('product-grid');
    const products = Array.from(productCards).filter(card => card.style.display !== 'none');
    
    switch (sortValue) {
      case 'price-low':
        products.sort((a, b) => parseFloat(a.getAttribute('data-price')) - parseFloat(b.getAttribute('data-price')));
        break;
      case 'price-high':
        products.sort((a, b) => parseFloat(b.getAttribute('data-price')) - parseFloat(a.getAttribute('data-price')));
        break;
      case 'name-asc':
        products.sort((a, b) => a.getAttribute('data-name').localeCompare(b.getAttribute('data-name')));
        break;
      case 'name-desc':
        products.sort((a, b) => b.getAttribute('data-name').localeCompare(a.getAttribute('data-name')));
        break;
      default:
        // Default sorting (featured) - do nothing
        break;
    }
    
    // Reorder products in the DOM
    products.forEach(product => {
      productGrid.appendChild(product);
    });
  }

  // Category filter event listeners
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Apply filters
      applyFilters();
    });
  });

  // Search input event listener
  searchInput.addEventListener('input', applyFilters);

  // Sort select event listener
  sortSelect.addEventListener('change', applyFilters);

  // Quick view functionality
  const quickViewButtons = document.querySelectorAll('.quick-view-btn');
  const modal = document.getElementById('quick-view-modal');
  const closeModal = document.querySelector('.close-modal');
  
  // Modal elements
  const modalProductImage = document.getElementById('modal-product-image');
  const modalProductName = document.getElementById('modal-product-name');
  const modalProductRating = document.getElementById('modal-product-rating');
  const modalProductPrice = document.getElementById('modal-product-price');
  const modalProductDescription = document.getElementById('modal-product-description');
  const modalProductCategory = document.getElementById('modal-product-category');
  const modalProductSku = document.getElementById('modal-product-sku');
  const modalAddToCart = document.getElementById('modal-add-to-cart');
  const modalViewDetails = document.getElementById('modal-view-details');
  
  // Quantity controls
  const quantityInput = document.getElementById('quantity');
  const minusBtn = document.querySelector('.quantity-btn.minus');
  const plusBtn = document.querySelector('.quantity-btn.plus');
  
  let currentProductId = '';

  // Open modal with product details
  function openQuickView(productId) {
    const product = productData[productId];
    
    if (product) {
      currentProductId = productId;
      
      // Set product details in modal
      modalProductImage.src = product.image;
      modalProductImage.alt = product.name;
      modalProductName.textContent = product.name;
      
      // Set rating stars
      let ratingHTML = '';
      for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(product.rating)) {
          ratingHTML += '<i class="fas fa-star"></i>';
        } else if (i - 0.5 <= product.rating) {
          ratingHTML += '<i class="fas fa-star-half-alt"></i>';
        } else {
          ratingHTML += '<i class="far fa-star"></i>';
        }
      }
      ratingHTML += `<span>(${product.reviews})</span>`;
      modalProductRating.innerHTML = ratingHTML;
      
      modalProductPrice.textContent = `₱${product.price.toFixed(2)}`;
      modalProductDescription.textContent = product.description;
      modalProductCategory.textContent = product.category;
      modalProductSku.textContent = product.sku;
      
      // Reset quantity
      quantityInput.value = 1;
      
      // Set view details link
      modalViewDetails.href = `product-details.html?id=${productId}`;
      
      // Show modal
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
  }

  // Close modal
  function closeQuickView() {
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Re-enable scrolling
  }

  // Quick view button event listeners
  quickViewButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.getAttribute('data-product-id');
      openQuickView(productId);
    });
  });

  // Close modal event listeners
  closeModal.addEventListener('click', closeQuickView);
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeQuickView();
    }
  });

  // Quantity controls event listeners
  minusBtn.addEventListener('click', () => {
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
      quantityInput.value = quantity - 1;
    }
  });

  plusBtn.addEventListener('click', () => {
    let quantity = parseInt(quantityInput.value);
    if (quantity < 10) {
      quantityInput.value = quantity + 1;
    }
  });

  // Validate quantity input
  quantityInput.addEventListener('change', () => {
    let quantity = parseInt(quantityInput.value);
    if (isNaN(quantity) || quantity < 1) {
      quantityInput.value = 1;
    } else if (quantity > 10) {
      quantityInput.value = 10;
    }
  });

  // Add to cart from modal
  modalAddToCart.addEventListener('click', () => {
    const product = productData[currentProductId];
    const quantity = parseInt(quantityInput.value);
    
    if (product && quantity > 0) {
      // Add to cart using the cart.js functionality
      if (typeof cart !== 'undefined' && typeof cart.addItem === 'function') {
        cart.addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: quantity
        });
        
        // Close modal
        closeQuickView();
      }
    }
  });

  // Add to cart buttons on product cards
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.getAttribute('data-product-id');
      const product = productData[productId];
      
      if (product) {
        // Add to cart using the cart.js functionality
        if (typeof cart !== 'undefined' && typeof cart.addItem === 'function') {
          cart.addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
          });
        }
      }
    });
  });

  // Pagination functionality
  const paginationButtons = document.querySelectorAll('.pagination-btn');
  
  paginationButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      paginationButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button if it's not the next button
      if (!button.classList.contains('next')) {
        button.classList.add('active');
      }
      
      // In a real application, this would load the next page of products
      // For this demo, we'll just scroll to the top of the product grid
      document.getElementById('product-grid').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Initialize with default filters
  applyFilters();
});