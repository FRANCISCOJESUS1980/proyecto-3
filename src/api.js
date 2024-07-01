/*const accessKey = '6OlH4Gek72BdTG9ZvnbHxoqAdlScntGLuZE9etBeYRo'

export async function searchImages(query) {
  const endpoint = `https://api.unsplash.com/search/photos?query=${query}&per_page=30&client_id=${accessKey}`

  try {
    const response = await fetch(endpoint)

    if (!response.ok) {
      throw new Error('Error en la solicitud de la API')
    }

    const data = await response.json()

    if (data.results.length > 0) {
      displayImages(data.results)
      clearSuggestion()
    } else {
      displayImages([])
      fetchCatImages()
      displaySuggestion(
        'No se encontraron imágenes. Prueba otra búsqueda o intenta con gatos'
      )
    }
  } catch (error) {
    console.error('Error fetching images:', error)
    displaySuggestion('Error al buscar imágenes. Inténtalo de nuevo más tarde.')
  } finally {
    clearTimeout(typingTimer)
    if (query) {
      setTimeout(() => {
        searchInput.value = ''
      }, doneTypingInterval)
    }
  }
}

export async function fetchCatImages() {
  const endpoint = `https://api.unsplash.com/search/photos?query=gatos&per_page=30&client_id=${accessKey}`

  try {
    const response = await fetch(endpoint)

    if (!response.ok) {
      throw new Error('Error en la solicitud de la API de gatos')
    }

    const data = await response.json()
    displayImages(data.results)
  } catch (error) {
    console.error('Error fetching cat images:', error)
    displaySuggestion(
      'Error al buscar imágenes de gatos. Inténtalo de nuevo más tarde.'
    )
  }
}
*/
