import { SimpleGrid } from "@chakra-ui/react"
import SignUpCard from "../../components/SignUpCard"
import { ChangeEvent, useState } from "react"

export type SignUpInputs = {
	email: string
	username: string
	password: string
}

function SignUpPage() {
	const [data, setData] = useState<SignUpInputs>({
		email: "",
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
			<SignUpCard
				handleInputchange={handleInputChange}
				handleSubmit={handleSubmit}
			/>
		</SimpleGrid>
	)
}

export default SignUpPage
