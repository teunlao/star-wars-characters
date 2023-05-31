import React, { useEffect, useMemo, useState } from 'react'
import { Box, Pagination, Stack, TextField } from '@mui/material'
import { fetchCharacters } from '../../store/thunk/fetch-characters'
import { useDispatch } from '../../store'
import { useSelector } from 'react-redux'
import {
  nextPage,
  previousPage,
  selectCharacters,
  selectCurrentPage,
  selectTotalPages,
  setPageNumber
} from '../../store/charachers.slice'
import CharacterList from '../../components/CharacterList'
import useDebounce from '../../hooks/useDebounce'
import SearchInput from '../../components/SearchInput'
import { fetchFilms } from '../../store/thunk/fetch-films'
import { fetchSpecies } from '../../store/thunk/fetch-species'
import { fetchPlanets } from '../../store/thunk/fetch-planets'
import CharacterDetailsDialog from '../../components/CharacterDetailsDialog'
import { selectFilms } from '../../store/films.slice'
import { selectPlanets } from '../../store/planets.slice'
import { selectSpecies } from '../../store/species.slice'
import { selectSelectedCharacterId } from '../../store/app.slice'

const Main = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  const dispatch = useDispatch()
  const characters = useSelector(selectCharacters)
  const currentPage = useSelector(selectCurrentPage)
  const totalPages = useSelector(selectTotalPages)
  const films = useSelector(selectFilms)
  const planets = useSelector(selectPlanets)
  const species = useSelector(selectSpecies)
  const selectedCharacterId = useSelector(selectSelectedCharacterId)

  const isDialogDataLoaded = useMemo(() => {
    return [films.length, planets.length, species.length].every((itemLength) => itemLength)
  }, [films, planets, species])

  useEffect(() => {
    dispatch(fetchFilms())
    dispatch(fetchSpecies())
    dispatch(fetchPlanets())
  }, [])

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

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPageNumber(value))
  }

  return (
    <>
      {isDialogDataLoaded && selectedCharacterId !== undefined && <CharacterDetailsDialog />}
      <Box sx={{ px: 0, py: 4 }}>
        <Stack
          direction={{
            sm: 'column',
            md: 'row'
          }}
          gap={2}
          sx={{ justifyContent: 'center', alignItems: 'center', mb: 4 }}
        >
          <SearchInput onChange={(v) => setSearchQuery(v)} value={searchQuery} />
          <Pagination
            color={'warning' as any}
            sx={{ flex: 1 }}
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Stack>
        <CharacterList characters={characters} />
      </Box>
    </>
  )
}

export default Main
