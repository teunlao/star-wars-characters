import React from 'react'
import { Card, CardContent, Typography, useTheme } from '@mui/material'
import { Character } from '../../types/Character'
import { getImageUrl } from '../../utils/functions'

interface CharacterCardProps {
  character: Character
}
const CharacterCard = ({ character }: CharacterCardProps) => {
  const theme = useTheme()

  return (
    <Card
      sx={{
        margin: 1,
        minWidth: '275px',
        [theme.breakpoints.down('sm')]: {
          maxWidth: '400px'
        },
        cursor: 'pointer',
        transition: 'transform .2s, box-shadow .3s',
        boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
        '&:hover': {
          boxShadow: `0 16px 70px -25.125px ${theme.palette.warning.main}`,
          border: `2px solid ${theme.palette.warning.main}`,
          transform: 'scale(1.05)'
        }
      }}
    >
      <img src={getImageUrl(character.id)} alt="character-portrait" id={character.id.toString()} />
      <CardContent>
        <Typography variant="body1" component="div">
          {character.name}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CharacterCard
