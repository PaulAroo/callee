import { MdEmail } from "react-icons/md"
import { IoMdPerson } from "react-icons/io"

import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	Select,
	Text,
} from "@chakra-ui/react"
import PasswordInput from "./PasswordInput"
import { Link } from "react-router-dom"
import { ChangeEvent, FormEvent } from "react"
import BrandLogoIcon from "./BrandLogoIcon"
import BrandLogoText from "./BrandLogoText"

function SignUpCard({
	handleInputchange,
	handleSelectchange,
	handleSubmit,
	busy,
}: {
	busy: boolean
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void
	handleInputchange: (e: ChangeEvent<HTMLInputElement>) => void
	handleSelectchange: (e: ChangeEvent<HTMLSelectElement>) => void
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
					Register
				</Heading>
			</CardHeader>

			<CardBody pt="4.19rem" pb="6rem" px={["3rem", "4rem", "7.75rem"]}>
				<form onSubmit={handleSubmit}>
					<InputGroup mb="2.25rem">
						<Input
							pl="0.5rem"
							isRequired
							id="email"
							type="email"
							placeholder="Email"
							variant={"flushed"}
							focusBorderColor="brand.purple.100"
							onChange={handleInputchange}
						/>
						<InputRightElement color="brand.purple.100">
							<MdEmail />
						</InputRightElement>
					</InputGroup>
					<InputGroup mb="2.25rem">
						<Input
							pl="0.5rem"
							isRequired
							placeholder="Username"
							type="text"
							variant={"flushed"}
							id="username"
							focusBorderColor="brand.purple.100"
							onChange={handleInputchange}
						/>
						<InputRightElement color="brand.purple.100">
							<IoMdPerson />
						</InputRightElement>
					</InputGroup>
					<PasswordInput handleInputchange={handleInputchange} />
					<Select
						id="language"
						colorScheme="gray"
						mt="2.25rem"
						focusBorderColor="brand.purple.100"
						variant="flushed"
						placeholder="Select preferred language"
						onChange={handleSelectchange}
					>
						<option value="english">English</option>
						<option value="french">French</option>
						<option value="german">German</option>
					</Select>
					<Button
						type="submit"
						fontSize="xs"
						bg="brand.purple.100 "
						w="full"
						mt="2rem"
						_hover={{ bg: "brand.purple.200" }}
						isLoading={busy}
					>
						Register
					</Button>
				</form>

				<Text mt="0.62rem" fontWeight={400} align="center" fontSize="xs">
					Don’t have an account?{" "}
					<Text as="span" color="brand.purple.100" fontWeight={700}>
						<Link to="/login">Sign in</Link>
					</Text>
				</Text>
			</CardBody>

			<CardFooter
				fontSize="3rem"
				gap="0.46rem"
				alignItems="center"
				justifyContent="center"
			>
				<BrandLogoIcon />
				<Link to="/">
					<BrandLogoText />
				</Link>
			</CardFooter>
		</Card>
	)
}

export default SignUpCard
