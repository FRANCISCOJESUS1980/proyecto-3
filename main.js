import './main.scss'
import { searchImages, fetchCatImages } from './src/api.js'
import { displayImages } from './src/displayImages.js'
import { displaySuggestion, clearSuggestion } from './src/displaySuggestion.js'

const searchInput = document.getElementById('searchInput')
const imageContainer = document.getElementById('imageContainer')
const logoElement = document.getElementById('logo')

let typingTimer
const doneTypingInterval = 6000

document.addEventListener('DOMContentLoaded', () => {
  searchAndDisplayImages('nature')
})

searchInput.addEventListener('input', () => {
  clearTimeout(typingTimer)
  const query = searchInput.value.trim()

  if (query) {
    typingTimer = setTimeout(() => {
      searchAndDisplayImages(query)
    }, doneTypingInterval)
    searchAndDisplayImages(query)
  } else {
    searchAndDisplayImages('nature')
  }
})

logoElement.addEventListener('click', () => {
  location.reload()
})

async function searchAndDisplayImages(query) {
  const data = await searchImages(query)
  if (data.results.length > 0) {
    displayImages(data.results, imageContainer)
    clearSuggestion()
  } else {
    const catData = await fetchCatImages()
    displayImages(catData.results, imageContainer)
    displaySuggestion(
      'No se encontraron imágenes. Prueba otra búsqueda o intenta con gatos.',
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
