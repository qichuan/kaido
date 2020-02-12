import { RefObject } from "preact"
import { useState, useEffect } from "preact/hooks"
import { useSoftkey } from "./useSoftKey"

type currentState = {
  type: string | null
  index: number
  key: string | null
}

export const useNavigation = (
  origin: string,
  containerRef: RefObject<any>,
  axis: `x` | `y`,
  elementsSelector = `nav`
) => {
  const [current, setCurrent] = useState<currentState>({ type: null, index: 0, key: null })

  const getAllElements = () => document.querySelectorAll<HTMLElement>(`[data-${elementsSelector}-selectable]`)

  const getSelectedElement = () => document.querySelector<HTMLElement>(`[data-${elementsSelector}-selected=true]`)

  const getTheIndexOfTheSelectedElement = () => {
    const element = getSelectedElement()
    return element ? parseInt(element.getAttribute(`data-${elementsSelector}-index`) as string, 10) : 0
  }

  const setNavigation = (index: number) => selectElement(getAllElements()[index] || document.body)

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

  const selectElement = (element: HTMLElement, setIndex = 0) => {
    if (element) {
      ;[].forEach.call(getAllElements(), (el: HTMLElement, index) => {
        const selectThisElement = el === element
        el.setAttribute(`data-${elementsSelector}-selected`, `${selectThisElement}`)
        el.setAttribute(`data-${elementsSelector}-index`, `${index}`)
        if (el.nodeName === `INPUT`) {
          const inputEl = el as HTMLInputElement
          if (selectThisElement) {
            inputEl.focus()
            inputEl.selectionStart = inputEl.value.length
            inputEl.selectionEnd = inputEl.value.length
          } else {
            inputEl.blur()
          }
        }
      })
      setCurrent({
        type: element.tagName,
        index: setIndex,
        key: element.getAttribute(`data-${elementsSelector}-selected-key`),
      })
    } else {
      setNavigation(0)
    }
  }

  const getCurrent = () => {
    const element = getSelectedElement()
    if (element)
      return {
        type: element.tagName,
        index: parseInt(element.getAttribute(`data-${elementsSelector}-index`) as string, 10),
        key: element.getAttribute(`data-${elementsSelector}-selected-key`),
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

  return [setNavigation, getCurrent, current]
}
