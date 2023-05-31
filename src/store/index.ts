import { configureStore } from '@reduxjs/toolkit'
import characterReducer from './charachers.slice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { useDispatch as _useDispatch } from 'react-redux'
import filmsReducer from './films.slice'
import planetsReducer from './planets.slice'
import speciesReducer from './species.slice'
import appReducer from './app.slice'
export const store = configureStore({
  reducer: {
    app: appReducer,
    characters: characterReducer,
    films: filmsReducer,
    planets: planetsReducer,
    species: speciesReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useDispatch = () => _useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
