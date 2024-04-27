import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { BsChevronDown } from "react-icons/bs"
import usePlatforms from "../hooks/usePlatforms"
import useGameQueryStore from "../store"

function PlatformSelector() {
  const { data, error } = usePlatforms()
  const setSelectedPlatform = useGameQueryStore((s) => s.setPlatformId)
  const selectedPlatformId = useGameQueryStore((s) => s.gameQuery.platformId)
  const selectedPlatform = data?.results.find(
    (p) => p.id === selectedPlatformId
  )

  if (error) return null

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedPlatform?.name || "Platforms"}
      </MenuButton>
      <MenuList>
        {data?.results.map((platform) => (
          <MenuItem
            onClick={() => setSelectedPlatform(platform.id)}
            key={platform.id}
          >
            {platform.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default PlatformSelector
