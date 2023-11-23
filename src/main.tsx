import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { ColorModeScript } from "@chakra-ui/react"
import theme from "../lib/styles/theme.ts"
import { createBrowserRouter } from "react-router-dom"
import HomePage from "./pages/index.tsx"
import SignInPage from "./pages/signin.tsx"
import SignUpPage from "./pages/signup.tsx"

export const router = createBrowserRouter([
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

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ColorModeScript initialColorMode={theme.config.initialColorMode} />
		<App />
	</React.StrictMode>
)
