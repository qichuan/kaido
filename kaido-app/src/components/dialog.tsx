import { h } from "preact"
import { memo } from "preact/compat"
import { Container, Text } from "theme-ui"

import Title from "./title"
import { useSoftkey } from "../hooks"

type DialogProps = {
  title: string
  content: string
  center?: string
  right?: string
  onDialogKeyRight?: () => void
  close: () => void
}

const Dialog = ({ title, content, center = `Okay`, right, onDialogKeyRight, close }: DialogProps) => {
  const onKeyRight = () => {
    if (onDialogKeyRight) onDialogKeyRight()
    close()
  }

  useSoftkey(`Dialog`, {
    center,
    onKeyCenter: close,
    right,
    onKeyRight,
  })

  return (
    <Container>
      <Title text={title} />
      <Text as="p" variant="kaiui.p.sec" sx={{ p: 3, lineHeight: 1.25 }}>
        {content}
      </Text>
    </Container>
  )
}

export default memo(Dialog)
