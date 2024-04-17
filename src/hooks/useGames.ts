import useData from "./useData"
import games from "../assets/games.json" // for faking api

export interface Platform {
  id: number
  name: string
  slug: string
}

export interface Game {
  id: number
  name: string
  background_image: string
  parent_platforms: { platform: Platform }[]
  metacritic: number
}

const useGames = () => useData<Game>("/games", games)

export default useGames
