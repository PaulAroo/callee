import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { ColorModeScript } from "@chakra-ui/react"
import theme from "../lib/styles/theme.ts"
import { AuthContextProvider } from "./context/AuthContext.tsx"
import { SocketProvider } from "./context/SocketContext.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ColorModeScript initialColorMode={theme.config.initialColorMode} />
		<AuthContextProvider>
			<SocketProvider>
				<App />
			</SocketProvider>
		</AuthContextProvider>
	</React.StrictMode>
)
