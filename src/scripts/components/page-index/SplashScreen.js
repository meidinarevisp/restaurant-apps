class SplashScreen extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.innerHTML = `
    <div id="splash-screen" style="width: 100%; height: 100vh">
      <picture>
        <source srcset="/images/icon/restaurant.webp" type="image/webp" />
        <source srcset="/images/icon/restaurant.png" type="image/png" />
        <img src="/images/icon/restaurant.png" alt="SavorSpot" />
      </picture>
    </div>
    `
  }
}

customElements.define('splash-screen', SplashScreen)
