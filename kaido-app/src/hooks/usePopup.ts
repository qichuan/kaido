// import { h } from "preact"
import { useContext } from "preact/hooks"
import { PopupContext } from "../contexts"

export const usePopup = (component: (props: any) => JSX.Element, options = { stack: false }) => {
  const { setPopupState } = useContext(PopupContext)

  const close = () => {
    setPopupState(oldState => {
      const newState = [...oldState]
      newState.pop()
      return newState
    })
  }

  const closeAll = () => {
    setPopupState([])
  }

  const show = (props: any) => {
    setPopupState(oldState => {
      let newState = [...oldState]
      const newPopup = {
        component,
        props: {
          ...props,
          close,
          closeAll,
        },
        options,
        id: Math.random(),
      }
      if (options.stack) {
        newState.push(newPopup)
      } else {
        newState = [newPopup]
      }
      return newState
    })
  }
  return [show]
}
