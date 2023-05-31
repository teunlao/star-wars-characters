import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'dark'
  },
  typography: {
    fontFamily: '"Star Jedi", sans-serif',
    h1: {
      fontSize: '2rem'
    },
    h2: {
      fontSize: '1.75rem'
    },
    h3: {
      fontSize: '1.5rem'
    },
    body1: {
      fontSize: '1rem'
    },
    body2: {
      fontSize: '0.875rem'
    },
    button: {
      fontSize: '0.875rem'
    }
  }
})

export default theme
