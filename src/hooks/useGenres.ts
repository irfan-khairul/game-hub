import { useQuery } from "@tanstack/react-query"
import ms from "ms"
import genres from "../data/genres"
import APIClient from "../services/api-client"
// import useData from "./useData"
// import genres from "../assets/genres.json" // for faking api

const apiClient = new APIClient<Genre>("/genres")

export interface Genre {
  id: number
  name: string
  image_background: string
}

// const useGenres = () => useData<Genre>("/genres") // use Data hook with axios
// const useGenres = () => ({ data: genres, isLoading: false, error: null }) // use local data
const useGenres = () =>
  useQuery({
    queryKey: ["genres"],
    queryFn: apiClient.getAll,
    staleTime: ms("24h"), // 24h
    initialData: genres,
  })

export default useGenres
