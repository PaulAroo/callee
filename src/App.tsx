import { ChakraBaseProvider } from "@chakra-ui/react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

import HomePage from "./pages/Home"
import ErrorPage from "./pages/Error"
import theme from "./lib/styles/theme"
import SignInPage from "./pages/Signin"
import SignUpPage from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import { fetchAllUsers, verifyAndRedirectIfLoggedIn } from "./utils/loaders"

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
		loader: verifyAndRedirectIfLoggedIn,
	},
	{
		path: "/login",
		element: <SignInPage />,
		loader: verifyAndRedirectIfLoggedIn,
	},
	{
		path: "/signup",
		element: <SignUpPage />,
		loader: verifyAndRedirectIfLoggedIn,
	},
	{
		path: "/dashboard",
		element: <Dashboard />,
		loader: fetchAllUsers,
		errorElement: <ErrorPage />,
	},
])

function App() {
	return (
		<ChakraBaseProvider theme={theme}>
			<RouterProvider router={router} />
		</ChakraBaseProvider>
	)
}

export default App
