import { h } from "preact"
import { useRef, useContext, useEffect } from "preact/hooks"
import { Box, Flex, Container, Text, Heading } from "theme-ui"

import { useNavKeys } from "../hooks"
import { AppContext } from "../contexts"

type MenuProps = {
  menus: string[]
  onSelect: (id: string) => void
}

const Menu: preact.FunctionalComponent<MenuProps> = ({ menus, onSelect }) => {
  const { dispatch } = useContext(AppContext)
  const forwardedRef = useRef<HTMLDivElement | null>(null)

  const handleSelect = (id: string) => {
    onSelect(id)
  }

  const handleFocusChange = (isNowFocused: boolean) => undefined

  useNavKeys({
    ArrowDown: () => undefined,
    ArrowUp: () => undefined,
  })

  useEffect(() => {
    const selectedRef = forwardedRef.current!.getAttribute(`data-nav-selected`)

    if (selectedRef && selectedRef === `true`) {
      dispatch({
        type: `SET_SOFTKEY_TEXTS`,
        layoutTexts: {
          softKeys: [``, `Select`, ``],
        },
      })
    }
  }, [forwardedRef.current])

  return (
    <Box id="menu" variant="kaiui.menu">
      <Flex id="menu-options" variant="kaiui.menu.options">
        <Container sx={{ display: `flex`, alignItems: `center`, bg: `gray20`, height: `buttonHeight`, p: 3 }}>
          <Heading as="h1" variant="kaiui.h1" sx={{ width: `full`, textAlign: `center` }}>
            Options
          </Heading>
        </Container>
        {menus.map((menu: string) => (
          <Container
            ref={forwardedRef}
            // Convert menu text to id with format as lower case and dash in between as space
            onClick={() => handleSelect(menu.replace(/\s+/g, `-`).toLowerCase())}
            onFocus={() => handleFocusChange(true)}
            onBlur={() => handleFocusChange(false)}
            data-nav-selectable
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
}

export default Menu
