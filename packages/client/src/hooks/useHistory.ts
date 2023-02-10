import { useCallback, useRef, useState } from "react"

type HistoryProps = {
  history: Array<any>
  pointer: number
  back: () => void
  forward: () => void
  go: (index: number) => void
  reset: () => void
  canUndo: boolean
  canRedo: boolean
}

export default function useStateWithHistory<T>(
  defaultValue: T,
  { capacity = 10 } = {}
): [T, (v: T | ((val: T) => T)) => void, HistoryProps] {
  const [value, setValue] = useState<T>(defaultValue)
  const historyRef: any = useRef<Array<T>>([value])
  const pointerRef = useRef<number>(0)
  const canUndo = pointerRef.current > 1 ? true : false
  const canRedo =
    pointerRef.current < capacity - 1 && pointerRef.current !== historyRef.current.length - 1 ? true : false

  const set = useCallback(
    (v: T | ((val: T) => T)) => {
      const resolvedValue = v instanceof Function ? v(value) : v

      if (historyRef.current[pointerRef.current] !== resolvedValue) {
        if (pointerRef.current < historyRef.current.length - 1) {
          historyRef.current.splice(pointerRef.current + 1)
        }
        historyRef.current.push(resolvedValue)

        while (historyRef.current.length > capacity) {
          historyRef.current.shift()
        }
        pointerRef.current = historyRef.current.length - 1
      }
      setValue(resolvedValue)
    },
    [capacity, value]
  )

  const back = useCallback(() => {
    if (pointerRef.current <= 0) return
    const back = historyRef.current[pointerRef.current - 1]
    if (back instanceof Array && !back.length) return
    pointerRef.current--
    setValue(historyRef.current[pointerRef.current])
  }, [])

  const forward = useCallback(() => {
    if (pointerRef.current >= historyRef.current.length - 1) return
    pointerRef.current++
    setValue(historyRef.current[pointerRef.current])
  }, [])

  const go = useCallback((index: number) => {
    if (index < 0 || index > historyRef.current.length - 1) return
    pointerRef.current = index
    setValue(historyRef.current[pointerRef.current])
  }, [])

  const reset = useCallback(() => {
    setValue(defaultValue)
    historyRef.current = [defaultValue]
    pointerRef.current = historyRef.current.length - 1
  }, [])

  return [
    value,
    set,
    {
      history: historyRef.current,
      pointer: pointerRef.current,
      back,
      forward,
      go,
      reset,
      canUndo,
      canRedo,
    },
  ]
}
