import { Header } from '../../widgets/header'
import { Slider } from '../../widgets/home/slider'
import { ModpackCard } from '../../widgets/home/modpack-card'

export const HomePage = () => {
	return (
		<>
			<Header />
			<main>
				<Slider />
				<ModpackCard />
			</main>
		</>
	)
}
