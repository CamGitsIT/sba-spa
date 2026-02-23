import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CurrencyDollar, TrendUp, Buildings, ChartLineUp } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'

function AnimatedCounter({ end, duration = 2000, prefix = '', suffix = '' }: { end: number; duration?: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const startTime = Date.now()
          const animate = () => {
            const now = Date.now()
            const progress = Math.min((now - startTime) / duration, 1)
            setCount(Math.floor(progress * end))
            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          animate()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export function Hero() {
  const scrollToLender = () => {
    document.querySelector('#lender')?.scrollIntoView({ behavior: 'smooth' })
  }

  const metrics = [
    {
      icon: CurrencyDollar,
      label: 'SBA 7(a) Loan Request',
      value: 640000,
      prefix: '$',
      suffix: 'K',
      color: 'text-accent',
    },
    {
      icon: Buildings,
      label: 'Appraised Value',
      value: 850000,
      prefix: '$',
      suffix: 'K',
      color: 'text-secondary',
    },
    {
      icon: ChartLineUp,
      label: 'DSCR Floor',
      value: 2.61,
      suffix: '×',
      color: 'text-success',
      decimals: 2,
    },
    {
      icon: TrendUp,
      label: 'Owner-Occupied',
      value: 51,
      suffix: '%+',
      color: 'text-success',
    },
  ]

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/80 pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,oklch(0.3_0.05_255),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,oklch(0.35_0.08_230),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-6 bg-accent/20 text-accent-foreground border-accent/30 px-4 py-2 text-sm font-medium">
            SBA 7(a) Loan Application
          </Badge>
          <h1 className="font-display text-5xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            OverIT Experience Center
          </h1>
          <p className="text-xl lg:text-2xl text-primary-foreground/90 mb-4 max-w-3xl mx-auto">
            455 Glen Iris Dr NE, Atlanta, GA
          </p>
          <p className="text-lg text-primary-foreground/70 mb-12 max-w-2xl mx-auto">
            Strategic acquisition and build-out of a premier UniFi Experience Center with integrated national training
            studio, zero-inventory retail operations, and multi-location retrofit services
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <Card className="p-6 bg-card/95 backdrop-blur-sm border-border/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <metric.icon className={`w-10 h-10 ${metric.color} mb-4 mx-auto`} weight="duotone" />
                <div className={`text-3xl lg:text-4xl font-bold font-mono ${metric.color} mb-2`}>
                  <AnimatedCounter
                    end={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                  />
                </div>
                <div className="text-sm text-muted-foreground font-medium">{metric.label}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            onClick={scrollToLender}
          >
            Review Application Documents
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-card/90 backdrop-blur-sm border-2 px-8 py-6 text-lg font-semibold hover:bg-card"
            onClick={() => document.querySelector('#modeler')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Financial Model
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
