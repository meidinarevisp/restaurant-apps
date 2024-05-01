import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'
import './SearchRestaurant'

class RestaurantList extends HTMLElement {
  constructor() {
    super()
    this._restaurants = null
    this._isLoading = true
  }

  connectedCallback() {
    this.render()
  }

  set restaurants(restaurants) {
    this._restaurants = restaurants
    this._isLoading = false
    this.render()
  }

  render() {
    if (this._isLoading) {
      this.renderSkeletonUI()
    } else {
      this.renderRestaurants()
    }
  }

  renderSkeletonUI() {
    this.innerHTML = `
      <div class="explore-restaurant" id="explore-content">
        <h2>Explore Restaurant</h2>
        <p>Discover Great Dining Experience...</p>
      </div>
      <search-bar></search-bar>
      <section class="restaurants">
        <div class="restaurant-skeleton">
          <div class="image"></div>
          <div class="name"></div>
          <div class="description"></div>
        </div>
        <div class="restaurant-skeleton">
          <div class="image"></div>
          <div class="name"></div>
          <div class="description"></div>
        </div>
        <!-- Tambahkan lebih banyak elemen skeleton sesuai kebutuhan -->
      </section>
    `
  }

  renderRestaurants() {
    this.innerHTML = `
      <div class="explore-restaurant" id="explore-content">
        <h2>Explore Restaurant</h2>
        <p>Discover Great Dining Experience...</p>
      </div>
      <search-bar></search-bar>
      <section class="restaurants">
        ${this._restaurants.map(this.renderRestaurant).join('')}
      </section>
    `
  }

  renderRestaurant(restaurant) {
    const truncatedDescription =
      restaurant.description.substring(0, 100) + '...'

    return `
      <div class="restaurant">
        <img
          class="lazyload"
          data-src="https://restaurant-api.dicoding.dev/images/small/${
  restaurant.pictureId
}"
          alt="${restaurant.name}">
        <a href="./detail.html?id=${restaurant.id}" class="restaurant-name">${
  restaurant.name
}</a>
        <h3 class="star-rating">${
  generateStarRating(restaurant.rating).stars
} (${generateStarRating(restaurant.rating).numericRating})</h3>
        <p>${truncatedDescription}</p>
        <h4>${restaurant.city}</h4>
      </div>
    `
  }
}

function generateStarRating(rating) {
  const fullStars = Math.floor(rating)
  const halfStars = Math.ceil(rating - fullStars)
  const emptyStars = 5 - fullStars - halfStars

  const stars =
    '★'.repeat(fullStars) + '☆'.repeat(halfStars) + '☆'.repeat(emptyStars)

  const numericRating = rating.toFixed(1)

  return { stars, numericRating }
}

customElements.define('restaurant-list', RestaurantList)
