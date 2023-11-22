import "@fontsource-variable/nunito"

import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
	colors: {
		brand: {
			darkGrey: "#1C1D22",
			purple: "#A000EB",
		},
	},
	styles: {
		global: {
			body: {
				bg: "brand.darkGrey",
				color: "white",
			},
		},
	},
	fonts: {
		body: `'Nunito Variable', sans-serif`,
	},
})

export default theme
