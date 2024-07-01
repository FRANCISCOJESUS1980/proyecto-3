import './main.scss'
/*import { displayImages } from './src/displayImages.js'
import { displaySuggestion, clearSuggestion } from './src/displaySuggestion.js'
import { searchImages, fetchCatImages } from './src/api.js'*/

const accessKey = '6OlH4Gek72BdTG9ZvnbHxoqAdlScntGLuZE9etBeYRo'
const searchInput = document.getElementById('searchInput')
const imageContainer = document.getElementById('imageContainer')
const logoElement = document.getElementById('logo')

let lastQuery = ''
let typingTimer
const doneTypingInterval = 6000

document.addEventListener('DOMContentLoaded', () => {
  searchImages('nature')
})

searchInput.addEventListener('input', () => {
  clearTimeout(typingTimer)
  const query = searchInput.value.trim()
  lastQuery = query

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
    displayImages(data.results, imageContainer)
    clearSuggestion(imageContainer)
  } else {
    displayImages([], imageContainer)
    fetchCatImages()
    displaySuggestion(
      'no se encontraron imagenes. Prueba otra búsqueda o intenta con gatos',
      imageContainer
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
  displayImages(data.results, imageContainer)
}

function displayImages(images) {
  imageContainer.innerHTML = ''
  images.forEach((image) => {
    const imgElement = document.createElement('div')
    imgElement.classList.add('image-item')
    imgElement.innerHTML = `<img src="${image.urls.small}" alt="${
      image.alt_description
    }">
     <div class="user-info"style="background-color: ${getRandomColor()};>
        <a href="${image.user.links.html}" target="_blank">
          <img src="${image.user.profile_image.small}" alt="${
      image.user.name
    }" class="user-profile-pic">
          ${image.user.name}
        </a>
      </div>`
    imageContainer.appendChild(imgElement)
  })
}
function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
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
