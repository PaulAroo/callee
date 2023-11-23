import SignInCard from "@/components/SignInCard"
import { Center, SimpleGrid } from "@chakra-ui/react"
import React from "react"

function SignInPage() {
	return (
		<SimpleGrid w="full" h="100vh" placeItems="center">
			<SignInCard />
		</SimpleGrid>
	)
}

export default SignInPage
