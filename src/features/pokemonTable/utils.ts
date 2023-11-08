export const starredPokemonsLSKey = "starredPokemons"

export const readStarredPokemonsFromLocalStorage = () => {
  const starredPokemonsFromLS = localStorage.getItem(starredPokemonsLSKey)

  let starredPokemons: string[] = []

  if (starredPokemonsFromLS) {
    try {
      starredPokemons = JSON.parse(starredPokemonsFromLS)
    } catch (e) {
      // remove invalid key-value pair from local storage
      localStorage.removeItem(starredPokemonsLSKey)
    }
  }

  return starredPokemons
}

export const writeStarredPokemonsToLocalStorage = (pokemonNames: string[]) => {
  localStorage.setItem(starredPokemonsLSKey, JSON.stringify(pokemonNames))
}
