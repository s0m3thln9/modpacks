import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'

export function cn(
	...classes: Array<
		| string
		| boolean
		| undefined
		| null
		| Record<string, boolean | undefined>
	>
) {
	return twMerge(clsx(...classes))
}
