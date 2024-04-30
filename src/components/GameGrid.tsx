import { Box, Button, SimpleGrid, Text } from "@chakra-ui/react"
import React from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import useGames from "../hooks/useGames"
import GameCard from "./GameCard"
import GameCardContainer from "./GameCardContainer"
import GameCardSkeleton from "./GameCardSkeleton"

function GameGrid() {
  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGames()
  const skeletons = [1, 2, 3, 4, 5, 6]

  // if (error) return <Text>{error.message}</Text>

  const fetchedGamesCount =
    data?.pages.reduce((total, page) => total + page.results.length, 0) || 0

  const LoadingButton = () => {
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
      <Button isLoading loadingText="Loading..." marginY={3} />
    )
  }

  return (
    <Box padding={"10px"}>
      <InfiniteScroll
        dataLength={fetchedGamesCount} //This is important field to render the next data
        next={() => fetchNextPage()}
        hasMore={!!hasNextPage} // double '!!' to convert undefined to boolean-false
        loader={<LoadingButton />}
      >
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
          {isLoading &&
            skeletons.map((skeleton) => (
              <GameCardContainer key={skeleton}>
                <GameCardSkeleton></GameCardSkeleton>
              </GameCardContainer>
            ))}
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.results.map((game) => (
                <GameCardContainer key={game.id}>
                  <GameCard game={game} />
                </GameCardContainer>
              ))}
            </React.Fragment>
          ))}
        </SimpleGrid>
      </InfiniteScroll>
    </Box>
  )
}

export default GameGrid
