import { AxiosError } from "axios"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { SimpleGrid, useToast } from "@chakra-ui/react"
import { ChangeEvent, FormEvent, useContext, useState } from "react"

import axios from "../axios"
import SignUpCard from "../components/SignUpCard"
import { AUTH_ACTION_TYPE, AuthContext } from "../context/AuthContext"

export type SignUpInputs = {
	email: string
	username: string
	password: string
	language: string
}

function SignUpPage() {
	const toast = useToast()
	const navigate = useNavigate()
	const { dispatch, loading } = useContext(AuthContext)
	const [data, setData] = useState<SignUpInputs>({
		email: "",
		username: "",
		password: "",
		language: "",
	})

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target
		setData({ ...data, [id]: value })
	}
	const handleSelectchange = (e: ChangeEvent<HTMLSelectElement>) => {
		const { id, value } = e.target
		setData({ ...data, [id]: value })
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			await axios.post("/auth/signup", data)
			toast({
				title: "Registered succesfully",
				status: "success",
				isClosable: true,
				duration: 2000,
				position: "top",
				variant: "solid",
			})
			navigate("/login")
		} catch (error) {
			console.log((error as AxiosError).message)
			toast({
				title: "Registration failed",
				description: (error as AxiosError).message,
				status: "error",
				isClosable: true,
				duration: 3000,
				position: "top",
				variant: "subtle",
			})
			dispatch({
				type: AUTH_ACTION_TYPE.LOGIN_FAILURE,
				payload: (error as AxiosError).message,
			})
		}
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
		>
			<SimpleGrid w="full" h="100vh" placeItems="center">
				<SignUpCard
					busy={loading}
					handleInputchange={handleInputChange}
					handleSubmit={handleSubmit}
					handleSelectchange={handleSelectchange}
				/>
			</SimpleGrid>
		</motion.div>
	)
}

export default SignUpPage
