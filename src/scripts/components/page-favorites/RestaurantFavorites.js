class RestaurantFavorites extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="favorite-restaurant" id="explore-content">
        <h1>Favorite Restaurants</h1>
      </div>
      <div class="favorites"></div>
    `
  }
}

customElements.define('restaurant-favorites', RestaurantFavorites)
