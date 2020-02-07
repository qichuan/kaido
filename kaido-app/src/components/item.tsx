import { h } from "preact"
import { Container, Text } from "theme-ui"

type ItemProps = {
  type?: `singleLine` | `twoLines`
  text: string
  subText?: string
  onSelect: () => void
}

const Item: preact.FunctionalComponent<ItemProps> = ({ type = `singleLine`, text, subText, onSelect }) => (
  <Container onClick={onSelect} data-nav-selectable variant="kaiui.item">
    <Text as="p" variant="kaiui.p.pri">
      {text}
    </Text>
    {type === `twoLines` && (
      <Text as="p" variant="kaiui.p.sec">
        {subText}
      </Text>
    )}
  </Container>
)

export default Item
