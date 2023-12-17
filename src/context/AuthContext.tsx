import { redirect } from "react-router-dom"
import { ReactNode, createContext, useEffect, useReducer } from "react"

export interface User {
	username: string
	id: string
	phone_number: string | null
	profile_pic: string | null
	token: string
	is_online: boolean
	peer_id: string
}

export enum AUTH_ACTION_TYPE {
	LOGIN_START = "LOGIN_START",
	LOGIN_SUCCESS = "LOGIN_SUCCESS",
	LOGIN_FAILURE = "LOGIN_FAILURE",
	LOGOUT = "LOGOUT",
}

interface AuthState {
	user: User | null
	loading: boolean
	error: string | null
}

type Action =
	| { type: AUTH_ACTION_TYPE.LOGIN_START }
	| { type: AUTH_ACTION_TYPE.LOGIN_SUCCESS; payload: User }
	| { type: AUTH_ACTION_TYPE.LOGIN_FAILURE; payload: string }
	| { type: AUTH_ACTION_TYPE.LOGOUT }

const INITIAL_STATE: AuthState = {
	user: JSON.parse(localStorage.getItem("user")!) || null,
	loading: false,
	error: null,
}

type ContextState = AuthState & {
	dispatch: React.Dispatch<Action>
}

export const AuthContext = createContext<ContextState>({
	...INITIAL_STATE,
	dispatch: () => {},
})

const AuthReducer = (state: AuthState, action: Action) => {
	switch (action.type) {
		case "LOGIN_START":
			return {
				user: null,
				loading: true,
				error: null,
			}
		case "LOGIN_SUCCESS":
			return {
				user: action.payload,
				loading: false,
				error: null,
			}
		case "LOGIN_FAILURE":
			return {
				user: null,
				loading: false,
				error: action.payload,
			}
		case "LOGOUT":
			return {
				user: null,
				loading: false,
				error: null,
			}
		default:
			return state
	}
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(state.user))
	}, [state.user])

	if (!state.user) {
		redirect("/login")
	}

	return (
		<AuthContext.Provider
			value={{
				user: state.user,
				loading: state.loading,
				error: state.error,
				dispatch,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
