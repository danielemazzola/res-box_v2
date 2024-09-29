import { useCallback } from 'react'

const useScrollToRef = () => {
  const scrollToRef = useCallback((ref) => {
    if (ref.current) {
      setTimeout(() => {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 300)
    }
  }, [])

  return scrollToRef
}

export default useScrollToRef
