class SkeletonLoader extends HTMLElement {
  connectedCallback() {
    this.render()
  }

  render() {
    this.innerHTML = `
      <div class="skeleton-loader">
        <div class="skeleton-image"></div>
        <div class="skeleton-text"></div>
        <div class="skeleton-text"></div>
        <div class="skeleton-text"></div>
      </div>
    `
  }
}

customElements.define('skeleton-loader', SkeletonLoader)
