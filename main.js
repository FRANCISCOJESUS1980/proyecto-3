import './main.scss'

const accessKey = '6OlH4Gek72BdTG9ZvnbHxoqAdlScntGLuZE9etBeYRo'
const searchInput = document.getElementById('searchInput')
const imageContainer = document.getElementById('imageContainer')
const logoElement = document.getElementById('logo')

let lastQuery = ''
let typingTimer
const doneTypingInterval = 4000

document.addEventListener('DOMContentLoaded', () => {
  searchImages('nature')
})

searchInput.addEventListener('input', () => {
  clearTimeout(typingTimer)
  const query = searchInput.value.trim()
  if (query !== lastQuery) {
    lastQuery = query
  }
  if (query) {
    typingTimer = setTimeout(() => {
      searchImages(query)
    }, doneTypingInterval)
    searchImages(query)
  } else {
    searchImages('nature')
  }
})
logoElement.addEventListener('click', () => {
  location.reload()
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
  clearTimeout(typingTimer)
  if (query) {
    setTimeout(() => {
      searchInput.value = ''
    }, doneTypingInterval)
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
function displaySuggestion(message) {
  clearSuggestion()
  const suggestionElement = document.createElement('div')
  suggestionElement.id = 'suggestion'
  suggestionElement.textContent = message
  suggestionElement.style.color = 'red'
  suggestionElement.style.marginTop = '10px'
  imageContainer.parentElement.insertBefore(suggestionElement, imageContainer)
}

function clearSuggestion() {
  const suggestionElement = document.getElementById('suggestion')
  if (suggestionElement) {
    suggestionElement.remove()
  }
}
