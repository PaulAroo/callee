import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Container, VStack, Heading, Button, Text } from "@chakra-ui/react"

function Hero() {
	const navigate = useNavigate()
	return (
		<motion.section
			style={{ background: "#181818" }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
		>
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
		</motion.section>
	)
}

export default Hero
