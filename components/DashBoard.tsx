import {
	IconButton,
	Avatar,
	Box,
	CloseButton,
	Flex,
	HStack,
	Icon,
	Text,
	Drawer,
	DrawerContent,
	useDisclosure,
	BoxProps,
	VStack,
	SimpleGrid,
	Heading,
} from "@chakra-ui/react"
// import { IconType } from "react-icons"

import Playground from "./Playground"

import { TbMessagePlus } from "react-icons/tb"
import { RxDotsVertical } from "react-icons/rx"
import { SlCallOut } from "react-icons/sl"
import { SlCallIn } from "react-icons/sl"

interface LinkItemProps {
	name: string
	callDetails: {
		incoming: boolean
		duration: string
		time: string
	}
}

interface SidebarProps extends BoxProps {
	onClose: () => void
}

const LinkItems: Array<LinkItemProps> = [
	{
		name: "Lara Mueller",
		callDetails: {
			duration: "00:10:34",
			incoming: false,
			time: "17:33",
		},
	},
	{
		name: "Cameron Williamson",
		callDetails: {
			duration: "01:10:34",
			incoming: true,
			time: "17:33",
		},
	},
]

const DashBoardContent = ({ onClose, ...rest }: SidebarProps) => {
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
			<SimpleGrid pl="0.5rem" gap="0.56rem">
				<Heading fontSize="1.5rem" fontWeight={400} pl="1.34rem" mt="1rem">
					Recents
				</Heading>
				{LinkItems.map((link) => (
					<NavItem
						key={link.name}
						name={link.name}
						callDetails={link.callDetails}
					/>
				))}
			</SimpleGrid>
		</Box>
	)
}

const NavItem = ({ name, callDetails }: LinkItemProps) => {
	const { duration, incoming, time } = callDetails
	return (
		<Box
			_focus={{ boxShadow: "none" }}
			_hover={{
				bg: "linear-gradient(90deg, rgba(182, 28, 255, 0.20) 0%, rgba(182, 28, 255, 0.00) 78.75%)",
				borderImage:
					"linear-gradient(90deg, #B61CFF 0%, rgba(182, 28, 255, 0.00) 50%) 1",
				borderWidth: "1px",
				borderRight: "0px",
			}}
			py="0.67rem"
			px="1.34rem"
		>
			<Flex align="center" cursor="pointer" gap="0.45rem">
				<Avatar
					sx={{ "--avatar-size": "2.67rem" }}
					size={"var(--avatar-size)"}
					src={""}
				/>
				<VStack spacing={0} w="full" align="flex-start">
					<HStack justifyContent="space-between" w="full">
						<Text fontWeight={600}>{name}</Text>
						<Text fontWeight={400} fontSize="0.75rem">
							{duration}
						</Text>
					</HStack>
					<HStack spacing={0}>
						<Icon
							mr="4"
							fontSize="16"
							color={incoming ? "brand.blue" : "brand.green"}
							as={incoming ? SlCallIn : SlCallOut}
						/>

						<Text fontWeight={400} fontSize="0.75rem">
							{time}
						</Text>
					</HStack>
				</VStack>
			</Flex>
		</Box>
	)
}

const Dashboard = () => {
	const { isOpen, onClose } = useDisclosure()

	return (
		<Box minH="100vh">
			<DashBoardContent
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
					<DashBoardContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
			<Box ml={{ base: 0, md: "18rem", lg: "20rem", xl: "30rem" }}>
				<Playground />
			</Box>
		</Box>
	)
}

export default Dashboard
