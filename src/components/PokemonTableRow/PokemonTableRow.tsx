import { useGetPokemonByNameQuery } from "../../services/pokemon"
import { Spinner } from "../Spinner/Spinner"
import classes from "./PokemonTableRow.module.css"

export type PokemonTableRowProps = {
  name: string
}

export function PokemonTableRow({ name }: PokemonTableRowProps) {
  const { data, isLoading } = useGetPokemonByNameQuery({ name })

  return (
    <>
      <tr key={name}>
        <td className={classes.PokemonTableRow__DataCell}>
          {isLoading ? (
            <Spinner />
          ) : (
            <img src={data?.sprites.front_default} alt={`image of ${name}`} />
          )}
        </td>
        <td className={classes.PokemonTableRow__DataCell}>{name}</td>
        <td className={classes.PokemonTableRow__DataCell}>
          {!isLoading && (
            <table>
              <tbody>
                {data?.stats.map((item, i) => {
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
          )}
        </td>
      </tr>
    </>
  )
}
