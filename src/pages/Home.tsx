import Hero from "../components/Home/Hero"
import Navbar from "../components/Home/Navbar"
import Gallery from "../components/Home/Gallery"
import Features from "../components/Home/Features"

function HomePage() {
	return (
		<>
			<Navbar />
			<main>
				<Hero />
				<Gallery />
				<Features />
			</main>
		</>
	)
}

export default HomePage
