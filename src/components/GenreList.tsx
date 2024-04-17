import { HStack, Image, List, ListItem, Text } from "@chakra-ui/react"
import useGenres from "../hooks/useGenres"
import getCroppedImage from "../services/image-url"

function GenreList() {
  const { data } = useGenres()
  return (
    <List>
      {data.map((genre) => (
        <ListItem key={genre.id} paddingY={'5px'}>
          <HStack>
            <Image
              boxSize={"32px"}
              borderRadius={8}
              src={getCroppedImage(genre.image_background)}
            />
            <Text fontSize={'lg'}>{genre.name}</Text>
          </HStack>
        </ListItem>
      ))}
    </List>
  )
}

export default GenreList
