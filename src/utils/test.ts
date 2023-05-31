import { getIdParamFromUrl, capitalizeFirstLetter, getImageUrl, updateCharactersProperties } from './functions'
import { BASE_IMAGE_URL } from './constants.utils'

describe('Utilities', () => {
  describe('getIdParamFromUrl', () => {
    test('returns the id from a url', () => {
      const url = 'https://swapi.dev/api/people/1/'
      const result = getIdParamFromUrl(url)
      expect(result).toBe(1)
    })
  })

  describe('capitalizeFirstLetter', () => {
    test('capitalizes the first letter of a string', () => {
      const str = 'test'
      const result = capitalizeFirstLetter(str)
      expect(result).toBe('Test')
    })
  })

  describe('getImageUrl', () => {
    test('returns the correct image URL for a number', () => {
      const index = 1
      const result = getImageUrl(index)
      expect(result).toBe(`${BASE_IMAGE_URL}2.jpg`)
    })

    test('returns the correct image URL for a numeric string', () => {
      const index = '1'
      const result = getImageUrl(index)
      expect(result).toBe(`${BASE_IMAGE_URL}2.jpg`)
    })

    test('returns an empty string for a non-numeric string', () => {
      const index = 'test'
      const result = getImageUrl(index)
      expect(result).toBe('')
    })
  })

  describe('updateCharactersProperties', () => {
    test('updates character properties correctly', () => {
      const characters = [
        {
          url: 'https://swapi.dev/api/people/1/',
          homeworld: 'https://swapi.dev/api/planets/1/',
          films: ['https://swapi.dev/api/films/1/'],
          species: ['https://swapi.dev/api/species/1/']
        }
      ]
      const result = updateCharactersProperties(characters, 1)
      expect(result[0].id).toBe(0)
      expect(result[0].homeworld).toBe(1)
      expect(result[0].films).toEqual([1])
      expect(result[0].species).toEqual([1])
    })
  })
})
