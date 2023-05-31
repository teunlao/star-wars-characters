import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/system'
import { createTheme } from '@mui/material/styles'
import DialogComponent from '.'
import { configureStore } from '@reduxjs/toolkit'
import { Character } from '../../types/Character'
import appReducer from '../../store/app.slice'
import charactersReducer from '../../store/charachers.slice'

const theme = createTheme()

describe('DialogComponent', () => {
  test.skip('renders dialog when open', () => {
    const character: Partial<Character> = {
      id: 1,
      name: 'Test Character'
    }

    const store = configureStore({
      reducer: {
        app: appReducer,
        characters: charactersReducer
        // другие редьюсеры...
      },
      preloadedState: {
        app: {
          isDialogOpen: true,
          selectedCharacterId: 1
        },
        characters: {
          currentPage: 1,
          error: null,
          status: 'idle',
          totalCount: 0,
          characters: [character as Character]
        }
        // others states...
        // a lot of things need to be mocked here, like selectors, actions, etc.
      }
    })

    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <DialogComponent />
        </ThemeProvider>
      </Provider>
    )

    const name = screen.getByText('Test Character')
    expect(name).toBeInTheDocument()

    const closeBtn = screen.getByRole('button', { name: /close/i })
    expect(closeBtn).toBeInTheDocument()

    fireEvent.click(closeBtn)
    // check that dialog is closed when close button is clicked, will depend on your app
  })

  // others test...
})
