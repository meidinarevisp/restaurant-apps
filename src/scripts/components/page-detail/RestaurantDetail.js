class RestaurantDetail extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="restaurant-detail" id="explore-content">
        <div class="detail-container">
          <div class="left-column">
            <h1 id="restaurant-name"></h1>
            <img id="restaurant-image" src="" alt="" />
            <button id="favorite-button">Add to Favorites</button>
            <p id="restaurant-city"></p>
            <p id="restaurant-address"></p>
            <p id="restaurant-description"></p>
            <p id="restaurant-categories"></p>
            <h2>Menu</h2>
            <div class="menu-item">
              <div id="container-food">
                <h3>Food</h3>
                <div id="food-menu"></div>
              </div>
            </div>
            <div class="menu-item">
              <div id="container-drink">
                <h3>Drink</h3>
                <div id="drink-menu"></div>
              </div>
            </div>
          </div>
          <div class="right-column">
            <center>
              <h2>
                Customer Reviews
                <p id="restaurant-rating"></p>
              </h2>
            </center>
            <ul id="customer-reviews"></ul>
            <form id="review-form">
              <label for="reviewer-name">Your Name:</label><br />
              <input
                type="text"
                id="reviewer-name"
                name="reviewer-name"
              /><br />
              <label for="review-content">Your Review:</label><br />
              <textarea id="review-content" name="review-content"></textarea
              ><br />
              <button type="submit">Submit Review</button>
            </form>
          </div>
        </div>
      </section>
    `
  }
}

customElements.define('restaurant-detail', RestaurantDetail)
