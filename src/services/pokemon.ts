import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<
      GetPokemonByNameResponse,
      GetPokemonByNameArgs
    >({
      query: ({ name }) => `pokemon/${name}`,
    }),

    getPokemons: builder.query<GetPokemonsResponse, GetPokemonsArgs>({
      query: ({ limit = 10, offset = 0 }) => {
        return `pokemon?limit=${limit}&offset=${offset}`
      },
    }),
  }),
})

interface GetPokemonsArgs {
  limit?: number
  offset?: number
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

interface GetPokemonByNameArgs {
  name: string
}
export const { useGetPokemonByNameQuery, useGetPokemonsQuery } = pokemonApi
