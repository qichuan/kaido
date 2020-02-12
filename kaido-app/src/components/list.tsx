import { h, RefObject } from "preact"
import { Container, Box } from "theme-ui"
import Item from "./item"

type ListProps = {
  items: []
  containerRef: RefObject<HTMLDivElement> | null | undefined
  empty?: string
}

const List: preact.FunctionalComponent<ListProps> = ({ items, containerRef, empty = `Empty list.` }) => (
  <Container ref={containerRef} variant="kaiui.list">
    {items.length ? items.map(item => <Item text={item.text} />) : <Box>{empty}</Box>}
  </Container>
)

export default List
