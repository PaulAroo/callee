import { Box, Container, Flex, Text, VStack } from "@chakra-ui/react"
import MarkerTwo from "../icons/MarkerTwo"
import { motion } from "framer-motion"

function Features() {
	return (
		<Box as="section" py={{ base: "2rem", lg: "5rem" }} bg={"brand.dark.300"}>
			<Container maxW="container.xl">
				<Flex
					as={motion.div}
					initial={{
						opacity: 0,
						y: 50,
					}}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ amount: 0.2, once: true }}
					transition="0.4s linear"
					maxW={"65.3rem"}
					marginInline={"auto"}
					flexWrap={{ base: "wrap", md: "nowrap" }}
					rowGap={"2rem"}
					justifyContent={"center"}
				>
					{FEATURES.map((f) => (
						<VStack key={f} width={{ base: "47%", md: "initial", lg: "100%" }}>
							<Box fontSize={{ base: "0.6rem", lg: "1em" }}>
								<MarkerTwo />
							</Box>
							<Text
								fontSize={{ base: "1.2rem", lg: "1.65rem", xl: "1.9rem" }}
								textTransform={"capitalize"}
								maxW={{ base: "10rem", lg: "14rem", xl: "16rem" }}
								textAlign={"center"}
								lineHeight={"1.2em"}
							>
								{f}
							</Text>
						</VStack>
					))}
				</Flex>
			</Container>
		</Box>
	)
}

const FEATURES = [
	"supports global languages",
	"connect anywhere",
	"real-time translation in text",
	"enhanced audio quality",
]

export default Features
