import { h, Fragment, createRef } from "preact"
import { useEffect, useRef, useState } from "preact/hooks"
import { Container, Text, Box } from "theme-ui"

import Item from "../components/item"
import Menu from "../components/menu"
import { useSoftkey, useNavigation, usePopup } from "../hooks"
import List from "../components/list"

const Portfolio = () => {
  const containerRef = useRef(null)
  const setRef = useRef(null)
  const [showOptions] = usePopup(Menu)
  const [setNavigation, , current] = useNavigation(`Portfolio`, containerRef, `y`)

  const lists = []
  for (let i = 0; i < 10; i += 1) lists.push({ text: `This is content.` })

  const onSearch = () => console.log(`onSearch`)

  const onSettings = () => console.log(`onSettings`)

  const onSync = () => console.log(`onSync`)

  const menus = [
    { text: `Search`, key: `search`, action: onSearch },
    { text: `Settings`, key: `settings`, action: onSettings },
    { text: `Sync`, key: `sync`, action: onSync },
  ]

  const onKeyCenter = () => undefined

  useSoftkey(
    `Portfolio`,
    {
      left: `Go2`,
      onKeyLeft: () => setNavigation(2),
      center: `Select`,
      onKeyCenter,
      right: `Options`,
      onKeyRight: () => showOptions({ menus, containerRef: setRef }),
    },
    [current.type]
  )

  useEffect(() => {
    setNavigation(0)
  }, [])

  return (
    <Fragment>
      <List items={lists} containerRef={containerRef} />
    </Fragment>
  )
}

export default Portfolio
