import { useState, useEffect } from "preact/hooks"
import { useSoftkey } from "./useSoftKey"

export const useNavigation = (origin, containerRef, axis, elementsSelector = `[data-selectable]`) => {
  const [current, setCurrent] = useState({ type: null, index: 0, key: null })

  const getAllElements = () => document.querySelectorAll(elementsSelector)

  const getSelectedElement = () => document.querySelector(`[nav-selected=true]`)

  const getTheIndexOfTheSelectedElement = () => {
    const element = getSelectedElement()
    return element ? parseInt(element.getAttribute(`nav-index`), 10) : 0
  }

  const setNavigation = index => selectElement(getAllElements()[index] || document.body)

  const navigatePrevious = () => {
    const allElements = getAllElements()
    const currentIndex = getTheIndexOfTheSelectedElement()

    const setIndex = currentIndex === 0 ? allElements.length - 1 : currentIndex - 1
    return selectElement(allElements[setIndex] || allElements[0], setIndex)
  }

  const navigateNext = () => {
    const allElements = getAllElements()
    const currentIndex = getTheIndexOfTheSelectedElement()

    const setIndex = currentIndex + 1 > allElements.length - 1 ? 0 : currentIndex + 1
    return selectElement(allElements[setIndex] || allElements[0], setIndex)
  }

  const selectElement = (element, setIndex = 0) => {
    if (element) {
      ;[].forEach.call(getAllElements(), (el, index) => {
        const selectThisElement = el === element
        el.setAttribute(`nav-selected`, selectThisElement)
        el.setAttribute(`nav-index`, index)
        if (el.nodeName === `INPUT`) {
          if (selectThisElement) {
            el.focus()
            el.selectionStart = el.value.length
            el.selectionEnd = el.value.length
          } else {
            el.blur()
          }
        }
      })
      setCurrent({ type: element.tagName, index: setIndex, key: element.getAttribute(`data-selected-key`) })
    } else {
      setNavigation(0)
    }
  }

  const getCurrent = () => {
    const element = getSelectedElement()
    return {
      type: element.tagName,
      index: parseInt(element.getAttribute(`nav-index`), 10),
      key: element.getAttribute(`data-selected-key`),
    }
  }

  const previousKey = axis === `x` ? `onKeyArrowLeft` : `onKeyArrowUp`
  const nextKey = axis === `x` ? `onKeyArrowRight` : `onKeyArrowDown`

  useSoftkey(origin, {
    [previousKey]: navigatePrevious,
    [nextKey]: navigateNext,
  })

  useEffect(() => {
    if (!containerRef.current) return
    const element = getSelectedElement()
    if (!element) return
    if (element.tagName === `INPUT`) return

    // todo: cache the next line since it doesn't change
    const containerRect = containerRef.current.getBoundingClientRect()
    const rect = element.getBoundingClientRect()
    if (rect.bottom > containerRect.bottom) {
      // scroll down
      containerRef.current.scrollTop += rect.bottom - containerRect.bottom
    }
    if (rect.top < containerRect.top) {
      // scroll up
      containerRef.current.scrollTop -= containerRect.top - rect.top
    }
  })

  return [current, setNavigation, getCurrent]
}