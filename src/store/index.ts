import { configureStore } from '@reduxjs/toolkit'
import characterReducer from './charachers.slice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { useDispatch as _useDispatch } from 'react-redux'
// ...

export const store = configureStore({
  reducer: {
    characters: characterReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useDispatch = () => _useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
