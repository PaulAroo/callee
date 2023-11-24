import { SimpleGrid } from "@chakra-ui/react"
import SignInCard from "../../components/SignInCard"
import { ChangeEvent, useState } from "react"

export type SignInInputs = {
	username: string
	password: string
}

function SignInPage() {
	const [data, setData] = useState<SignInInputs>({
		username: "",
		password: "",
	})

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target
		setData({ ...data, [id]: value })
	}

	const handleSubmit = () => {
		console.log(data)
	}
	return (
		<SimpleGrid w="full" h="100vh" placeItems="center">
			<SignInCard
				handleInputchange={handleInputChange}
				handleSubmit={handleSubmit}
			/>
		</SimpleGrid>
	)
}

export default SignInPage
