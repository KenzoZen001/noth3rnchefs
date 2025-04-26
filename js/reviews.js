document.addEventListener("DOMContentLoaded", () => {
    // Sample reviews data
    const sampleReviews = [
      {
        id: 1,
        username: "Maria Santos",
        rating: 5,
        title: "Absolutely Delicious!",
        content: "The Laing is so authentic and tasty. Reminds me of my grandmother's cooking!",
        date: "2023-12-15",
      },
      {
        id: 2,
        username: "Juan Dela Cruz",
        rating: 4,
        title: "Great Quality Products",
        content: "The Spanish Bangus is excellent. Very convenient and tastes homemade.",
        date: "2023-11-28",
      },
      {
        id: 3,
        username: "Anna Reyes",
        rating: 5,
        title: "Perfect Spice Level",
        content: "The Chili Garlic has the perfect balance of heat and flavor. I put it on everything!",
        date: "2024-01-05",
      },
    ]
  
    // Get reviews from localStorage or use sample reviews
    function getReviews() {
      const savedReviews = localStorage.getItem("reviews")
      return savedReviews ? JSON.parse(savedReviews) : sampleReviews
    }
  
    // Save reviews to localStorage
    function saveReviews(reviews) {
      localStorage.setItem("reviews", JSON.stringify(reviews))
    }
  
    // Render reviews
    function renderReviews() {
      const reviewsList = document.getElementById("reviews-list")
      if (!reviewsList) return
  
      const reviews = getReviews()
  
      if (reviews.length === 0) {
        reviewsList.innerHTML = '<p class="no-reviews">No reviews yet. Be the first to leave a review!</p>'
        return
      }
  
      reviewsList.innerHTML = reviews
        .map(
          (review) => `
        <div class="review-card">
          <div class="review-header">
            <span class="review-author">${review.username}</span>
            <span class="review-date">${formatDate(review.date)}</span>
          </div>
          <div class="review-rating">
            ${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}
          </div>
          <h4 class="review-title">${review.title}</h4>
          <p class="review-content">${review.content}</p>
        </div>
      `,
        )
        .join("")
    }
  
    // Format date
    function formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" }
      return new Date(dateString).toLocaleDateString(undefined, options)
    }
  
    // Handle review form submission
    const reviewForm = document.getElementById("review-form")
    if (reviewForm) {
      reviewForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        const username = document.getElementById("review-username").value.trim() || "Anonymous"
        const ratingInput = document.querySelector('input[name="rating"]:checked')
        const rating = ratingInput ? Number.parseInt(ratingInput.value) : 5
        const title = document.getElementById("review-title").value.trim()
        const content = document.getElementById("review-content").value.trim()
  
        if (!title || !content) {
          alert("Please fill in all fields")
          return
        }
  
        const newReview = {
          id: Date.now(),
          username,
          rating,
          title,
          content,
          date: new Date().toISOString().split("T")[0],
        }
  
        const reviews = getReviews()
        reviews.unshift(newReview)
        saveReviews(reviews)
  
        // Reset form
        reviewForm.reset()
  
        // Re-render reviews
        renderReviews()
  
        // Show success message
        alert("Thank you for your review!")
      })
    }
  
    // Initialize reviews
    renderReviews()
  })
  