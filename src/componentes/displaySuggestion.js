export function displaySuggestion(message, container) {
  clearSuggestion()
  const suggestionElement = document.createElement('div')
  suggestionElement.id = 'suggestion'
  suggestionElement.textContent = message
  suggestionElement.style.color = 'red'
  suggestionElement.style.marginTop = '10px'
  container.parentElement.insertBefore(suggestionElement, container)
}

export function clearSuggestion() {
  const suggestionElement = document.getElementById('suggestion')
  if (suggestionElement) {
    suggestionElement.remove()
  }
}
