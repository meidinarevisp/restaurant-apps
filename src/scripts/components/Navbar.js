/* eslint-disable max-len */
class Navbar extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.innerHTML = `
      <nav class="navbar">
        <div class="brand-logo">Savor Spot</div>
        <button class="menu-toggle" tabindex="0" aria-label="Menu Toggle">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>
        <ul class="nav-menu">
         <li><a href="explore-content" id="maincontent" tabindex="0">Main Content</a></li>
          <li><a href="/">Home</a></li>
          <li><a href="/favorites.html">Favorites</a></li>
          <li><a href="https://www.instagram.com/meidinarevisp/">About Us</a></li>
        </ul>
      </nav>
    `

    const menuToggle = this.querySelector('.menu-toggle')
    const navMenu = this.querySelector('.nav-menu')

    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active')
    })

    menuToggle.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        navMenu.classList.toggle('active')
      }
    })

    const navLinks = this.querySelectorAll('.nav-menu li a')
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active')
      })
      link.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault()
          link.click()
        }
      })
    })

    const mainContent = document.getElementById('maincontent')
    if (mainContent) {
      mainContent.addEventListener('click', (event) => {
        event.preventDefault()
        const exploreContentSection =
          document.getElementById('explore-content')
        if (exploreContentSection) {
          const headerHeight = document.querySelector('header').offsetHeight

          window.scrollTo({
            top: exploreContentSection.offsetTop - headerHeight,
            behavior: 'smooth'
          })
        }
      })
    }

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        const mainContent = document.getElementById('maincontent')
        if (mainContent) {
          mainContent.style.display = 'initial'

          setTimeout(() => {
            mainContent.style.display = 'none'
          }, 1000)
        }
      }
    })

    if (mainContent) {
      mainContent.style.display = 'none'
    }

    document.addEventListener('click', (event) => {
      if (!event.target.closest('.navbar')) {
        navMenu.classList.remove('active')
      }
    })

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        navMenu.classList.remove('active')
      }
    })
  }
}

customElements.define('navbar-restaurant', Navbar)
