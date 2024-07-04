import './main.scss'
import { searchImages, fetchCatImages } from './src/componentes/api.js'
import { displayImages } from './src/componentes/displayImages.js'
import {
  displaySuggestion,
  clearSuggestion
} from './src/componentes/displaySuggestion.js'

const searchInput = document.getElementById('searchInput')
const imageContainer = document.getElementById('imageContainer')
const logoElement = document.getElementById('logo')

document.addEventListener('DOMContentLoaded', () => {
  searchAndDisplayImages('nature')
})
searchInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const query = searchInput.value.trim()
    searchInput.value = ''
    if (query) {
      searchAndDisplayImages(query)
    } else {
      searchAndDisplayImages('nature')
    }
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
