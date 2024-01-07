import Hero from "../components/Home/Hero"
import Navbar from "../components/Home/Navbar"
import Gallery from "../components/Home/Gallery"
import About from "../components/Home/About"
import Features from "../components/Home/Features"

function HomePage() {
	return (
		<>
			<Navbar />
			<main>
				<Hero />
				<Gallery />
				<About />
				<Features />
			</main>
		</>
	)
}

export default HomePage
