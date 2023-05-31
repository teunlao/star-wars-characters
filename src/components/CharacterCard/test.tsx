import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/system'
import { createTheme } from '@mui/material/styles'
import CharacterCard from '.'
import { Character } from '../../types/Character'
import { getImageUrl } from '../../utils/functions'

const theme = createTheme()
const renderWithTheme = (component: React.ReactElement) => {
  return {
    ...render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
  }
}

describe('CharacterCard', () => {
  test('renders character image and name', () => {
    const character: Partial<Character> = {
      id: 1,
      name: 'Test Character'
    }

    renderWithTheme(<CharacterCard character={character as Character} />)

    const image = screen.getByAltText('character-portrait')
    expect(image).toHaveAttribute('src', getImageUrl(character.id))

    const name = screen.getByText('Test Character')
    expect(name).toBeInTheDocument()
  })

  // другие тесты...
})
