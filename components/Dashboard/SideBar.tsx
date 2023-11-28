import {
	Avatar,
	Box,
	BoxProps,
	Flex,
	HStack,
	Heading,
	IconButton,
	SimpleGrid,
} from "@chakra-ui/react"
import { RxDotsVertical } from "react-icons/rx"
import { TbMessagePlus } from "react-icons/tb"
import SideBarItem, { SideBarItemData } from "./SideBarItem"
import { User } from "../../src/context/AuthContext"

interface SidebarProps extends BoxProps {
	handleClick: (data: User) => void
	users: User[]
}

const LinkItems: Array<SideBarItemData> = [
	{
		name: "Lara",
		callDetails: {
			duration: "00:10:34",
			incoming: false,
			time: "17:33",
		},
	},
	{
		name: "Cameron",
		callDetails: {
			duration: "01:10:34",
			incoming: true,
			time: "17:33",
		},
	},
]

function SideBar({ handleClick, users }: SidebarProps) {
	return (
		<Box
			transition="3s ease"
			borderRight="1px"
			borderRightColor="brand.darkgrey"
			w={{ base: "full", md: "18rem", lg: "20rem", xl: "30rem" }}
			pos="fixed"
			h="full"
		>
			<Flex
				p="1rem"
				height="4.45763rem"
				alignItems="center"
				justifyContent="space-between"
				bg="brand.dark"
			>
				<Avatar
					sx={{ "--avatar-size": "2.2rem" }}
					size={"var(--avatar-size)"}
					src={""}
				/>
				<HStack>
					<IconButton
						size={"sm"}
						fontSize={"1.33731rem"}
						variant="ghost"
						aria-label="open menu"
						icon={<TbMessagePlus />}
					/>
					<IconButton
						size={"sm"}
						fontSize={"1.33731rem"}
						variant="ghost"
						aria-label="open menu"
						icon={<RxDotsVertical />}
					/>
				</HStack>
			</Flex>
			<SimpleGrid pl="0.5rem" gap="0.56rem">
				<Heading fontSize="1.5rem" fontWeight={400} pl="1.34rem" mt="1rem">
					Recents
				</Heading>
				{users.map((user) => (
					<SideBarItem key={user.id} data={user} handleClick={handleClick} />
				))}
			</SimpleGrid>
		</Box>
	)
}

export default SideBar
