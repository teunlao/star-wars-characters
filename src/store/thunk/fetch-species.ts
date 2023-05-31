import { createAsyncThunk } from '@reduxjs/toolkit'
import { Film } from '../../types/Film'
import { BASE_API_URL, PLANETS, SPECIES } from '../../utils/constants.utils'

interface FetchFilmsError {
  message: string
}

export const fetchSpecies = createAsyncThunk<
  any[],
  void,
  { rejectValue: FetchFilmsError }
>('planets/fetch', async (_, thunkApi) => {
  const response = await fetch(`${BASE_API_URL}${SPECIES}/`)

  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: 'Failed to fetch species.'
    })
  }

  const data = await response.json()

  return data.results as any[]
})
