import { useState, useCallback } from 'react'

/**
 * A localStorage-backed hook that mirrors the interface of @github/spark's useKV hook.
 * Persists values across page reloads using localStorage.
 */
export function useKV<T = string>(
  key: string,
  initialValue?: T
): readonly [T | undefined, (newValue: T | ((oldValue?: T) => T)) => void, () => void] {
  const [value, setValueState] = useState<T | undefined>(() => {
    try {
      const stored = localStorage.getItem(key)
      if (stored !== null) {
        return JSON.parse(stored) as T
      }
    } catch {
      // ignore parse errors
    }
    return initialValue
  })

  const setValue = useCallback(
    (newValue: T | ((oldValue?: T) => T)) => {
      setValueState((prev) => {
        const resolved = typeof newValue === 'function'
          ? (newValue as (oldValue?: T) => T)(prev)
          : newValue
        try {
          localStorage.setItem(key, JSON.stringify(resolved))
        } catch {
          // ignore storage errors (e.g. private browsing quota)
        }
        return resolved
      })
    },
    [key]
  )

  const deleteValue = useCallback(() => {
    try {
      localStorage.removeItem(key)
    } catch {
      // ignore
    }
    setValueState(undefined)
  }, [key])

  return [value, setValue, deleteValue] as const
}
