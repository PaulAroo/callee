import {
	Badge,
	Box,
	Button,
	HStack,
	Input,
	Text,
	VStack,
} from "@chakra-ui/react"
import { MediaConnection } from "peerjs"
import { useContext, useEffect, useState } from "react"
import { usePeer } from "../src/context/PeerContext"
import { AuthContext } from "../src/context/AuthContext"
import CallScreen from "./CallScreen"
import { useSocket } from "../src/context/SocketContext"

const CONNECTED_EVENT = "connected"
const DISCONNECT_EVENT = "disconnected"
const USER_ONLINE_EVENT = "user_online"

const Playground = () => {
	const { socket } = useSocket()
	const { user } = useContext(AuthContext)
	const { peer, peerId, isConnectionOpen, audioRef } = usePeer()

	const [callOngoing, setCallOngoing] = useState(false)
	const [callInstance, setCallInstance] = useState<
		MediaConnection | undefined
	>()
	const [remotePeerIdValue, setRemotePeerIdValue] = useState("")
	const [showCallScreen, setShowCallScreen] = useState(false)
	const [remoteMetaData, setRemoteMetaData] = useState<any>()

	const [, setIsSocketConnected] = useState(false)
	const [, setIsSocketDisconnected] = useState(false)

	// const callChunks = useRef<Blob[]>([])
	// const mediaRecorderRef = useRef<MediaRecorder>()
	// const intervalRef = useRef<number>()

	// const localCallStreamRef = useRef<MediaStream>()

	useEffect(() => {
		peer.on("call", (call) => {
			if (!callOngoing) {
				// const stream = await navigator.mediaDevices.getUserMedia({
				// 	audio: true,
				// })
				// localCallStreamRef.current = stream
				setRemoteMetaData(call.metadata)
				setCallInstance(call)
				setShowCallScreen(true)
				call.on("stream", function (remoteStream) {
					setCallOngoing(true)
					if (audioRef.current) {
						audioRef.current.srcObject = remoteStream
						audioRef.current.autoplay = true
					} else {
						console.log("error")
					}
				})
				call.on("close", () => {
					setCallOngoing(false)
				})
			}
		})

		if (socket) {
		}

		return () => {
			peer.removeListener("call")
		}
	}, [])

	useEffect(() => {
		if (!socket) return

		// Set up event listeners for various socket events:
		socket.on(CONNECTED_EVENT, onConnect)
		socket.on(DISCONNECT_EVENT, onDisconnect)
		socket.on(USER_ONLINE_EVENT, handleUserOnline)

		return () => {
			socket.off(CONNECTED_EVENT, onConnect)
			socket.off(DISCONNECT_EVENT, onDisconnect)
			socket.off(USER_ONLINE_EVENT, handleUserOnline)
		}
	}, [socket])

	const onConnect = () => {
		setIsSocketConnected(true)
		console.log(6, "connected")
	}

	const onDisconnect = () => {
		setIsSocketDisconnected(false)
		console.log(7, "disconnected")
	}

	const handleUserOnline = (res: { message: string; user_id: string }) => {
		console.log(res)
	}

	const handleHangUp = () => {
		if (callInstance) {
			callInstance.close()
			setShowCallScreen(false)
			setCallInstance(undefined)
		}
	}

	const handlePickup = async () => {
		if (callInstance) {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					audio: true,
				})
				callInstance.answer(stream)
				setShowCallScreen(false)
			} catch (error) {
				console.log(error)
			}
		}
	}

	// const upload = (stream: MediaStream) => {
	// 	mediaRecorderRef.current = new MediaRecorder(stream)
	// 	mediaRecorderRef.current.ondataavailable = (event) => {
	// 		console.log(callChunks)

	// 		if (event.data.size > 0) {
	// 			callChunks.current.push(event.data)
	// 		}
	// 	}
	// 	mediaRecorderRef.current.start(5000)

	// 	intervalRef.current = setInterval(uploadChunks, 5000)

	// 	function uploadChunks() {
	// 		if (callChunks.current.length === 0) return

	// 		const blob = new Blob(callChunks.current, { type: "audio/mp4" })
	// 		callChunks.current = []
	// 	}
	// }

	const call = (remotePeerId: string) => async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
			})

			if (peer) {
				const call = peer.call(remotePeerId, stream, {
					metadata: {
						username: user?.username,
					},
				})
				setCallInstance(call)
				// display outgoing call stream
				call.on("stream", (remoteStream) => {
					setCallOngoing(true)
					if (audioRef.current) {
						audioRef.current.srcObject = remoteStream
						audioRef.current.play()
					}
				})
				call.on("close", () => {
					setCallOngoing(false)
				})
			}
		} catch (error) {
			console.log(error)
		}
	}

	const remoteCallerName = !!remoteMetaData ? remoteMetaData.username : ""

	if (showCallScreen) {
		return (
			<CallScreen
				handlePickup={handlePickup}
				handleHangUp={handleHangUp}
				variant="incoming"
				remoteCallerName={remoteCallerName}
			/>
		)
	}

	if (callOngoing) {
		return (
			<VStack p={4} align="flex-start">
				<Text>
					call ongoing {remoteCallerName ? `with ${remoteCallerName}` : ""}{" "}
				</Text>
				<Button
					my="1rem"
					isDisabled={!callOngoing}
					colorScheme="brand.purple"
					size={"sm"}
					variant={"outline"}
					onClick={handleHangUp}
				>
					hang up
				</Button>
			</VStack>
		)
	}

	return (
		<Box p={4}>
			<p>your peer ID: {peerId}</p>
			<HStack mt="0.5rem">
				<Text>peer connection:</Text>
				<Badge colorScheme={isConnectionOpen ? "green" : "red"}>
					{isConnectionOpen ? "open" : "closed"}
				</Badge>
			</HStack>
			<HStack my="1rem">
				<Input
					placeholder="enter the peer id of who you would like to call"
					size="md"
					onChange={(e) => setRemotePeerIdValue(e.target.value)}
					maxW="25rem"
					value={remotePeerIdValue}
					variant="outline"
				/>
				<Button
					isDisabled={!remotePeerIdValue}
					colorScheme="brand.purple"
					size={"md"}
					variant={"outline"}
					onClick={call(remotePeerIdValue)}
				>
					call
				</Button>
			</HStack>
			{/* <Button
				my="1rem"
				isDisabled={!callOngoing}
				colorScheme="brand.purple"
				size={"sm"}
				variant={"outline"}
				onClick={hangUp}
			>
				hang up
			</Button> */}
		</Box>
	)
}

export default Playground
