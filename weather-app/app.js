const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { geocode } = require("./utils/geocode");
const { forecast } = require('./utils/forecast');

const argv = yargs(hideBin(process.argv)).command('<location>', "The location to get the weather at").demandCommand(1).parse()
const location = argv._[0]


geocode(location, (error, {latitude, longitude, location} = {}) => {
    if (error) {
        console.log(error);
    } else {
        forecast(latitude, longitude, location, (error, response) => {
            if (error) {
                return console.log(error);
            }
            console.log(location);
            console.log(response);
        })

    }
});