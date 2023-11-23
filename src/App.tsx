import { ChakraBaseProvider } from "@chakra-ui/react"
import SidebarWithHeader from "../components/Sidebar"
import theme from "../lib/styles/theme"

function App() {
	return (
		<ChakraBaseProvider theme={theme}>
			<SidebarWithHeader />
		</ChakraBaseProvider>
	)
}

export default App
