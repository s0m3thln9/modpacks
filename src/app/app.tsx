import { MainProviders } from './providers'
import { AppRouter } from './routers'

const App = () => {
	return (
		<MainProviders>
			<AppRouter />
		</MainProviders>
	)
}

export default App
