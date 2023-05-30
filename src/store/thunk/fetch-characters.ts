import { createAsyncThunk } from '@reduxjs/toolkit'
import { Character } from '../../types/Character'
import { BASE_API_URL, PEOPLE } from '../../utils/constants.utils'

type FetchTodosError = {
  message: string
}

export const fetchCharacters = createAsyncThunk<
  { characters: Character[]; count: number },
  { page: number; search: string },
  { rejectValue: FetchTodosError }
>('characters/fetch', async ({ page, search }, thunkApi) => {
  const response = await fetch(
    `${BASE_API_URL}${PEOPLE}/?page=${page}&search=${search}`
  )

  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: 'Failed to fetch characters.'
    })
  }

  const data = await response.json()
  return {
    characters: data.results as Character[],
    count: data.count as number
  }
})
