import React, { useState, useEffect } from 'react'
import { Grid, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { fetchCharacters } from '../../store/thunk/fetch-characters'
import { useDispatch } from '../../store'
import { useSelector } from 'react-redux'
import {
  nextPage,
  previousPage,
  selectCharacters,
  selectCharactersStatus,
  selectCurrentPage
} from '../../store/charachers.slice'

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const dispatch = useDispatch()
  const characters = useSelector(selectCharacters)
  const status = useSelector(selectCharactersStatus)
  const currentPage = useSelector(selectCurrentPage)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCharacters(currentPage))
    }
  }, [status, dispatch, currentPage])

  const handleNext = () => dispatch(nextPage())

  const handlePrev = () => dispatch(previousPage())

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      <Box>
        123
        <Grid container spacing={0}>
          {filteredCharacters.map((character) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={character?.id}>
              <Link
                to={`/character/${character?.id}`}
                style={{ textDecoration: 'none' }}
              >
                {character.name}
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  )
}

export default HomePage
