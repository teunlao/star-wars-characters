import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import CharacterCard from '../CharacterCard'
import { Character } from '../../types/Character'
import { useSelector } from 'react-redux'
import { selectCharactersStatus } from '../../store/charachers.slice'
import { useDispatch } from '../../store'
import {
  openDialog,
  selectSelectedCharacterId,
  setCharacterId
} from '../../store/app.slice'

interface CharacterListProps {
  characters: Character[]
}

const CharacterList = ({ characters }: CharacterListProps) => {
  const status = useSelector(selectCharactersStatus)
  const selectedCharacterId = useSelector(selectSelectedCharacterId)
  const dispatch = useDispatch()

  const handleClick = (id: number) => {
    dispatch(setCharacterId(id))
    dispatch(openDialog())
  }

  return (
    <Grid container spacing={2}>
      {characters.length && status !== 'loading' ? (
        characters.map((character, index) => (
          <Grid
            onClick={() => handleClick(index)}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={character.id}
            sx={{ justifyContent: 'center', display: 'flex' }}
          >
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
