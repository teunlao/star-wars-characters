import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'
import { capitalizeFirstLetter, getImageUrl } from '../../utils/functions'
import { useSelector } from 'react-redux'
import { selectFilms } from '../../store/films.slice'
import { selectPlanets } from '../../store/planets.slice'
import { selectSpecies } from '../../store/species.slice'
import { selectCharacters } from '../../store/charachers.slice'
import { closeDialog, selectIsDialogOpen, selectSelectedCharacterId } from '../../store/app.slice'
import { useDispatch } from '../../store'
import { Box, Button, DialogActions, IconButton, Stack, TextField, useTheme } from '@mui/material'
import { CloseOutlined, EditOutlined } from '@mui/icons-material'

const DialogComponent = () => {
  const isDialogOpen = useSelector(selectIsDialogOpen)
  const characters = useSelector(selectCharacters)
  const films = useSelector(selectFilms)
  const planets = useSelector(selectPlanets)
  const species = useSelector(selectSpecies)
  const selectedCharacterId = useSelector(selectSelectedCharacterId)
  const character = characters[selectedCharacterId]

  const [isEditMode, setIsEditMode] = useState(false)
  const theme = useTheme()

  const dispatch = useDispatch()

  const handleClose = () => {
    setIsEditMode(false)
    dispatch(closeDialog())
  }

  const deserializeStatsList = (list: any[], type: any[]) =>
    list.map((item) => type[item - 1]?.name || type[item - 1]?.title).join(', ')

  const DIALOG_STATS = [
    {
      name: 'Species',
      value: deserializeStatsList(character.species, species) || 'Human'
    },
    { name: 'Gender', value: capitalizeFirstLetter(character.gender), prop: 'gender' },
    { name: 'Birth Year', value: character.birth_year, prop: 'birth_year' },
    { name: 'Height', value: character.height, unit: 'cm', prop: 'height' },
    { name: 'Weight', value: character.mass, unit: 'Kg', prop: 'mass' },
    { name: 'Homeworld', value: planets[character.homeworld - 1]?.name },
    { name: 'Films', value: deserializeStatsList(character.films, films) }
  ]

  return (
    <>
      <Dialog
        open={isDialogOpen}
        onClose={handleClose}
        PaperProps={{
          sx: {
            maxWidth: 'md',
            height: '80vh',
            width: '80vw',
            [theme.breakpoints.down('sm')]: {
              height: '100%',
              width: '100%'
            }
          }
        }}
      >
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" sx={{ alignItems: 'center' }} spacing={2}>
              <Typography variant="h3">{character.name}</Typography>
              <IconButton color="warning" onClick={() => setIsEditMode(!isEditMode)}>
                <EditOutlined />
              </IconButton>
            </Stack>
            <IconButton onClick={handleClose}>
              <CloseOutlined />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack direction={{ md: 'row', sm: 'column' }} spacing={2} sx={{ width: '100%' }}>
            <Box sx={{ flex: 2 }}>
              <img src={getImageUrl(character.id)} alt={character.name} />
            </Box>
            <Stack sx={{ flex: 2, justifyContent: 'space-between', height: '100%' }}>
              <Stack spacing={!isEditMode ? 2 : 1}>
                {DIALOG_STATS.map((stat) => (
                  <Stack
                    key={stat?.name}
                    direction="row"
                    sx={{ alignItems: isEditMode ? 'center' : 'unset' }}
                    spacing={isEditMode ? 2 : 0}
                  >
                    <Typography sx={{ color: theme.palette.warning.main }}>
                      <u>{stat?.name}</u>
                    </Typography>
                    {!isEditMode && `: ${stat.value} ${stat.unit && stat.value !== 'unknown' ? stat.unit : ''}`}
                    {isEditMode && (
                      <TextField
                        variant="standard"
                        sx={{ width: '100%' }}
                        value={stat.value}
                        onChange={(e) => {
                          // TODO
                        }}
                      />
                    )}
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          {isEditMode && (
            <Stack direction="row" gap={2} sx={{ alignItems: 'center', justifyContent: 'center', p: 2 }}>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => {
                  setIsEditMode(false)
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => {
                  alert('Not implemented yet. Maybe some day :)')
                }}
              >
                Save
              </Button>
            </Stack>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DialogComponent
