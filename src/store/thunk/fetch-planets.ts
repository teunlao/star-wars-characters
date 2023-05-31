import { createAsyncThunk } from '@reduxjs/toolkit'
import { BASE_API_URL, PLANETS } from '../../utils/constants.utils'

interface FetchFilmsError {
  message: string
}

export const fetchPlanets = createAsyncThunk<any[], void, { rejectValue: FetchFilmsError }>(
  'planets/fetch',
  async (_, thunkApi) => {
    const response = await fetch(`${BASE_API_URL}${PLANETS}/`)

    if (response.status !== 200) {
      return thunkApi.rejectWithValue({
        message: 'Failed to fetch planets.'
      })
    }

    const data = await response.json()

    return data.results as any[]
  }
)
