import { ChakraBaseProvider } from "@chakra-ui/react"
import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom"

import theme from "../lib/styles/theme"
import LandingPage from "./pages/LandingPage"
import SignInPage from "./pages/signin"
import SignUpPage from "./pages/signup"
import axiosInstance from "./axios"
import DashboardCopy from "../components/Dashboard"

const userLoader = async () => {
	const user = JSON.parse(localStorage.getItem("user")!)
	if (user) {
		return redirect("/dashboard")
	}
	return null
}

export const router = createBrowserRouter([
	{
		path: "/",
		element: <LandingPage />,
		loader: userLoader,
	},
	{
		path: "/login",
		element: <SignInPage />,
		loader: userLoader,
	},
	{
		path: "/signup",
		element: <SignUpPage />,
	},
	{
		path: "/dashboard",
		element: <DashboardCopy />,
		loader: async () => {
			const user = JSON.parse(localStorage.getItem("user")!)
			console.log(user)
			if (!user) return redirect("/")
			else {
				try {
					const allUsersData = await axiosInstance.get("/user/all_users")
					return { userData: allUsersData.data }
				} catch (error) {
					console.log("error fetching all users", error)
					return null
				}
			}
		},
	},
])

// TODO: refactor the entire app

function App() {
	return (
		<ChakraBaseProvider theme={theme}>
			<RouterProvider router={router} />
		</ChakraBaseProvider>
	)
}

export default App
