import Peer from "peerjs"
import { createContext, useContext, useEffect, useRef, useState } from "react"
import { useSocket } from "./SocketContext"

interface PeerContextInterface {
	peer: Peer
	peerId: string | null
	isConnectionOpen: boolean
	audioRef: React.RefObject<HTMLAudioElement>
}

const PeerContext = createContext<PeerContextInterface>({
	peer: new Peer(),
	peerId: null,
	isConnectionOpen: false,
	audioRef: { current: null },
})

const usePeer = () => useContext(PeerContext)

const PeerProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { socket } = useSocket()
	const { peer, isConnectionOpen: isOpen } = usePeer()
	const [peerId, setPeerId] = useState("")
	const [isConnectionOpen, setIsconnectionOpen] = useState(isOpen)

	const audioRef = useRef<HTMLAudioElement | null>(null)

	useEffect(() => {
		peer.on("open", (id) => {
			setPeerId(id)
			setIsconnectionOpen(true)

			if (socket) {
				socket.emit("peer_id", id)
				console.log(5, "notify server of the peer id")
			}
		})

		peer.on("error", (error) => {
			setIsconnectionOpen(peer.open)
			console.log("peer connection error", error)
			try {
				peer.reconnect()
			} catch (error) {
				console.log(error)
				setIsconnectionOpen(peer.open)
			}
		})
	}, [peer, socket?.connected])

	return (
		<PeerContext.Provider
			value={{ peer, peerId: peerId, isConnectionOpen, audioRef }}
		>
			<audio ref={audioRef} />
			{children}
		</PeerContext.Provider>
	)
}

export { PeerProvider, usePeer }
