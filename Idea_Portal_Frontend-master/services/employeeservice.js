import axios from 'axios'
let token = null
const setToken = (Token) => {
	token = Token
}

const baseUrl = process.env.BASE_URL + '/api/user/participant/participate'

const addParticipant = async (userForm) => {
	const config = {
		headers: { Authorization: 'Bearer ' + token },
	}
	const response = await axios.post(baseUrl, userForm, config)
	return response?.data
}

export default { addParticipant, setToken }
