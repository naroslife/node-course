const request = require('request')

function geocode(location, callback) {
    const geocodingApiKey =
        'pk.eyJ1IjoibmFyb3NsaWZlIiwiYSI6ImNsMWwzMGVqYTAxbDEzY3BnZ2NqZmI4MXkifQ.n4UXY2HeQrs5aIgogyG68Q'
    const geocodingBaseURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places'
    const url = `${geocodingBaseURL}/${encodeURIComponent(
        location
    )}.json?access_token=${geocodingApiKey}&limit=1`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            // console.log("Location service unavailable!");
            callback('Location service unavailable!', undefined)
        } else if (body.features.length === 0) {
            // console.log("Cannot find location!");
            callback('Cannot find location!', undefined)
        } else {
            const [lat, long] = body.features[0].center
            const place_name = body.features[0].place_name
            callback(undefined, {
                location: place_name,
                latitude: lat,
                longitude: long,
            })
        }
    })
}
exports.geocode = geocode
