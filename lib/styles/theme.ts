import "@fontsource-variable/nunito"

import { type ThemeConfig, extendTheme } from "@chakra-ui/react"

const config: ThemeConfig = {
	initialColorMode: "dark",
	useSystemColorMode: false,
}

const theme = extendTheme({
	config,
	colors: {
		brand: {
			darkGrey: "#1C1D22",
			purple: "#A000EB",
		},
	},
	// styles: {
	// 	global: {
	// 		body: {
	// 			bg: "brand.body",
	// 			color: "white",
	// 		},
	// 	},
	// },
	fonts: {
		body: `'Nunito Variable', sans-serif`,
	},
})

export default theme
