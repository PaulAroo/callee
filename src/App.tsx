import { ChakraBaseProvider } from "@chakra-ui/react"
import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom"

import theme from "../lib/styles/theme"
import Dashboard from "../components/DashBoard"
import LandingPage from "./pages/LandingPage"
import SignInPage from "./pages/signin"
import SignUpPage from "./pages/signup"

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
		element: <Dashboard />,
		loader: async () => {
			const user = JSON.parse(localStorage.getItem("user")!)
			console.log(user)
			if (!user) return redirect("/")
			return null
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
