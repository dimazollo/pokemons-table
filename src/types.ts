export interface GetPokemonsArgs {
  limit?: number
  offset?: number
}

export interface GetPokemonsResponse {
  count: number
  next: string
  previous: string | null
  results: Array<{ name: string; url: string }>
}

export interface Pokemon {
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

interface GetPokemonByNameArgs {
  name: string
}
