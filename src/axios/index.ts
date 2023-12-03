import axios from "axios"
import { LocalStorage } from "../utils"

const axiosInstance = axios.create({
	baseURL: "https://klusterthon2023-production.up.railway.app/api",
	// withCredentials: true,
})

axiosInstance.interceptors.request.use(
	function (config) {
		const user = LocalStorage.get("user")
		if (user) {
			config.headers.Authorization = `Bearer ${user.token}`
		}
		return config
	},
	function (error) {
		return Promise.reject(error)
	}
)

export default axiosInstance
