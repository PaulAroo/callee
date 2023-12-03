import Peer, { MediaConnection } from "peerjs"
import { Box, BoxProps } from "@chakra-ui/react"

import DashboardHeader from "./DashboardHeader"
import { User } from "../../context/AuthContext"
import { useState } from "react"
import CallScreen from "../CallScreen"

interface DashBoardContentProps extends BoxProps {
	data: User
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
	data,
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
	const [callOutgoing, setCallOutgoing] = useState(false)
	const [callerName, setCallerName] = useState(remoteCallerName)

	const call = (remotePeerId: string) => {
		if (!remotePeerId) return
		return async () => {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					audio: true,
				})

				if (peer) {
					const call = peer.call(remotePeerId, stream, {
						metadata: {
							username: data.username,
						},
					})
					setCallInstance(call)
					setCallerName(data.username)
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
				}
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
					setCallInstance(undefined)
					setCallOngoing(false)
					setCallerName(callInstance.metadata.username)
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
					online={data.is_online}
					peer_id={data.peer_id}
					name={data.username}
					onCall={call(data.peer_id)}
					onClose={onClose}
				/>
			)
		}
	}

	return (
		<Box ml={{ base: 0, md: "18rem", lg: "20rem", xl: "30rem" }} {...rest}>
			{renderContent()}
		</Box>
	)
}

export default DashBoardContent