import { motion } from "framer-motion"
import section1ImageUrl from "../../assets/callee_nobg.png"
import { Box, Container, Image, VStack } from "@chakra-ui/react"

function Gallery() {
	return (
		<motion.section
			style={{ position: "relative" }}
			initial={{ opacity: 0, y: 80 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
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
		</motion.section>
	)
}

export default Gallery
