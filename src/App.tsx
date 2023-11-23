import { ChakraBaseProvider } from "@chakra-ui/react"
import { RouterProvider } from "react-router-dom"

import { router } from "./main"

import theme from "../lib/styles/theme"

function App() {
	return (
		<ChakraBaseProvider theme={theme}>
			<RouterProvider router={router} />
		</ChakraBaseProvider>
	)
}

export default App
