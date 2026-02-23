import { useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { themes, defaultTheme } from '@/lib/themes'

export function useTheme() {
  const [currentTheme] = useKV<string>('color-theme', defaultTheme)

  useEffect(() => {
    const themeName = currentTheme || defaultTheme
    const theme = themes[themeName]
    
    if (!theme) return

    const root = document.documentElement
    Object.entries(theme.colors).forEach(([key, value]) => {
      const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      root.style.setProperty(`--${cssVar}`, value)
    })
  }, [currentTheme])

  return { currentTheme: currentTheme || defaultTheme }
}
