import { h, Fragment } from "preact"
import { useEffect, useRef, useState } from "preact/hooks"
import { Container, Text, Box } from "theme-ui"

import Item from "../components/item"
import { useSoftkey, useNavigation, usePopup } from "../hooks"

const PortfolioPopup = ({ close }) => {
  useSoftkey(
    `PortfolioMessage`,
    {
      center: `Okay`,
      onKeyCenter: close,
    },
    []
  )

  return (
    <Container>
      <Box>Portfolio Message</Box>
      <Text>Hello My Portfolio</Text>
    </Container>
  )
}

const Portfolio = () => {
  const containerRef = useRef(null)
  const [showPortfolioPopup] = usePopup(PortfolioPopup)
  const [current, setNavigation, getCurrent] = useNavigation(`Portfolio`, containerRef, `y`)

  const createList = () => {
    const list = []
    for (let i = 0; i < 10; i += 1) list.push(<Item text="This is content" />)
    return list
  }

  useSoftkey(
    `Portfolio`,
    {
      left: `Go2`,
      onKeyLeft: () => setNavigation(2),
      center: `Select`,
      onKeyCenter: () => { showPortfolioPopup() },
      onKeyRight: () => undefined,
      right: `Options`,
    },
    [current.type]
  )

  useEffect(() => {
    setNavigation(0)
    showPortfolioPopup({})
  }, [])

  return (
    <Fragment>
      <Container ref={containerRef} variant="kaiui.list">
        {createList()}
      </Container>
    </Fragment>
  )
}

export default Portfolio
