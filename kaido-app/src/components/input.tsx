import { h, RefObject } from "preact"
import { useEffect, useRef } from "preact/hooks"
import { Container, Label, Input as UIInput, useThemeUI } from "theme-ui"

import { useSoftkey, useNavigation } from "../hooks"

type InputProps = {
  label: string
  placeholder: string
  action?: (value: string) => void
  containerRef: RefObject<HTMLDivElement>
  close: () => void
}
const Input = ({ label, placeholder, action, containerRef, close }: InputProps) => {
  const { theme } = useThemeUI()
  const { colors } = theme

  const inputRef = useRef<HTMLInputElement>(null!)

  const [setNavigation] = useNavigation(`Input`, containerRef, `y`, `input`)

  const onKeyCenter = () => {
    if (action) {
      const { value }: any = inputRef.current
      if (value !== `` && value !== undefined) {
        action(value)
        close()
      }
    }
  }

  useSoftkey(`Input`, {
    center: `Save`,
    onKeyCenter,
    right: `Cancel`,
    onKeyRight: close,
    onKeyBackspace: close,
  })

  useEffect(() => setNavigation(0), [])

  useEffect(() => {
    if (inputRef.current) {
      const selected = inputRef.current.getAttribute(`data-input-selected`)
      const containerEl = containerRef.current
      const labelEl = containerEl.querySelector<HTMLInputElement>(`label`)

      if (selected && selected === `true`) {
        containerEl.style.backgroundColor = colors.primary
        labelEl.style.color = colors.textInvert
      } else {
        containerEl.style.backgroundColor = colors.background
        labelEl.style.color = colors.text
      }
    }
  }, [inputRef.current])

  return (
    <Container ref={containerRef} sx={{ p: 3 }}>
      <Label variant="kaiui.h4" sx={{ mb: 2 }}>
        {label}
      </Label>
      <UIInput type="text" ref={inputRef} placeholder={placeholder} data-input-selectable variant="kaiui.input" />
    </Container>
  )
}

export default Input
