import { useEffect, useState } from "react"
import {
  fetchPokemons,
  selectCount,
  selectPokemons,
  selectStatus,
} from "../../features/pokemonTable/pokemonTableSlice"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { Spinner } from "../Spinner/Spinner"
import { PokemonTableRow } from "../PokemonTableRow/PokemonTableRow"
import "./PokemonTable.css"

export function PokemonTable() {
  const dispatch = useAppDispatch()

  const limit = 4
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    dispatch(fetchPokemons(limit, offset))
  }, [offset])

  const status = useAppSelector(selectStatus)
  const pokemons = useAppSelector(selectPokemons)
  const count = useAppSelector(selectCount)

  if (status === "loading") {
    return <Spinner />
  }

  if (status === "failed") {
    return "An error occurred while fetching"
  }

  return (
    <div className="PokemonTable">
      <table className="PokemonTable__Table">
        <thead>
          <tr>
            {["Picture", "Name", "Starred", "Stats"].map((colName) => (
              <th className="PokemonTable__Cell" key={colName}>
                {colName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pokemons.map((item) => (
            <PokemonTableRow key={item.id} pokemon={item} />
          ))}
        </tbody>
      </table>
      <div className="PokemonTable__PageButtons">
        <button
          onClick={() => {
            const newOffset = offset - limit
            setOffset(newOffset < 0 ? 0 : newOffset)
          }}
        >
          Previous
        </button>
        <span className="PokemonTable__ShownRange">{`${offset + 1}-${
          offset + limit
        }`}</span>
        <button
          onClick={() => {
            const newOffset = offset + limit
            setOffset(newOffset > count ? offset : newOffset)
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}
