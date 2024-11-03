import { modpacksSlice } from '../../../entities/modpack'
import { useAppSelector } from '../../../app/stores'
import { Button } from '../../../shared/ui'
import { useNavigate } from 'react-router-dom'

export const ModpackCard = () => {
	const selectedModpack = useAppSelector(
		modpacksSlice.selectors.selectSelectedModpack,
	)
	const modlist = useAppSelector(modpacksSlice.selectors.selectSortedModlist)

	const navigate = useNavigate()

	return (
		<div className='grid gap-y-10 grid-cols-2 p-10 mt-10 mx-20 border-textColor border rounded bg-containerColor'>
			<div>
				<h3 className='text-textColor text-3xl font-bold'>
					{selectedModpack.name}
				</h3>
				<Button
					variant='secondary'
					className='mt-2'
					onClick={() => navigate('/edit')}
				>
					Edit
				</Button>
			</div>
			<div>
				<h4 className='text-textColor text-2xl font-bold'>
					Description
				</h4>
				<p className='text-textColor text-md mt-4 test-ellipsis'>
					{selectedModpack.description}
				</p>
			</div>
			<div>
				<h4 className='text-textColor text-2xl font-bold'>Mods</h4>
				<ul className='text-textColor mt-4 list-decimal list-inside'>
					{modlist.map(mod => (
						<li key={mod.id}>{mod.name}</li>
					))}
				</ul>
			</div>
		</div>
	)
}
