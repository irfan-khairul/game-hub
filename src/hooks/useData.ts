import { useEffect, useState } from "react"
import { AxiosRequestConfig, CanceledError } from "axios"
import apiClient from "../services/api-client"

interface FetchResponse<T> {
  count: number
  results: T[]
}

export default function useData<T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  deps?:      any[]
  // fakeApi?: T[]
) {
  const [data, setData] = useState<T[]>([])
  const [error, setError] = useState("")
  const [isLoading, setLoading] = useState(false)

  useEffect(
    () => {
      const controller = new AbortController()

      setLoading(true)
      apiClient
        .get<FetchResponse<T>>(endpoint, {
          signal: controller.signal,
          ...requestConfig,
        })
        .then((res) => {
          setLoading(false)
          setData(res.data.results)
          // console.log(res.data.results)
        })
        .catch((err) => {
          if (err instanceof CanceledError) return
          // if (err.response.status === 404) {
          //   // console.clear()
          //   // console.error(
          //   //   "GET method failed. Revert to fake-api.ts.",
          //   //   "To resolve, please check BaseURL in api-client.ts"
          //   // )
          //   setLoading(false)
          //   return setData(fakeApi)
          // }
          setError(err.message)
          setLoading(false)
        })

      return () => controller.abort()
    },
    deps ? [...deps] : []
  )

  return { data, error, isLoading }
}
