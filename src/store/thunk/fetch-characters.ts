import { createAsyncThunk } from '@reduxjs/toolkit'
import { Character } from '../../types/Character'

type FetchTodosError = {
  message: string
}

export const fetchCharacters = createAsyncThunk<
  Character[],
  number,
  { rejectValue: FetchTodosError }
>('characters/fetch', async (page: number, thunkApi) => {
  const response = await fetch(`https://swapi.dev/api/people/?page=${page}`)

  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: 'Failed to fetch characters.'
    })
  }

  const data = await response.json()
  return data.results as Character[]
})
