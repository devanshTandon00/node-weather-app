const request = require('postman-request')

//can use encodeComponentURI before address
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + (address) + '.json?access_token=pk.eyJ1IjoiZHRkYW5zaCIsImEiOiJja2UxM3EwZGo0MjJhMnF0dnlnZmxuOXhuIn0.-cS4Hn47-4bjHN1HDzorxQ'

    // this uses shorthand notation for url. Since property name and name for JSON key is same, we can just say 'url'
    request({uri: url, json: true}, (error, data) => {
        if(error){
            callback("Unable to connect to network!", undefined)
        }
        else if(data.body.features.length === 0){
            callback("Try another search. Cannot find location.", undefined)
        }
        else{
            callback(undefined, {
                Latitude: data.body.features[0].center[0],
                Longitude: data.body.features[0].center[1],
                Location: data.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;