import { createContext } from "preact"

const SET_SOFTKEY_TEXTS = `SET_SOFTKEY_TEXTS`
const SET_MENU_TEXTS = `SET_MENU_TEXTS`

type State = {}
type Action = { type: `SET_SOFTKEY_TEXTS`; texts: {} } | { type: `SET_MENU_TEXTS`; texts: {} }

export const UIComponentsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_SOFTKEY_TEXTS:
      return {
        ...state,
        softKeys: action.texts.softKeys,
      }
    case SET_MENU_TEXTS:
      return {
        ...state,
        menus: action.texts.menus,
      }
    default:
      throw new Error(`You have to specify an action type for the UI components reducer.`)
  }
}

type UIComponentsContextProps = {
  texts: {}
  dispatch: (action: Action) => void
}

export const UIComponentsContext = createContext<UIComponentsContextProps>({} as UIComponentsContextProps)
