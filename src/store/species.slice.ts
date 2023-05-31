import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchSpecies } from './thunk/fetch-species'

interface PlanetsState {
  species: any[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null | undefined
}

const initialState: PlanetsState = {
  species: [],
  status: 'idle',
  error: null
}

export const speciesSlice = createSlice({
  name: 'species',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecies.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(
        fetchSpecies.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.status = 'succeeded'
          state.species = action.payload
        }
      )
      .addCase(fetchSpecies.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const selectSpecies = (state: any) => state.species.species
export default speciesSlice.reducer
