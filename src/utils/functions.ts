import { BASE_IMAGE_URL } from './constants.utils'
import { Character } from '../types/Character'

export const getIdParamFromUrl = (url: string) => {
  return parseInt(url?.replace(/\D/g, ''), 10)
}

const mapArrayPropertyToId = (item: string) => getIdParamFromUrl(item)

export const capitalizeFirstLetter = (string: string) => string[0].toUpperCase() + string.slice(1)

export const getImageUrl = (index: any) =>
  typeof index === 'number' || (typeof index === 'string' && Number(index))
    ? `${BASE_IMAGE_URL}${Number(index) + 1}.jpg`
    : ''

export const updateCharactersProperties = (data: any, currentPage: number): Character[] =>
  data.map((character: any, index: number) => ({
    id: getIdParamFromUrl(character.url) - 1,
    ...character,
    homeworld: getIdParamFromUrl(character.homeworld),
    films: character.films.map(mapArrayPropertyToId),
    species: character.species.map(mapArrayPropertyToId)
  }))
