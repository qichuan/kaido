import { h } from "preact"
import { Box, Flex, Container, Text, Heading, Link } from "theme-ui"
import { useEffect } from "preact/hooks"
import { useSoftkey, useNavigation, useHookWithRefCallback } from "../hooks"

type MenuProps = {
  menus: string[]
  open: boolean
  onSelect: (id: string) => void
}

const Menu: preact.FunctionalComponent<MenuProps> = ({ menus, open, onSelect }) => {
  const [menuRef] = useHookWithRefCallback()
  const [currentMenu, setNavigationMenu, getCurrentMenu] = useNavigation(`Menu`, menuRef, `y`, `menu`)

  useSoftkey(`Menu`, {
    center: `Select`,
    onKeyCenter: () => undefined,
  })

  useEffect(() => {
    if (open) {
      setNavigationMenu(1)
    }
  }, [open])

  return (
    open && (
      <Box id="menu" variant="kaiui.menu">
        <Flex id="menu-options" ref={menuRef} variant="kaiui.menu.options">
          <Container sx={{ display: `flex`, alignItems: `center`, bg: `gray20`, height: `buttonHeight`, p: 3 }}>
            <Heading as="h1" variant="kaiui.h1" sx={{ width: `full`, textAlign: `center` }}>
              Options
            </Heading>
          </Container>
          {menus.map((menu: string) => (
            <Container
              // Convert menu text to id with format as lower case and dash in between as space
              onClick={() => handleSelect(menu.replace(/\s+/g, `-`).toLowerCase())}
              onFocus={() => handleFocusChange(true)}
              onBlur={() => handleFocusChange(false)}
              data-menu-selectable
              variant="kaiui.item"
              sx={{ height: `menuItemHeight` }}
            >
              <Text as="p" variant="kaiui.p.pri">
                {menu}
              </Text>
            </Container>
          ))}
        </Flex>
        <Box id="menu-overlay" variant="kaiui.menu.overlay" />
      </Box>
    )
  )
}

export default Menu
