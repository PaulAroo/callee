import {
	Avatar,
	Box,
	BoxProps,
	Flex,
	HStack,
	Heading,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	SimpleGrid,
} from "@chakra-ui/react"
import { useContext } from "react"
import SideBarItem from "./SideBarItem"
import { TbMessagePlus } from "react-icons/tb"
import { useNavigate } from "react-router-dom"
import { RxDotsVertical } from "react-icons/rx"
import { AUTH_ACTION_TYPE, AuthContext, User } from "../../context/AuthContext"

interface SidebarProps extends BoxProps {
	users: User[]
	selected_user: User
	handleClick: (data: User) => void
}

function SideBar({ handleClick, selected_user, users }: SidebarProps) {
	const navigate = useNavigate()
	const { dispatch } = useContext(AuthContext)

	const handleLogout = () => {
		dispatch({ type: AUTH_ACTION_TYPE.LOGOUT })
		navigate("/")
	}

	const isSelected = (id: string) => {
		if (selected_user.id === id) return true
		return false
	}

	return (
		<Box
			transition="0.3s ease"
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
				bg="brand.dark.200"
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
					<Menu>
						<MenuButton
							as={IconButton}
							fontSize={"1.33731rem"}
							aria-label="Options"
							icon={<RxDotsVertical />}
							variant="ghost"
						/>
						<MenuList minW="auto" px="0.5rem">
							<MenuItem onClick={handleLogout}>Log out</MenuItem>
						</MenuList>
					</Menu>
				</HStack>
			</Flex>
			<Box>
				<Heading fontSize="1.5rem" fontWeight={400} pl="1.34rem" mt="1rem">
					Users
				</Heading>
				<SimpleGrid
					pl="0.5rem"
					gap="0.56rem"
					overflowY="auto"
					maxH="84vh"
					marginTop="1rem"
				>
					{users.map((user) => (
						<SideBarItem
							selected={isSelected(user.id)}
							key={user.id}
							data={user}
							handleClick={() => handleClick(user)}
						/>
					))}
				</SimpleGrid>
			</Box>
		</Box>
	)
}

export default SideBar
