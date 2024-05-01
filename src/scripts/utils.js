import 'regenerator-runtime'
import * as idb from 'idb'

export async function isRestaurantFavorite(id) {
  const favorites = await getAllFavorites()
  return favorites.some((restaurant) => restaurant.id === id)
}

export async function addToFavorites(restaurantDetail) {
  try {
    const db = await openDB()
    const tx = db.transaction('favorites', 'readwrite')
    const store = tx.objectStore('favorites')
    await store.add(restaurantDetail)
    console.log('Restaurant added to favorites')
  } catch (error) {
    console.error('Error adding restaurant to favorites:', error)
  }
}

export async function removeFromFavorites(id) {
  try {
    const db = await openDB()
    const tx = db.transaction('favorites', 'readwrite')
    const store = tx.objectStore('favorites')
    await store.delete(id)
    console.log('Restaurant removed from favorites')
  } catch (error) {
    console.error('Error removing restaurant from favorites:', error)
  }
}
export async function getAllFavorites() {
  try {
    const db = await openDB()
    const tx = db.transaction('favorites', 'readonly')
    const store = tx.objectStore('favorites')
    return store.getAll()
  } catch (error) {
    console.error('Error fetching favorites:', error)
    return []
  }
}

async function openDB() {
  const db = await idb.openDB('restaurantDB', 1, {
    upgrade(db) {
      db.createObjectStore('favorites', { keyPath: 'id' })
    }
  })
  return db
}
