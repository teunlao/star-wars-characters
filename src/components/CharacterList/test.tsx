import React from 'react'
import { Mock, vi } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import configureStore from 'redux-mock-store'
import CharacterList from '.'
import { selectCharactersStatus } from '../../store/charachers.slice'
import { setCharacterId, openDialog } from '../../store/app.slice'
import { Character } from '../../types/Character'

const mockCharacters: Partial<Character>[] = [
  { id: 0, name: 'Character 1' },
  { id: 1, name: 'Character 2' }
  // Добавьте здесь больше свойств в соответствии с вашим типом `Character`
]

const mockStatus = 'succeeded'

describe('CharacterList', () => {
  let dispatchedActions: any[] = []

  beforeEach(() => {
    vi.mock('react-redux', async () => {
      const reduxMocks = (await vi.importActual('react-redux')) as any

      return {
        ...reduxMocks,
        useSelector: vi.fn(),
        useDispatch: vi.fn()
      }
    })

    dispatchedActions = []
    ;(useDispatch as Mock).mockImplementation(() => (action: any) => dispatchedActions.push(action))
  })

  it('renders a list of characters', () => {
    ;(useSelector as Mock).mockImplementation((selector) =>
      selector === selectCharactersStatus ? mockStatus : mockCharacters
    )

    render(<CharacterList characters={mockCharacters as Character[]} />)

    mockCharacters.forEach((character) => {
      expect(screen.getByText(character.name as string)).toBeInTheDocument()
    })
  })

  it('dispatches actions on character click', () => {
    const mockStore = configureStore([])
    const store = mockStore({})

    ;(useSelector as Mock).mockImplementation((selector) =>
      selector === selectCharactersStatus ? mockStatus : mockCharacters
    )

    render(
      <Provider store={store}>
        <CharacterList characters={mockCharacters as Character[]} />
      </Provider>
    )

    fireEvent.click(screen.getByText(mockCharacters[0].name as string))

    const actions = store.getActions()
    console.log('actions', dispatchedActions)
    expect(dispatchedActions[0]).toEqual(setCharacterId(mockCharacters[0].id))
    expect(dispatchedActions[1]).toEqual(openDialog())
  })
})
