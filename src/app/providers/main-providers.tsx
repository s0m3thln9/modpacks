import { Provider } from 'react-redux'
import { mainStore } from '../stores'
import { FC, ReactNode } from 'react'

interface Props {
	children: ReactNode
}

export const MainProviders: FC<Props> = ({ children }) => (
	<Provider store={mainStore}>{children}</Provider>
)
