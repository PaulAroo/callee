import { Container, Flex, HStack, Image, Text, VStack } from "@chakra-ui/react"
import MarkerOne from "../icons/MarkerOne"

import callHistoryImage from "../../assets/Call_History_Page.png"
import ongoingCallImage from "../../assets/Ongoing_call_Page.png"
import incomingCallImage from "../../assets/Inoming_call_Page.png"

function Features() {
	return (
		<section>
			<Container maxW="container.xl">
				<VStack>
					{FEATURES.map((f) => (
						<Flex
							key={f.title}
							direction="column-reverse"
							border="1px solid"
							alignItems="center"
						>
							<Image src={f.srcImage} />
							<VStack>
								<HStack>
									<MarkerOne />
									<Text as={"h1"}>{f.title}</Text>
								</HStack>
								<Text>{f.desc}</Text>
							</VStack>
						</Flex>
					))}
				</VStack>
			</Container>
		</section>
	)
}

interface Feature {
	title: string
	desc: string
	srcImage: string
	align: "left" | "right"
}

const FEATURES: Array<Feature> = [
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
	},
	{
		title: "Seamless Communication",
		desc: "Enjoy smooth and effortless conversations. Our intuitive design makes communication a breeze.",
		srcImage: incomingCallImage,
		align: "left",
	},
]

export default Features
