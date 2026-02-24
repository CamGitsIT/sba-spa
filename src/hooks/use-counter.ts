import { useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface UseCounterOptions {
  start?: number
  end: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  separator?: string
  startOnView?: boolean
}

export function useCounter({
  start = 0,
  end,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = ',',
  startOnView = true
}: UseCounterOptions) {
  const [count, setCount] = useState(start)
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const hasStarted = useRef(false)

  useEffect(() => {
    if (startOnView && !isInView) return
    if (hasStarted.current) return
    
    hasStarted.current = true
    const startTime = Date.now()
    const difference = end - start

    const easeOutQuart = (t: number): number => {
      return 1 - Math.pow(1 - t, 4)
    }

    const updateCount = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      const easedProgress = easeOutQuart(progress)
      const current = start + difference * easedProgress
      
      setCount(current)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(updateCount)
  }, [start, end, duration, isInView, startOnView])

  const formatNumber = (value: number): string => {
    const fixed = value.toFixed(decimals)
    const parts = fixed.split('.')
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    const decimalPart = parts[1] ? `.${parts[1]}` : ''
    return `${prefix}${integerPart}${decimalPart}${suffix}`
  }

  return { count, formattedCount: formatNumber(count), ref }
}
