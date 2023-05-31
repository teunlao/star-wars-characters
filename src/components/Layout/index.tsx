import { Box } from '@mui/material'
import backgroundImage from '../../assets/img/img.png'
import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        p: 2,
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
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
          filter: 'blur(5px) brightness(0.3)',
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
