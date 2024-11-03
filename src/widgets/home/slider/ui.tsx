import { useRef } from 'react'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/16/solid'
import { ModpackId, modpacksSlice } from '../../../entities/modpack'
import { useAppDispatch, useAppSelector } from '../../../app/stores'
import { Button } from '../../../shared/ui'

export function Slider() {
	const items = useAppSelector(modpacksSlice.selectors.selectSortedModpacks)

	const dispatch = useAppDispatch()

	const ref = useRef<HTMLDivElement | null>(null)

	const handleScroll = (offset: number) => {
		if (ref.current) ref.current.scrollLeft += offset
	}

	const handleSelect = (id: ModpackId) => {
		dispatch(modpacksSlice.actions.select({ modpackId: id }))
	}

	return (
		<div className='flex items-center justify-center bg-containerColor w-full'>
			<Button
				variant='secondary'
				className='mr-1'
				onClick={() => {
					handleScroll(-168)
				}}
			>
				<ArrowLeftIcon className='size-6' />
			</Button>
			<div
				className='w-full flex justify-between overflow-x-scroll scroll-smooth'
				style={{ scrollbarWidth: 'none' }}
				ref={ref}
			>
				<div className='flex w-full gap-2'>
					{items.map(item => (
						<div
							onClick={() => handleSelect(item.id)}
							key={item.id}
							className='cursor-pointer w-40 flex-shrink-0 text-center border rounded border-textColor text-textColor whitespace-nowrap overflow-hidden text-ellipsis px-2'
						>
							{item.name}
						</div>
					))}
				</div>
			</div>
			<Button
				variant='secondary'
				className='ml-1'
				onClick={() => {
					handleScroll(168)
				}}
			>
				<ArrowRightIcon className='size-6' />
			</Button>
		</div>
	)
}
