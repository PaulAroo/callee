import { MdEmail } from "react-icons/md"

import {
	Button,
	Card,
	CardBody,
	CardHeader,
	FormControl,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	Text,
} from "@chakra-ui/react"
import PasswordInput from "./PasswordInput"
import { Link } from "react-router-dom"
import { ChangeEvent } from "react"

function SignInCard({
	handleInputchange,
	handleSubmit,
}: {
	handleSubmit: () => void
	handleInputchange: (e: ChangeEvent<HTMLInputElement>) => void
}) {
	return (
		<Card
			borderColor="brand.purple.200"
			borderWidth={["0px", "5px"]}
			w="full"
			variant="outline"
			maxWidth="33.6875rem"
			borderRadius="0.5625rem"
		>
			<CardHeader p="0" pt="6.56rem">
				<Heading
					fontWeight={500}
					textAlign="center"
					color="brand.purple.100"
					as={"h1"}
				>
					Sign in
				</Heading>
			</CardHeader>

			<CardBody pt="4.19rem" pb="9rem" px={["3rem", "4rem", "7.75rem"]}>
				<FormControl>
					<InputGroup mb="2.25rem">
						<Input
							pl="0.5rem"
							isRequired
							placeholder="Email or username"
							type="text"
							variant={"flushed"}
							id="username"
							focusBorderColor="brand.purple.100"
							onChange={handleInputchange}
						/>
						<InputRightElement color="brand.purple.100">
							<MdEmail />
						</InputRightElement>
					</InputGroup>
					<PasswordInput handleInputchange={handleInputchange} />
				</FormControl>

				<Button
					fontSize="xs"
					bg="brand.purple.100"
					w="full"
					mt="2rem"
					_hover={{ bg: "brand.purple.200" }}
					onClick={handleSubmit}
				>
					Sign in
				</Button>
				<Text mt="0.62rem" fontWeight={400} align="center" fontSize="xs">
					Don’t have an account?{" "}
					<Text as="span" color="brand.purple.100" fontWeight={700}>
						<Link to="/signup">Register</Link>
					</Text>
				</Text>
			</CardBody>
		</Card>
	)
}

export default SignInCard
