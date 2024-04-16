import { useEffect, useState } from "react"
import apiClient from "../services/api-client"
import { CanceledError } from "axios"
// faking api to save request...
import fakeApi from "../assets/games.json"

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

interface FetchGameResponse {
  count: number
  results: Game[]
}

export default function useGames() {
  const [isLoading, setLoading] = useState(false)
  const [games, setGames] = useState<Game[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    const controller = new AbortController()

    setLoading(true)
    apiClient
      .get<FetchGameResponse>("/games", { signal: controller.signal })
      .then((res) => {
        setLoading(false)
        setGames(res.data.results)
      })
      .catch((err) => {
        if (err instanceof CanceledError) return
        if (err.response.status === 404) {
          // console.clear()
          console.error("GET method failed. Revert to fake-api.ts")
          console.error("To resolve, please check BaseURL in api-client.ts")
          setLoading(false)
          return setGames(fakeApi)
        }
        setError(err.message)
        setLoading(false)
      })

    return () => controller.abort()
  }, [])

  return { games, error ,isLoading}
}
