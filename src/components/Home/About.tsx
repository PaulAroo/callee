import {
	Box,
	Container,
	Flex,
	HStack,
	Image,
	Text,
	VStack,
} from "@chakra-ui/react"
import MarkerOne from "../icons/MarkerOne"

import callHistoryImage from "../../assets/Call_History_Page.png"
import ongoingCallImage from "../../assets/Ongoing_call_Page.png"
import incomingCallImage from "../../assets/Inoming_call_Page.png"
import { motion } from "framer-motion"

function About() {
	return (
		<Box as="section" py={{ base: "4rem", lg: "8rem" }}>
			<Container maxW="container.xl">
				<VStack
					gap={{ base: "3rem", md: "0px" }}
					maxW={"64.1rem"}
					marginInline={"auto"}
				>
					{LISTINGS.map((l) => (
						<Flex
							key={l.title}
							as={motion.div}
							initial={{
								opacity: 0,
								x: l.align === "right" ? 100 : -100,
							}}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ amount: 0.3, once: true }}
							transition="0.4s linear"
							direction={{
								base: "column-reverse",
								md: `${l.align === "right" ? "row-reverse" : "row"}`,
							}}
							alignItems="center"
							gap={"2rem"}
							alignSelf={{
								md: `${l.align === "right" ? "flex-end" : "flex-start"}`,
							}}
							mt={{ md: `${l.negativeMargin ? "-3rem" : "initial"}` }}
						>
							<Image src={l.srcImage} />
							<VStack>
								<HStack
									alignSelf={"start"}
									flexDirection={{
										md: `${l.align === "right" ? "row-reverse" : "row"}`,
									}}
								>
									<Box fontSize={{ base: "2.5rem", lg: "3rem" }}>
										<MarkerOne />
									</Box>
									<Text
										as={"h1"}
										fontSize={{ base: "1.5rem", lg: "2.3rem" }}
										fontWeight="600"
									>
										{l.title}
									</Text>
								</HStack>
								<Text
									maxW={{ base: "21rem", lg: "27rem" }}
									fontSize={{ base: "1rem", lg: "1.5rem" }}
									pl={{
										base: "1rem",
										md: `${l.align === "right" ? "0px" : "1rem"}`,
									}}
									fontWeight="400"
									alignSelf={{ lg: "start" }}
								>
									{l.desc}
								</Text>
							</VStack>
						</Flex>
					))}
				</VStack>
			</Container>
		</Box>
	)
}

interface Listing {
	title: string
	desc: string
	srcImage: string
	align: "left" | "right"
	negativeMargin?: boolean
}

const LISTINGS: Array<Listing> = [
	{
		title: "Never Miss a Moment",
		desc: "Review your call history effortlessly. Stay connected and relive important conversations",
		srcImage: callHistoryImage,
		align: "left",
	},
	{
		title: "Supports Global Languages",
		desc: "Instantly see text translations during calls. Enhance understanding for clear communication.",
		srcImage: ongoingCallImage,
		align: "right",
		negativeMargin: true,
	},
	{
		title: "Seamless Communication",
		desc: "Enjoy smooth and effortless conversations. Our intuitive design makes communication a breeze.",
		srcImage: incomingCallImage,
		align: "left",
		negativeMargin: true,
	},
]

export default About
