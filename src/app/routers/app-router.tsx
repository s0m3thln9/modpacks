import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from '../../pages/home'
import { AddModpackPage } from '../../pages/add-modpack'
import { EditModpackPage } from '../../pages/edit-modpack'

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '/add',
		element: <AddModpackPage />,
	},
	{
		path: '/edit',
		element: <EditModpackPage />,
	},
])

export const AppRouter = () => {
	return <RouterProvider router={router} />
}
