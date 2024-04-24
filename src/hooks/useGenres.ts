import { useQuery } from "@tanstack/react-query"
import genres from "../data/genres"
import apiClient, { FetchResponse } from "../services/api-client"
// import useData from "./useData"
// import genres from "../assets/genres.json" // for faking api

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
    queryFn: () =>
      apiClient
        .get<FetchResponse<Genre>>("/genres")
        .then((response) => response.data),
    staleTime: 24 * 60 * 60 * 1000, // 24h
    initialData: { count: genres.length, results: genres },
  })

export default useGenres
