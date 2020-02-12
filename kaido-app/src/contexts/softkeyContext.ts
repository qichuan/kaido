import { createContext } from "preact"

export interface SoftkeyInterface {
  left?: string
  center?: string
  right?: string
  onKeyLeft?: () => void
  onKeyCenter?: () => void
  onKeyRight?: () => void
  onKeyArrowDown?: () => void
  onKeyArrowUp?: () => void
  onKeyArrowLeft?: () => void
  onKeyArrowRight?: () => void
  onKeyBackspace?: () => void
  onKeyboard4?: () => void
  onKeyboard5?: () => void
  onKeyboard6?: () => void
}

type Action = {
  type: `set` | `replace` | `push` | `pop`
  origin?: string
  config?: {}
}

export const SoftkeyReducer = (state: any, action: Action) => {
  let stack
  let current
  switch (action.type) {
    case `set`:
      return { ...state, current: { ...state.current, ...action.config } }
    case `replace`:
      return { ...state, current: { ...action.config } }
    case `push`:
      stack = state.stack || []
      current = state.current
      if (!current) {
        current = { name: action.origin, counter: 1 }
      } else if (current.name !== action.origin) {
        stack.push(current)
        current = { name: action.origin, counter: 1 }
      } else {
        current.counter += 1
      }
      return { stack, current }
    case `pop`:
      stack = state.stack || []
      current = state.current
      if (current.name !== action.origin) {
        // This unusual order of events happens when navigating
        // to a new section from the TOC. Commenting out this
        // code doesn't seem to cause any issues.
        throw new Error(`Unexpected origin: ${action.origin}. Expected: ${current.name}`)
      } else {
        current.counter -= 1
        if (current.counter === 0) {
          current = stack.pop()
        }
      }
      return { stack, current }
    default:
      return state
  }
}

export interface SoftkeyContextProps {
  state: {}
  dispatch: (action: Action) => void
}

export const SoftkeyContext = createContext<SoftkeyContextProps>({} as SoftkeyContextProps)
