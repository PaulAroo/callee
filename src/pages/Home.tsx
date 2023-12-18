import Hero from "../components/Home/Hero"
import Navbar from "../components/Home/Navbar"
import Gallery from "../components/Home/Gallery"

function HomePage() {
	return (
		<>
			<Navbar />
			<main>
				<Hero />
				<Gallery />
			</main>
		</>
	)
}

export default HomePage
