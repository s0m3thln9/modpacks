import { HomeIcon } from '@heroicons/react/20/solid'
import { Button } from '../../shared/ui'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
	title: string
}

export const Header: FC<Props> = ({ title }) => {
	const navigate = useNavigate()

	return (
		<header className='w-full grid grid-cols-12 items-center justify-items-center py-4'>
			<button
				className='col-span-2'
				onClick={() => navigate('/')}
			>
				<HomeIcon className='size-16 text-linkColor hover:saturate-150' />
			</button>
			<h2 className='col-span-8 text-textColor text-4xl font-bold'>
				{title}
			</h2>
			<Button
				variant='primary'
				className='col-span-2'
				onClick={() => navigate('/add')}
			>
				Add Modpack
			</Button>
		</header>
	)
}
