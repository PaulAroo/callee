import "@fontsource-variable/nunito"

import { type ThemeConfig, extendTheme } from "@chakra-ui/react"

const config: ThemeConfig = {
	initialColorMode: "dark",
	useSystemColorMode: false,
}

const theme = extendTheme({
	config,
	colors: {
		body: {
			bg: "red",
		},
		brand: {
			darkgrey: "#292B2E",
			dark: "#0A000F",
			purple: {
				100: "#C854FF",
				200: "#A000EB",
			},
		},
	},
	fonts: {
		body: `'Nunito Variable', sans-serif`,
	},
})

export default theme
