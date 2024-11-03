import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from '../../pages/home'
import { AddModpackPage } from '../../pages/add-modpack'

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '/add',
		element: <AddModpackPage />,
	},
])

export const AppRouter = () => {
	return <RouterProvider router={router} />
}
