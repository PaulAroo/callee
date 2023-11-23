"use client"

import { MdEmail } from "react-icons/md"

import {
	Card,
	CardBody,
	CardHeader,
	FormControl,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputRightAddon,
	InputRightElement,
} from "@chakra-ui/react"
import React from "react"
import PasswordInput from "./Password"

function SignInCard() {
	return (
		<Card
			w="full"
			variant="outline"
			bg="brand.body"
			color="white"
			maxWidth="33.6875rem"
		>
			<CardHeader>
				<Heading textAlign="center" color="brand.purple" as={"h1"}>
					Sign in
				</Heading>
			</CardHeader>

			<CardBody>
				<FormControl>
					<InputGroup>
						<Input
							placeholder="Email or username"
							type="text"
							variant={"flushed"}
						/>
						<InputRightElement color={"brand.purple"}>
							<MdEmail />
						</InputRightElement>
					</InputGroup>
					<PasswordInput />
				</FormControl>
			</CardBody>
		</Card>
	)
}

export default SignInCard
