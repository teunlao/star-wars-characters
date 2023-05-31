import { TextField, useTheme } from '@mui/material'
import React from 'react'

interface SearchInputProps {
  onChange: (value: string) => void
  value: string
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
  const theme = useTheme()

  return (
    <TextField
      placeholder={'Find your character...'}
      sx={{
        [theme.breakpoints.down('md')]: {
          width: '100%'
        },
        flex: 2,
        minWidth: '320px',
        '& .MuiInputLabel-root.Mui-focused': {
          color: `${theme.palette.warning.main}`
        },
        '& .MuiOutlinedInput-root': {
          boxShadow: '0 0 6px white',
          '&:hover fieldset': {
            transition: 'all .2s ease-in-out',
            borderColor: `${theme.palette.warning.main}`,
            boxShadow: `0 0 10px ${theme.palette.warning.main}`,
            color: `${theme.palette.warning.main}`
          },
          '&.Mui-focused fieldset': {
            borderColor: `${theme.palette.warning.main}`,
            boxShadow: `0 0 10px ${theme.palette.warning.main}`,
            color: 'yellow'
          },
          '& .MuiOutlinedInput-input': {
            color: 'white'
          }
        }
      }}
      onChange={(e) => onChange(e.target.value)}
      value={value}
    />
  )
}

export default SearchInput
