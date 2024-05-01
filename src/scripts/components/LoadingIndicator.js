class LoadingIndicator extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
       <div class="loading-indicator">
            <div class="loader">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
    `
  }
}

customElements.define('loading-indicator', LoadingIndicator)
