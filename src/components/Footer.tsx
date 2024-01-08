import {
	Box,
	Container,
	Flex,
	Grid,
	GridItem,
	HStack,
	Text,
	VStack,
} from "@chakra-ui/react"
import { Link as ReactRouterLink } from "react-router-dom"

import PhoneIcon from "./icons/PhoneIcon"
import LocationIcon from "./icons/LocationIcon"
import TwitterIcon from "./icons/socials/TwitterIcon"
import FacebookIcon from "./icons/socials/FacebookIcon"
import LinkedInIcon from "./icons/socials/LinkedInIcon"

function Footer() {
	return (
		<Box as="footer" bg={"brand.dark.300"} py={{ base: "3rem", lg: "6.69rem" }}>
			<Container maxW="container.xl">
				<Flex
					maxW={"55rem"}
					marginInline={"auto"}
					direction={{ base: "column", sm: "row" }}
					rowGap={"2rem"}
					columnGap={"1rem"}
					justifyContent={{ base: "space-around", lg: "space-between" }}
					px={{ base: "1.5rem", lg: "0px" }}
					pr={{ sm: "0px" }}
				>
					<Box>
						<Text
							as={"h1"}
							fontSize={"2rem"}
							fontWeight={500}
							mb={{ base: "1rem", lg: "2.5rem" }}
							letterSpacing={"0.00625rem"}
						>
							<ReactRouterLink to="/">Callee</ReactRouterLink>
						</Text>
						<Grid
							templateColumns="repeat(2, 1fr)"
							columnGap={{ base: "2rem", md: "2.41rem" }}
							rowGap={"1.19rem"}
						>
							{LINKS.map((link) => (
								<GridItem
									textTransform={"capitalize"}
									letterSpacing={"0.0125rem"}
								>
									<ReactRouterLink key={link.label} to={link.to}>
										{link.label}
									</ReactRouterLink>
								</GridItem>
							))}
						</Grid>
					</Box>
					<VStack gap={"1.2rem"} alignItems={"start"}>
						<HStack>
							<LocationIcon />
							<Text letterSpacing={"0.0125rem"}>
								7480 Mockingbird Hill undefined
							</Text>
						</HStack>
						<HStack>
							<PhoneIcon />
							<Text letterSpacing={"0.0125rem"}>(239) 555-0108</Text>
						</HStack>
						<HStack gap={"1.5rem"} py="1.25rem">
							<ReactRouterLink to="">
								<TwitterIcon />
							</ReactRouterLink>
							<ReactRouterLink to="">
								<FacebookIcon />
							</ReactRouterLink>
							<ReactRouterLink to="">
								<LinkedInIcon />
							</ReactRouterLink>
						</HStack>
					</VStack>
				</Flex>
			</Container>
		</Box>
	)
}

const LINKS = [
	{
		label: "home",
		to: "",
	},
	{
		label: "contact us",
		to: "",
	},
	{
		label: "about us",
		to: "",
	},
	{
		label: "features",
		to: "",
	},
]

export default Footer
