import { h } from "preact"
import { Box, Flex, Container, Text } from "theme-ui"
import { useContext, useState } from "preact/hooks"

import Separator from "./separator"
import { useNavKeys } from "../hooks"
import { UIComponentsContext } from "../contexts"

type MenuProps = {
  open: boolean
}

const Menu: preact.FunctionalComponent<MenuProps> = ({ open }) => {
  const { texts } = useContext(UIComponentsContext)
  const { menus } = texts

  const [isOpened, setOpened] = useState(false)

  useNavKeys(
    {
      Escape: () => setOpened(false),
      SoftLeft: () => setOpened(false),
      SoftRight: () => setOpened(true),
      Backspace: () => setOpened(false),
    },
    { capture: true, stopPropagation: true }
  )

  return isOpened ? (
    <Box id="menu" variant="kaiui.menu">
      <Flex id="menu-options" variant="kaiui.menu.options">
        <Separator text="Options" />
        {menus.map((menu: string, index: number) => (
          <Container tabIndex={0}>
            <Text>{menu}</Text>
          </Container>
        ))}
      </Flex>
      <Box id="menu-overlay" variant="kaiui.menu.overlay" />
    </Box>
  ) : null
}

export default Menu
