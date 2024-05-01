class SplashScreen extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    
    `;
  }
}

customElements.define("splash-screen", SplashScreen);
