const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoia2VsbGFwbW9yZ2FuIiwiYSI6ImNrNjBncWVxbjA3OGEzamxvb3YyZHpjNTEifQ.bSiRxFIDNsuJTlBCPf-dpw&limit=1`;

    request({ url, json: true }, (err, { body: { features } }) => {
        if (err) {
            callback('Unable to connect to location services');
        } else if (features.length === 0) {
            callback('Unable to find location. Try another search');
        } else {
            callback(null, {
                lat: features[0].center[1],
                long: features[0].center[0],
                location: features[0].place_name
            });
        }
    });
}

module.exports = geocode;