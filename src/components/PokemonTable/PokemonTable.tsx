import { useState } from "react"
import { useGetPokemonsQuery } from "../../services/pokemon"
import { Spinner } from "../Spinner/Spinner"
import { PokemonTableRow } from "../PokemonTableRow/PokemonTableRow"
import classes from "./PokemonTable.module.css"

export function PokemonTable() {
  const limit = 5
  const [offset, setOffset] = useState(0)

  const { data, isError, isFetching } = useGetPokemonsQuery({
    limit,
    offset,
  })

  if (isFetching) {
    return <Spinner />
  }

  if (isError) {
    return "An error occurred while fetching"
  }

  return (
    <div>
      <table className={classes.PokemonTable__Table}>
        <thead>
          <tr>
            {["Picture", "Name", "Stats"].map((colName) => (
              <th className={classes.PokemonTable__Cell} key={colName}>
                {colName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.results.map((item) => (
            <PokemonTableRow key={item.name} name={item.name} />
          ))}
        </tbody>
      </table>
      <div className={classes.PokemonTable__PageButtons}>
        <button
          onClick={() => {
            const newOffset = offset - limit
            setOffset(newOffset < 0 ? 0 : newOffset)
          }}
        >
          Previous
        </button>
        <span>{`${offset + 1}-${offset + limit}`}</span>
        <button
          onClick={() => {
            const newOffset = offset + limit
            setOffset(newOffset > data!.count ? offset : newOffset)
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}
