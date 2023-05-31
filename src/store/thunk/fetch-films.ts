import { createAsyncThunk } from '@reduxjs/toolkit'
import { BASE_API_URL, FILMS } from '../../utils/constants.utils'

interface FetchFilmsError {
  message: string
}

export const fetchFilms = createAsyncThunk<any[], void, { rejectValue: FetchFilmsError }>(
  'films/fetch',
  async (_, thunkApi) => {
    const response = await fetch(`${BASE_API_URL}${FILMS}/`)

    if (response.status !== 200) {
      return thunkApi.rejectWithValue({
        message: 'Failed to fetch films.'
      })
    }

    const data = await response.json()

    return data.results as any[]
  }
)
