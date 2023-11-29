import { useNavigate } from "react-router-dom"
import { Button, SimpleGrid, VStack } from "@chakra-ui/react"

import { LocalStorage } from "../utils"

export default function ErrorPage() {
	const navigate = useNavigate()

	const goBackHome = () => {
		LocalStorage.set("user", null)
		navigate("/")
	}

	return (
		<SimpleGrid minH="100vh" id="error-page" placeItems="center">
			<VStack>
				<h1>Oops!</h1>
				<p>Sorry, an unexpected error has occurred.</p>
				<Button onClick={goBackHome}>return to homepage</Button>
			</VStack>
		</SimpleGrid>
	)
}
