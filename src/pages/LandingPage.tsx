import {
	Box,
	Button,
	Container,
	Heading,
	Image,
	Text,
	VStack,
} from "@chakra-ui/react"
import Navbar from "../../components/Navbar"

import section1ImageUrl from "../assets/callee_nobg.png"
import { useNavigate } from "react-router-dom"

function LandingPage() {
	const navigate = useNavigate()

	return (
		<>
			<Navbar />
			<main>
				<Container maxW="container.xl" as="section">
					<VStack pt="5.62rem" pb="1.88rem">
						<Heading
							fontSize={{ base: "3rem", md: "5rem" }}
							as="h1"
							maxW="45.75rem"
							textAlign="center"
							lineHeight={{ base: "3.5rem", md: "5.5rem" }}
							fontWeight={600}
						>
							Break Language Barriers with Callee
						</Heading>
						<Text
							maxW="37.4375rem"
							textAlign="center"
							fontSize="1.25rem"
							lineHeight="1.875rem"
							fontWeight={400}
							letterSpacing="0.0125rem"
							mb="3.87rem"
						>
							Experience seamless communication in your native language,
							connecting with people around the world instantly
						</Text>
						<Button
							_hover={{
								bg: "brnad.purple.200",
							}}
							bg="brand.purple.100"
							onClick={() => {
								navigate("/login")
							}}
						>
							Try now
						</Button>
					</VStack>
				</Container>
				<Box as="section" position="relative">
					<Container maxW="container.xl">
						<VStack mt="4.4rem" pb="2rem">
							<Image src={section1ImageUrl} />
						</VStack>
					</Container>
					<Box
						aria-hidden
						position="absolute"
						bottom={0}
						right={0}
						top="50%"
						width="full"
						maxH="25.75rem"
						background="linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #0E0E0E 79.44%)"
					/>
				</Box>
			</main>
		</>
	)
}

export default LandingPage
