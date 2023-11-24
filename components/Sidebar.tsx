import {
	IconButton,
	Avatar,
	Box,
	CloseButton,
	Flex,
	HStack,
	Icon,
	useColorModeValue,
	Text,
	Drawer,
	DrawerContent,
	useDisclosure,
	BoxProps,
	FlexProps,
	Menu,
} from "@chakra-ui/react"
import {
	FiHome,
	FiTrendingUp,
	FiCompass,
	FiStar,
	FiSettings,
} from "react-icons/fi"
import { IconType } from "react-icons"

import Playground from "./Playground"

import { TbMessagePlus } from "react-icons/tb"
import { RxDotsVertical } from "react-icons/rx"
import { FiSearch } from "react-icons/fi"
import { IoMdCall } from "react-icons/io"

interface LinkItemProps {
	name: string
	icon: IconType
}

interface NavItemProps extends FlexProps {
	icon: IconType
	children: React.ReactNode
}

interface MobileProps extends FlexProps {
	onOpen: () => void
	isOpen: boolean
}

interface SidebarProps extends BoxProps {
	onClose: () => void
}

const LinkItems: Array<LinkItemProps> = [
	{ name: "Home", icon: FiHome },
	{ name: "Trending", icon: FiTrendingUp },
	{ name: "Explore", icon: FiCompass },
	{ name: "Favourites", icon: FiStar },
	{ name: "Settings", icon: FiSettings },
]

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
	return (
		<Box
			transition="3s ease"
			borderRight="1px"
			borderRightColor="brand.darkgrey"
			w={{ base: "full", md: "18rem", lg: "20rem", xl: "30rem" }}
			pos="fixed"
			h="full"
			{...rest}
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
					src={
						"https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
					}
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
				<CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
			</Flex>
			{LinkItems.map((link) => (
				<NavItem key={link.name} icon={link.icon}>
					{link.name}
				</NavItem>
			))}
		</Box>
	)
}

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
	return (
		<Box
			as="a"
			href="#"
			style={{ textDecoration: "none" }}
			_focus={{ boxShadow: "none" }}
		>
			<Flex
				align="center"
				p="4"
				mx="4"
				borderRadius="lg"
				role="group"
				cursor="pointer"
				_hover={{
					bg: "cyan.400",
					color: "white",
				}}
				{...rest}
			>
				{icon && (
					<Icon
						mr="4"
						fontSize="16"
						_groupHover={{
							color: "white",
						}}
						as={icon}
					/>
				)}
				{children}
			</Flex>
		</Box>
	)
}

const MobileNav = ({ isOpen, onOpen, ...rest }: MobileProps) => {
	return (
		<Flex
			ml={{ base: 0, md: "18rem", lg: "20rem", xl: "30rem" }}
			px={{ base: "0.89rem" }}
			height="4.45763rem"
			alignItems="center"
			borderBottomWidth="1px"
			borderBottomColor="brand.darkgrey"
			justifyContent="space-between"
			bg="brand.dark"
			{...rest}
		>
			<HStack spacing="0.88rem" fontWeight={600}>
				<Avatar
					sx={{ "--avatar-size": "2.2rem" }}
					size={"var(--avatar-size)"}
					src={
						"https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
					}
				/>
				<Text>Lara Mueller</Text>
			</HStack>

			<HStack>
				<IconButton
					fontSize={"1.33731rem"}
					variant="outline"
					rounded="full"
					borderWidth="4px"
					borderColor="brand.purple.200"
					aria-label="open menu"
					icon={<IoMdCall />}
					mr={{ md: "1.5rem", lg: "3rem", xl: "6rem" }}
				/>
				<IconButton
					fontSize={"1.33731rem"}
					variant="ghost"
					aria-label="open menu"
					icon={<FiSearch />}
				/>
				<Menu>
					<HStack>
						<IconButton
							fontSize={"1.33731rem"}
							variant="ghost"
							aria-label="open menu"
							icon={<RxDotsVertical />}
						/>
						{/* <Box display={{ base: "none", md: "flex" }}>
								<FiChevronDown />
							</Box> */}
					</HStack>
					{/* <MenuList
							bg={useColorModeValue("white", "gray.900")}
							borderColor={useColorModeValue("gray.200", "gray.700")}
						>
							<MenuItem>Profile</MenuItem>
							<MenuItem>Settings</MenuItem>
							<MenuItem>Billing</MenuItem>
							<MenuDivider />
							<MenuItem>Sign out</MenuItem>
						</MenuList> */}
				</Menu>
			</HStack>
		</Flex>
	)
}

const SidebarWithHeader = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
			<SidebarContent
				onClose={() => onClose}
				display={{ base: "none", md: "block" }}
			/>
			<Drawer
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="full"
			>
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
			{/* mobilenav */}
			<MobileNav onOpen={onOpen} isOpen={isOpen} />
			<Box ml={{ base: 0, md: "18rem", lg: "20rem", xl: "30rem" }} p="4">
				{/* content */}
				<Playground />
			</Box>
		</Box>
	)
}

export default SidebarWithHeader
