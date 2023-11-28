import { Box } from "@chakra-ui/react"
import SideBar from "./SideBar"
import DashBoardContent from "./DashboardContent"
import { useLoaderData } from "react-router-dom"
import { useState } from "react"
import { User } from "../../src/context/AuthContext"

interface ALL_USER_DATA {
	userData: Array<User>
}

const DashboardCopy = () => {
	const data = useLoaderData()
	const { userData } = data as ALL_USER_DATA

	const [allUsers] = useState(userData)
	const [currentUserData, setCurrentUserData] = useState<User>(userData[0])

	const handleClick = (data: User) => {
		setCurrentUserData(data)
	}

	return (
		<Box minH="100vh">
			<SideBar users={allUsers} handleClick={handleClick} />
			<DashBoardContent data={currentUserData} />
		</Box>
	)
}

export default DashboardCopy
