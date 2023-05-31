import React, { useEffect, useState } from 'react'
import { Box, Pagination, Stack, TextField } from '@mui/material'
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
import SearchInput from '../../components/SearchInput'

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
        search: debouncedSearchQuery
      })
    )
  }, [debouncedSearchQuery, currentPage])

  useEffect(() => {
    dispatch(setPageNumber(1))
  }, [debouncedSearchQuery])

  const handleNext = () => dispatch(nextPage())

  const handlePrev = () => dispatch(previousPage())

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setPageNumber(value))
  }

  return (
    <div>
      <Box sx={{ px: 0, py: 4 }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: 'center', alignItems: 'center', mb: 4 }}
        >
          <SearchInput
            onChange={(v) => setSearchQuery(v)}
            value={searchQuery}
          />
          <Pagination
            color="warning"
            sx={{ flex: 1 }}
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Stack>
        <CharacterList characters={characters} />
      </Box>
    </div>
  )
}

export default HomePage
