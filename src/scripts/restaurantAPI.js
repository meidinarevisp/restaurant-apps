const BASE_URL = 'https://restaurant-api.dicoding.dev'

export async function getRestaurantList() {
  const response = await fetch(`${BASE_URL}/list`)
  const data = await response.json()
  if (data.error) {
    throw new Error(data.message)
  }
  return data
}

export async function getRestaurantDetail(id) {
  try {
    const response = await fetch(`${BASE_URL}/detail/${id}`)

    if (!response.ok) {
      throw new Error('Failed to fetch restaurant detail')
    }

    const data = await response.json()
    if (!data || !data.restaurant) {
      throw new Error('Restaurant detail is null or empty.')
    }

    return data.restaurant
  } catch (error) {
    console.error('Error fetching restaurant detail:', error)
    return null
  }
}
