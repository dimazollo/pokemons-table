export interface Pokemon {
  id: number
  name: string
  imageUrl: string
  stats: Array<{
    name: string
    value: number
  }>
  isStarred: boolean
}