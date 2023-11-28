import { useState } from "react"
import { Box } from "@chakra-ui/react"
import { useLoaderData } from "react-router-dom"

import SideBar from "./SideBar"
import DashBoardContent from "./DashboardContent"
import { User } from "../../src/context/AuthContext"

interface ALL_USER_DATA {
	userData: Array<User>
}

const DashboardCopy = () => {
	const data = useLoaderData()
	const { userData } = data as ALL_USER_DATA

	const [allUsers] = useState(userData)
	const [currentUser, setCurrentUser] = useState<User>(userData[0])

	const handleClick = (data: User) => {
		setCurrentUser(data)
	}

	return (
		<Box minH="100vh">
			<SideBar
				users={allUsers}
				selected_user={currentUser}
				handleClick={handleClick}
			/>
			<DashBoardContent data={currentUser} />
		</Box>
	)
}

export default DashboardCopy
