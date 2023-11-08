import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../../store/store"
import { Pokemon } from "../../types"
import { getPokemonByName, getPokemons } from "../../services/pokemon"
import {
  readStarredPokemonsFromLocalStorage,
  writeStarredPokemonsToLocalStorage,
} from "./utils"

export interface PokemonTableState {
  count: number
  status: "idle" | "loading" | "failed"
  pokemons: Array<Pokemon>
}

const initialState: PokemonTableState = {
  count: 0,
  status: "idle",
  pokemons: [],
}

export const pokemonTableSlice = createSlice({
  name: "counter",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setPokemons: (state, action: PayloadAction<Array<Pokemon>>) => {
      state.pokemons = action.payload
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload
    },
    setStatus: (state, action: PayloadAction<PokemonTableState["status"]>) => {
      state.status = action.payload
    },
    toggleStar: (state, action: PayloadAction<{ pokemonName: string }>) => {
      let wasPokemonStarred = false
      for (let pokemon of state.pokemons) {
        if (pokemon.name === action.payload.pokemonName) {
          wasPokemonStarred = pokemon.isStarred
          pokemon.isStarred = !pokemon.isStarred
        }
      }

      let starredPokemons = readStarredPokemonsFromLocalStorage()

      if (wasPokemonStarred) {
        starredPokemons = starredPokemons.filter(
          (name) => name !== action.payload.pokemonName,
        )
      } else {
        starredPokemons.push(action.payload.pokemonName)
      }

      writeStarredPokemonsToLocalStorage(starredPokemons)
    },
  },
})

export const { setCount, setPokemons, setStatus, toggleStar } =
  pokemonTableSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.pokemonTable.count
export const selectPokemons = (state: RootState) => state.pokemonTable.pokemons
export const selectStatus = (state: RootState) => state.pokemonTable.status

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const fetchPokemons =
  (limit: number, offset: number): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setStatus("loading"))

    const pokemons: Pokemon[] = []

    try {
      const response = await getPokemons(limit, offset)
      dispatch(setCount(response.count))

      const starredPokemonNames = readStarredPokemonsFromLocalStorage()
      for (let { name: pokemonName } of response.results) {
        const pokemonData = await getPokemonByName(pokemonName)

        pokemons.push({
          id: pokemonData.id,
          name: pokemonData.name,
          stats: pokemonData.stats.map((item) => ({
            name: item.stat.name,
            value: item.base_stat,
          })),
          imageUrl: pokemonData.sprites.front_default,
          isStarred: starredPokemonNames.includes(pokemonData.name),
        })
      }

      dispatch(setPokemons(pokemons))
      dispatch(setStatus("idle"))
    } catch (e) {
      dispatch(setStatus("failed"))
    }
  }

export default pokemonTableSlice.reducer
