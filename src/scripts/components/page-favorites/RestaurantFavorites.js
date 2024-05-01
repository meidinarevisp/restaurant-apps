class RestaurantFavorites extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="favorite-restaurant" id="explore-content">
        <h2>Favorite Restaurants</h2>
      </div>
      <div class="favorites"></div>
    `
  }
}

customElements.define('restaurant-favorites', RestaurantFavorites)
