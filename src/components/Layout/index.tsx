import { Box } from '@mui/material'
import backgroundImage from '../../public/assets/img.png'

const Layout = ({ children }) => {
  return (
    <Box
      sx={{

        width: '100vw',
        minHeight: '100vh',
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
          filter: 'blur(5px) brightness(0.3)', // adjust these values as needed
          zIndex: -1 // keep the image behind the content
        }
      }}
    >
      <Box
        sx={{
          maxWidth: '1200px',
          width: '100%',
          position: 'relative',
          margin: '0 auto'
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default Layout
