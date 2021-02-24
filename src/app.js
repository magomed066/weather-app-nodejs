const express = require('express')
const path = require('path')
const fs = require('fs')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const PORT = process.env.PORT || 3000

//! Set derictories
const staticDirectary = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//! Config Handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(staticDirectary))
hbs.registerPartials(partialsPath)

app.get('/', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Magomed',
		text: `It will be some weather's info here`,
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'Magomed',
		helpMessage: 'Can I help you?',
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Magomed',
		text: 'Hello it is me',
	})
})

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address',
		})
	}

	geocode(
		req.query.address,
		(error, { latitude, longitude, location } = {}) => {
			if (error) {
				return res.send({ error })
			}

			forecast(latitude, longitude, (error, forecastData) => {
				if (error) {
					return res.send({ error })
				}

				res.send({
					forecast: forecastData,
					location,
					address: req.query.address,
				})
			})
		},
	)
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: 'Oooops',
		name: 'Magomed',
		text: 'Page was not found',
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Magomed',
		text: 'Nothing was found',
	})
})

app.listen(PORT, () => console.log('Server is running ' + PORT))
