const request = require('request');

function geocode(location, callback) {
    const geocodingApiKey = 'pk.eyJ1IjoibmFyb3NsaWZlIiwiYSI6ImNsMWwzMGVqYTAxbDEzY3BnZ2NqZmI4MXkifQ.n4UXY2HeQrs5aIgogyG68Q';
    const geocodingBaseURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
    const geocodingURL = `${geocodingBaseURL}/${encodeURIComponent(location)}.json?access_token=${geocodingApiKey}&limit=1`;
    request({ url: geocodingURL, json: true }, (error, response) => {
        if (error) {
            // console.log("Location service unavailable!");
            callback('Location service unavailable!', undefined);
        } else if (response.body.features.length === 0) {
            // console.log("Cannot find location!");
            callback('Cannot find location!', undefined);
        } else {
            const [lat, long] = response.body.features[0].center;
            const place_name = response.body.features[0].place_name;
            callback(undefined, { location: place_name, latitude: lat, longitude: long });
        }
    });
}
exports.geocode = geocode;
