import { useContext, useEffect } from "react"
import SidebarWithHeader from "../../components/Sidebar"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

function HomePage() {
	const { user } = useContext(AuthContext)
	const navigate = useNavigate()

	useEffect(() => {
		if (!user) {
			navigate("/login")
		}
	}, [])

	if (!user) return <p>redirecting</p>

	return <SidebarWithHeader />
}

export default HomePage
