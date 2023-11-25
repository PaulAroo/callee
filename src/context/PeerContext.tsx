import Peer from "peerjs"
import { createContext, useContext, useEffect, useState } from "react"
import { useSocket } from "./SocketContext"

interface PeerContextInterface {
	peer: Peer
	peerId: string | null
	isConnectionOpen: boolean
}

const PeerContext = createContext<PeerContextInterface>({
	peer: new Peer(),
	peerId: null,
	isConnectionOpen: false,
})

const usePeer = () => useContext(PeerContext)

const PeerProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { socket } = useSocket()
	const { peer, isConnectionOpen: isOpen } = usePeer()
	const [peerId, setPeerId] = useState("")
	const [isConnectionOpen, setIsconnectionOpen] = useState(isOpen)

	useEffect(() => {
		peer.on("open", (id) => {
			setPeerId(id)
			setIsconnectionOpen(true)

			if (socket) {
				socket.emit("peer_id", { peerId }, (response: any) => {
					console.log(response)
				})
			}
		})
	}, [])

	useEffect(() => {
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
	}, [])

	return (
		<PeerContext.Provider value={{ peer, peerId: peerId, isConnectionOpen }}>
			{children}
		</PeerContext.Provider>
	)
}

export { PeerProvider, usePeer }
