/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react"
import socketio from "socket.io-client"
import { AuthContext } from "./AuthContext"

const getSocket = (token: string) => {
	console.log(import.meta.env.VITE_SOCKET_URI)
	return socketio(import.meta.env.VITE_SOCKET_URI, {
		autoConnect: false,
		query: {
			token,
		},
	})
}

const SocketContext = createContext<{
	socket: ReturnType<typeof socketio> | null
}>({
	socket: null,
})

const useSocket = () => useContext(SocketContext)

const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { user } = useContext(AuthContext)
	const [socket, setSocket] = useState<ReturnType<typeof socketio> | null>(null)

	useEffect(() => {
		console.log(8, user)
		if (!user) return
		setSocket(getSocket(user.token))
	}, [user])

	return (
		<SocketContext.Provider value={{ socket }}>
			{children}
		</SocketContext.Provider>
	)
}

export { SocketProvider, useSocket }
