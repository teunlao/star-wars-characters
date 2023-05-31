import { createSlice } from '@reduxjs/toolkit'
interface AppState {
  isDialogOpen: boolean
  selectedCharacterId?: number
}

const initialState: AppState = {
  isDialogOpen: false,
  selectedCharacterId: undefined
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    openDialog(state) {
      state.isDialogOpen = true
    },
    closeDialog(state) {
      state.isDialogOpen = false
    },
    setCharacterId(state, action) {
      state.selectedCharacterId = action.payload
    }
  }
})

export const { openDialog, closeDialog, setCharacterId } = appSlice.actions

export const selectIsDialogOpen = (state: any) => state.app.isDialogOpen
export const selectSelectedCharacterId = (state: any) =>
  state.app.selectedCharacterId

export default appSlice.reducer
