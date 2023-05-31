import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchFilms } from './thunk/fetch-films'

interface CharacterState {
  films: any[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null | undefined
}

const initialState: CharacterState = {
  films: [],
  status: 'idle',
  error: null
}

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilms.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchFilms.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = 'succeeded'
        state.films = action.payload
      })
      .addCase(fetchFilms.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const selectFilms = (state: any) => state.films.films
export default filmsSlice.reducer
