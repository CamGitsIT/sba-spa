import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { TrendUp, TrendDown, ArrowClockwise, ChartBar, Buildings, Target } from '@phosphor-icons/react'
import { useMarketData } from '@/lib/marketData'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts'
import { formatDistanceToNow } from 'date-fns'

export function MarketDataDashboard() {
  const { marketData, competitors, benchmarks, lastRefresh, isLoading, refreshMarketData } = useMarketData()

  const competitorChartData = competitors.map(c => ({
    name: c.name,
    cost: c.avgInstallCost,
    time: c.avgProjectTime,
    satisfaction: c.customerSatisfaction
  }))

  const radarData = benchmarks.map(b => ({
    category: b.category,
    Industry: b.industry,
    OverIT: b.overit
  }))

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Market Intelligence</h2>
          <p className="text-muted-foreground">
            Real-time competitive analysis and industry benchmarks
            {lastRefresh && (
              <span className="ml-2 text-xs">
                • Updated {formatDistanceToNow(new Date(lastRefresh), { addSuffix: true })}
              </span>
            )}
          </p>
        </div>
        <Button 
          onClick={refreshMarketData} 
          disabled={isLoading}
          className="gap-2"
          variant="outline"
        >
          <ArrowClockwise size={20} weight="bold" className={isLoading ? 'animate-spin' : ''} />
          {isLoading ? 'Refreshing...' : 'Refresh Data'}
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {marketData.slice(0, 4).map((data, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <Card className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <p className="text-xs text-muted-foreground font-medium">{data.metric}</p>
                {data.trend === 'up' ? (
                  <TrendUp size={16} className="text-success" weight="bold" />
                ) : data.trend === 'down' ? (
                  <TrendDown size={16} className="text-destructive" weight="bold" />
                ) : null}
              </div>
              <p className="text-2xl font-bold font-mono mb-1">
                {data.value.toLocaleString()}
              </p>
              <div className="flex items-center gap-1">
                <Badge 
                  variant={data.change >= 0 ? 'default' : 'destructive'} 
                  className="text-xs"
                >
                  {data.change >= 0 ? '+' : ''}{data.change.toFixed(1)}%
                </Badge>
                <p className="text-xs text-muted-foreground">{data.source}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Buildings size={24} className="text-secondary" weight="duotone" />
            <h3 className="text-xl font-semibold">Competitive Landscape</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={competitorChartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={100}
                  tick={{ fontSize: 11 }}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value: number, name: string) => {
                    if (name === 'cost') return [`$${value.toLocaleString()}`, 'Avg Cost']
                    if (name === 'time') return [`${value} days`, 'Project Time']
                    if (name === 'satisfaction') return [`${value}%`, 'Satisfaction']
                    return [value, name]
                  }}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))', 
                    borderRadius: '8px' 
                  }}
                />
                <Legend />
                <Bar dataKey="cost" fill="hsl(var(--destructive))" name="Avg Cost" radius={[4, 4, 0, 0]} />
                <Bar dataKey="time" fill="hsl(var(--accent))" name="Project Time" radius={[4, 4, 0, 0]} />
                <Bar dataKey="satisfaction" fill="hsl(var(--success))" name="Satisfaction %" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <Separator className="my-4" />
          <div className="space-y-2">
            {competitors.slice(0, 3).map((comp, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm p-2 bg-muted/30 rounded">
                <span className="font-medium">{comp.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{comp.marketShare.toFixed(1)}% share</span>
                  <Badge variant="outline" className="font-mono text-xs">
                    ${(comp.avgInstallCost / 1000).toFixed(0)}K
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target size={24} className="text-accent" weight="duotone" />
            <h3 className="text-xl font-semibold">Performance Benchmarks</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis 
                  dataKey="category" 
                  tick={{ fontSize: 11 }}
                />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar 
                  name="Industry Average" 
                  dataKey="Industry" 
                  stroke="hsl(var(--muted-foreground))" 
                  fill="hsl(var(--muted-foreground))" 
                  fillOpacity={0.3} 
                />
                <Radar 
                  name="OverIT" 
                  dataKey="OverIT" 
                  stroke="hsl(var(--secondary))" 
                  fill="hsl(var(--secondary))" 
                  fillOpacity={0.6} 
                />
                <Legend />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))', 
                    borderRadius: '8px' 
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <Separator className="my-4" />
          <div className="space-y-2">
            {benchmarks.slice(0, 3).map((bench, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm p-2 bg-muted/30 rounded">
                <span className="font-medium">{bench.category}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Industry: {bench.industry}</span>
                  <Badge 
                    variant={bench.variance >= 0 ? 'default' : 'destructive'} 
                    className="font-mono text-xs"
                  >
                    {bench.variance >= 0 ? '+' : ''}{bench.variance.toFixed(1)}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-gradient-to-br from-success/10 to-secondary/10 border-success/20">
        <div className="flex items-center gap-2 mb-4">
          <ChartBar size={24} className="text-success" weight="duotone" />
          <h3 className="text-xl font-semibold">Competitive Advantage Summary</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-card rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Cost Advantage</p>
            <p className="text-3xl font-bold font-mono text-success">77%</p>
            <p className="text-xs text-muted-foreground mt-1">Lower than competitors</p>
          </div>
          <div className="p-4 bg-card rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Speed Advantage</p>
            <p className="text-3xl font-bold font-mono text-success">65%</p>
            <p className="text-xs text-muted-foreground mt-1">Faster implementation</p>
          </div>
          <div className="p-4 bg-card rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Market Position</p>
            <p className="text-3xl font-bold font-mono text-secondary">Top 3</p>
            <p className="text-xs text-muted-foreground mt-1">In regional market</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
