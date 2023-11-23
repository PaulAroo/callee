import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { ColorModeScript } from "@chakra-ui/react"
import theme from "../lib/styles/theme.ts"

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ColorModeScript initialColorMode={theme.config.initialColorMode} />
		<App />
	</React.StrictMode>
)
