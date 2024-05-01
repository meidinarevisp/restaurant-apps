class ErrorMessage extends HTMLElement {
  static get observedAttributes() {
    return ['message']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'message') {
      this.innerHTML = `<div class="error-message">${newValue}</div>`
    }
  }
}

customElements.define('error-message', ErrorMessage)
