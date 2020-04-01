const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/29062d321fc97ac3413033771083dbab/' + latitude + ',' + longitude
    
    request({ url, json: true}, (error, { body }) => {
        if(error) {
         callback('Unable to connect', undefined)
        } else if(body.error) {
         callback('Unable to find location', undefined)
        } else {
            const { temperature } = body.currently
            const summary = body.daily.data[0].summary
            callback(undefined, `${summary} Currently there is ${temperature} out`)
          }
    })
}

module.exports = forecast