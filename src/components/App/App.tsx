import { PokemonTable } from "../PokemonTable/PokemonTable"
import classes from "./App.module.css"

export function App() {
  return (
    <div className={classes.App}>
      <PokemonTable />
    </div>
  )
}
