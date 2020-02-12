import { useRef, useCallback } from "preact/hooks"

export const useHookWithRefCallback = () => {
  const ref = useRef<HTMLElement | null>(null)
  const setRef = useCallback((node: any) => {
    // Save a reference to the node
    ref.current = node
  }, [])
  return [ref, setRef]
}
