import { h } from "preact"
import { Container, Text } from "theme-ui"

type ItemProps = {
  text: string
  onSelect: () => void
}

const Item: preact.FunctionalComponent<ItemProps> = ({ text, onSelect }) => (
  <Container onClick={onSelect} data-nav-selectable variant="kaiui.item">
    <Text as="p" variant="kaiui.p.pri">
      {text}
    </Text>
  </Container>
)

export default Item
