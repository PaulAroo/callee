import { Box, BoxProps } from "@chakra-ui/react"
import DashboardHeader from "./DashboardHeader"
import { User } from "../../src/context/AuthContext"

interface DashBoardContentProps extends BoxProps {
	data: User
}

const DashBoardContent = ({ data }: DashBoardContentProps) => {
	return (
		<Box ml={{ base: 0, md: "18rem", lg: "20rem", xl: "30rem" }}>
			<DashboardHeader
				online={data.is_online}
				peer_id={data.peer_id}
				name={data.username}
				onCall={() => {}}
			/>
		</Box>
	)
}

export default DashBoardContent
