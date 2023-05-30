import React, { useState, useEffect } from 'react'
import { Grid, Box } from '@mui/material'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [characters, setCharacters] = useState([])

  // Load characters from API
  useEffect(() => {
    // Fetch data here and setCharacters
  }, [])

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      <Box>
        123
        <Grid container spacing={0}>
          {filteredCharacters.map((character) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={character?.id}>
              <Link
                to={`/character/${character?.id}`}
                style={{ textDecoration: 'none' }}
              >
                CharacterCard
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  )
}

export default HomePage
