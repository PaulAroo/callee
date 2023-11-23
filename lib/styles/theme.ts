import "@fontsource-variable/nunito"

import { StyleFunctionProps, extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
	// components: {
	// 	Card: {
	// 		variants: {
	// 			outline: (props: StyleFunctionProps) => ({
	// 				bg: "brand.body",
	// 			}),
	// 		},
	// 	},
	// },
	colors: {
		brand: {
			darkGrey: "#1C1D22",
			purple: "#A000EB",
			body: "#1C1D22",
		},
	},
	styles: {
		global: {
			body: {
				bg: "brand.body",
				color: "white",
			},
		},
	},
	fonts: {
		body: `'Nunito Variable', sans-serif`,
	},
})

export default theme
