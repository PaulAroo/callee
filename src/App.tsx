import { ChakraBaseProvider } from "@chakra-ui/react"

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages"
import SignInPage from "./pages/signin"
import theme from "../lib/styles/theme"
import SignUpPage from "./pages/signup"

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/signin",
		element: <SignInPage />,
	},
	{
		path: "/signup",
		element: <SignUpPage />,
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
