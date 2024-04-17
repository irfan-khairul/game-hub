import useData from "./useData"
import genres from "../assets/genres.json" // for faking api

export interface Genre {
  id: number
  name: string
  image_background: string
}

const useGenres = () => useData<Genre>("/genres")

export default useGenres
