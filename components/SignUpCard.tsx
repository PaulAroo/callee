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

function SignUpCard() {
	return (
		<Card
			borderColor="brand.purple"
			borderWidth="5px"
			w="full"
			variant="outline"
			maxWidth="33.6875rem"
			borderRadius="0.5625rem"
		>
			<CardHeader p="0" pt="6.56rem">
				<Heading
					fontWeight={500}
					textAlign="center"
					color="brand.purple"
					as={"h1"}
				>
					Register
				</Heading>
			</CardHeader>

			<CardBody pt="4.19rem" pb="11.94rem" px="7.75rem">
				<FormControl>
					<InputGroup mb="2.25rem">
						<Input
							placeholder="Email or username"
							type="text"
							variant={"flushed"}
							id="username"
						/>
						<InputRightElement color="brand.purple">
							<MdEmail />
						</InputRightElement>
					</InputGroup>
					<PasswordInput />
				</FormControl>

				<Button fontSize="xs" bg="brand.purple" w="full" mt="2rem">
					Sign in
				</Button>
				<Text mt="0.62rem" fontWeight={400} align="center" fontSize="xs">
					Don’t have an account?{" "}
					<Text as="span" color="brand.purple" fontWeight={700}>
						<Link to="/signup">Sign in</Link>
					</Text>
				</Text>
			</CardBody>
		</Card>
	)
}

export default SignUpCard
