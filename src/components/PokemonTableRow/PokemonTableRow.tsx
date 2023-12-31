import { Pokemon } from "../../types"
import { Star } from "../Star/Star"
import { useAppDispatch } from "../../hooks/hooks"
import { toggleStar } from "../../features/pokemonTable/pokemonTableSlice"
import "./PokemonTableRow.css"

export type PokemonTableRowProps = {
  pokemon: Pokemon
}

export function PokemonTableRow({ pokemon }: PokemonTableRowProps) {
  const dispatch = useAppDispatch()

  return (
    <>
      <tr>
        <td className="PokemonTableRow__DataCell">
          <img src={pokemon.imageUrl} alt={`image of ${pokemon.name}`} />
        </td>
        <td className="PokemonTableRow__DataCell">{pokemon.name}</td>
        <td className="PokemonTableRow__DataCell">
          <Star
            id={pokemon.name}
            checked={pokemon.isStarred}
            onClick={() => {
              dispatch(toggleStar({ pokemonName: pokemon.name }))
            }}
          />
        </td>
        <td className="PokemonTableRow__DataCell">
          <table>
            <tbody>
              {pokemon.stats.map((item, i) => (
                <tr key={item.name}>
                  <td>{item.name}:</td>
                  <td>{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </td>
      </tr>
    </>
  )
}
