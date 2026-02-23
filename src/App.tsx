import { useState } from 'react'
import { motion } from 'framer-motion'
import { Building, ChartLine, Target, CurrencyDollar, Users, TrendUp, CheckCircle, FileText, Wrench, Storefront, GraduationCap, Heart } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useKV } from '@github/spark/hooks'

function App() {
  const [leadershipModalOpen, setLeadershipModalOpen] = useState(false)
  const [scenario, setScenario] = useKV('financial-scenario', 'base')
  const [trainingSeats, setTrainingSeats] = useKV('training-seats', '50')
  const [retrofitProjects, setRetrofitProjects] = useKV('retrofit-projects', '30')
  const [retailLocations, setRetailLocations] = useKV('retail-locations', '2')

  const scenarios = {
    floor: { training: 30, retrofit: 20, retail: 1 },
    base: { training: 50, retrofit: 30, retail: 2 },
    stretch: { training: 75, retrofit: 45, retail: 3 }
  }

  const calculateFinancials = (training: number, retrofit: number, retail: number) => {
    const trainingRevenue = training * 3500 * 4
    const retrofitRevenue = retrofit * 12000
    const retailRevenue = retail * 180000
    const totalRevenue = trainingRevenue + retrofitRevenue + retailRevenue
    const noi = totalRevenue * 0.35
    const annualDebt = 640000 * 0.095
    const dscr = noi / annualDebt
    
    return {
      revenue: totalRevenue,
      noi,
      dscr: dscr.toFixed(2),
      debtService: annualDebt
    }
  }

  const currentFinancials = calculateFinancials(
    parseInt(trainingSeats || '50'),
    parseInt(retrofitProjects || '30'),
    parseInt(retailLocations || '2')
  )

  const projectionData = [
    { year: 'Year 1', revenue: 450000, noi: 157500 },
    { year: 'Year 2', revenue: 720000, noi: 252000 },
    { year: 'Year 3', revenue: 945000, noi: 330750 },
    { year: 'Year 4', revenue: 1100000, noi: 385000 },
    { year: 'Year 5', revenue: 1250000, noi: 437500 }
  ]

  const tcoData = [
    { category: 'Traditional Install', cost: 45000 },
    { category: 'OverIT Solution', cost: 10350 }
  ]

  const setScenarioValues = (scenarioName: string) => {
    setScenario(scenarioName)
    const values = scenarios[scenarioName as keyof typeof scenarios]
    setTrainingSeats(values.training.toString())
    setRetrofitProjects(values.retrofit.toString())
    setRetailLocations(values.retail.toString())
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-primary-foreground/10 no-print">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-primary-foreground">OverIT • 455 Glen Iris</h2>
            <div className="hidden md:flex gap-6">
              <a href="#overview" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">Overview</a>
              <a href="#property" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">Property</a>
              <a href="#business" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">Business Model</a>
              <a href="#financials" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">Financials</a>
              <a href="#lender" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">For Lender</a>
            </div>
          </div>
        </div>
      </nav>

      <section id="overview" className="py-20 px-6 bg-gradient-to-br from-primary via-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 11px)' }}></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground mb-4">
              455 Glen Iris Experience Center
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              SBA 7(a) Loan Request for Acquisition & Build-Out
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="p-8 bg-card/95 backdrop-blur">
                <div className="flex items-center gap-3 mb-3">
                  <CurrencyDollar size={32} className="text-accent" weight="bold" />
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Loan Request</h3>
                </div>
                <p className="font-mono text-4xl font-bold text-foreground mb-2">$640,000</p>
                <p className="text-sm text-muted-foreground">Business acquisition & improvements</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-8 bg-card/95 backdrop-blur">
                <div className="flex items-center gap-3 mb-3">
                  <Building size={32} className="text-secondary" weight="bold" />
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Appraisal Value</h3>
                </div>
                <p className="font-mono text-4xl font-bold text-foreground mb-2">$850,000</p>
                <p className="text-sm text-muted-foreground">Professional appraisal complete</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="p-8 bg-card/95 backdrop-blur border-2 border-success">
                <div className="flex items-center gap-3 mb-3">
                  <TrendUp size={32} className="text-success" weight="bold" />
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">DSCR</h3>
                </div>
                <p className="font-mono text-4xl font-bold text-success mb-2">2.61×</p>
                <p className="text-sm text-muted-foreground">Strong debt service coverage</p>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex justify-center gap-4 mt-12"
          >
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <FileText size={20} weight="bold" className="mr-2" />
              View Full Business Plan
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              Contact Cameron Champion
            </Button>
          </motion.div>
        </div>
      </section>

      <section id="property" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">Property Showcase</h2>
          <Card className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Carousel className="w-full">
                  <CarouselContent>
                    <CarouselItem>
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <Building size={64} className="text-muted-foreground" />
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <Storefront size={64} className="text-muted-foreground" />
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <GraduationCap size={64} className="text-muted-foreground" />
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">455 Glen Iris Drive NE</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Prime location in Atlanta's established commercial corridor, offering 4,500 sq ft of flexible space ideal for training center, retail operations, and retrofit demonstration facility.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Square Footage</p>
                    <p className="font-mono font-semibold">4,500 sq ft</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Zoning</p>
                    <p className="font-mono font-semibold">Commercial</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Purchase Price</p>
                    <p className="font-mono font-semibold">$640,000</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Appraisal</p>
                    <p className="font-mono font-semibold text-success">$850,000</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="business" className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Four Synergistic Pillars</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Diversified revenue streams creating a resilient, scalable business model
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <GraduationCap size={48} className="text-secondary mb-4" weight="duotone" />
                <h3 className="text-xl font-semibold mb-3">Training Academy</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Industry-leading UniFi certification programs with hands-on lab environment, generating recurring revenue through quarterly cohorts.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <Wrench size={48} className="text-accent mb-4" weight="duotone" />
                <h3 className="text-xl font-semibold mb-3">Retrofit Services</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Complete network infrastructure upgrades for commercial properties, delivering 77% cost savings versus traditional solutions.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <Storefront size={48} className="text-success mb-4" weight="duotone" />
                <h3 className="text-xl font-semibold mb-3">Retail Operations</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Direct-to-consumer network equipment sales with expert consultation, targeting small business and prosumer markets.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <Heart size={48} className="text-destructive mb-4" weight="duotone" />
                <h3 className="text-xl font-semibold mb-3">Community Hub</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Tech enthusiast meetups and events creating brand loyalty, customer acquisition, and network effects for all revenue streams.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="financials" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Interactive Financial Model</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Adjust revenue drivers to explore scenarios and validate projections
            </p>
          </div>

          <Card className="p-8 mb-8">
            <Tabs value={scenario} onValueChange={setScenarioValues} className="mb-8">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                <TabsTrigger value="floor">Conservative</TabsTrigger>
                <TabsTrigger value="base">Base Case</TabsTrigger>
                <TabsTrigger value="stretch">Growth</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Training Seats/Quarter</label>
                  <Badge variant="secondary" className="font-mono">{trainingSeats}</Badge>
                </div>
                <Slider
                  value={[parseInt(trainingSeats || '50')]}
                  onValueChange={(value) => setTrainingSeats(value[0].toString())}
                  min={10}
                  max={100}
                  step={5}
                  className="py-4"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Retrofit Projects/Year</label>
                  <Badge variant="secondary" className="font-mono">{retrofitProjects}</Badge>
                </div>
                <Slider
                  value={[parseInt(retrofitProjects || '30')]}
                  onValueChange={(value) => setRetrofitProjects(value[0].toString())}
                  min={5}
                  max={60}
                  step={5}
                  className="py-4"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Retail Locations</label>
                  <Badge variant="secondary" className="font-mono">{retailLocations}</Badge>
                </div>
                <Slider
                  value={[parseInt(retailLocations || '2')]}
                  onValueChange={(value) => setRetailLocations(value[0].toString())}
                  min={1}
                  max={5}
                  step={1}
                  className="py-4"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <Card className="p-6 bg-muted/50">
                <p className="text-sm text-muted-foreground mb-2">Annual Revenue</p>
                <p className="font-mono text-2xl font-bold">${(currentFinancials.revenue / 1000).toFixed(0)}K</p>
              </Card>
              <Card className="p-6 bg-muted/50">
                <p className="text-sm text-muted-foreground mb-2">Net Operating Income</p>
                <p className="font-mono text-2xl font-bold">${(currentFinancials.noi / 1000).toFixed(0)}K</p>
              </Card>
              <Card className="p-6 bg-muted/50">
                <p className="text-sm text-muted-foreground mb-2">Annual Debt Service</p>
                <p className="font-mono text-2xl font-bold">${(currentFinancials.debtService / 1000).toFixed(0)}K</p>
              </Card>
              <Card className="p-6 bg-success/10 border-success">
                <p className="text-sm text-muted-foreground mb-2">DSCR</p>
                <p className="font-mono text-2xl font-bold text-success">{currentFinancials.dscr}×</p>
              </Card>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={projectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${(value as number).toLocaleString()}`} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="hsl(var(--secondary))" strokeWidth={2} name="Revenue" />
                  <Line type="monotone" dataKey="noi" stroke="hsl(var(--success))" strokeWidth={2} name="NOI" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-8">
            <h3 className="text-2xl font-semibold mb-6">Market Disruption: 77% Cost Savings</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tcoData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${(value as number).toLocaleString()}`} />
                  <Bar dataKey="cost" fill="hsl(var(--accent))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-6">
              <Badge className="bg-success text-success-foreground text-lg px-4 py-2">
                77% Cost Reduction vs. Traditional Solutions
              </Badge>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Leadership</h2>
            <p className="text-xl text-muted-foreground">Experienced founder with proven track record</p>
          </div>

          <Card className="p-8 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-32 h-32 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <Users size={64} className="text-secondary-foreground" weight="duotone" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-semibold mb-2">Cameron Champion</h3>
                <p className="text-muted-foreground mb-4">Founder & CEO</p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Technology entrepreneur with extensive experience in network infrastructure, business development, and strategic partnerships. Proven ability to identify market opportunities and execute innovative solutions.
                </p>
                <Button onClick={() => setLeadershipModalOpen(true)} variant="outline">
                  Read Full Canvas Letter
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="lender" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Lender Checklist</h2>
            <p className="text-xl text-muted-foreground">Comprehensive documentation for underwriting review</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle size={24} className="text-success flex-shrink-0 mt-1" weight="fill" />
                <div>
                  <h3 className="font-semibold mb-1">Business Plan</h3>
                  <p className="text-sm text-muted-foreground">Comprehensive 5-year projection with market analysis</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle size={24} className="text-success flex-shrink-0 mt-1" weight="fill" />
                <div>
                  <h3 className="font-semibold mb-1">Property Appraisal</h3>
                  <p className="text-sm text-muted-foreground">Professional appraisal: $850,000 value</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle size={24} className="text-success flex-shrink-0 mt-1" weight="fill" />
                <div>
                  <h3 className="font-semibold mb-1">Financial Statements</h3>
                  <p className="text-sm text-muted-foreground">Personal & business financials with tax returns</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle size={24} className="text-success flex-shrink-0 mt-1" weight="fill" />
                <div>
                  <h3 className="font-semibold mb-1">Use of Funds</h3>
                  <p className="text-sm text-muted-foreground">Detailed breakdown of capital deployment</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle size={24} className="text-success flex-shrink-0 mt-1" weight="fill" />
                <div>
                  <h3 className="font-semibold mb-1">Market Analysis</h3>
                  <p className="text-sm text-muted-foreground">Competitive landscape & demand validation</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle size={24} className="text-success flex-shrink-0 mt-1" weight="fill" />
                <div>
                  <h3 className="font-semibold mb-1">Legal Documentation</h3>
                  <p className="text-sm text-muted-foreground">Entity formation, licenses, and contracts</p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-8">
            <h3 className="text-2xl font-semibold mb-6">Use of Funds Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Category</th>
                    <th className="text-right py-3 px-4 font-semibold">Amount</th>
                    <th className="text-right py-3 px-4 font-semibold">Percentage</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  <tr className="border-b bg-muted/30">
                    <td className="py-3 px-4">Property Acquisition</td>
                    <td className="text-right py-3 px-4">$450,000</td>
                    <td className="text-right py-3 px-4">70.3%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Build-Out & Renovations</td>
                    <td className="text-right py-3 px-4">$120,000</td>
                    <td className="text-right py-3 px-4">18.8%</td>
                  </tr>
                  <tr className="border-b bg-muted/30">
                    <td className="py-3 px-4">Equipment & Inventory</td>
                    <td className="text-right py-3 px-4">$50,000</td>
                    <td className="text-right py-3 px-4">7.8%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Working Capital</td>
                    <td className="text-right py-3 px-4">$20,000</td>
                    <td className="text-right py-3 px-4">3.1%</td>
                  </tr>
                  <tr className="font-bold">
                    <td className="py-3 px-4">Total</td>
                    <td className="text-right py-3 px-4">$640,000</td>
                    <td className="text-right py-3 px-4">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      <footer className="py-12 px-6 bg-primary text-primary-foreground no-print">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm opacity-80">
            © 2024 OverIT LLC • 455 Glen Iris Drive NE, Atlanta, GA • SBA 7(a) Loan Prospectus
          </p>
        </div>
      </footer>

      <Dialog open={leadershipModalOpen} onOpenChange={setLeadershipModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Canvas Letter from Cameron Champion</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-4 pr-4">
              <p className="leading-relaxed">Dear Lending Partner,</p>
              
              <p className="leading-relaxed">
                I'm writing to present an opportunity that represents the convergence of market demand, technological disruption, and strategic positioning. The 455 Glen Iris Experience Center isn't just a business acquisition—it's the physical manifestation of a vision to revolutionize how small and medium businesses approach network infrastructure.
              </p>

              <p className="leading-relaxed">
                Having spent years in the technology sector, I've witnessed firsthand the frustration businesses face when dealing with overpriced, overcomplicated network solutions. Traditional providers charge $45,000 for installations that we can deliver at $10,350—a 77% cost reduction without compromising quality. This isn't incremental improvement; it's market disruption.
              </p>

              <p className="leading-relaxed">
                The four-pillar business model creates resilience through diversification. Training revenue provides predictability, retrofit services offer high margins, retail operations generate cash flow, and the community hub builds brand equity. Each pillar reinforces the others, creating network effects that compound over time.
              </p>

              <p className="leading-relaxed">
                The numbers speak for themselves: a 2.61× debt service coverage ratio on conservative projections, an appraised value 33% above the purchase price, and a market opportunity measured in billions as businesses increasingly prioritize network infrastructure.
              </p>

              <p className="leading-relaxed">
                I'm not asking you to bet on an unproven concept. I'm inviting you to partner on a business with clear market validation, strong unit economics, and a management team committed to execution excellence.
              </p>

              <p className="leading-relaxed">Thank you for your consideration.</p>

              <p className="leading-relaxed">
                <strong>Cameron Champion</strong><br />
                Founder & CEO, OverIT LLC
              </p>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default App