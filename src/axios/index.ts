import axios from "axios"
import { LocalStorage } from "../utils"

const axiosInstance = axios.create({
	baseURL: "https://klusterthon2023-production.up.railway.app/api",
})

// axiosInstance.interceptors.request.use(
// 	function (config) {
// 		const token = LocalStorage.get("user").token
// 		config.headers.Authorization = `Bearer ${token}`
// 		return config
// 	},
// 	function (error) {
// 		return Promise.reject(error)
// 	}
// )

export default axiosInstance
