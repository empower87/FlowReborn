import { useRef, useEffect, MutableRefObject } from 'react'

export default function useRenderCount() {
  const count = useRef<number>(1)
  useEffect(() => {
    count.current += 1
  }, [])
  return count.current
}
