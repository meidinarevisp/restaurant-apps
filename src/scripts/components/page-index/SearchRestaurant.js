/* eslint-disable max-len */
/* eslint-disable no-invalid-this */
class SearchRestaurant extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.innerHTML = `
      <form id="search-form" class="search-container">
        <input
          type="search"
          id="search-input"
          placeholder="Search for restaurants..."
        />
        <button type="submit" aria-label="Search" id="search"><i class="fas fa-search"></i></button>
      </form>
    `

    const searchForm = this.querySelector('#search-form')
    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const searchTerm = searchForm
          .querySelector('input[type="search"]')
          .value.trim()
          .toLowerCase()

        const restaurantList = document.querySelectorAll('.restaurant')

        restaurantList.forEach((restaurant) => {
          const restaurantName = restaurant
            .querySelector('a')
            .textContent.trim()
            .toLowerCase()
          if (restaurantName.includes(searchTerm)) {
            restaurant.style.display = 'block'
          } else {
            restaurant.style.display = 'none'
          }
        })
      })

      searchForm
        .querySelector('input[type="search"]')
        .addEventListener('input', function() {
          if (this.value.trim() === '') {
            resetSearchResults()
          }
        })
    }

    function resetSearchResults() {
      const restaurantList = document.querySelectorAll('.restaurant')
      restaurantList.forEach((restaurant) => {
        restaurant.style.display = 'block'
      })
    }
  }
}

customElements.define('search-bar', SearchRestaurant)
