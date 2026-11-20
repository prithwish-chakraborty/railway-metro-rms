import { useEffect, useState } from 'react'

/** useState that persists its value to localStorage under `key`. */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // storage full or unavailable (e.g. private mode) — keep in-memory state
    }
  }, [key, value])

  return [value, setValue]
}
