import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { AppState } from './Store'

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
