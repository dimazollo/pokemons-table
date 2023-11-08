import "./Star.css"

interface StarProps {
  id: string
  checked: boolean
  onClick: () => void
}

export function Star({ id, checked, onClick }: StarProps) {
  return (
    <div className="Star">
      <input
        type="checkbox"
        name={`pokemonId-${id}`}
        id={`pokemonId-${id}`}
        checked={checked}
        onChange={onClick}
      />
      <label htmlFor={`pokemonId-${id}`}></label>
    </div>
  )
}
