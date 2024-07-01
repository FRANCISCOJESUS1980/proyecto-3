const accessKey = '6OlH4Gek72BdTG9ZvnbHxoqAdlScntGLuZE9etBeYRo'

export async function searchImages(query) {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&per_page=30&client_id=${accessKey}`
  )
  return await response.json()
}

export async function fetchCatImages() {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=gatos&per_page=30&client_id=${accessKey}`
  )
  return await response.json()
}
