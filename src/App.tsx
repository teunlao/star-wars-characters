import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CharacterDetailPage from './pages/CharacterDetailPage'
import { Box } from '@mui/material'
import Layout from './components/Layout'

function App() {
  return (
    <Box>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route path="character/:id" element={<CharacterDetailPage />} />
        </Routes>
      </Router>
    </Box>
  )
}

export default App
