import axios, { AxiosRequestConfig } from "axios"

export interface FetchResponse<T> {
  count: number
  results: T[]
}

const axiosInstance = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "e75e3e42a52f40c7bf985273e6c23ebb",
  },
})

class APIClient<T> {
  endpoint: string

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((response) => response.data)
  }
}

export default APIClient
