import { h } from "preact"
import { useEffect, useRef } from "preact/hooks"
import { Flex, Heading } from "theme-ui"
import { SoftkeyInterface } from "../contexts"

type SoftkeyButtonProps = {
  style: {}
  text?: string
  handler?: () => void
}

const SoftkeyButton: preact.FunctionalComponent<SoftkeyButtonProps> = ({ style, text = ``, handler }) => (
  <Heading as="h5" sx={style} onClick={handler} variant="kaiui.h5">
    {text}
  </Heading>
)

type SoftkeyProps = SoftkeyInterface

type handlerRefProps = {
  SoftLeft?: () => void
  Enter?: () => void
  SoftRight?: () => void
  ArrowDown?: () => void
  ArrowUp?: () => void
  ArrowLeft?: () => void
  ArrowRight?: () => void
  Backspace?: () => void
  4?: () => void
  5?: () => void
  6?: () => void
}

export const Softkey = ({
  left,
  center,
  right,
  onKeyLeft,
  onKeyCenter,
  onKeyRight,
  onKeyArrowDown,
  onKeyArrowUp,
  onKeyArrowLeft,
  onKeyArrowRight,
  onKeyBackspace,
  onKeyboard4,
  onKeyboard5,
  onKeyboard6,
}: SoftkeyProps) => {
  const handlersRef = useRef<handlerRefProps | null>(null)
  handlersRef.current = {
    SoftLeft: onKeyLeft,
    Enter: onKeyCenter,
    SoftRight: onKeyRight,
    ArrowDown: onKeyArrowDown,
    ArrowUp: onKeyArrowUp,
    ArrowLeft: onKeyArrowLeft,
    ArrowRight: onKeyArrowRight,
    Backspace: onKeyBackspace,
    4: onKeyboard4,
    5: onKeyboard5,
    6: onKeyboard6,
  }
  const onKeyDown = (e: KeyboardEvent) => {
    let key = e.key.toString()
    // Simulate the SoftLeft and SoftRight keys on PC
    if (e.shiftKey && key === `ArrowLeft`) key = `SoftLeft`
    if (e.shiftKey && key === `ArrowRight`) key = `SoftRight`

    if (handlersRef.current[key]) {
      handlersRef.current[key](e)
      e.stopPropagation()
      e.preventDefault()
    }
  }

  useEffect(() => {
    document.addEventListener(`keydown`, onKeyDown, true)
    return () => document.removeEventListener(`keydown`, onKeyDown, true)
  }, [])

  return (
    <Flex as="footer" id="softkey" variant="kaiui.softkey">
      <SoftkeyButton key="left" style={{ textAlign: `left` }} text={left} handler={onKeyLeft} />
      <SoftkeyButton
        key="center"
        style={{ width: `7.6rem`, fontWeight: `bold`, textTransform: `uppercase`, textAlign: `center` }}
        text={center}
        handler={onKeyCenter}
      />
      <SoftkeyButton key="right" style={{ textAlign: `right` }} text={right} handler={onKeyRight} />
    </Flex>
  )
}
