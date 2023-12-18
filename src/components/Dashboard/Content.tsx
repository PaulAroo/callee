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
					variant={variant}
					handlePickup={handlePickup}
					handleHangUp={handleHangUp}
					translatedText={translatedText}
					remoteCallerName={remoteCallerName}
				/>
			)
		} else {
			return (
				<DashboardHeader
					onClose={onClose}
					name={selected_user.username}
					peer_id={selected_user.peer_id}
					online={selected_user.is_online}
					onCall={call(selected_user.peer_id)}
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
