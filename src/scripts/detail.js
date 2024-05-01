/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import 'regenerator-runtime'
import { getRestaurantDetail } from './restaurantAPI'
import {
  isRestaurantFavorite,
  addToFavorites,
  removeFromFavorites
} from './utils'
import '../styles/main.scss'
import './components/Navbar'
import './components/Footer'
import './components/HeroRestaurant'
import './components/page-detail/RestaurantDetail'
import Swal from 'sweetalert2'

const urlParams = new URLSearchParams(window.location.search)
const restaurantId = urlParams.get('id')

async function displayRestaurantDetail() {
  try {
    if (!restaurantId) {
      console.log('Restaurant ID not found in URL')
      return
    }

    const restaurantDetail = await getRestaurantDetail(restaurantId)

    if (!restaurantDetail) {
      console.error('Restaurant detail is null or empty.')
      return
    }

    const {
      name,
      description,
      city,
      address,
      rating,
      pictureId,
      categories,
      menus: { foods, drinks },
      customerReviews
    } = restaurantDetail

    document.getElementById('restaurant-name').textContent = name
    document.getElementById(
      'restaurant-image'
    ).src = `https://restaurant-api.dicoding.dev/images/medium/${pictureId}`
    document.getElementById('restaurant-city').textContent = `City: ${city}`
    document.getElementById(
      'restaurant-address'
    ).textContent = `Address: ${address}`
    const { stars, numericRating } = generateStarRating(rating)
    document.getElementById(
      'restaurant-rating'
    ).innerHTML = `<span class="star-rating">${stars}</span> (${numericRating})`
    document.getElementById('restaurant-description').textContent = description
    document.getElementById(
      'restaurant-categories'
    ).textContent = `Categories: ${categories
      .map((category) => category.name)
      .join(', ')}`

    const foodMenu = document.getElementById('food-menu')
    foods.forEach((food) => {
      const foodItem = document.createElement('div')
      foodItem.classList.add('menu-item')
      foodItem.textContent = food.name
      foodMenu.appendChild(foodItem)
    })

    const drinkMenu = document.getElementById('drink-menu')
    drinks.forEach((drink) => {
      const drinkItem = document.createElement('div')
      drinkItem.classList.add('menu-item')
      drinkItem.textContent = drink.name
      drinkMenu.appendChild(drinkItem)
    })

    const reviewsList = document.getElementById('customer-reviews')
    reviewsList.innerHTML = ''
    customerReviews.forEach((review) => {
      const reviewItem = document.createElement('li')
      reviewItem.innerHTML = `<strong>${review.name}</strong><p>${review.review}</p><small>${review.date}</small>`
      reviewsList.appendChild(reviewItem)
    })

    const reviewForm = document.getElementById('review-form')
    reviewForm.addEventListener('submit', async (event) => {
      event.preventDefault()
      const reviewerName = document.getElementById('reviewer-name').value
      const reviewContent = document.getElementById('review-content').value

      if (!reviewerName.trim() || !reviewContent.trim()) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Input',
          text: 'Reviewer name and review content cannot be empty!'
        })
        return
      }

      const reviewData = {
        id: restaurantId,
        name: reviewerName,
        review: reviewContent
      }
      await addReview(reviewData)
      reviewForm.reset()
    })

    const favoriteButton = document.getElementById('favorite-button')
    favoriteButton.innerHTML = '<i class="fas fa-heart"></i>'
    favoriteButton.addEventListener('click', async () => {
      const isFavorite = await isRestaurantFavorite(restaurantId)
      if (!isFavorite) {
        await addToFavorites(restaurantDetail)
        favoriteButton.innerHTML = '<i class="fas fa-heart"></i>'
        Swal.fire({
          icon: 'success',
          title: 'Added to Favorites!',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        await removeFromFavorites(restaurantId)
        favoriteButton.innerHTML = '<i class="far fa-heart"></i>'
        Swal.fire({
          icon: 'success',
          title: 'Removed from Favorites!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })

    const isFavorite = await isRestaurantFavorite(restaurantId)
    if (isFavorite) {
      favoriteButton.innerHTML = '<i class="fas fa-heart"></i>'
    } else {
      favoriteButton.innerHTML = '<i class="far fa-heart"></i>'
    }
  } catch (error) {
    console.error('Error displaying restaurant detail:', error)
  }
}

async function updateReviews() {
  try {
    const restaurantDetail = await getRestaurantDetail(restaurantId)
    if (!restaurantDetail) {
      console.error('Restaurant detail is null or empty.')
      return
    }

    const { customerReviews } = restaurantDetail

    const reviewsList = document.getElementById('customer-reviews')
    reviewsList.innerHTML = ''
    customerReviews.forEach((review) => {
      const reviewItem = document.createElement('li')
      reviewItem.innerHTML = `<strong>${review.name}</strong><p>${review.review}</p><small>${review.date}</small>`
      reviewsList.appendChild(reviewItem)
    })
  } catch (error) {
    console.error('Error updating reviews:', error)
  }
}

async function addReview(reviewData) {
  try {
    const response = await fetch('https://restaurant-api.dicoding.dev/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reviewData)
    })

    const responseData = await response.json()
    if (responseData.error) {
      console.error('Error adding review:', responseData.message)
    } else {
      console.log('Review added successfully')
      console.log('Customer reviews:', responseData.customerReviews)
      updateReviewsRealTime(responseData.customerReviews)
      Swal.fire({
        icon: 'success',
        title: 'Review Added Successfully!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  } catch (error) {
    console.error('Error adding review:', error)
  }
}

function updateReviewsRealTime(newReviews) {
  const reviewsList = document.getElementById('customer-reviews')
  newReviews.forEach((review) => {
    const reviewItem = document.createElement('li')
    reviewItem.innerHTML = `<strong>${review.name}</strong><p>${review.review}</p><small>${review.date}</small>`
    reviewsList.appendChild(reviewItem)
  })
}

function generateStarRating(rating) {
  const fullStars = Math.floor(rating)
  const halfStars = Math.ceil(rating - fullStars)
  const emptyStars = 5 - fullStars - halfStars

  const stars =
    '★'.repeat(fullStars) + '☆'.repeat(halfStars) + '☆'.repeat(emptyStars)

  const numericRating = rating.toFixed(1)

  return { stars, numericRating }
}

document.addEventListener('DOMContentLoaded', async () => {
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
})

window.addEventListener('DOMContentLoaded', displayRestaurantDetail)
