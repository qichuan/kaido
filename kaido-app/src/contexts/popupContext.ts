import { createContext } from "preact"
import { StateUpdater } from "preact/hooks/src"

export interface PopupContextProps {
  popupState: any[]
  setPopupState: StateUpdater<any[]>
}

export const PopupContext = createContext<PopupContextProps>({} as PopupContextProps)
