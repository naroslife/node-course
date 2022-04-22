const http = require('http');

const weatherApiKey = '09c237402534304b59fa1e0426dc2ad2';
const weatherBaseURL = 'http://api.weatherstack.com/';
const url = `${weatherBaseURL}/current?access_key=${weatherApiKey}&query=40,-75`;

const request = http.request(url, (response) => {
    let data = '';
    response.on('data', (chunk) => {
        data = data + chunk.toString();
    });

    response.on('end', () => {
        const body = JSON.parse(data);
        console.log(body);
    });
});
request.on('error', (error) => {
    console.log('Error: ', error);
});
request.end();
