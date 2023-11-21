"use client"

import { Button, Input, VStack } from "@chakra-ui/react"
import Peer from "peerjs"
import { useEffect, useRef, useState } from "react"

// console.log(navigator.mediaDevices)

const peer = new Peer()

const Playground = () => {
	const [peerId, setPeerId] = useState("")
	const [remotePeerIdValue, setRemotePeerIdValue] = useState("")

	const peerInstance = useRef<Peer | null>(null)
	const audioRef = useRef<HTMLAudioElement | null>(null)

	useEffect(() => {
		peer.on("open", (id) => {
			setPeerId(id)
		})

		peer.on("call", async (call) => {
			call.on("stream", function (remoteStream) {
				if (audioRef.current) {
					audioRef.current.srcObject = remoteStream
				} else {
					console.log("error")
				}
			})
		})

		peerInstance.current = peer
	}, [])

	const call = (remotePeerId: string) => async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
			})

			if (peerInstance.current) {
				const call = peerInstance.current.call(remotePeerId, stream)
				call.on("stream", (remoteStream) => {
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
			playground
			<p>peer ID: {peerId}</p>
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
				colorScheme="blue"
				size={"sm"}
				variant={"outline"}
				onClick={call(remotePeerIdValue)}
			>
				call
			</Button>
			<audio ref={audioRef}></audio>
		</div>
	)
}

export default Playground
