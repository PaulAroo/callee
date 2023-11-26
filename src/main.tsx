import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { ColorModeScript } from "@chakra-ui/react"
import theme from "../lib/styles/theme.ts"
import { createBrowserRouter, redirect } from "react-router-dom"
import HomePage from "./pages/index.tsx"
import SignInPage from "./pages/signin.tsx"
import SignUpPage from "./pages/signup.tsx"
import { AuthContextProvider } from "./context/AuthContext.tsx"
import { PeerProvider } from "./context/PeerContext.tsx"

const userLoader = async () => {
	const user = JSON.parse(localStorage.getItem("user")!)
	if (user) {
		return redirect("/")
	}
	return null
}

export const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/login",
		element: <SignInPage />,
		loader: userLoader,
	},
	{
		path: "/signup",
		element: <SignUpPage />,
		loader: userLoader,
	},
])

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ColorModeScript initialColorMode={theme.config.initialColorMode} />
		<AuthContextProvider>
			<PeerProvider>
				<App />
			</PeerProvider>
		</AuthContextProvider>
	</React.StrictMode>
)
