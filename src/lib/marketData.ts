import { useKV } from '@github/spark/hooks'
import { useState, useEffect } from 'react'

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

export const useMarketData = () => {
  const [marketData, setMarketData] = useKV<MarketDataPoint[]>('market-data', [])
  const [competitors, setCompetitors] = useKV<CompetitorData[]>('competitor-data', [])
  const [benchmarks, setBenchmarks] = useKV<IndustryBenchmark[]>('industry-benchmarks', [])
  const [lastRefresh, setLastRefresh] = useKV<string>('market-data-refresh', '')
  const [isLoading, setIsLoading] = useState(false)

  const generateMarketData = async (): Promise<MarketDataPoint[]> => {
    const prompt = window.spark.llmPrompt`Generate realistic market data for the network infrastructure and IT training industry. Return exactly 8 market metrics as a JSON object with a single property "metrics" containing an array of objects with these fields:
    - metric: string (name like "Network Hardware Market Size", "Training Certification Demand", etc.)
    - value: number (realistic current value)
    - change: number (percentage change, positive or negative)
    - trend: "up" | "down" | "neutral"
    - source: string (realistic source like "Gartner 2024" or "IDC Research")
    
    Return as JSON in format: {"metrics": [...]}`

    const response = await window.spark.llm(prompt, 'gpt-4o-mini', true)
    const parsed = JSON.parse(response)
    return parsed.metrics.map((m: any) => ({
      ...m,
      lastUpdated: new Date()
    }))
  }

  const generateCompetitorData = async (): Promise<CompetitorData[]> => {
    const prompt = window.spark.llmPrompt`Generate 5 realistic competitors for a network infrastructure and IT training business. Return as a JSON object with a single property "competitors" containing an array with these fields:
    - name: string (realistic competitor name)
    - avgInstallCost: number (average installation cost in dollars, range 25000-60000)
    - avgProjectTime: number (days to complete, range 14-90)
    - customerSatisfaction: number (percentage 60-95)
    - marketShare: number (percentage 5-25)
    
    Return as JSON in format: {"competitors": [...]}`

    const response = await window.spark.llm(prompt, 'gpt-4o-mini', true)
    const parsed = JSON.parse(response)
    return parsed.competitors
  }

  const generateBenchmarks = async (): Promise<IndustryBenchmark[]> => {
    const prompt = window.spark.llmPrompt`Generate 6 industry benchmarks comparing OverIT (a network infrastructure company) to industry standards. Return as a JSON object with a single property "benchmarks" containing an array with these fields:
    - category: string (metric name like "Gross Margin", "Customer Acquisition Cost", etc.)
    - industry: number (industry average value as percentage or dollar amount)
    - overit: number (OverIT's value, should be better in most cases)
    - variance: number (percentage difference, positive means OverIT is better)
    
    Return as JSON in format: {"benchmarks": [...]}`

    const response = await window.spark.llm(prompt, 'gpt-4o-mini', true)
    const parsed = JSON.parse(response)
    return parsed.benchmarks
  }

  const refreshMarketData = async () => {
    setIsLoading(true)
    try {
      const [newMarketData, newCompetitors, newBenchmarks] = await Promise.all([
        generateMarketData(),
        generateCompetitorData(),
        generateBenchmarks()
      ])
      
      setMarketData(newMarketData)
      setCompetitors(newCompetitors)
      setBenchmarks(newBenchmarks)
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
