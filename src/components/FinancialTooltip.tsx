import { Info } from '@phosphor-icons/react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface FinancialTooltipProps {
  term: 'DSCR' | 'NOI' | 'Gross Margin' | 'Net Margin' | 'Break-Even' | 'COGS' | 'Gross Profit'
}

const tooltipContent = {
  'DSCR': {
    title: 'Debt Service Coverage Ratio',
    description: 'Measures ability to pay debt obligations. Calculated as Net Operating Income divided by annual debt payments. Lenders typically require 1.25× minimum; higher is better.',
    formula: 'DSCR = NOI ÷ Annual Debt Service'
  },
  'NOI': {
    title: 'Net Operating Income',
    description: 'Profit from operations before debt payments and taxes. This is the key metric lenders use to evaluate loan capacity.',
    formula: 'NOI = Revenue - Operating Expenses'
  },
  'Gross Margin': {
    title: 'Gross Profit Margin',
    description: 'Percentage of revenue remaining after direct costs (COGS). Indicates pricing power and operational efficiency.',
    formula: 'Gross Margin = (Revenue - COGS) ÷ Revenue × 100'
  },
  'Net Margin': {
    title: 'Net Profit Margin',
    description: 'Percentage of revenue remaining after all expenses including debt service. Measures overall profitability.',
    formula: 'Net Margin = NOI ÷ Revenue × 100'
  },
  'Break-Even': {
    title: 'Break-Even Revenue',
    description: 'Minimum revenue needed to cover all fixed costs and debt obligations. Operating below this point results in negative cash flow.',
    formula: 'Break-Even = (Fixed Costs + Debt Service) ÷ Gross Margin %'
  },
  'COGS': {
    title: 'Cost of Goods Sold',
    description: 'Direct costs to deliver products or services. Includes materials, labor, and direct overhead specific to each revenue stream.',
    formula: 'COGS = Direct Material + Direct Labor + Direct Overhead'
  },
  'Gross Profit': {
    title: 'Gross Profit',
    description: 'Revenue remaining after subtracting direct costs. This amount covers operating expenses and debt service.',
    formula: 'Gross Profit = Revenue - COGS'
  }
}

export function FinancialTooltip({ term }: FinancialTooltipProps) {
  const content = tooltipContent[term]
  
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="inline-flex items-center justify-center ml-1 text-muted-foreground hover:text-secondary transition-colors">
            <Info size={16} weight="fill" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs p-4 bg-card border-2 border-secondary/20 shadow-xl">
          <div className="space-y-2">
            <p className="font-semibold text-sm text-foreground">{content.title}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{content.description}</p>
            <div className="pt-2 border-t border-border">
              <p className="font-mono text-xs text-secondary font-semibold">{content.formula}</p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
