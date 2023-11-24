import { SimpleGrid, useToast } from "@chakra-ui/react"
import SignUpCard from "../../components/SignUpCard"
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { AUTH_ACTION_TYPE, AuthContext, User } from "../context/AuthContext"
import { useLoaderData, useNavigate } from "react-router-dom"
import axios from "../axios"
import { AxiosError } from "axios"

export type SignUpInputs = {
	email: string
	username: string
	password: string
}

interface U {
	user: User
}

function SignUpPage() {
	const toast = useToast()
	const loaderData = useLoaderData() as U
	const navigate = useNavigate()
	const { dispatch, loading } = useContext(AuthContext)
	const [data, setData] = useState<SignUpInputs>({
		email: "",
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
			const res = await axios.post("/auth/signup", data)
			dispatch({ type: AUTH_ACTION_TYPE.LOGIN_SUCCESS, payload: res.data.body })
			toast({
				title: "Signed up succesfully",
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
				title: "Error signing in",
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
			<SignUpCard
				busy={loading}
				handleInputchange={handleInputChange}
				handleSubmit={handleSubmit}
			/>
		</SimpleGrid>
	)
}

export default SignUpPage
