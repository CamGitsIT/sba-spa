export interface Theme {
  name: string
  label: string
  description: string
  colors: {
    background: string
    foreground: string
    card: string
    cardForeground: string
    popover: string
    popoverForeground: string
    primary: string
    primaryForeground: string
    secondary: string
    secondaryForeground: string
    muted: string
    mutedForeground: string
    accent: string
    accentForeground: string
    success: string
    successForeground: string
    destructive: string
    destructiveForeground: string
    border: string
    input: string
    ring: string
    radius: string
  }
}

export const themes: Record<string, Theme> = {
  unifi: {
    name: 'unifi',
    label: 'UniFi Blue',
    description: 'Professional tech-finance palette with vibrant blues',
    colors: {
      background: 'oklch(0.985 0.005 255)',
      foreground: 'oklch(0.15 0.02 255)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.15 0.02 255)',
      popover: 'oklch(1 0 0)',
      popoverForeground: 'oklch(0.15 0.02 255)',
      primary: 'oklch(0.25 0.04 255)',
      primaryForeground: 'oklch(0.985 0.005 255)',
      secondary: 'oklch(0.65 0.15 230)',
      secondaryForeground: 'oklch(0.985 0.005 255)',
      muted: 'oklch(0.965 0.005 255)',
      mutedForeground: 'oklch(0.48 0.02 255)',
      accent: 'oklch(0.70 0.18 50)',
      accentForeground: 'oklch(0.15 0.02 255)',
      success: 'oklch(0.65 0.15 165)',
      successForeground: 'oklch(0.985 0.005 255)',
      destructive: 'oklch(0.55 0.22 25)',
      destructiveForeground: 'oklch(0.985 0.005 255)',
      border: 'oklch(0.92 0.005 255)',
      input: 'oklch(0.92 0.005 255)',
      ring: 'oklch(0.65 0.15 230)',
      radius: '0.75rem'
    }
  },
  emerald: {
    name: 'emerald',
    label: 'Emerald Growth',
    description: 'Fresh, nature-inspired greens emphasizing growth',
    colors: {
      background: 'oklch(0.985 0.005 160)',
      foreground: 'oklch(0.15 0.02 160)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.15 0.02 160)',
      popover: 'oklch(1 0 0)',
      popoverForeground: 'oklch(0.15 0.02 160)',
      primary: 'oklch(0.28 0.10 165)',
      primaryForeground: 'oklch(0.985 0.005 160)',
      secondary: 'oklch(0.60 0.16 170)',
      secondaryForeground: 'oklch(0.985 0.005 160)',
      muted: 'oklch(0.965 0.005 160)',
      mutedForeground: 'oklch(0.48 0.02 160)',
      accent: 'oklch(0.75 0.18 145)',
      accentForeground: 'oklch(0.15 0.02 160)',
      success: 'oklch(0.65 0.18 165)',
      successForeground: 'oklch(0.985 0.005 160)',
      destructive: 'oklch(0.55 0.22 25)',
      destructiveForeground: 'oklch(0.985 0.005 25)',
      border: 'oklch(0.92 0.005 160)',
      input: 'oklch(0.92 0.005 160)',
      ring: 'oklch(0.60 0.16 170)',
      radius: '0.75rem'
    }
  },
  amber: {
    name: 'amber',
    label: 'Amber Wealth',
    description: 'Warm, luxurious gold tones conveying prosperity',
    colors: {
      background: 'oklch(0.985 0.008 80)',
      foreground: 'oklch(0.15 0.02 50)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.15 0.02 50)',
      popover: 'oklch(1 0 0)',
      popoverForeground: 'oklch(0.15 0.02 50)',
      primary: 'oklch(0.30 0.08 50)',
      primaryForeground: 'oklch(0.985 0.008 80)',
      secondary: 'oklch(0.68 0.16 60)',
      secondaryForeground: 'oklch(0.15 0.02 50)',
      muted: 'oklch(0.965 0.008 80)',
      mutedForeground: 'oklch(0.48 0.02 50)',
      accent: 'oklch(0.72 0.20 45)',
      accentForeground: 'oklch(0.15 0.02 50)',
      success: 'oklch(0.65 0.15 165)',
      successForeground: 'oklch(0.985 0.008 80)',
      destructive: 'oklch(0.55 0.22 25)',
      destructiveForeground: 'oklch(0.985 0.008 25)',
      border: 'oklch(0.92 0.008 80)',
      input: 'oklch(0.92 0.008 80)',
      ring: 'oklch(0.68 0.16 60)',
      radius: '0.75rem'
    }
  },
  slate: {
    name: 'slate',
    label: 'Slate Professional',
    description: 'Sophisticated grayscale for maximum formality',
    colors: {
      background: 'oklch(0.985 0.002 255)',
      foreground: 'oklch(0.15 0.005 255)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.15 0.005 255)',
      popover: 'oklch(1 0 0)',
      popoverForeground: 'oklch(0.15 0.005 255)',
      primary: 'oklch(0.22 0.015 255)',
      primaryForeground: 'oklch(0.985 0.002 255)',
      secondary: 'oklch(0.58 0.015 255)',
      secondaryForeground: 'oklch(0.985 0.002 255)',
      muted: 'oklch(0.965 0.002 255)',
      mutedForeground: 'oklch(0.48 0.005 255)',
      accent: 'oklch(0.45 0.020 255)',
      accentForeground: 'oklch(0.985 0.002 255)',
      success: 'oklch(0.65 0.15 165)',
      successForeground: 'oklch(0.985 0.002 255)',
      destructive: 'oklch(0.55 0.22 25)',
      destructiveForeground: 'oklch(0.985 0.002 255)',
      border: 'oklch(0.92 0.002 255)',
      input: 'oklch(0.92 0.002 255)',
      ring: 'oklch(0.58 0.015 255)',
      radius: '0.75rem'
    }
  },
  purple: {
    name: 'purple',
    label: 'Purple Innovation',
    description: 'Creative, modern purples for tech-forward brands',
    colors: {
      background: 'oklch(0.985 0.005 290)',
      foreground: 'oklch(0.15 0.02 290)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.15 0.02 290)',
      popover: 'oklch(1 0 0)',
      popoverForeground: 'oklch(0.15 0.02 290)',
      primary: 'oklch(0.30 0.12 285)',
      primaryForeground: 'oklch(0.985 0.005 290)',
      secondary: 'oklch(0.62 0.18 280)',
      secondaryForeground: 'oklch(0.985 0.005 290)',
      muted: 'oklch(0.965 0.005 290)',
      mutedForeground: 'oklch(0.48 0.02 290)',
      accent: 'oklch(0.70 0.20 295)',
      accentForeground: 'oklch(0.15 0.02 290)',
      success: 'oklch(0.65 0.15 165)',
      successForeground: 'oklch(0.985 0.005 290)',
      destructive: 'oklch(0.55 0.22 25)',
      destructiveForeground: 'oklch(0.985 0.005 25)',
      border: 'oklch(0.92 0.005 290)',
      input: 'oklch(0.92 0.005 290)',
      ring: 'oklch(0.62 0.18 280)',
      radius: '0.75rem'
    }
  },
  crimson: {
    name: 'crimson',
    label: 'Crimson Power',
    description: 'Bold, confident reds for impact and urgency',
    colors: {
      background: 'oklch(0.985 0.005 15)',
      foreground: 'oklch(0.15 0.02 15)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.15 0.02 15)',
      popover: 'oklch(1 0 0)',
      popoverForeground: 'oklch(0.15 0.02 15)',
      primary: 'oklch(0.32 0.15 15)',
      primaryForeground: 'oklch(0.985 0.005 15)',
      secondary: 'oklch(0.60 0.20 20)',
      secondaryForeground: 'oklch(0.985 0.005 15)',
      muted: 'oklch(0.965 0.005 15)',
      mutedForeground: 'oklch(0.48 0.02 15)',
      accent: 'oklch(0.68 0.22 25)',
      accentForeground: 'oklch(0.985 0.005 15)',
      success: 'oklch(0.65 0.15 165)',
      successForeground: 'oklch(0.985 0.005 15)',
      destructive: 'oklch(0.55 0.22 25)',
      destructiveForeground: 'oklch(0.985 0.005 25)',
      border: 'oklch(0.92 0.005 15)',
      input: 'oklch(0.92 0.005 15)',
      ring: 'oklch(0.60 0.20 20)',
      radius: '0.75rem'
    }
  }
}

export const defaultTheme = 'unifi'
