import React, { useEffect, useState } from 'react'
import { Box, Pagination, TextField } from '@mui/material'
import { fetchCharacters } from '../../store/thunk/fetch-characters'
import { useDispatch } from '../../store'
import { useSelector } from 'react-redux'
import {
  nextPage,
  previousPage,
  selectCharacters,
  selectCharactersStatus,
  selectCurrentPage,
  selectTotalPages,
  setPageNumber
} from '../../store/charachers.slice'
import CharacterList from '../../components/CharacterList'
import useDebounce from '../../hooks/useDebounce'

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  const dispatch = useDispatch()
  const characters = useSelector(selectCharacters)
  const status = useSelector(selectCharactersStatus)
  const currentPage = useSelector(selectCurrentPage)
  const totalPages = useSelector(selectTotalPages)

  useEffect(() => {
    dispatch(
      fetchCharacters({
        page: currentPage,
        search: ''
      })
    )
  }, [currentPage])

  useEffect(() => {
    dispatch(setPageNumber(1))
    dispatch(
      fetchCharacters({
        page: 1,
        search: debouncedSearchQuery
      })
    )
  }, [debouncedSearchQuery])

  const handleNext = () => dispatch(nextPage())

  const handlePrev = () => dispatch(previousPage())

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setPageNumber(value))
  }

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      <Box>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
        {status}
        <TextField
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <CharacterList characters={characters} />
      </Box>
    </div>
  )
}

export default HomePage
