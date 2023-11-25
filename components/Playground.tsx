import { Badge, Button, HStack, Input, Text } from "@chakra-ui/react"
import { MediaConnection } from "peerjs"
import { useEffect, useRef, useState } from "react"
import { usePeer } from "../src/context/PeerContext"

const Playground = () => {
	const [callOngoing, setCallOngoing] = useState(false)
	const [callInstance, setCallInstance] = useState<
		MediaConnection | undefined
	>()
	const [remotePeerIdValue, setRemotePeerIdValue] = useState("")

	const { peer, peerId, isConnectionOpen } = usePeer()
	const audioRef = useRef<HTMLAudioElement | null>(null)

	const callChunks = useRef<Blob[]>([])
	const mediaRecorderRef = useRef<MediaRecorder>()
	const intervalRef = useRef<number>()

	useEffect(() => {
		peer.on("call", async (call) => {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					audio: true,
				})
				// display incoming call screen
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

	const upload = (stream: MediaStream) => {
		mediaRecorderRef.current = new MediaRecorder(stream)
		mediaRecorderRef.current.ondataavailable = (event) => {
			console.log(callChunks)

			if (event.data.size > 0) {
				callChunks.current.push(event.data)
			}
		}
		mediaRecorderRef.current.start(5000)

		intervalRef.current = setInterval(uploadChunks, 5000)

		function uploadChunks() {
			if (callChunks.current.length === 0) return

			const blob = new Blob(callChunks.current, { type: "audio/mp4" })
			callChunks.current = []
		}
	}

	const call = (remotePeerId: string) => async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
			})

			if (peer) {
				const call = peer.call(remotePeerId, stream)
				setCallInstance(call)
				// display outgoing call stream
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
			<p>your peer ID: {peerId}</p>
			<HStack mt="0.5rem">
				<Text>peer connection:</Text>
				<Badge colorScheme={peer.open ? "green" : "red"}>
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
