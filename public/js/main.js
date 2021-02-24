window.addEventListener('DOMContentLoaded', () => {
	'use strict'

	const url = '/weather'

	//? UI
	const form = document.querySelector('#form')
	const input = document.querySelector('.input-weather')
	const btn = document.querySelector('.btn-search')
	const forecast = document.querySelector('.forecast')
	const loc = document.querySelector('.location')

	//! EVENT FUNCTIONS
	const fetchData = async (url, location) => {
		const res = await fetch(`${url}?address=${location}`)

		if (!res.ok) {
			throw new Error(`Couldn't fetch ${url}, status: ${res.status}`)
		}

		return await res.json()
	}

	const searchWeather = (e) => {
		e.preventDefault()

		const location = input.value

		forecast.textContent = 'loading...'
		loc.textContent = ''

		fetchData(url, location)
			.then((data) => {
				if (data.error) {
					forecast.textContent = data.error
				} else {
					forecast.textContent = data.forecast
					loc.textContent = data.location
				}
			})
			.catch((err) => {
				forecast.textContent = err
			})
			.finally(() => {
				form.reset()
			})
	}

	//! EVENTS
	form.addEventListener('submit', searchWeather)
})
