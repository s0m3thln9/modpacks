import { configureStore } from '@reduxjs/toolkit'
import { initialModpacksData, modpacksSlice } from '../../entities/modpack'
import { useDispatch, useSelector } from 'react-redux'

export const mainStore = configureStore({
	reducer: {
		[modpacksSlice.name]: modpacksSlice.reducer,
	},
})

mainStore.dispatch(
	modpacksSlice.actions.stored({ modpacks: initialModpacksData }),
)

export type AppState = ReturnType<typeof mainStore.getState>
export type AppDispatch = typeof mainStore.dispatch

export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
