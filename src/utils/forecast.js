const request = require('postman-request')
require('dotenv').config()
const secret_key = process.env.WEATHER_API

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d0ae3b06e46c090566ab149662470ec8&query='+ longitude + ','+ latitude

    request({url, json: true}, (error, data) => {
        if(error){
            callback('Unable to connect to network', undefined)
        }
        else if(data.body.error){
            callback(data.body.error.info, undefined)
        }
        else{   
            callback(undefined, `Weather is ${data.body.current.weather_descriptions}. Temparature is currently ${data.body.current.temperature} degrees, however it feels like ${data.body.current.feelslike}. Humidity is ${data.body.current.humidity}% and cloudcover is ${data.body.current.cloudcover} in ${data.body.location.name} at ${data.body.current.observation_time}.`) 
        }
    })
}

module.exports = forecast;