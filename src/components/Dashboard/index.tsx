import {
	Box,
	Drawer,
	DrawerContent,
	useDisclosure,
	useToast,
} from "@chakra-ui/react"
import Peer, { MediaConnection } from "peerjs"
import { useLoaderData } from "react-router-dom"
import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react"

import SideBar from "./SideBar"
import DashBoardContent from "./DashboardContent"
import { useSocket } from "../../context/SocketContext"
import { AuthContext, User } from "../../context/AuthContext"

interface AllUsers {
	userData: Array<User>
}
interface UserOnlineResponse {
	message: string
	user_data: User
}

const peer = new Peer()
const TRANSLATE = "translated_text"
const CONNECTED_EVENT = "connected"
const DISCONNECT_EVENT = "disconnected"
const USER_ONLINE_EVENT = "user_online"
const SEND_AUDIO_CHUNKS = "audio_chunks"

const Dashboard = () => {
	const toast = useToast()
	const { socket } = useSocket()
	const data = useLoaderData() as AllUsers
	const { isOpen, onOpen, onClose } = useDisclosure()

	const { user } = useContext(AuthContext)
	const [, setIsconnectionOpen] = useState(false)
	const [callOngoing, setCallOngoing] = useState(false)
	const [callIncoming, setCallIncoming] = useState(false)
	const [allUsers, setAllUsers] = useState(data?.userData)
	const [translatedText, setTranslatedText] = useState("")
	const [remoteCallerName, setRemoteCallerName] = useState("")
	const [currentUser, setCurrentUser] = useState<User>(data.userData[0])
	const [callInstance, setCallInstance] = useState<
		MediaConnection | undefined
	>()

	const intervalRef = useRef<number>()
	const mediaRecorderRef = useRef<MediaRecorder>()
	const boxRef = useRef<HTMLDivElement | null>(null)
	const audioRef = useRef<HTMLAudioElement | null>(null)

	useLayoutEffect(() => {
		if (!socket) return

		socket.on(CONNECTED_EVENT, onConnect)
		socket.on(DISCONNECT_EVENT, onDisconnect)
		socket.on(USER_ONLINE_EVENT, handleUserOnline)
		socket.on(TRANSLATE, onTranslate)

		return () => {
			socket.off(CONNECTED_EVENT, onConnect)
			socket.off(DISCONNECT_EVENT, onDisconnect)
			socket.off(USER_ONLINE_EVENT, handleUserOnline)
			socket.off(TRANSLATE, onTranslate)
		}
	}, [socket])

	useEffect(() => {
		peer.on("open", (id) => {
			setIsconnectionOpen(true)

			if (socket) {
				socket.emit("peer_id", id)
				console.log("notify server that this user is online")
			}
		})

		peer.on("call", (call) => {
			if (!callOngoing) {
				onOpen()
				console.log(call.metadata.username)
				setRemoteCallerName(call.metadata.username)
				setCallInstance(call)
				setCallIncoming(true)
				call.on("stream", function (remoteStream) {
					setCallOngoing(true)
					setCallIncoming(false)
					uploadStreamToTranslate(remoteStream)
					if (audioRef.current) {
						audioRef.current.srcObject = remoteStream
					} else {
						console.log("error")
					}
				})
			}
		})

		peer.on("error", (error) => {
			setIsconnectionOpen(peer.open)
			console.log("peer connection error", error)
			try {
				if (peer.disconnected) {
					peer.reconnect()
				}
			} catch (error) {
				console.log(error)
				setIsconnectionOpen(peer.open)
			}
		})

		return () => {
			peer.removeListener("call")
			peer.removeListener("open")
			peer.removeListener("error")
		}
	}, [])

	const handleUserClick = (data: User) => {
		setCurrentUser(data)
		onOpen()
	}

	const onConnect = () => {
		// setIsSocketConnected(true)
		console.log("connected")
	}

	const onDisconnect = () => {
		// setIsSocketDisconnected(false)
		console.log("disconnected")
	}

	const onTranslate = (response: string) => {
		console.log(response)
		setTranslatedText(response)
	}

	const handleUserOnline = (res: UserOnlineResponse) => {
		console.log(res.user_data)
		const filteredData = allUsers.map((user) => {
			if (user.id === res.user_data.id) {
				return {
					...user,
					peer_id: res.user_data.peer_id,
					is_online: res.user_data.is_online,
				}
			} else {
				return user
			}
		})

		setAllUsers(filteredData)

		toast({
			title: `${res.message}`,
			status: "success",
			isClosable: true,
			duration: 3000,
			position: "bottom-right",
			variant: "solid",
		})
	}

	const uploadStreamToTranslate = (stream: MediaStream) => {
		try {
			mediaRecorderRef.current = new MediaRecorder(stream)
			mediaRecorderRef.current.start()

			intervalRef.current = setInterval(() => {
				mediaRecorderRef.current?.stop()
				mediaRecorderRef.current?.start()
			}, 30000)

			mediaRecorderRef.current.ondataavailable = (event) => {
				if (event.data.size > 0 && socket?.connected) {
					console.log(0, event.data)
					const blob = new Blob([event.data], { type: "audio/webm" })
					socket.emit(SEND_AUDIO_CHUNKS, blob, user)
				}
			}
		} catch (error) {
			console.log("Media Recording Error:", error)
		}
	}

	return (
		<Box minH="100vh">
			<audio autoPlay={true} ref={audioRef} />
			<SideBar
				users={allUsers}
				handleClick={handleUserClick}
				selected_user={currentUser}
			/>
			<DashBoardContent
				display={{ base: "none", md: "block" }}
				peer={peer}
				onClose={onClose}
				data={currentUser}
				audioRef={audioRef}
				callOngoing={callOngoing}
				intervalRef={intervalRef}
				callIncoming={callIncoming}
				callInstance={callInstance}
				setCallOngoing={setCallOngoing}
				translatedText={translatedText}
				setCallInstance={setCallInstance}
				remoteCallerName={remoteCallerName}
				uploadStreamToTranslate={uploadStreamToTranslate}
			/>
			<Box ref={boxRef} display={{ base: "block", md: "none" }}>
				<Drawer
					isOpen={isOpen}
					placement="right"
					onClose={onClose}
					returnFocusOnClose={false}
					onOverlayClick={onClose}
					size="full"
					portalProps={{
						containerRef: boxRef,
					}}
				>
					<DrawerContent>
						<DashBoardContent
							peer={peer}
							onClose={onClose}
							data={currentUser}
							audioRef={audioRef}
							callOngoing={callOngoing}
							intervalRef={intervalRef}
							callIncoming={callIncoming}
							callInstance={callInstance}
							setCallOngoing={setCallOngoing}
							translatedText={translatedText}
							setCallInstance={setCallInstance}
							remoteCallerName={remoteCallerName}
							uploadStreamToTranslate={uploadStreamToTranslate}
						/>
					</DrawerContent>
				</Drawer>
			</Box>
		</Box>
	)
}

export default Dashboard
