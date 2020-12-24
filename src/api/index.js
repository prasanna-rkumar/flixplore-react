const BASE_URL = process.env.REACT_APP_API_ROUTE

export const API = {
	movies: (language, year, genre) => {
		return new Promise((resolve, reject) => {
			fetch(
				`${BASE_URL}/random/list?language=${language}&year=${year}&genre=${genre}`
			)
				.then((resp) => {
					resp.json().then((message) => {
						if (message.status === 200) {
							resolve(message.data.results)
						} else {
							resolve([])
						}
					}).catch(err => {
						reject(err)
					})
				})
				.catch(err => {
					reject(err)
				});
		})
	},
	movie: (movieID) => {
		return new Promise((resolve, reject) => {
			fetch(
				`${BASE_URL}/watch-locations?movieID=${movieID}`
			)
				.then((resp) => {
					resp.json().then((message) => {
						if (message.status === 200) {
							resolve(message.data.results)
						} else {
							resolve([])
						}
					}).catch(err => {
						reject(err)
					})
				})
				.catch(err => {
					reject(err)
				});
		})
	}
}