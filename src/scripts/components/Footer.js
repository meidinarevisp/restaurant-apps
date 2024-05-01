class Footer extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.innerHTML = `
    <footer class="footer">
        <div class="footer-content">
       <p>&copy; 2024 SavorSpot. All rights reserved.</p>
        </div>
        </footer>
    `
  }
}

customElements.define('footer-restaurant', Footer)
