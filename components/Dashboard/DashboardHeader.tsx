import { Avatar, Flex, HStack, IconButton, Text } from "@chakra-ui/react"
import { IoMdCall } from "react-icons/io"
import { IoArrowBack } from "react-icons/io5"
import { RxDotsVertical } from "react-icons/rx"

interface DashboardHeaderProps {
	name: string
	peer_id: string
	onCall: (() => Promise<void>) | undefined
	online: boolean
	onClose: () => void
}

const DashboardHeader = ({
	name,
	onCall,
	peer_id,
	online,
	onClose,
}: DashboardHeaderProps) => {
	return (
		<Flex
			px={{ base: "0.89rem" }}
			height="4.45763rem"
			alignItems="center"
			borderBottomWidth="1px"
			borderBottomColor="brand.darkgrey"
			justifyContent="space-between"
			bg="brand.dark.200"
		>
			<HStack spacing="0.88rem">
				<IconButton
					fontSize={"1.33731rem"}
					variant="ghost"
					aria-label="open menu"
					icon={<IoArrowBack />}
					display={{ base: "initial", md: "none" }}
					onClick={onClose}
				/>
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
					aria-label="call user"
					isDisabled={!online && !peer_id}
					icon={<IoMdCall />}
					mr={{ md: "1.5rem", lg: "3rem", xl: "6rem" }}
					onClick={onCall}
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

export default DashboardHeader
