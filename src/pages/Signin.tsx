import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { ChangeEvent, FormEvent, useContext, useState } from "react"

import axios from "../axios"
import { motion } from "framer-motion"
import { LocalStorage } from "../utils"
import SignInCard from "../components/SignInCard"
import { SimpleGrid, useToast } from "@chakra-ui/react"
import { AuthContext, AUTH_ACTION_TYPE } from "../context/AuthContext"

export type SignInInputs = {
	username: string
	password: string
}

function SignInPage() {
	const toast = useToast()
	const navigate = useNavigate()
	const { dispatch, loading } = useContext(AuthContext)
	const [data, setData] = useState<SignInInputs>({
		username: "",
		password: "",
	})

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target
		setData({ ...data, [id]: value })
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		dispatch({ type: AUTH_ACTION_TYPE.LOGIN_START })

		try {
			const res = await axios.post(
				"/auth/login",
				{},
				{
					auth: data,
				}
			)
			LocalStorage.set("user", {
				...res.data.user,
				token: res.data.token,
			})
			dispatch({
				type: AUTH_ACTION_TYPE.LOGIN_SUCCESS,
				payload: {
					...res.data.user,
					token: res.data.token,
				},
			})
			toast({
				title: "Logged in succesfully",
				status: "success",
				isClosable: true,
				duration: 2000,
				position: "top",
				variant: "solid",
			})
			navigate("/dashboard")
		} catch (error) {
			console.log(error)
			console.log((error as AxiosError).message)
			toast({
				title: "Error logging in",
				description: "Verify inputs or check network connection",
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
				<SignInCard
					busy={loading}
					handleInputchange={handleInputChange}
					handleSubmit={handleSubmit}
				/>
			</SimpleGrid>
		</motion.div>
	)
}

export default SignInPage
