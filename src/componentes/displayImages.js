export function displayImages(images, container) {
  container.innerHTML = ''
  images.forEach((image) => {
    const imgElement = document.createElement('div')
    imgElement.classList.add('image-item')
    imgElement.innerHTML = `
      <img src="${image.urls.small}" alt="${image.alt_description}">
      <div class="user-info" style="background-color: ${getRandomColor()};">
        <a href="${image.user.links.html}" target="_blank">
          <img src="${image.user.profile_image.small}" alt="${
      image.user.name
    }" class="user-profile-pic">
          ${image.user.name}
        </a>
      </div>
    `
    container.appendChild(imgElement)
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
