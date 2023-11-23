import { SimpleGrid } from "@chakra-ui/react"
import SignUpCard from "../../components/SignUpCard"

function SignUpPage() {
	return (
		<SimpleGrid w="full" h="100vh" placeItems="center">
			<SignUpCard />
		</SimpleGrid>
	)
}

export default SignUpPage
