import 'regenerator-runtime'
import { getRestaurantList } from './restaurantAPI'
import '../styles/main.scss'
import './components/Navbar'
import './components/Footer'
import './components/HeroRestaurant'
import './components/page-index/RestaurantList'
import './components/page-index/SplashScreen'
import './components/page-index/SearchRestaurant'
import './components/LoadingIndicator'
import './components/ErrorMessage'

document.addEventListener('DOMContentLoaded', async () => {
  const splashScreen = document.getElementById('splash-screen')
  if (splashScreen) {
    setTimeout(() => {
      splashScreen.remove()
      showLoadingIndicator()
    }, 1500)
  }

  const mainContent = document.getElementById('main-content')
  if (mainContent) {
    mainContent.addEventListener('click', (event) => {
      event.preventDefault()
      const exploreContentSection = document.getElementById('explore-content')
      if (exploreContentSection) {
        const headerHeight = document.querySelector('header').offsetHeight

        window.scrollTo({
          top: exploreContentSection.offsetTop - headerHeight,
          behavior: 'smooth'
        })
      }
    })
  }

  setTimeout(async () => {
    removeLoadingIndicator()

    try {
      const restaurantData = await getRestaurantList()
      removeLoadingIndicator()
      displayRestaurants(restaurantData.restaurants)
    } catch (error) {
      displayErrorFeedback(error.message)
      console.error('Error fetching restaurant data:', error)
    }
  }, 1500)
})

function showLoadingIndicator() {
  let loadingIndicator = document.querySelector('loading-indicator')
  if (!loadingIndicator) {
    loadingIndicator = document.createElement('loading-indicator')
    document.body.appendChild(loadingIndicator)
  }
}

function removeLoadingIndicator() {
  const loadingIndicator = document.querySelector('loading-indicator')
  if (loadingIndicator) {
    loadingIndicator.remove()
  }
}

function displayErrorFeedback(message) {
  const errorFeedback = document.createElement('error-feedback')
  errorFeedback.setAttribute('message', message)
  document.body.appendChild(errorFeedback)
}

async function displayRestaurants(restaurants) {
  const restaurantList = document.querySelector('restaurant-list')
  if (!restaurantList) return

  restaurantList.restaurants = restaurants
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered:', registration)
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error)
      })
  })
}
