import { Box, BoxProps } from "@chakra-ui/react"
import DashboardNav from "./DashboardNav"
import { User } from "../../src/context/AuthContext"

interface DashBoardContentProps extends BoxProps {
	data: User
}

const DashBoardContent = ({ data }: DashBoardContentProps) => {
	return (
		<Box ml={{ base: 0, md: "18rem", lg: "20rem", xl: "30rem" }}>
			<DashboardNav
				online={data.is_online}
				name={data.username}
				onCall={() => {}}
			/>
		</Box>
	)
}

export default DashBoardContent
