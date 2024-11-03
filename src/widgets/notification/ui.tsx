import { createPortal } from 'react-dom'
import { Button } from '../../shared/ui'
import { FC } from 'react'
import { cn } from '../../shared/lib'

type Props = {
	message: string
	type: 'success' | 'error'
	onClose: () => void
}

export const Notification: FC<Props> = ({ message, type, onClose }) => {
	return createPortal(
		<div
			className={cn(
				'fixed top-3/4 left-1/2 -translate-x-1/2 p-10 flex items-center gap-10 z-50 bg-containerColor rounded border',
				type === 'success'
					? 'border-successColor text-successColor'
					: 'border-errorColor text-errorColor',
			)}
		>
			<span>{message}</span>
			<Button
				variant='secondary'
				onClick={onClose}
			>
				Close
			</Button>
		</div>,
		document.body,
	)
}
