import axios from 'axios'
import useSWR from 'swr'
let token = null
const setToken = (Token) => {
	token = Token
}

const baseUrl = process.env.BASE_URL + '/api/user'

const fetcher = (url) =>
	axios.get(url, { headers: { Authorization: 'Bearer ' + token } })

const createTheme = async (userForm) => {
	const config = {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	}

	const response = await axios.post(`${baseUrl}/create/theme`, userForm, config)
	return response?.data
}

const updateTheme = async (userForm, themeID) => {
	const config = {
		headers: { Authorization: 'Bearer ' + token },
	}

	const response = await axios.put(
		`${baseUrl}/update/theme/${themeID}`,
		userForm,
		config
	)
	return response?.data
}

const deleteTheme = async (themeID) => {
	const config = {
		headers: { Authorization: 'Bearer ' + token },
	}
	const response = await axios.delete(
		`${baseUrl}/delete/theme/${themeID}`,
		config
	)
	return response?.data
}

const getClientPartnerThemes = (userid) => {
	const { data, error } = useSWR(
		[`${baseUrl}/mythemes/${userid}`, token],
		fetcher
	)
	return { data, error }
}

export default {
	createTheme,
	updateTheme,
	deleteTheme,
	setToken,
	getClientPartnerThemes,
}
