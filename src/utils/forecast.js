const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/19821944528c6eb66283a7b449c90b21/${lat},${long}?units=si`;

    request({ url, json: true }, (err, response) => {
        if (err) {
            callback('Unable to connect to weather service');
        } else if (response.body.error){
            callback('Unable to find location');
        } else {
            callback(null, response.body.currently);
        }
    });
};

module.exports = forecast;