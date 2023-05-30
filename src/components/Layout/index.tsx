import { Box } from '@mui/material'
import backgroundImage from '../../public/assets/img.png'

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        position: 'relative', // relative positioning for ::after pseudo-element
        '::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(3px) brightness(0.3)', // adjust these values as needed
          zIndex: -1 // keep the image behind the content
        }
      }}
    >
      {children}
    </Box>
  )
}

export default Layout
