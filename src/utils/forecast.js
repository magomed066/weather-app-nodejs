const request = require('request')

const forecast = (lat, lon, callback) => {
	const url = `https://api.darksky.net/forecast/b39edadb81ea9b1cb65f08088d8e23af/${lat},${lon}`

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback(`Couldn't connect to weather services!`, undefined)
		} else if (body.error) {
			callback(`Couldn't find location, try another url`, undefined)
		} else {
			const summary = body.daily.data[0].summary
			const degree = body.currently.temperature
			const chance = body.currently.precipProbability
			callback(
				undefined,
				`${summary} It's current ${degree} degree. There's a ${chance}% chance of rain!`,
			)
		}
	})
}

module.exports = forecast
