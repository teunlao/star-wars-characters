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
      placeholder={'Search your character...'}
      sx={{
        [theme.breakpoints.down('md')]: {
          width: '100%'
        },
        flex: 2,
        minWidth: '320px',
        '& .MuiInputLabel-root.Mui-focused': {
          color: 'yellow'
        },
        '& .MuiOutlinedInput-root': {
          boxShadow: '0 0 6px white',
          '&:hover fieldset': {
            transition: 'all .2s ease-in-out',
            borderColor: 'yellow',
            boxShadow: '0 0 10px #FFC107',
            color: `${theme.palette.warning.main}`
          },
          '&.Mui-focused fieldset': {
            borderColor: 'yellow',
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
