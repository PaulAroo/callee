import {
	Avatar,
	Box,
	HStack,
	IconButton,
	SimpleGrid,
	Text,
	VStack,
} from "@chakra-ui/react"
import { IoMdCall, IoMdClose } from "react-icons/io"

type Variant = "incoming" | "outgoing" | "ongoing" | ""

function CallScreen({
	remoteCallerName,
	variant,
	handleHangUp,
	handlePickup,
}: {
	remoteCallerName: string
	variant: Variant
	handlePickup: () => void
	handleHangUp: () => void
}) {
	const callStatus =
		variant === "incoming"
			? "incoming call"
			: variant === "outgoing"
			  ? "outgoing call"
			  : "ongoing"

	const renderButtons = () => {
		if (variant === "incoming") {
			return (
				<HStack spacing="4.31rem">
					<IconButton
						aria-label="accept call"
						rounded="full"
						icon={<IoMdCall />}
						fontSize="2.25rem"
						padding="1rem"
						height="auto"
						bg="brand.green"
						onClick={handlePickup}
					/>
					<IconButton
						aria-label="reject call"
						rounded="full"
						icon={<IoMdClose />}
						fontSize="2.25rem"
						padding="1rem"
						height="auto"
						bg="brand.red"
						onClick={handleHangUp}
					/>
				</HStack>
			)
		} else if (variant === "ongoing") {
			return (
				<IconButton
					aria-label="reject call"
					rounded="full"
					icon={<IoMdClose />}
					fontSize="2.25rem"
					padding="1rem"
					height="auto"
					bg="brand.red"
					onClick={handleHangUp}
				/>
			)
		} else if (variant === "outgoing") {
			return (
				<IconButton
					aria-label="reject call"
					rounded="full"
					icon={<IoMdClose />}
					fontSize="2.25rem"
					padding="1rem"
					height="auto"
					bg="brand.red"
					onClick={handleHangUp}
				/>
			)
		}
	}

	return (
		<SimpleGrid height="100vh" placeItems="center">
			<VStack spacing="7.75rem" px="1.53rem">
				<VStack>
					<Text textTransform="capitalize">{remoteCallerName}</Text>
					<Text
						textTransform="uppercase"
						fontSize="sm"
						fontWeight={400}
						letterSpacing="0.15rem"
					>
						{callStatus}
					</Text>
				</VStack>
				<Box borderWidth="5px" rounded="full" borderColor="brand.purple.100">
					<Avatar
						sx={{ "--avatar-size": "13.75rem" }}
						size={"var(--avatar-size)"}
						src=""
					/>
				</Box>
				{renderButtons()}
			</VStack>
		</SimpleGrid>
	)
}

export default CallScreen
