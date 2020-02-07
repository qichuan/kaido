import { h } from "preact"
import { useEffect, useRef } from "preact/hooks"
import { Container, Text } from "theme-ui"

import Button from "../components/button"
import { useNavigation } from "../hooks/useNavigation"

const Portfolio: preact.FunctionalComponent = () => {
  const containerRef = useRef(null)
  const [current, setNavigation, getCurrent] = useNavigation(`Search`, containerRef, `y`)

  useEffect(() => {
    setNavigation(0)
  }, [])

  const createList = () => {
    const list = []
    for (let i = 0; i < 10; i += 1)
      list.push(
        <Container data-selectable>
          <Text>This is a content</Text>
        </Container>
      )
    return list
  }
  return <Container ref={containerRef}>{createList()}</Container>
}

export default Portfolio
