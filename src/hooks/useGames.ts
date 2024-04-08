import { useEffect, useState } from "react"
import apiClient from "../services/api-client"
import { CanceledError } from "axios"

interface Game {
  id: number
  name: string
}

interface FetchGameResponse {
  count: number
  results: Game[]
}

export default function useGames() {
  const controller = new AbortController()
  const [games, setGames] = useState<Game[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    apiClient
      .get<FetchGameResponse>("/games", { signal: controller.signal })
      .then((res) => {
        console.log(res.data.results)
        setGames(res.data.results)
      })
      .catch((err) => {
        if (err instanceof CanceledError) return
        setError(err.message)
      })

    return () => controller.abort()
  }, [])

  return { games, error }
}
