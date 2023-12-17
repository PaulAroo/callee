import { ChakraBaseProvider } from "@chakra-ui/react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

import ErrorPage from "./pages/Error"
import theme from "./lib/styles/theme"
import SignInPage from "./pages/signin"
import SignUpPage from "./pages/signup"
import LandingPage from "./pages/LandingPage"
import Dashboard from "./components/Dashboard"
import { fetchAllUsers, verifyAndRedirectIfLoggedIn } from "./utils/loaders"

const router = createBrowserRouter([
	{
		path: "/",
		element: <LandingPage />,
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
