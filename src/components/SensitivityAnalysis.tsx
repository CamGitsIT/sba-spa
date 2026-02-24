import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useKV } from '@/hooks/use-kv'
import { 
  Target, 
  TrendUp, 
  TrendDown, 
  ChartLineUp, 
  ChartBar,
  CircleWavyWarning,
  CheckCircle,
  Gauge
} from '@phosphor-icons/react'
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Area,
  AreaChart,
  Cell,
  BarChart,
  Bar
} from 'recharts'
import { motion } from 'framer-motion'

interface SensitivityVariable {
  name: string
  key: string
  baseValue: number
  min: number
  max: number
  step: number
  unit: string
  icon: JSX.Element
}

interface ScenarioResult {
  variable: string
  change: number
  revenue: number
  noi: number
  dscr: number
  impact: 'high' | 'medium' | 'low'
}

const variables: SensitivityVariable[] = [
  { name: 'Training Seats/Quarter', key: 'training', baseValue: 50, min: 30, max: 100, step: 5, unit: 'seats', icon: <Target size={20} weight="duotone" /> },
  { name: 'Retrofit Projects/Year', key: 'retrofit', baseValue: 30, min: 15, max: 60, step: 5, unit: 'projects', icon: <ChartLineUp size={20} weight="duotone" /> },
  { name: 'Retail Locations', key: 'retail', baseValue: 2, min: 1, max: 5, step: 1, unit: 'locations', icon: <ChartBar size={20} weight="duotone" /> },
  { name: 'Consulting Hours/Month', key: 'consulting', baseValue: 120, min: 60, max: 240, step: 10, unit: 'hours', icon: <Gauge size={20} weight="duotone" /> },
  { name: 'Avg Training Price', key: 'trainingPrice', baseValue: 3500, min: 2500, max: 5000, step: 100, unit: '$', icon: <TrendUp size={20} weight="duotone" /> },
  { name: 'Avg Retrofit Price', key: 'retrofitPrice', baseValue: 12000, min: 8000, max: 18000, step: 500, unit: '$', icon: <TrendUp size={20} weight="duotone" /> }
]

export function SensitivityAnalysis() {
  const [selectedVariable, setSelectedVariable] = useState<string>('training')
  const [variationRange, setVariationRange] = useKV('sensitivity-range', 20)

  const calculateFinancials = (
    training: number,
    retrofit: number,
    retail: number,
    consulting: number,
    trainingPrice: number,
    retrofitPrice: number
  ) => {
    const trainingRevenue = training * trainingPrice * 4
    const retrofitRevenue = retrofit * retrofitPrice
    const retailRevenue = retail * 180000
    const consultingRevenue = consulting * 150 * 12
    const maintenanceRevenue = 25 * 1200 * 12
    const affiliateRevenue = 15 * 800 * 12
    
    const totalRevenue = trainingRevenue + retrofitRevenue + retailRevenue + consultingRevenue + maintenanceRevenue + affiliateRevenue
    
    const cogs = retrofitRevenue * 0.35 + retailRevenue * 0.45 + affiliateRevenue * 0.15
    const fixedCosts = 180000
    const variableCosts = totalRevenue * 0.12
    const totalExpenses = fixedCosts + variableCosts + cogs
    
    const noi = totalRevenue - totalExpenses
    const annualDebt = 640000 * 0.095
    const dscr = noi / annualDebt
    
    return { revenue: totalRevenue, noi, dscr }
  }

  const baseValues = {
    training: 50,
    retrofit: 30,
    retail: 2,
    consulting: 120,
    trainingPrice: 3500,
    retrofitPrice: 12000
  }

  const baseFinancials = calculateFinancials(
    baseValues.training,
    baseValues.retrofit,
    baseValues.retail,
    baseValues.consulting,
    baseValues.trainingPrice,
    baseValues.retrofitPrice
  )

  const generateSensitivityData = (variableKey: string) => {
    const variable = variables.find(v => v.key === variableKey)
    if (!variable) return []

    const range = variationRange
    const steps = 11
    const data = []

    for (let i = 0; i < steps; i++) {
      const percent = -range + (i * (2 * range) / (steps - 1))
      const value = variable.baseValue * (1 + percent / 100)
      
      const adjustedValue = Math.max(
        variable.min,
        Math.min(variable.max, Math.round(value / variable.step) * variable.step)
      )

      const params = { ...baseValues, [variableKey]: adjustedValue }
      const financials = calculateFinancials(
        params.training,
        params.retrofit,
        params.retail,
        params.consulting,
        params.trainingPrice,
        params.retrofitPrice
      )

      data.push({
        change: percent.toFixed(0),
        value: adjustedValue,
        revenue: financials.revenue / 1000,
        noi: financials.noi / 1000,
        dscr: parseFloat(financials.dscr.toFixed(2)),
        revenueChange: ((financials.revenue - baseFinancials.revenue) / baseFinancials.revenue * 100).toFixed(1),
        noiChange: ((financials.noi - baseFinancials.noi) / baseFinancials.noi * 100).toFixed(1)
      })
    }

    return data
  }

  const generateTornadoChart = () => {
    const results: ScenarioResult[] = []

    variables.forEach(variable => {
      const highParams = { ...baseValues, [variable.key]: variable.max }
      const lowParams = { ...baseValues, [variable.key]: variable.min }

      const highFinancials = calculateFinancials(
        highParams.training,
        highParams.retrofit,
        highParams.retail,
        highParams.consulting,
        highParams.trainingPrice,
        highParams.retrofitPrice
      )

      const lowFinancials = calculateFinancials(
        lowParams.training,
        lowParams.retrofit,
        lowParams.retail,
        lowParams.consulting,
        lowParams.trainingPrice,
        lowParams.retrofitPrice
      )

      const range = Math.abs(highFinancials.noi - lowFinancials.noi)
      const avgImpact = (Math.abs(highFinancials.noi - baseFinancials.noi) + Math.abs(lowFinancials.noi - baseFinancials.noi)) / 2

      results.push({
        variable: variable.name,
        change: range,
        revenue: (highFinancials.revenue + lowFinancials.revenue) / 2,
        noi: (highFinancials.noi + lowFinancials.noi) / 2,
        dscr: (highFinancials.dscr + lowFinancials.dscr) / 2,
        impact: avgImpact > 50000 ? 'high' : avgImpact > 20000 ? 'medium' : 'low'
      })
    })

    return results.sort((a, b) => b.change - a.change)
  }

  const sensitivityData = generateSensitivityData(selectedVariable)
  const tornadoData = generateTornadoChart()

  const selectedVar = variables.find(v => v.key === selectedVariable)

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Sensitivity Analysis</h2>
        <p className="text-xl text-muted-foreground">
          What-if scenario builder with dynamic impact modeling
        </p>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold mb-1">Variable Impact Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Adjust any variable to see real-time impact on financial metrics
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-sm">Analysis Range:</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono">±{variationRange}%</span>
              <div className="w-24">
                <Slider
                  value={[variationRange]}
                  onValueChange={(value) => setVariationRange(value[0])}
                  min={10}
                  max={50}
                  step={5}
                />
              </div>
            </div>
          </div>
        </div>

        <Tabs value={selectedVariable} onValueChange={setSelectedVariable}>
          <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full mb-6">
            {variables.map(variable => (
              <TabsTrigger key={variable.key} value={variable.key} className="text-xs">
                <div className="flex items-center gap-1">
                  {variable.icon}
                  <span className="hidden md:inline">{variable.name.split('/')[0]}</span>
                  <span className="md:hidden">{variable.key}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {variables.map(variable => (
            <TabsContent key={variable.key} value={variable.key} className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Base Value</p>
                  <p className="text-2xl font-bold font-mono">
                    {variable.unit === '$' ? '$' : ''}{variable.baseValue.toLocaleString()}{variable.unit !== '$' ? ` ${variable.unit}` : ''}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Range</p>
                  <p className="text-lg font-semibold font-mono">
                    {variable.unit === '$' ? '$' : ''}{variable.min.toLocaleString()} - {variable.unit === '$' ? '$' : ''}{variable.max.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Current Scenario</p>
                  <Badge variant="secondary" className="font-mono">Base Case</Badge>
                </div>
              </div>

              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sensitivityData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorNOI" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis 
                      dataKey="change" 
                      label={{ value: 'Change from Base (%)', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis 
                      yAxisId="left"
                      label={{ value: 'Revenue ($K)', angle: -90, position: 'insideLeft' }}
                    />
                    <YAxis 
                      yAxisId="right" 
                      orientation="right"
                      label={{ value: 'DSCR (×)', angle: 90, position: 'insideRight' }}
                    />
                    <Tooltip 
                      formatter={(value: number, name: string) => {
                        if (name === 'Revenue') return [`$${value.toFixed(0)}K`, name]
                        if (name === 'NOI') return [`$${value.toFixed(0)}K`, name]
                        if (name === 'DSCR') return [`${value.toFixed(2)}×`, name]
                        return [value, name]
                      }}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))', 
                        borderRadius: '8px' 
                      }}
                    />
                    <Legend />
                    <Area 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(var(--secondary))" 
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                      name="Revenue"
                      strokeWidth={2}
                    />
                    <Area 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="noi" 
                      stroke="hsl(var(--success))" 
                      fillOpacity={1}
                      fill="url(#colorNOI)"
                      name="NOI"
                      strokeWidth={2}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="dscr" 
                      stroke="hsl(var(--accent))" 
                      strokeWidth={3}
                      name="DSCR"
                      dot={{ fill: 'hsl(var(--accent))', r: 4 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {sensitivityData[0] && (
                  <>
                    <Card className="p-4 border-destructive/50 bg-destructive/5">
                      <p className="text-xs text-muted-foreground mb-1">Worst Case (-{variationRange}%)</p>
                      <p className="text-xl font-bold font-mono mb-1">
                        ${sensitivityData[0].revenue.toFixed(0)}K
                      </p>
                      <Badge variant="destructive" className="text-xs">
                        {sensitivityData[0].revenueChange}% rev
                      </Badge>
                    </Card>
                    <Card className="p-4 border-success/50 bg-success/5">
                      <p className="text-xs text-muted-foreground mb-1">Best Case (+{variationRange}%)</p>
                      <p className="text-xl font-bold font-mono mb-1">
                        ${sensitivityData[sensitivityData.length - 1].revenue.toFixed(0)}K
                      </p>
                      <Badge className="bg-success text-success-foreground text-xs">
                        +{sensitivityData[sensitivityData.length - 1].revenueChange}% rev
                      </Badge>
                    </Card>
                    <Card className="p-4">
                      <p className="text-xs text-muted-foreground mb-1">Range Impact</p>
                      <p className="text-xl font-bold font-mono">
                        ${(sensitivityData[sensitivityData.length - 1].revenue - sensitivityData[0].revenue).toFixed(0)}K
                      </p>
                    </Card>
                    <Card className="p-4">
                      <p className="text-xs text-muted-foreground mb-1">DSCR Range</p>
                      <p className="text-xl font-bold font-mono">
                        {sensitivityData[0].dscr.toFixed(2)} - {sensitivityData[sensitivityData.length - 1].dscr.toFixed(2)}×
                      </p>
                    </Card>
                  </>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Tornado Chart: Variable Impact Ranking</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Shows which variables have the greatest impact on NOI when varied from min to max
        </p>
        
        <div className="h-80 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tornadoData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis type="number" label={{ value: 'Impact on NOI ($)', position: 'insideBottom', offset: -5 }} />
              <YAxis type="category" dataKey="variable" width={150} tick={{ fontSize: 11 }} />
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'NOI Impact Range']}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))', 
                  borderRadius: '8px' 
                }}
              />
              <Bar dataKey="change" radius={[0, 4, 4, 0]}>
                {tornadoData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={
                      entry.impact === 'high' 
                        ? 'hsl(var(--destructive))' 
                        : entry.impact === 'medium' 
                        ? 'hsl(var(--accent))' 
                        : 'hsl(var(--muted-foreground))'
                    } 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <Separator className="my-4" />

        <div className="space-y-3">
          {tornadoData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
            >
              <div className="flex items-center gap-3">
                {item.impact === 'high' ? (
                  <CircleWavyWarning size={20} className="text-destructive" weight="fill" />
                ) : item.impact === 'medium' ? (
                  <TrendUp size={20} className="text-accent" weight="duotone" />
                ) : (
                  <CheckCircle size={20} className="text-success" weight="fill" />
                )}
                <span className="font-medium text-sm">{item.variable}</span>
              </div>
              <div className="flex items-center gap-4">
                <Badge 
                  variant={item.impact === 'high' ? 'destructive' : item.impact === 'medium' ? 'default' : 'outline'}
                  className="text-xs uppercase"
                >
                  {item.impact} impact
                </Badge>
                <span className="font-mono font-semibold text-sm">
                  ±${(item.change / 1000).toFixed(0)}K
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-accent/10 to-secondary/10 border-accent/20">
        <h3 className="text-xl font-semibold mb-4">Key Insights</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-card rounded">
              <TrendUp size={24} className="text-success" weight="duotone" />
            </div>
            <div>
              <p className="font-semibold mb-1">Highest Impact Variable</p>
              <p className="text-sm text-muted-foreground">
                {tornadoData[0]?.variable} has the greatest influence on financial outcomes, 
                creating a ±${(tornadoData[0]?.change / 1000).toFixed(0)}K swing in NOI
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-card rounded">
              <Target size={24} className="text-secondary" weight="duotone" />
            </div>
            <div>
              <p className="font-semibold mb-1">Strategic Focus</p>
              <p className="text-sm text-muted-foreground">
                High-impact variables should be prioritized in business execution. 
                Small improvements in these areas yield outsized returns.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
