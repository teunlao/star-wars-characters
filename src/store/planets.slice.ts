import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchPlanets } from './thunk/fetch-planets'

interface PlanetsState {
  planets: any[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null | undefined
}

const initialState: PlanetsState = {
  planets: [],
  status: 'idle',
  error: null
}

export const planetsSlice = createSlice({
  name: 'planets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlanets.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(
        fetchPlanets.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.status = 'succeeded'
          state.planets = action.payload
        }
      )
      .addCase(fetchPlanets.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})
export default planetsSlice.reducer
