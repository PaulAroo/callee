import { useContext, useState } from "react"
import Peer, { MediaConnection } from "peerjs"
import { Box, BoxProps } from "@chakra-ui/react"

import DashboardHeader from "./Header"
import CallScreen from "../CallScreen"
import { AuthContext, User } from "../../context/AuthContext"

interface DashBoardContentProps extends BoxProps {
	selected_user: User
	peer: Peer
	uploadStreamToTranslate: (stream: MediaStream) => void
	audioRef: React.MutableRefObject<HTMLAudioElement | null>
	intervalRef: React.MutableRefObject<number | undefined>
	callIncoming: boolean
	remoteCallerName: string
	callOngoing: boolean
	setCallOngoing: React.Dispatch<React.SetStateAction<boolean>>
	setCallInstance: React.Dispatch<
		React.SetStateAction<MediaConnection | undefined>
	>
	callInstance: MediaConnection | undefined
	translatedText: string
	onClose: () => void
}

const DashBoardContent = ({
	selected_user,
	intervalRef,
	audioRef,
	uploadStreamToTranslate,
	peer,
	callIncoming,
	remoteCallerName,
	setCallOngoing,
	callInstance,
	setCallInstance,
	callOngoing,
	translatedText,
	onClose,
	...rest
}: DashBoardContentProps) => {
	const { user } = useContext(AuthContext)
	const [callOutgoing, setCallOutgoing] = useState(false)
	const [callerName, setCallerName] = useState(remoteCallerName)

	const call = (remotePeerId: string) => {
		if (!remotePeerId) return
		return async () => {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					audio: true,
				})

				const call = peer.call(remotePeerId, stream, {
					metadata: {
						username: user?.username,
					},
				})

				setCallInstance(call)
				setCallerName(selected_user.username)
				setCallOutgoing(true)

				call.on("stream", (remoteStream) => {
					setCallOngoing(true)
					setCallOutgoing(false)
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
					setCallInstance(undefined)
				})
			} catch (error) {
				console.log(error)
			}
		}
	}

	const handleHangUp = () => {
		if (callInstance) {
			callInstance.close()
			// setShowCallScreen(false)
			setCallOngoing(false)
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
				callInstance.on("close", () => {
					setCallOngoing(false)
					setCallerName(callInstance.metadata.username)
					stream.getTracks().forEach((track) => {
						track.stop()
					})
					clearInterval(intervalRef.current)
					setCallInstance(undefined)
				})
			} catch (error) {
				console.log(error)
			}
		}
	}

	const renderContent = () => {
		if (callInstance) {
			const variant = callOngoing
				? "ongoing"
				: callIncoming
				  ? "incoming"
				  : callOutgoing
				    ? "outgoing"
				    : ""

			return (
				<CallScreen
					handlePickup={handlePickup}
					handleHangUp={handleHangUp}
					variant={variant}
					remoteCallerName={callerName}
					translatedText={translatedText}
				/>
			)
		} else {
			return (
				<DashboardHeader
					online={selected_user.is_online}
					peer_id={selected_user.peer_id}
					name={selected_user.username}
					onCall={call(selected_user.peer_id)}
					onClose={onClose}
				/>
			)
		}
	}

	return (
		<Box
			ml={{ base: 0, md: "18rem", lg: "20rem", xl: "30rem" }}
			overflow="auto"
			{...rest}
		>
			{renderContent()}
		</Box>
	)
}

export default DashBoardContent
