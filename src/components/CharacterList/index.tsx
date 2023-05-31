import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import CharacterCard from '../CharacterCard'
import { Character } from '../../types/Character'
import { useSelector } from 'react-redux'
import { selectCharactersStatus } from '../../store/charachers.slice'

interface CharacterListProps {
  characters: Character[]
}

const CharacterList = ({ characters }: CharacterListProps) => {
  const status = useSelector(selectCharactersStatus)

  return (
    <Grid container spacing={2}>
      {characters.length && status !== 'loading' ? (
        characters.map((character) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={character.id}>
            <CharacterCard character={character} />
          </Grid>
        ))
      ) : (
        <Box
          sx={{
            width: '100vw',
            height: 'calc(100vh - 140px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {status === 'loading' ? (
            <Typography variant="h3">Please wait...</Typography>
          ) : (
            <Typography variant="h3">No characters found!</Typography>
          )}
        </Box>
      )}
    </Grid>
  )
}

export default CharacterList
