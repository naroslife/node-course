console.log('Client side javascript file loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })

fetch('http://localhost:3000/weather?address=Boston').then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log('Error: ' + data.error)
    }
    console.log('Forecast: ' + data.forecast)
  })
})

const open = document.getElementById('open')
const close = document.getElementById('close')
const container = document.querySelector('.container')

open.addEventListener('click', () => container.classList.add('show-nav'))

close.addEventListener('click', () => container.classList.remove('show-nav'))

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const locationParagraph = document.getElementById('locationParagraph')
const forecastParagraph = document.querySelector('#forecastParagraph') // same as above
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let location = searchElement.value
  let processLocation = function (location) {
    forecastParagraph.textContent = ''
    locationParagraph.textContent = ''
    locationParagraph.className = 'loader'
    fetch(`/weather?address=${location}`).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          locationParagraph.className = ''
          locationParagraph.textContent = data.error
          forecastParagraph.textContent = ''
        } else {
          locationParagraph.className = ''
          locationParagraph.textContent = data.location
          forecastParagraph.textContent = data.forecast
        }
      })
    })
  }
  if (location.length === 0) {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((pos) => {
          processLocation(`${pos.coords.longitude},${pos.coords.latitude}`)
      }, (pos) => {
        processLocation(`${pos.coords.longitude},${pos.coords.latitude}`)
      })
    }
  } else {
    processLocation(location)
  }
})
