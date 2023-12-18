import { Container, HStack } from "@chakra-ui/react"
import { Link as ReactRouterLink } from "react-router-dom"
import { Link as ChakraLink } from "@chakra-ui/react"
import { motion } from "framer-motion"

import BrandLogoIcon from "../BrandLogoIcon"
import BrandLogoText from "../BrandLogoText"

function Navbar() {
	return (
		<motion.nav
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
			style={{ background: "#181818" }}
		>
			<Container maxW="container.xl" p={0}>
				<HStack px="2.47rem" py="2.34rem" justify="space-between">
					<ReactRouterLink to="/">
						<HStack
							spacing="0.46rem"
							color="brand.purple.100"
							fontSize="6.75rem"
						>
							<BrandLogoIcon />
							<BrandLogoText />
						</HStack>
					</ReactRouterLink>
					<HStack display={{ base: "none", md: "flex" }} spacing="1.94rem">
						<ReactRouterLink to="">Home</ReactRouterLink>
						<ReactRouterLink to="">About</ReactRouterLink>
						<ReactRouterLink to="">Contact</ReactRouterLink>
					</HStack>
					<ChakraLink
						as={ReactRouterLink}
						to="/login"
						borderWidth="1px"
						borderRadius="0.75rem"
						borderColor="brand.purple.100"
						boxShadow="0px 4px 31px 0px rgba(0, 0, 0, 0.15)"
						px="2.25rem"
						py="0.625rem"
						_hover={{
							textDecoration: "none",
						}}
					>
						Login
					</ChakraLink>
				</HStack>
			</Container>
		</motion.nav>
	)
}

export default Navbar
