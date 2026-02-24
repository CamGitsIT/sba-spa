import { useState, useEffect } from 'react'
import { useKV } from '@/hooks/use-kv'

export interface MarketDataPoint {
  metric: string
  value: number
  change: number
  trend: 'up' | 'down' | 'neutral'
  source: string
  lastUpdated: Date
}

export interface CompetitorData {
  name: string
  avgInstallCost: number
  avgProjectTime: number
  customerSatisfaction: number
  marketShare: number
}

export interface IndustryBenchmark {
  category: string
  industry: number
  overit: number
  variance: number
}

const staticMarketData: MarketDataPoint[] = [
  { metric: 'Network Hardware Market Size', value: 52.4, change: 8.3, trend: 'up', source: 'Gartner 2024', lastUpdated: new Date() },
  { metric: 'IT Training Certification Demand', value: 18.7, change: 12.1, trend: 'up', source: 'IDC Research', lastUpdated: new Date() },
  { metric: 'Structured Cabling Market', value: 14.2, change: 6.5, trend: 'up', source: 'MarketsandMarkets 2024', lastUpdated: new Date() },
  { metric: 'Managed Services Revenue', value: 29.8, change: 9.7, trend: 'up', source: 'CompTIA 2024', lastUpdated: new Date() },
  { metric: 'Fiber Optic Installation Growth', value: 11.3, change: 15.2, trend: 'up', source: 'Grand View Research', lastUpdated: new Date() },
  { metric: 'Security Systems Integration', value: 7.6, change: -2.1, trend: 'down', source: 'IHS Markit 2024', lastUpdated: new Date() },
  { metric: 'Cloud Networking Adoption', value: 38.5, change: 22.4, trend: 'up', source: 'Forrester 2024', lastUpdated: new Date() },
  { metric: 'SMB IT Spending Growth', value: 5.9, change: 3.8, trend: 'neutral', source: 'Gartner SMB 2024', lastUpdated: new Date() },
]

const staticCompetitors: CompetitorData[] = [
  { name: 'NetEdge Solutions', avgInstallCost: 42000, avgProjectTime: 45, customerSatisfaction: 82, marketShare: 18 },
  { name: 'Vertex IT Services', avgInstallCost: 38500, avgProjectTime: 60, customerSatisfaction: 76, marketShare: 14 },
  { name: 'Cabletech Pro', avgInstallCost: 31000, avgProjectTime: 30, customerSatisfaction: 88, marketShare: 22 },
  { name: 'TechBridge Networks', avgInstallCost: 55000, avgProjectTime: 75, customerSatisfaction: 91, marketShare: 11 },
  { name: 'Apex Infrastructure', avgInstallCost: 47500, avgProjectTime: 55, customerSatisfaction: 79, marketShare: 9 },
]

const staticBenchmarks: IndustryBenchmark[] = [
  { category: 'Gross Margin', industry: 42, overit: 58, variance: 38 },
  { category: 'Customer Acquisition Cost', industry: 8500, overit: 5200, variance: 39 },
  { category: 'Project Completion Rate', industry: 87, overit: 96, variance: 10 },
  { category: 'Customer Retention Rate', industry: 74, overit: 89, variance: 20 },
  { category: 'Revenue per Employee', industry: 185000, overit: 240000, variance: 30 },
  { category: 'DSCR', industry: 1.15, overit: 1.42, variance: 23 },
]

export const useMarketData = () => {
  const [marketData, setMarketData] = useKV<MarketDataPoint[]>('market-data', staticMarketData)
  const [competitors, setCompetitors] = useKV<CompetitorData[]>('competitor-data', staticCompetitors)
  const [benchmarks, setBenchmarks] = useKV<IndustryBenchmark[]>('industry-benchmarks', staticBenchmarks)
  const [lastRefresh, setLastRefresh] = useKV<string>('market-data-refresh', '')
  const [isLoading, setIsLoading] = useState(false)

  const refreshMarketData = async () => {
    setIsLoading(true)
    try {
      // Simulate a brief refresh with static data (Spark AI runtime not available outside Spark)
      await new Promise(resolve => setTimeout(resolve, 500))
      setMarketData(staticMarketData.map(m => ({ ...m, lastUpdated: new Date() })))
      setCompetitors(staticCompetitors)
      setBenchmarks(staticBenchmarks)
      setLastRefresh(new Date().toISOString())
    } catch (error) {
      console.error('Failed to refresh market data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!marketData || marketData.length === 0 || !competitors || competitors.length === 0 || !benchmarks || benchmarks.length === 0) {
      refreshMarketData()
    }
  }, [])

  return {
    marketData,
    competitors,
    benchmarks,
    lastRefresh,
    isLoading,
    refreshMarketData
  }
}

