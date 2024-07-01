import './main.scss'

const accessKey = '6OlH4Gek72BdTG9ZvnbHxoqAdlScntGLuZE9etBeYRo'
const searchInput = document.getElementById('searchInput')
const imageContainer = document.getElementById('imageContainer')

document.addEventListener('DOMContentLoaded', () => {
  searchImages('nature')
})

searchInput.addEventListener('input', () => {
  const query = searchInput.value
  if (query) {
    searchImages(query)
  } else {
    imageContainer.innerHTML = ''
    clearSuggestion()
  }
})

async function searchImages(query) {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&per_page=30&client_id=${accessKey}`
  )
  const data = await response.json()
  if (data.results.length > 0) {
    displayImages(data.results)
    clearSuggestion()
  } else {
    displayImages([])
    fetchCatImages()
    displaySuggestion(
      'no se encontraron imagenes. Prueba otra búsqueda o intenta con gatos'
    )
  }
}
async function fetchCatImages() {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=gatos&per_page=30&client_id=${accessKey}`
  )
  const data = await response.json()
  displayImages(data.results)
}

function displayImages(images) {
  imageContainer.innerHTML = ''
  images.forEach((image) => {
    const imgElement = document.createElement('div')
    imgElement.classList.add('image-item')
    imgElement.innerHTML = `<img src="${image.urls.small}" alt="${image.alt_description}">`
    imageContainer.appendChild(imgElement)
  })
}
