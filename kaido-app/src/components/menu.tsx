import { h, RefObject } from "preact"
import { useEffect } from "preact/hooks"
import { Container, Text } from "theme-ui"

import { useSoftkey, useNavigation } from "../hooks"
import Title from "./title"

type MenuItem = {
  text: string
  key: string
  action: () => void
  confirm?: boolean
}

type MenuProps = {
  menus: MenuItem[]
  containerRef: RefObject<HTMLDivElement>
  close: () => void
}

const Menu = ({ menus, containerRef, close }: MenuProps) => {
  const [setNavigation, getCurrent] = useNavigation(`Menu`, containerRef, `y`, `menu`)

  const onKeyCenter = () => {
    const { index } = getCurrent()
    const menuIndex = index
    const menu = menus[menuIndex]

    if (menu.action) {
      menu.action()
      if (!menu.confirm) close()
    }
  }

  useSoftkey(
    `Menu`,
    {
      center: `Select`,
      onKeyCenter,
      right: `Close`,
      onKeyRight: close,
      onKeyBackspace: close,
    },
    []
  )

  useEffect(() => setNavigation(0), [])

  return (
    <Container ref={containerRef}>
      <Title text="Options" />
      {menus.length &&
        menus.map(menu => (
          <Container
            data-menu-selectable
            data-menu-selected-key={menu.key}
            variant="kaiui.item"
            sx={{ height: `menuItemHeight` }}
          >
            <Text as="p" variant="kaiui.p.pri">
              {menu.text}
            </Text>
          </Container>
        ))}
    </Container>
  )
}

export default Menu
