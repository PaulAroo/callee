import { Avatar, Button, HStack, Text, VStack } from "@chakra-ui/react"
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
	data: User
	selected: boolean
	handleClick: () => void
}

const state_styles = {
	bg: "linear-gradient(90deg, rgba(182, 28, 255, 0.20) 0%, rgba(182, 28, 255, 0.00) 78.75%)",
	borderImage:
		"linear-gradient(90deg, #B61CFF 0%, rgba(182, 28, 255, 0.00) 50%) 1",
	borderWidth: "1px",
	borderRight: "0px",
}

function SideBarItem({ data, selected, handleClick }: SideBarItemProps) {
	return (
		<Button
			_focus={{ ...state_styles, boxShadow: "none" }}
			_hover={state_styles}
			_active={{
				bg: "brand.dark.100",
			}}
			isActive={selected}
			py="0.67rem"
			px="1.34rem"
			onClick={handleClick}
			variant="ghost"
			gap="0.45rem"
			display="flex"
			boxSizing="content-box"
		>
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

					<Text
						fontWeight={400}
						fontSize="0.75rem"
						color={data.is_online ? "brand.green" : "initial"}
					>
						{data.is_online ? "online" : "offline"}
					</Text>
				</HStack>
			</VStack>
			{/* <Flex align="center" gap="0.45rem" border="1px solid"></Flex> */}
		</Button>
	)
}

export default SideBarItem
