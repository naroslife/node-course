const request = require('request')

function forecast(latitude, longitude, location, callback) {
    const weatherApiKey = '09c237402534304b59fa1e0426dc2ad2'
    const weatherBaseURL = 'http://api.weatherstack.com/'
    const url = `${weatherBaseURL}/current?access_key=${weatherApiKey}&query=${longitude},${latitude}`
    request({ url, json: true }, (error, { body }) => {
        if (error || body.success === false) {
            callback(new Error('Weather service unavailable!'), undefined)
        } else {
            callback(
                undefined,
                `It is currently ${body.current.weather_descriptions[0].toLowerCase()} and ${
                    body.current.feelslike
                } degrees in ${location}`
            )
        }
    })
}
exports.forecast = forecast
