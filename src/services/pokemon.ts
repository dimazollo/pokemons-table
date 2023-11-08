const baseUrl = "https://pokeapi.co/api/v2/"

export const getPokemonByName = async (
  name: string,
): Promise<GetPokemonByNameResponse> => {
  const data = await fetch(baseUrl + "pokemon/" + name)
  const json = await data.json()
  return json
}

export const getPokemons = async (
  limit: number,
  offset: number,
): Promise<GetPokemonsResponse> => {
  const data = await fetch(baseUrl + `pokemon?limit=${limit}&offset=${offset}`)
  const json = await data.json()
  return json
}

interface GetPokemonsResponse {
  count: number
  next: string
  previous: string | null
  results: Array<{ name: string; url: string }>
}

interface GetPokemonByNameResponse {
  id: number
  name: string
  sprites: {
    front_default: string
    front_shiny: string
    back_default: string
    back_shiny: string
  }
  stats: Array<{
    base_stat: number
    stat: {
      name: string
      url: string
    }
  }>
  height: number
  weight: number
}
