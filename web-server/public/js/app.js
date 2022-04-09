console.log('Client side javascript file loaded');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })

fetch('http://localhost:3000/weather?address=Boston').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log("Error: " + data.error);
        }
        console.log("Forecast: " + data.forecast);
    })
})

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const locationParagraph = document.getElementById('locationParagraph')
const forecastParagraph = document.querySelector('#forecastParagraph') // same as above
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchElement.value
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
})