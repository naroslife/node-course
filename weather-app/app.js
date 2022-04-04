const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { geocode } = require("./utils/geocode");
const { forecast } = require('./utils/forecast');

const argv = yargs(hideBin(process.argv)).command('<location>', "The location to get the weather at").demandCommand(1).parse()
const location = argv._[0]


geocode(location, (error, data) => {
    if (error) {
        console.log(error);
    } else {
        forecast(data.latitude, data.longitude, data.location, (error, response) => {
            if (error) {
                return console.log(error);
            }
            console.log(data.location);
            console.log(response);
        })

    }
});