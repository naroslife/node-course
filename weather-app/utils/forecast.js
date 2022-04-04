const request = require('request');

function forecast(latitude, longitude, location, callback) {
    const weatherApiKey = '09c237402534304b59fa1e0426dc2ad2';
    const weatherBaseURL = 'http://api.weatherstack.com/';
    const weatherURL = `${weatherBaseURL}/current?access_key=${weatherApiKey}&query=${longitude},${latitude}`;
    console.log(weatherURL);
    request({ url: weatherURL, json: true }, (error, response) => {
        if (error || response.body.success === false) {
            callback("Weather service unavailable!", undefined)
        } else {
            callback(undefined, `It is currently ${response.body.current.weather_descriptions[0].toLowerCase()} and ${response.body.current.feelslike} degrees in ${location}`);
        }
    });
}
exports.forecast = forecast;
