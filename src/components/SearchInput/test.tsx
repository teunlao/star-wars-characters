import { render, fireEvent } from '@testing-library/react'
import SearchInput from '.'
import { vi } from 'vitest'

describe('SearchInput', () => {
  it('renders correctly', () => {
    const mockOnChange = vi.fn()
    const { getByPlaceholderText } = render(<SearchInput value="" onChange={mockOnChange} />)

    const input = getByPlaceholderText('Find your character...')
    expect(input).toBeInTheDocument()
  })

  it('triggers onChange handler when text is input', () => {
    const mockOnChange = vi.fn()
    const { getByPlaceholderText } = render(<SearchInput value="" onChange={mockOnChange} />)

    const input = getByPlaceholderText('Find your character...')
    fireEvent.change(input, { target: { value: 'Rick' } })

    expect(mockOnChange).toHaveBeenCalledTimes(1)
    expect(mockOnChange).toHaveBeenCalledWith('Rick')
  })

  it('displays the correct value', () => {
    const mockOnChange = vi.fn()
    const { getByPlaceholderText } = render(<SearchInput value="Morty" onChange={mockOnChange} />)

    const input = getByPlaceholderText('Find your character...')
    expect((input as HTMLInputElement).value).toBe('Morty')
  })
})
