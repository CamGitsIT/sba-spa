import { useCounter } from '@/hooks/use-counter'

interface AnimatedCounterProps {
  end: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  separator?: string
  className?: string
}

export function AnimatedCounter({
  end,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = ',',
  className = ''
}: AnimatedCounterProps) {
  const { formattedCount, ref } = useCounter({
    end,
    duration,
    decimals,
    prefix,
    suffix,
    separator
  })

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>} className={className}>
      {formattedCount}
    </span>
  )
}
