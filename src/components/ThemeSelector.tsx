import { useState } from 'react'
import { Palette } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { themes, defaultTheme } from '@/lib/themes'
import { useKV } from '@github/spark/hooks'

export function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = useKV('color-theme', defaultTheme)
  const [isApplying, setIsApplying] = useState(false)

  const applyTheme = (themeName: string) => {
    setIsApplying(true)
    const theme = themes[themeName]
    
    if (!theme) return

    const root = document.documentElement
    Object.entries(theme.colors).forEach(([key, value]) => {
      const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      root.style.setProperty(`--${cssVar}`, value)
    })

    setCurrentTheme(themeName)
    
    setTimeout(() => setIsApplying(false), 300)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 transition-all"
          disabled={isApplying}
        >
          <Palette size={18} weight="duotone" />
          <span className="hidden md:inline">Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Choose Color Scheme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Object.values(themes).map((theme) => (
          <DropdownMenuItem
            key={theme.name}
            onClick={() => applyTheme(theme.name)}
            className="flex flex-col items-start gap-1 p-3 cursor-pointer"
          >
            <div className="flex items-center justify-between w-full">
              <span className="font-medium">{theme.label}</span>
              {currentTheme === theme.name && (
                <Badge variant="secondary" className="text-xs">Active</Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{theme.description}</p>
            <div className="flex gap-1 mt-1">
              <div 
                className="w-5 h-5 rounded-sm border shadow-sm"
                style={{ backgroundColor: theme.colors.primary }}
                title="Primary"
              />
              <div 
                className="w-5 h-5 rounded-sm border shadow-sm"
                style={{ backgroundColor: theme.colors.secondary }}
                title="Secondary"
              />
              <div 
                className="w-5 h-5 rounded-sm border shadow-sm"
                style={{ backgroundColor: theme.colors.accent }}
                title="Accent"
              />
              <div 
                className="w-5 h-5 rounded-sm border shadow-sm"
                style={{ backgroundColor: theme.colors.success }}
                title="Success"
              />
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
