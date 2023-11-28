import { Avatar, Box, Flex, HStack, Icon, Text, VStack } from "@chakra-ui/react"
import { SlCallIn, SlCallOut } from "react-icons/sl"
import { User } from "../../src/context/AuthContext"

export interface SideBarItemData {
	name: string
	callDetails: {
		incoming: boolean
		duration: string
		time: string
	}
}

interface SideBarItemProps {
	handleClick: (data: User) => void
	data: User
}

function SideBarItem({ data, handleClick }: SideBarItemProps) {
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
			onClick={() => handleClick(data)}
		>
			<Flex align="center" cursor="pointer" gap="0.45rem">
				<Avatar
					sx={{ "--avatar-size": "2.67rem" }}
					size={"var(--avatar-size)"}
					src={""}
				/>
				<VStack spacing={0} w="full" align="flex-start">
					<HStack justifyContent="space-between" w="full">
						<Text fontWeight={600}>{data.username}</Text>
						{/* <Text fontWeight={400} fontSize="0.75rem">
							{duration}
						</Text> */}
					</HStack>
					<HStack spacing={0}>
						{/* <Icon
							mr="4"
							fontSize="16"
							color={incoming ? "brand.blue" : "brand.green"}
							as={incoming ? SlCallIn : SlCallOut}
						/> */}

						<Text fontWeight={400} fontSize="0.75rem">
							{data.is_online ? "online" : "offline"}
						</Text>
					</HStack>
				</VStack>
			</Flex>
		</Box>
	)
}

export default SideBarItem
