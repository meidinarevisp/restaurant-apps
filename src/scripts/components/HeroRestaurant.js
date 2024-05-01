class HeroRestaurant extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    
    `;
  }
}

customElements.define("hero-restaurant", HeroRestaurant);
