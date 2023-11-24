import { Badge, Button, HStack, Input, Text } from "@chakra-ui/react"
import Peer, { MediaConnection } from "peerjs"
import { useEffect, useRef, useState } from "react"

const Playground = () => {
	const [peerId, setPeerId] = useState("")
	const [callOngoing, setCallOngoing] = useState(false)
	const [callInstance, setCallInstance] = useState<
		MediaConnection | undefined
	>()
	const [remotePeerIdValue, setRemotePeerIdValue] = useState("")

	const peerInstance = useRef<Peer>(new Peer()).current
	const audioRef = useRef<HTMLAudioElement | null>(null)

	useEffect(() => {
		peerInstance.on("open", (id) => {
			console.log("established")
			setPeerId(id)
		})

		peerInstance.on("error", (error) => {
			console.log("peer connection error", error)
			peerInstance.reconnect()
		})

		peerInstance.on("call", async (call) => {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					audio: true,
				})
				call.answer(stream)
				call.on("stream", function (remoteStream) {
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
			} catch (error) {
				console.log(error)
			}
		})
	}, [])

	const hangUp = () => {
		if (callInstance) {
			callInstance.close()
			setCallInstance(undefined)
		}
	}

	const call = (remotePeerId: string) => async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
			})

			if (peerInstance) {
				const call = peerInstance.call(remotePeerId, stream)

				setCallInstance(call)
				call.on("stream", (remoteStream) => {
					setCallOngoing(true)
					if (audioRef.current) {
						audioRef.current.srcObject = remoteStream
						audioRef.current.play()
					}
				})
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div>
			<p>peer ID: {peerId}</p>
			<HStack mt="0.5rem">
				<Text>peer connection:</Text>
				<Badge colorScheme={peerInstance.open ? "green" : "red"}>
					{peerInstance.open ? "open" : "closed"}
				</Badge>
			</HStack>
			<HStack my="1rem">
				<Input
					placeholder="remote peer id"
					size="md"
					onChange={(e) => setRemotePeerIdValue(e.target.value)}
					width={"fit-content"}
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
			<audio controls ref={audioRef}></audio>
			{callOngoing && <Text>call ongoing</Text>}
			<Button
				my="1rem"
				isDisabled={!callOngoing}
				colorScheme="brand.purple"
				size={"sm"}
				variant={"outline"}
				onClick={hangUp}
			>
				hang up
			</Button>
		</div>
	)
}

export default Playground
