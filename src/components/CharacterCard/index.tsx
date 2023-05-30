import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import { Character } from '../../types/Character'

interface CharacterCardProps {
  character: Character
}
const CharacterCard = ({ character }: CharacterCardProps) => {
  return (
    <Card sx={{ minWidth: 275, margin: 1 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {character.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {character.description}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CharacterCard
