import { HomeIcon } from '@heroicons/react/20/solid'
import { Button } from '../../shared/ui'

export const Header = () => {
	return (
		<header className='w-full grid grid-cols-12 items-center justify-items-center py-4'>
			<button className='col-span-2'>
				<HomeIcon className='size-16 text-linkColor hover:saturate-150' />
			</button>
			<h2 className='col-span-8 text-textColor text-4xl font-bold'>
				Modpacks
			</h2>
			<Button
				variant='primary'
				className='col-span-2'
			>
				Add Modpack
			</Button>
		</header>
	)
}
