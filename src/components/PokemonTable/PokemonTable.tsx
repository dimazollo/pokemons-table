import { useEffect, useRef, useState } from "react"
import classes from "./PokemonTable.module.css"
import {
  fetchPokemons,
  selectCount,
  selectPokemons,
  selectStatus,
} from "../../features/pokemonTable/pokemonTableSlice"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { Spinner } from "../Spinner/Spinner"
import { PokemonTableRow } from "../PokemonTableRow/PokemonTableRow"

export function PokemonTable() {
  const dispatch = useAppDispatch()

  const limit = 5
  const [offset, setOffset] = useState(0)

  const mounted = useRef(false)

  useEffect(() => {
    if (mounted.current) {
      dispatch(fetchPokemons(limit, offset))
    } else {
      mounted.current = true
    }
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
    <div>
      <table className={classes.PokemonTable__Table}>
        <thead>
          <tr>
            {["Picture", "Name", "Starred", "Stats"].map((colName) => (
              <th className={classes.PokemonTable__Cell} key={colName}>
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
            setOffset(newOffset > count ? offset : newOffset)
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}
