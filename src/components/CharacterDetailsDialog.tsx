import React, { useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { capitalizeFirstLetter, getImageUrl } from '../utils/functions'

interface Props {
  characterId: number
  characters: any[]
  films: any[]
  planets: any[]
  species: any[]
  isDialogDataLoaded: boolean
  closeDialog: () => void
}

const DialogComponent: React.FC<Props> = ({
  characterId,
  characters,
  films,
  planets,
  species,
  isDialogDataLoaded,
  closeDialog
}) => {
  const character = characters[characterId]

  const deserializeStatsList = (list: any[], type: any[]) =>
    list.map((item) => type[item - 1]?.name || type[item - 1]?.title).join(', ')

  const DIALOG_STATS = isDialogDataLoaded && [
    {
      name: 'Species',
      value: deserializeStatsList(character.species, species) || 'Human'
    },
    { name: 'Gender', value: capitalizeFirstLetter(character.gender) },
    { name: 'Birth Year', value: character.birth_year },
    { name: 'Height', value: character.height, unit: 'cm' },
    { name: 'Weight', value: character.mass, unit: 'Kg' },
    { name: 'Homeworld', value: planets[character.homeworld - 1].name },
    { name: 'Films', value: deserializeStatsList(character.films, films) }
  ]

  useEffect(() => {
    const closeOnEvent = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDialog()
    }

    window.addEventListener('keydown', closeOnEvent)
    return () => window.removeEventListener('keydown', closeOnEvent)
  }, [closeDialog])

  return (
    <Dialog open={isDialogDataLoaded} onClose={closeDialog}>
      <DialogTitle>{character.name}</DialogTitle>
      <DialogContent>
        {!isDialogDataLoaded ? (
          <CircularProgress />
        ) : (
          <>
            <img src={getImageUrl(character.id)} alt={character.name} />
            {DIALOG_STATS.map((stat) => (
              <Typography key={stat.name}>
                <u>{stat.name}</u>
                {`: ${stat.value} ${
                  stat.unit && stat.value !== 'unknown' ? stat.unit : ''
                }`}
              </Typography>
            ))}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default DialogComponent
