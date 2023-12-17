import { redirect } from "react-router-dom"

import axiosInstance from "../../axios"
import { User } from "../../context/AuthContext"

export const verifyAndRedirectIfLoggedIn = async () => {
	const user = JSON.parse(localStorage.getItem("user")!)
	if (user) {
		return redirect("/dashboard")
	}
	return null
}

export const fetchAllUsers = async () => {
	const user = JSON.parse(localStorage.getItem("user")!)
	if (!user) return redirect("/")
	else {
		try {
			const allUsersData = await axiosInstance.get<User[]>("/user/all_users")
			const userData = allUsersData.data.filter((u) => u.id !== user.id)
			return { userData }
		} catch (error) {
			console.log("error fetching all users", error)
			return null
		}
	}
}
