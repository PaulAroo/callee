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
			darkgrey: "#1C1D22",
			purple: "#A000EB",
		},
	},
	fonts: {
		body: `'Nunito Variable', sans-serif`,
	},
})

export default theme
