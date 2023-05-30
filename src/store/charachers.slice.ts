// Add additional state for pagination
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Character } from '../types/Character'
import { fetchCharacters } from './thunk/fetch-characters'
import { RootState } from './index'

interface CharacterState {
  characters: Character[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null | undefined
  currentPage: number
  totalCount: number
}

const initialState: CharacterState = {
  characters: [],
  status: 'idle',
  error: null,
  currentPage: 1,
  totalCount: 0
}

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    nextPage: (state) => {
      state.currentPage += 1
    },
    previousPage: (state) => {
      if (state.currentPage > 1) {
        state.currentPage -= 1
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(
        fetchCharacters.fulfilled,
        (
          state,
          action: PayloadAction<{ count: number; characters: Character[] }>
        ) => {
          state.status = 'succeeded'
          state.characters = action.payload.characters
          state.totalCount = action.payload.count
          // You would need to get the total count from the API response
        }
      )
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { nextPage, previousPage, setPageNumber } = charactersSlice.actions

export const selectCharacters = (state: RootState) =>
  state.characters.characters
export const selectCharactersStatus = (state: RootState) =>
  state.characters.status
export const selectCharactersError = (state: RootState) =>
  state.characters.error
export const selectCurrentPage = (state: RootState) =>
  state.characters.currentPage

export const selectTotalPages = (state: RootState) =>
  Math.floor(state.characters.totalCount / 10)
export default charactersSlice.reducer
