import axios from 'axios'
import useSWR from 'swr'

let token = null

const setToken = (Token) => {
	token = Token
}

const baseUrl = process.env.BASE_URL + '/api'
const fetcher = (url) => axios.get(url)

const signup = async (userForm) => {
	const response = await axios.post(`${baseUrl}/signup`, userForm)
	return response?.data
}

const login = async (userForm) => {
	const response = await axios.post(`${baseUrl}/login`, userForm)
	return response?.data
}

const getAllThemes = async () => {
	const response = await axios.get(`${baseUrl}/themes`)
	return response?.data
}

const getThemebyId = (id) => {
	const { data, error } = useSWR(`${baseUrl}/themes/${id}`, fetcher)
	return { data, error }
}

const getAllIdeas = async () => {
	const response = await axios.get(`${baseUrl}/ideas`)
	return response?.data
}

const getIdeabyId = (id) => {
	const { data, error } = useSWR(`${baseUrl}/idea/${id}`, fetcher)
	return { data, error }
}

const getMostLikedIdeasbyThemeId = (id) => {
	const { data, error } = useSWR(
		`${baseUrl}/themes/${id}/ideas/mostlikes`,
		fetcher
	)
	return { data, error }
}

const getMostCommentedIdeasbyThemeId = (id) => {
	const { data, error } = useSWR(
		`${baseUrl}/themes/${id}/ideas/mostcomments`,
		fetcher
	)
	return { data, error }
}

const getNewestIdeasbyThemeId = (id) => {
	const { data, error } = useSWR(
		`${baseUrl}/themes/${id}/ideas/newest`,
		fetcher
	)
	return { data, error }
}

const resetPassword = async (userForm) => {
	const response = await axios.post(`${baseUrl}/login/resetPassword`, userForm)
	return response?.data
}

const confirmPassword = async (userForm) => {
	const response = await axios.put(`${baseUrl}/login/savePassword`, userForm)
	return response?.data
}

const updatePassword = async (userForm) => {
	const config = {
		headers: { Authorization: 'Bearer ' + token },
	}

	const response = await axios.put(
		`${baseUrl}/user/profile/update/password`,
		userForm,
		config
	)
	return response?.data
}

const updateProfile = async (userForm) => {
	const config = {
		headers: { Authorization: 'Bearer ' + token },
	}
	const response = await axios.put(
		`${baseUrl}/user/profile/update/profile`,
		userForm,
		config
	)
	return response?.data
}

const addLike = async (userForm) => {
	const config = {
		headers: { Authorization: 'Bearer ' + token },
	}
	const response = await axios.put(
		`${baseUrl}/user/idea/like`,
		userForm,
		config
	)
	return response?.data
}

const addComment = async (userForm) => {
	const config = {
		headers: { Authorization: 'Bearer ' + token },
	}
	const response = await axios.post(
		`${baseUrl}/user/idea/comment`,
		userForm,
		config
	)
	return response?.data
}

const getLikesbyIdeaId = async (ideaId) => {
	const response = await axios.get(`${baseUrl}/idea/${ideaId}/likes`)
	return response?.data
}
const getDislikesbyIdeaId = async (ideaId) => {
	const response = await axios.get(`${baseUrl}/idea/${ideaId}/dislikes`)
	return response?.data
}
const getCommentsbyIdeaId = async (ideaId) => {
	const response = await axios.get(`${baseUrl}/idea/${ideaId}/comments`)
	return response?.data
}

const getNoOfIdeas = async () => {
	const config = {
		headers: { Authorization: 'Bearer ' + token },
	}
	const response = await axios.get(`${baseUrl}/user/ideaCount`, config)
	return response?.data
}

const getNoOfThemes = async () => {
	const config = {
		headers: { Authorization: 'Bearer ' + token },
	}
	const response = await axios.get(`${baseUrl}/user/themeCount`, config)
	return response?.data
}

const getNoOfUsers = async () => {
	const config = {
		headers: { Authorization: 'Bearer ' + token },
	}
	const response = await axios.get(`${baseUrl}/user/userCount`, config)
	return response?.data
}

const getThemesbyDate = async () => {
	const config = { headers: { Authorization: 'Bearer ' + token } }
	const response = await axios.get(`${baseUrl}/user/themesByDate`, config)
	return response?.data
}

const getIdeasbyTheme = async () => {
	const config = { headers: { Authorization: 'Bearer ' + token } }
	const response = await axios.get(`${baseUrl}/user/ideasForThemes`, config)
	return response?.data
}

const getParticipantsbyIdea = async () => {
	const config = { headers: { Authorization: 'Bearer ' + token } }
	const response = await axios.get(
		`${baseUrl}/user/participantsForIdea`,
		config
	)
	return response?.data
}

const getTopLikedIdeas = async () => {
	const config = { headers: { Authorization: 'Bearer ' + token } }
	const response = await axios.get(`${baseUrl}/user/getLikesForIdea`, config)
	return response?.data
}

const getTopDislikedIdeas = async () => {
	const config = { headers: { Authorization: 'Bearer ' + token } }
	const response = await axios.get(`${baseUrl}/user/getDislikesForIdea`, config)
	return response?.data
}

const downloadIdeasByTheme = async (themeid) => {
	const response = await axios.get(
		`${baseUrl}/themes/${themeid}/ideas/download`
	)
	return response?.data
}

const getParticipantRoles = async () => {
	const response = await axios.get(
		`${baseUrl}/participation/getParticipantsRole`
	)
	return response?.data
}

const getThemeCategories = async () => {
	const response = await axios.get(`${baseUrl}/themes/getThemesCategory`)
	return response?.data
}

const getParticipantsForIdea = async (ideaId) => {
	const response = await axios.get(`${baseUrl}/idea/${ideaId}/participants`)
	return response?.data
}

export default {
	setToken,
	signup,
	login,
	getAllThemes,
	getThemebyId,
	getAllIdeas,
	getIdeabyId,
	getMostLikedIdeasbyThemeId,
	getMostCommentedIdeasbyThemeId,
	getNewestIdeasbyThemeId,
	addLike,
	addComment,
	getLikesbyIdeaId,
	getDislikesbyIdeaId,
	getCommentsbyIdeaId,
	resetPassword,
	confirmPassword,
	updatePassword,
	updateProfile,
	getNoOfIdeas,
	getNoOfThemes,
	getNoOfUsers,
	getThemesbyDate,
	getIdeasbyTheme,
	getParticipantsbyIdea,
	getTopLikedIdeas,
	getTopDislikedIdeas,
	downloadIdeasByTheme,
	getParticipantRoles,
	getThemeCategories,
	getParticipantsForIdea,
}
