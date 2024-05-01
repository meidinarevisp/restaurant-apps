class HeroRestaurant extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <section class="hero">
        <div class="hero-overlay">
          <h1>Welcome to SavorSpot!</h1>
          <button class="explore-button" tabindex="0" id="main-content">
            <a href="#explore-content">Explore</a>
          </button>
        </div>
        <picture>
          <source
            media="(min-width: 1200px)"
            srcset="./images/heros/hero-image_2-large.webp"
          />
          <source
            media="(min-width: 1200px)"
            srcset="./images/heros/hero-image_2-large.jpg"
          />
          <source
            media="(max-width: 768px)"
            srcset="./images/heros/hero-image_2-small.webp"
          />
          <source
            media="(max-width: 768px)"
            srcset="./images/heros/hero-image_2-small.jpg"
          />
          <source
            srcset="./images/heros/hero-image_2-large.webp"
            type="image/webp"
          />
          <img src="./images/heros/hero-image_2-large.jpg" alt="Hero Image" />
        </picture>
      </section>
    `;
  }
}

customElements.define("hero-restaurant", HeroRestaurant);
