import { SimpleGrid } from "@chakra-ui/react"
import SignInCard from "../../components/SignInCard"

function SignInPage() {
	return (
		<SimpleGrid w="full" h="100vh" placeItems="center">
			<SignInCard />
		</SimpleGrid>
	)
}

export default SignInPage
