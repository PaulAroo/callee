import { Avatar, Flex, HStack, IconButton, Text } from "@chakra-ui/react"
import { IoMdCall } from "react-icons/io"
import { RxDotsVertical } from "react-icons/rx"

interface DashboardNavProps {
	name: string
	peer_id?: string
	onCall: (peer_id: string) => void
	online: boolean
}

const DashboardNav = ({ name, onCall, peer_id, online }: DashboardNavProps) => {
	const call = () => {
		if (peer_id) {
			onCall(peer_id)
		}
	}
	return (
		<Flex
			// ml={{ base: 0, md: "18rem", lg: "20rem", xl: "30rem" }}
			// display={{ base: "none", md: "flex" }}
			px={{ base: "0.89rem" }}
			height="4.45763rem"
			alignItems="center"
			borderBottomWidth="1px"
			borderBottomColor="brand.darkgrey"
			justifyContent="space-between"
			bg="brand.dark"
		>
			<HStack spacing="0.88rem">
				<Avatar
					sx={{ "--avatar-size": "2.2rem" }}
					size={"var(--avatar-size)"}
					src={""}
				/>
				<Text fontWeight={600}>{name}</Text>
			</HStack>

			<HStack>
				<IconButton
					fontSize={"1.33731rem"}
					variant="outline"
					rounded="full"
					borderWidth="4px"
					borderColor="brand.purple.200"
					aria-label="open menu"
					isDisabled={!online && !peer_id}
					icon={<IoMdCall />}
					mr={{ md: "1.5rem", lg: "3rem", xl: "6rem" }}
					onClick={call}
				/>
				<IconButton
					fontSize={"1.33731rem"}
					variant="ghost"
					aria-label="open menu"
					icon={<RxDotsVertical />}
				/>
			</HStack>
		</Flex>
	)
}

export default DashboardNav
