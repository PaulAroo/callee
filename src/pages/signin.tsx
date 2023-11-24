import { SimpleGrid, useToast } from "@chakra-ui/react"
import SignInCard from "../../components/SignInCard"
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import axios, { AxiosError } from "axios"
import { useLoaderData, useNavigate } from "react-router-dom"
import { AuthContext, AUTH_ACTION_TYPE, User } from "../context/AuthContext"

export type SignInInputs = {
	username: string
	password: string
}

interface U {
	user: User
}

function SignInPage() {
	const toast = useToast()
	const loaderData = useLoaderData() as U
	const navigate = useNavigate()
	const { dispatch, loading } = useContext(AuthContext)
	const [data, setData] = useState<SignInInputs>({
		username: "",
		password: "",
	})

	if (loaderData.user) {
		navigate("/")
	}

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target
		setData({ ...data, [id]: value })
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		dispatch({ type: AUTH_ACTION_TYPE.LOGIN_START })

		try {
			const res = await axios.post("/auth/login", data)
			dispatch({ type: AUTH_ACTION_TYPE.LOGIN_SUCCESS, payload: res.data.body })
			toast({
				title: "Logged in succesfully",
				status: "success",
				isClosable: true,
				duration: 2000,
				position: "top",
				variant: "subtle",
			})
			navigate("/")
		} catch (error) {
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
		<SimpleGrid w="full" h="100vh" placeItems="center">
			<SignInCard
				busy={loading}
				handleInputchange={handleInputChange}
				handleSubmit={handleSubmit}
			/>
		</SimpleGrid>
	)
}

export default SignInPage
