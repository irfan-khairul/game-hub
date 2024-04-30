import { Button, Text } from "@chakra-ui/react"
import React from "react"

interface Props {
  error: Error | null
  isFetchingNextPage: boolean
  fetchNextPage: () => void
}

const LoadingButton = ({ error, isFetchingNextPage, fetchNextPage }: Props) => {
  return error ? (
    <React.Fragment>
      <Button
        marginY={3}
        onClick={() => fetchNextPage()}
        isLoading={isFetchingNextPage}
        loadingText="Loading..."
      >
        Retry
      </Button>
      <Text>{error.message}</Text>
    </React.Fragment>
  ) : (
    <Button isLoading loadingText="Loading..." marginY={5} />
  )
}

export default LoadingButton
