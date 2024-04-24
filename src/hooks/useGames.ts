import { GameQuery } from "../App"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Platform } from "./usePlatforms"
import APIClient, { FetchResponse } from "../services/api-client"
// import games from "../assets/games.json" // for faking api

const apiClient = new APIClient<Game>("/games")

export interface Game {
  id: number
  name: string
  background_image: string
  parent_platforms: { platform: Platform }[]
  metacritic: number
  rating_top: number
}

const useGames = (gameQuery: GameQuery) =>
  useInfiniteQuery<FetchResponse<Game>, Error>({
    queryKey: ["games", gameQuery],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          genres: gameQuery.genre?.id,
          parent_platforms: gameQuery.platform?.id,
          ordering: gameQuery.sortOrder,
          search: gameQuery.searchText,
          page: pageParam,
        },
      }),
    getNextPageParam: (lastpage, allPages) => {
      return lastpage.next ? allPages.length + 1 : undefined
    },
    staleTime: 24 * 60 * 60 * 1000, // 24h
    retry: false,
  })

// useData<Game>(
//   "/games",
//   {
//     params: {
//       genres: gameQuery.genre?.id,
//       parent_platforms: gameQuery.platform?.id,
//       ordering: gameQuery.sortOrder,
//       search: gameQuery.searchText,
//     },
//   },
//   [gameQuery]
// )

export default useGames
