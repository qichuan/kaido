import { useEffect, useState } from "preact/hooks"
import { RefObject } from "preact"

export function useFocus(
  ref: RefObject<any>,
  onFocusChanged: (isNowFocused: boolean) => void,
  focusedByDefault = false
) {
  const [isFocused, setFocused] = useState(focusedByDefault)

  useEffect(() => {
    const component = ref.current

    const onFocus = () => {
      setFocused(true)
      if (onFocusChanged !== null) onFocusChanged(true)
    }
    const onBlur = () => {
      setFocused(false)
      if (onFocusChanged !== null) onFocusChanged(false)
    }

    component.addEventListener(`focus`, onFocus)
    component.addEventListener(`blur`, onBlur)

    return () => {
      component.removeEventListener(`focus`, onFocus)
      component.removeEventListener(`blur`, onBlur)
    }
  }, [ref])

  return isFocused
}
