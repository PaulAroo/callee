import {
	Badge,
	Box,
	Button,
	HStack,
	Input,
	Text,
	VStack,
	useToast,
} from "@chakra-ui/react"
import { MediaConnection } from "peerjs"
import { useContext, useEffect, useRef, useState } from "react"
import { usePeer } from "../src/context/PeerContext"
import { AuthContext } from "../src/context/AuthContext"
import CallScreen from "./CallScreen"
import { useSocket } from "../src/context/SocketContext"

const CONNECTED_EVENT = "connected"
const DISCONNECT_EVENT = "disconnected"
const USER_ONLINE_EVENT = "user_online"
const SEND_AUDIO_CHUNKS = "audio_chunks"
const TRANSLATE = "translated_text"

const Playground = () => {
	const toast = useToast()
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
	const [translatedText, setTranslatedText] = useState("")
	const mediaRecorderRef = useRef<MediaRecorder>()
	const intervalRef = useRef<number>()

	useEffect(() => {
		peer.on("call", (call) => {
			if (!callOngoing) {
				setRemoteMetaData(call.metadata)
				setCallInstance(call)
				setShowCallScreen(true)
				call.on("stream", function (remoteStream) {
					setCallOngoing(true)
					uploadStreamToTranslate(remoteStream)
					if (audioRef.current) {
						audioRef.current.srcObject = remoteStream
						audioRef.current.autoplay = true
					} else {
						console.log("error")
					}
				})
			}
		})

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
		socket.on(TRANSLATE, onTranslate)

		return () => {
			socket.off(CONNECTED_EVENT, onConnect)
			socket.off(DISCONNECT_EVENT, onDisconnect)
			socket.off(USER_ONLINE_EVENT, handleUserOnline)
			socket.off(TRANSLATE, onTranslate)
		}
	}, [socket])

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

	const handleUserOnline = (res: any) => {
		console.log(res)
		toast({
			title: `${res.message}`,
			description: `${res.user_data.peer_id}`,
			status: "success",
			isClosable: true,
			duration: 10000,
			position: "top-right",
			variant: "solid",
		})
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
				callInstance.on("close", () => {
					setCallOngoing(false)
					stream.getTracks().forEach((track) => {
						track.stop()
					})
					clearInterval(intervalRef.current)
				})
			} catch (error) {
				console.log(error)
			}
		}
	}

	const uploadStreamToTranslate = (stream: MediaStream) => {
		try {
			mediaRecorderRef.current = new MediaRecorder(stream)
			mediaRecorderRef.current.start()

			intervalRef.current = setInterval(() => {
				console.log("requesting data")
				mediaRecorderRef.current?.requestData()
			}, 5000)

			mediaRecorderRef.current.ondataavailable = (event) => {
				if (event.data.size > 0 && socket?.connected) {
					console.log(0, event.data)
					const blob = new Blob([event.data], { type: "audio/wav" })
					socket.emit(SEND_AUDIO_CHUNKS, blob)
				}
			}
		} catch (error) {
			console.log("Media Recording Error:", error)
		}
	}

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
				// display outgoing call screen
				call.on("stream", (remoteStream) => {
					setCallOngoing(true)
					uploadStreamToTranslate(remoteStream)
					if (audioRef.current) {
						audioRef.current.srcObject = remoteStream
						audioRef.current.play()
					}
				})
				call.on("close", () => {
					setCallOngoing(false)
					stream.getTracks().forEach((track) => {
						track.stop()
					})
					clearInterval(intervalRef.current)
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
				<Text>{translatedText}</Text>
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
		</Box>
	)
}

export default Playground
