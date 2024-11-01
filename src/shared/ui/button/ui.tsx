import { FC, ReactNode } from 'react'
import { cn } from '../../lib'

type Props = {
	children: ReactNode
	variant: 'primary' | 'secondary'
	className?: string
	onClick?: () => void
}

const getButtonClass = (variant: Props['variant']) =>
	variant === 'primary'
		? 'bg-buttonPrimaryColor text-buttonPrimaryTextColor shadow-primaryShadow hover:shadow-primaryShadowHover'
		: 'bg-buttonSecondaryColor text-buttonSecondaryTextColor shadow-secondaryShadow hover:shadow-secondaryShadowHover'

export const Button: FC<Props> = ({
	children,
	className,
	variant,
	onClick,
}) => {
	return (
		<button
			className={cn(
				'px-4 py-2 rounded-md hover:saturate-150',
				className,
				getButtonClass(variant),
			)}
			onClick={onClick}
		>
			{children}
		</button>
	)
}
