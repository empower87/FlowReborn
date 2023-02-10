import { useEffect, useState } from "react"

export default function useMobileKeyboardHandler() {
  const [windowSize, setWindowSize] = useState<number>()
  const [refIsFocused, setRefIsFocused] = useState(false)
  const viewport = window.visualViewport

  useEffect(() => {
    if (!viewport) return
    // let clientHeight = Math.round(document.documentElement.clientHeight * 10) / 10
    // let innerHeight = Math.round(window.innerHeight * 10) / 10
    // console.log(window.visualViewport.height, innerHeight, "LOL")
    // const windowSize = Math.max(clientHeight, innerHeight || 0)
    const windowSize = Math.round(viewport.height * 10) / 10
    setWindowSize(windowSize)
  }, [])

  const handleOnFocus = () => {
    if (!viewport) return
    // let clientHeight = Math.round(document.documentElement.clientHeight * 10) / 10
    // let innerHeight = Math.round(window.innerHeight * 10) / 10
    // const getSize = Math.max(clientHeight, innerHeight || 0)
    const getSize = Math.round(viewport.height * 10) / 10
    let body = document.getElementById("body")
    if (!refIsFocused && body) {
      setRefIsFocused(true)
      if (getSize !== windowSize) {
        body.style.height = `${windowSize}px`
      } else {
        body.style.height = `${getSize}px`
      }
    }
  }

  return { handleOnFocus }
}
