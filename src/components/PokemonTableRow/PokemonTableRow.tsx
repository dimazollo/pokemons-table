import classes from "./PokemonTableRow.module.css"
import { Pokemon } from "../../types"

export type PokemonTableRowProps = {
  pokemon: Pokemon
}

export function PokemonTableRow({ pokemon }: PokemonTableRowProps) {
  return (
    <>
      <tr>
        <td className={classes.PokemonTableRow__DataCell}>
          <img
            src={pokemon.sprites.front_default}
            alt={`image of ${pokemon.name}`}
          />
        </td>
        <td className={classes.PokemonTableRow__DataCell}>{pokemon.name}</td>
        <td className={classes.PokemonTableRow__DataCell}>
          <table>
            <tbody>
              {pokemon.stats.map((item, i) => {
                // Restricts stats number for demo purposes
                if (i > 2) {
                  return
                }

                return (
                  <tr key={item.stat.name}>
                    <td>{item.stat.name}:</td>
                    <td>{item.base_stat}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </td>
      </tr>
    </>
  )
}
