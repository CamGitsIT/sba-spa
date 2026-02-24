import { useState } from 'react'
import { motion } from 'framer-motion'
import { Building, ChartLine, Target, CurrencyDollar, Users, TrendUp, CheckCircle, FileText, Wrench, Storefront, GraduationCap, Heart, Headset, CirclesThreePlus, Handshake, ArrowsLeftRight, DownloadSimple, Sparkle, ChartBar } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useKV } from '@github/spark/hooks'
import { ThemeSelector } from '@/components/ThemeSelector'
import { useTheme } from '@/hooks/use-theme'
import { AnimatedCounter } from '@/components/AnimatedCounter'
import { Sparkline } from '@/components/Sparkline'
import { FinancialTooltip } from '@/components/FinancialTooltip'
import { exportToExcel } from '@/lib/exportExcel'
import { toast } from 'sonner'
import buildingImage from '@/assets/images/455-glen-iris-dr-ne-unit-p-atlanta-ga-building-photo.jpg'
import exteriorPhoto1 from '@/assets/images/935478657142e45c960f3b1db567b694-cc_ft_1536.jpg'
import exteriorPhoto2 from '@/assets/images/b3556a907589f6fbfb44bfdf5f65d5bc-cc_ft_960.jpg'
import interiorPhoto1 from '@/assets/images/IMG_2145.JPG'
import interiorPhoto2 from '@/assets/images/IMG_2146.JPG'
import interiorPhoto3 from '@/assets/images/IMG_2157.JPG'
import cameronHeadshot from '@/assets/images/cameron-champion.png'
import { PropertyGalleryModal } from '@/components/PropertyGalleryModal'

function App() {
  useTheme()
  const [leadershipModalOpen, setLeadershipModalOpen] = useState(false)
  const [selectedLeader, setSelectedLeader] = useState<'cameron' | 'john'>('cameron')
  const [comparisonModalOpen, setComparisonModalOpen] = useState(false)
  const [galleryModalOpen, setGalleryModalOpen] = useState(false)
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0)
  const [scenario, setScenario] = useKV('financial-scenario', 'base')
  const [trainingSeats, setTrainingSeats] = useKV('training-seats', '50')
  const [retrofitProjects, setRetrofitProjects] = useKV('retrofit-projects', '30')
  const [retailLocations, setRetailLocations] = useKV('retail-locations', '2')
  const [consultingHours, setConsultingHours] = useKV('consulting-hours', '120')
  const [maintenanceContracts, setMaintenanceContracts] = useKV('maintenance-contracts', '25')
  const [affiliateDeals, setAffiliateDeals] = useKV('affiliate-deals', '15')

  const scenarios = {
    floor: { training: 30, retrofit: 20, retail: 1, consulting: 80, maintenance: 15, affiliate: 10 },
    base: { training: 50, retrofit: 30, retail: 2, consulting: 120, maintenance: 25, affiliate: 15 },
    stretch: { training: 75, retrofit: 45, retail: 3, consulting: 180, maintenance: 40, affiliate: 25 }
  }

  const calculateFinancials = (
    training: number,
    retrofit: number,
    retail: number,
    consulting: number,
    maintenance: number,
    affiliate: number
  ) => {
    const trainingRevenue = training * 3500 * 4
    const retrofitRevenue = retrofit * 12000
    const retailRevenue = retail * 180000
    const consultingRevenue = consulting * 150 * 12
    const maintenanceRevenue = maintenance * 1200 * 12
    const affiliateRevenue = affiliate * 800 * 12
    
    const totalRevenue = trainingRevenue + retrofitRevenue + retailRevenue + consultingRevenue + maintenanceRevenue + affiliateRevenue
    
    const cogs = retrofitRevenue * 0.35 + retailRevenue * 0.45 + affiliateRevenue * 0.15
    const grossProfit = totalRevenue - cogs
    const grossMargin = totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0
    
    const fixedCosts = 180000
    const variableCosts = totalRevenue * 0.12
    const totalExpenses = fixedCosts + variableCosts + cogs
    
    const noi = totalRevenue - totalExpenses
    const annualDebt = 640000 * 0.095
    const dscr = noi / annualDebt
    
    const breakEvenRevenue = (fixedCosts + annualDebt) / (1 - ((variableCosts + cogs) / totalRevenue))
    
    return {
      revenue: totalRevenue,
      revenueByStream: {
        training: trainingRevenue,
        retrofit: retrofitRevenue,
        retail: retailRevenue,
        consulting: consultingRevenue,
        maintenance: maintenanceRevenue,
        affiliate: affiliateRevenue
      },
      cogs,
      grossProfit,
      grossMargin,
      fixedCosts,
      variableCosts,
      totalExpenses,
      noi,
      dscr: dscr.toFixed(2),
      debtService: annualDebt,
      breakEven: breakEvenRevenue,
      netMargin: totalRevenue > 0 ? (noi / totalRevenue) * 100 : 0
    }
  }

  const currentFinancials = calculateFinancials(
    parseInt(trainingSeats || '50'),
    parseInt(retrofitProjects || '30'),
    parseInt(retailLocations || '2'),
    parseInt(consultingHours || '120'),
    parseInt(maintenanceContracts || '25'),
    parseInt(affiliateDeals || '15')
  )

  const projectionData = [
    { year: 'Year 1', revenue: 450000, noi: 157500 },
    { year: 'Year 2', revenue: 720000, noi: 252000 },
    { year: 'Year 3', revenue: 945000, noi: 330750 },
    { year: 'Year 4', revenue: 1100000, noi: 385000 },
    { year: 'Year 5', revenue: 1250000, noi: 437500 }
  ]

  const sparklineData = {
    revenue: [450, 580, 720, 820, 945, 1050, 1100, 1180, 1250],
    grossProfit: [310, 400, 500, 580, 655, 730, 770, 820, 870],
    noi: [158, 200, 252, 290, 331, 365, 385, 410, 438],
    grossMargin: [68.8, 69.0, 69.4, 70.7, 69.3, 69.5, 70.0, 69.5, 69.6],
    netMargin: [35.1, 34.5, 35.0, 35.4, 35.0, 34.8, 35.0, 34.7, 35.0],
    dscr: [2.61, 3.30, 4.16, 4.78, 5.46, 6.02, 6.35, 6.76, 7.23]
  }

  const tcoData = [
    { category: 'Traditional Install', cost: 45000 },
    { category: 'OverIT Solution', cost: 10350 }
  ]

  const revenueStreamData = [
    { name: 'Training', value: currentFinancials.revenueByStream.training, fill: 'hsl(var(--secondary))' },
    { name: 'Retrofit', value: currentFinancials.revenueByStream.retrofit, fill: 'hsl(var(--accent))' },
    { name: 'Retail', value: currentFinancials.revenueByStream.retail, fill: 'hsl(var(--success))' },
    { name: 'Consulting', value: currentFinancials.revenueByStream.consulting, fill: 'hsl(var(--chart-1))' },
    { name: 'Maintenance', value: currentFinancials.revenueByStream.maintenance, fill: 'hsl(var(--chart-2))' },
    { name: 'Affiliate', value: currentFinancials.revenueByStream.affiliate, fill: 'hsl(var(--chart-3))' }
  ]

  const expenseBreakdownData = [
    { category: 'COGS', amount: currentFinancials.cogs },
    { category: 'Fixed Costs', amount: currentFinancials.fixedCosts },
    { category: 'Variable Costs', amount: currentFinancials.variableCosts }
  ]

  const setScenarioValues = (scenarioName: string) => {
    setScenario(scenarioName)
    const values = scenarios[scenarioName as keyof typeof scenarios]
    setTrainingSeats(values.training.toString())
    setRetrofitProjects(values.retrofit.toString())
    setRetailLocations(values.retail.toString())
    setConsultingHours(values.consulting.toString())
    setMaintenanceContracts(values.maintenance.toString())
    setAffiliateDeals(values.affiliate.toString())
  }

  const floorFinancials = calculateFinancials(
    scenarios.floor.training,
    scenarios.floor.retrofit,
    scenarios.floor.retail,
    scenarios.floor.consulting,
    scenarios.floor.maintenance,
    scenarios.floor.affiliate
  )

  const baseFinancials = calculateFinancials(
    scenarios.base.training,
    scenarios.base.retrofit,
    scenarios.base.retail,
    scenarios.base.consulting,
    scenarios.base.maintenance,
    scenarios.base.affiliate
  )

  const stretchFinancials = calculateFinancials(
    scenarios.stretch.training,
    scenarios.stretch.retrofit,
    scenarios.stretch.retail,
    scenarios.stretch.consulting,
    scenarios.stretch.maintenance,
    scenarios.stretch.affiliate
  )

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-primary-foreground/10 no-print">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-primary-foreground">OverIT • 455 Glen Iris</h2>
            <div className="hidden md:flex items-center gap-6">
              <a href="#overview" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">Overview</a>
              <a href="#property" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">Property</a>
              <a href="#business" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">Business Model</a>
              <a href="#financials" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">Financials</a>
              <a href="#market-analysis" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">Analysis</a>
              <a href="#sba-community-win" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">Community</a>
              <a href="#fuel-disruption" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">Support</a>
              <a href="#lender" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">For Lender</a>
              <ThemeSelector />
            </div>
            <div className="md:hidden">
              <ThemeSelector />
            </div>
          </div>
        </div>
      </nav>

      <section id="overview" className="py-20 px-6 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${buildingImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-secondary/90"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-primary-foreground mb-4 leading-tight">
              455 Glen Iris Experience Center
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto font-medium">
              SBA 7(a) Loan Request for Acquisition & Build-Out
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="p-8 bg-card/95 backdrop-blur hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
                  >
                    <CurrencyDollar size={32} className="text-accent" weight="bold" />
                  </motion.div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Loan Request</h3>
                </div>
                <p className="font-mono text-4xl font-bold text-foreground mb-2">
                  <AnimatedCounter end={640000} prefix="$" duration={2500} />
                </p>
                <p className="text-sm text-muted-foreground">Business acquisition & improvements</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-8 bg-card/95 backdrop-blur hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
                  >
                    <Building size={32} className="text-secondary" weight="bold" />
                  </motion.div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Appraisal Value</h3>
                </div>
                <p className="font-mono text-4xl font-bold text-foreground mb-2">
                  <AnimatedCounter end={850000} prefix="$" duration={2500} />
                </p>
                <p className="text-sm text-muted-foreground">Professional appraisal complete</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="p-8 bg-card/95 backdrop-blur border-2 border-success hover:shadow-2xl hover:border-success/60 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
                  >
                    <TrendUp size={32} className="text-success" weight="bold" />
                  </motion.div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">DSCR</h3>
                </div>
                <p className="font-mono text-4xl font-bold text-success mb-2">
                  <AnimatedCounter end={2.61} decimals={2} suffix="×" duration={2500} />
                </p>
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
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">Property Showcase</h2>
          <Card className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="grid grid-cols-3 gap-3">
                  <motion.button
                    onClick={() => { setGalleryInitialIndex(0); setGalleryModalOpen(true); }}
                    className="aspect-video bg-muted rounded-lg overflow-hidden hover:opacity-80 transition-opacity relative group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img src={buildingImage} alt="Property" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <Building size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" weight="bold" />
                    </div>
                  </motion.button>
                  <motion.button
                    onClick={() => { setGalleryInitialIndex(1); setGalleryModalOpen(true); }}
                    className="aspect-video bg-muted rounded-lg overflow-hidden hover:opacity-80 transition-opacity relative group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img src={exteriorPhoto1} alt="Exterior View" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <Building size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" weight="bold" />
                    </div>
                  </motion.button>
                  <motion.button
                    onClick={() => { setGalleryInitialIndex(2); setGalleryModalOpen(true); }}
                    className="aspect-video bg-muted rounded-lg overflow-hidden hover:opacity-80 transition-opacity relative group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img src={exteriorPhoto2} alt="Building Entrance" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <Building size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" weight="bold" />
                    </div>
                  </motion.button>
                  <motion.button
                    onClick={() => { setGalleryInitialIndex(3); setGalleryModalOpen(true); }}
                    className="aspect-video bg-muted rounded-lg overflow-hidden hover:opacity-80 transition-opacity relative group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img src={interiorPhoto1} alt="Interior Space" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <GraduationCap size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" weight="bold" />
                    </div>
                  </motion.button>
                  <motion.button
                    onClick={() => { setGalleryInitialIndex(4); setGalleryModalOpen(true); }}
                    className="aspect-video bg-muted rounded-lg overflow-hidden hover:opacity-80 transition-opacity relative group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img src={interiorPhoto2} alt="Interior Space" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <Storefront size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" weight="bold" />
                    </div>
                  </motion.button>
                  <motion.button
                    onClick={() => { setGalleryInitialIndex(5); setGalleryModalOpen(true); }}
                    className="aspect-video bg-muted rounded-lg overflow-hidden hover:opacity-80 transition-opacity relative group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img src={interiorPhoto3} alt="Interior Space" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <Wrench size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" weight="bold" />
                    </div>
                  </motion.button>
                </div>
                <Button 
                  onClick={() => { setGalleryInitialIndex(0); setGalleryModalOpen(true); }}
                  variant="outline" 
                  className="w-full mt-4"
                  size="lg"
                >
                  View Full Gallery
                </Button>
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

      <section id="business" className="py-20 px-6 bg-gradient-to-br from-secondary/5 via-accent/5 to-success/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Four Synergistic Pillars</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Comprehensive Financial Model</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium">
              Interactive revenue and expense modeling with six diversified income streams
            </p>
          </div>

          <Card className="p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
              <Tabs value={scenario} onValueChange={setScenarioValues} className="flex-1">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="floor">Conservative</TabsTrigger>
                  <TabsTrigger value="base">Base Case</TabsTrigger>
                  <TabsTrigger value="stretch">Growth</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="flex gap-3">
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  <Button 
                    onClick={() => setComparisonModalOpen(true)}
                    size="lg"
                    className="gap-2 bg-gradient-to-r from-secondary via-accent to-success hover:from-secondary/90 hover:via-accent/90 hover:to-success/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut"
                      }}
                    />
                    <Sparkle size={20} weight="fill" className="group-hover:animate-spin" />
                    <ArrowsLeftRight size={20} weight="bold" />
                    <span className="font-semibold">Compare Scenarios</span>
                  </Button>
                </motion.div>
                <Button 
                  onClick={() => {
                    exportToExcel(
                      floorFinancials,
                      baseFinancials,
                      stretchFinancials,
                      scenarios.floor,
                      scenarios.base,
                      scenarios.stretch
                    )
                    toast.success('Financial model exported successfully!', {
                      description: 'Your CSV file is downloading now.'
                    })
                  }}
                  variant="outline"
                  size="lg"
                  className="gap-2"
                >
                  <DownloadSimple size={20} weight="bold" />
                  Export Excel
                </Button>
              </div>
            </div>

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

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Consulting Hours/Month</label>
                  <Badge variant="secondary" className="font-mono">{consultingHours}</Badge>
                </div>
                <Slider
                  value={[parseInt(consultingHours || '120')]}
                  onValueChange={(value) => setConsultingHours(value[0].toString())}
                  min={40}
                  max={200}
                  step={10}
                  className="py-4"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Maintenance Contracts</label>
                  <Badge variant="secondary" className="font-mono">{maintenanceContracts}</Badge>
                </div>
                <Slider
                  value={[parseInt(maintenanceContracts || '25')]}
                  onValueChange={(value) => setMaintenanceContracts(value[0].toString())}
                  min={5}
                  max={50}
                  step={5}
                  className="py-4"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Affiliate Partnerships</label>
                  <Badge variant="secondary" className="font-mono">{affiliateDeals}</Badge>
                </div>
                <Slider
                  value={[parseInt(affiliateDeals || '15')]}
                  onValueChange={(value) => setAffiliateDeals(value[0].toString())}
                  min={5}
                  max={30}
                  step={5}
                  className="py-4"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              <Card className="p-4 bg-muted/50 hover:bg-muted/70 transition-colors">
                <div className="flex items-center gap-1 mb-1">
                  <p className="text-xs text-muted-foreground">Revenue</p>
                </div>
                <p className="font-mono text-xl font-bold mb-2">${(currentFinancials.revenue / 1000).toFixed(0)}K</p>
                <div className="flex justify-center">
                  <Sparkline data={sparklineData.revenue} width={100} height={30} trend="up" />
                </div>
              </Card>
              <Card className="p-4 bg-muted/50 hover:bg-muted/70 transition-colors">
                <div className="flex items-center gap-1 mb-1">
                  <p className="text-xs text-muted-foreground">Gross Profit</p>
                  <FinancialTooltip term="Gross Profit" />
                </div>
                <p className="font-mono text-xl font-bold mb-2">${(currentFinancials.grossProfit / 1000).toFixed(0)}K</p>
                <div className="flex justify-center">
                  <Sparkline data={sparklineData.grossProfit} width={100} height={30} trend="up" />
                </div>
              </Card>
              <Card className="p-4 bg-muted/50 hover:bg-muted/70 transition-colors">
                <div className="flex items-center gap-1 mb-1">
                  <p className="text-xs text-muted-foreground">Gross Margin</p>
                  <FinancialTooltip term="Gross Margin" />
                </div>
                <p className="font-mono text-xl font-bold mb-2">{currentFinancials.grossMargin.toFixed(1)}%</p>
                <div className="flex justify-center">
                  <Sparkline data={sparklineData.grossMargin} width={100} height={30} trend="up" />
                </div>
              </Card>
              <Card className="p-4 bg-muted/50 hover:bg-muted/70 transition-colors">
                <div className="flex items-center gap-1 mb-1">
                  <p className="text-xs text-muted-foreground">NOI</p>
                  <FinancialTooltip term="NOI" />
                </div>
                <p className="font-mono text-xl font-bold mb-2">${(currentFinancials.noi / 1000).toFixed(0)}K</p>
                <div className="flex justify-center">
                  <Sparkline data={sparklineData.noi} width={100} height={30} trend="up" />
                </div>
              </Card>
              <Card className="p-4 bg-muted/50 hover:bg-muted/70 transition-colors">
                <div className="flex items-center gap-1 mb-1">
                  <p className="text-xs text-muted-foreground">Net Margin</p>
                  <FinancialTooltip term="Net Margin" />
                </div>
                <p className="font-mono text-xl font-bold mb-2">{currentFinancials.netMargin.toFixed(1)}%</p>
                <div className="flex justify-center">
                  <Sparkline data={sparklineData.netMargin} width={100} height={30} trend="neutral" />
                </div>
              </Card>
              <Card className="p-4 bg-success/10 border-success hover:bg-success/20 transition-colors">
                <div className="flex items-center gap-1 mb-1">
                  <p className="text-xs text-muted-foreground">DSCR</p>
                  <FinancialTooltip term="DSCR" />
                </div>
                <p className="font-mono text-xl font-bold text-success mb-2">{currentFinancials.dscr}×</p>
                <div className="flex justify-center">
                  <Sparkline data={sparklineData.dscr} width={100} height={30} trend="up" />
                </div>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">5-Year Projections</h3>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="h-80"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={projectionData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => `$${(value as number).toLocaleString()}`}
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="hsl(var(--secondary))" 
                        strokeWidth={3} 
                        name="Revenue"
                        dot={{ fill: 'hsl(var(--secondary))', strokeWidth: 2, r: 5 }}
                        activeDot={{ r: 8 }}
                        animationDuration={1500}
                        animationBegin={0}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="noi" 
                        stroke="hsl(var(--success))" 
                        strokeWidth={3} 
                        name="NOI"
                        dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 5 }}
                        activeDot={{ r: 8 }}
                        animationDuration={1500}
                        animationBegin={200}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </motion.div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Revenue Mix by Stream</h3>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="h-80"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={revenueStreamData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        animationBegin={0}
                        animationDuration={1200}
                      >
                        {revenueStreamData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => `$${(value as number).toLocaleString()}`}
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </motion.div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Revenue Drivers Detail</h3>
                <div className="space-y-3">
                  {[
                    { icon: <GraduationCap size={20} weight="duotone" />, label: 'Training', value: currentFinancials.revenueByStream.training },
                    { icon: <Wrench size={20} weight="duotone" />, label: 'Retrofit', value: currentFinancials.revenueByStream.retrofit },
                    { icon: <Storefront size={20} weight="duotone" />, label: 'Retail', value: currentFinancials.revenueByStream.retail },
                    { icon: <Headset size={20} weight="duotone" />, label: 'Consulting', value: currentFinancials.revenueByStream.consulting },
                    { icon: <CirclesThreePlus size={20} weight="duotone" />, label: 'Maintenance', value: currentFinancials.revenueByStream.maintenance },
                    { icon: <Handshake size={20} weight="duotone" />, label: 'Affiliate', value: currentFinancials.revenueByStream.affiliate }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="text-secondary">{item.icon}</div>
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <span className="font-mono font-semibold">${(item.value / 1000).toFixed(0)}K</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Expense Breakdown</h3>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="h-64 mb-4"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={expenseBreakdownData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => `$${(value as number).toLocaleString()}`}
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                      />
                      <Bar 
                        dataKey="amount" 
                        fill="hsl(var(--destructive))"
                        radius={[8, 8, 0, 0]}
                        animationDuration={1200}
                        animationBegin={0}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">Total Expenses:</span>
                    </div>
                    <span className="font-mono font-semibold">${(currentFinancials.totalExpenses / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">Annual Debt Service:</span>
                    </div>
                    <span className="font-mono font-semibold">${(currentFinancials.debtService / 1000).toFixed(0)}K</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">Break-Even Revenue:</span>
                      <FinancialTooltip term="Break-Even" />
                    </div>
                    <span className="font-mono font-semibold">${(currentFinancials.breakEven / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex justify-between text-success">
                    <span className="font-medium">Above Break-Even:</span>
                    <span className="font-mono font-bold">${((currentFinancials.revenue - currentFinancials.breakEven) / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              </Card>
            </div>
          </Card>

          <Card className="p-8 mt-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <GraduationCap size={24} className="text-secondary" weight="duotone" />
                  New Revenue Streams
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Technical Consulting</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Hourly consulting services for network design, implementation strategy, and technical advisory at $150/hr.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Maintenance Contracts</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Monthly recurring revenue from ongoing support and maintenance agreements at $1,200/month per contract.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Affiliate Partnerships</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Commission-based revenue from strategic vendor partnerships and referral programs at $800/month per active deal.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <TrendUp size={24} className="text-success" weight="duotone" />
                  Financial Resilience
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                    <div className="flex items-center gap-1 mb-1">
                      <p className="text-sm font-semibold">Strong DSCR</p>
                      <FinancialTooltip term="DSCR" />
                    </div>
                    <p className="text-3xl font-bold font-mono text-success mb-1">{currentFinancials.dscr}×</p>
                    <p className="text-xs text-muted-foreground">Well above 1.25× minimum requirement</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-1 mb-1">
                      <p className="text-sm font-semibold">Gross Margin</p>
                      <FinancialTooltip term="Gross Margin" />
                    </div>
                    <p className="text-2xl font-bold font-mono mb-1">{currentFinancials.grossMargin.toFixed(1)}%</p>
                    <p className="text-xs text-muted-foreground">Healthy profitability on core services</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-1 mb-1">
                      <p className="text-sm font-semibold">Net Margin</p>
                      <FinancialTooltip term="Net Margin" />
                    </div>
                    <p className="text-2xl font-bold font-mono mb-1">{currentFinancials.netMargin.toFixed(1)}%</p>
                    <p className="text-xs text-muted-foreground">After all expenses and debt service</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Target size={24} className="text-accent" weight="duotone" />
                  Risk Mitigation
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle size={20} className="text-success mt-0.5 flex-shrink-0" weight="fill" />
                    <div>
                      <p className="text-sm font-semibold">Diversified Revenue</p>
                      <p className="text-xs text-muted-foreground">Six independent streams reduce single-point risk</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle size={20} className="text-success mt-0.5 flex-shrink-0" weight="fill" />
                    <div>
                      <p className="text-sm font-semibold">Recurring Income</p>
                      <p className="text-xs text-muted-foreground">Maintenance contracts provide predictable cash flow</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle size={20} className="text-success mt-0.5 flex-shrink-0" weight="fill" />
                    <div>
                      <p className="text-sm font-semibold">Scalable Model</p>
                      <p className="text-xs text-muted-foreground">Low marginal costs enable rapid growth</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle size={20} className="text-success mt-0.5 flex-shrink-0" weight="fill" />
                    <div>
                      <p className="text-sm font-semibold">Market Disruption</p>
                      <p className="text-xs text-muted-foreground">77% cost advantage creates competitive moat</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <h3 className="text-2xl font-semibold mb-6">Market Disruption: 77% Cost Savings</h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tcoData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => `$${(value as number).toLocaleString()}`}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                  />
                  <Bar 
                    dataKey="cost" 
                    fill="hsl(var(--accent))"
                    radius={[8, 8, 0, 0]}
                    animationDuration={1200}
                    animationBegin={0}
                  />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center mt-6"
            >
              <Badge className="bg-success text-success-foreground text-lg px-4 py-2">
                77% Cost Reduction vs. Traditional Solutions
              </Badge>
            </motion.div>
          </Card>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-br from-secondary/5 via-accent/5 to-success/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Leadership Team</h2>
            <p className="text-xl text-muted-foreground font-medium">Proven expertise in technology, operations, and strategic execution</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 h-full hover:shadow-xl transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="w-40 h-40 rounded-full overflow-hidden mb-6 ring-4 ring-secondary/20">
                    <img src={cameronHeadshot} alt="Cameron Champion" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-1">Cameron Champion</h3>
                  <p className="text-muted-foreground mb-2 font-medium">Founder & CEO</p>
                  <Badge className="mb-4 bg-secondary text-secondary-foreground">Visionary Leader</Badge>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Technology entrepreneur with extensive experience in network infrastructure, business development, and strategic partnerships. Proven ability to identify market opportunities and execute innovative solutions.
                  </p>
                  <Button 
                    onClick={() => { setSelectedLeader('cameron'); setLeadershipModalOpen(true); }} 
                    variant="outline"
                    className="w-full"
                  >
                    Read Full Canvas Letter
                  </Button>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="p-8 h-full hover:shadow-xl transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="w-40 h-40 rounded-full overflow-hidden mb-6 ring-4 ring-accent/20 bg-gradient-to-br from-accent/30 to-secondary/30 flex items-center justify-center">
                    <Users size={80} className="text-accent/40" weight="duotone" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-1">John Shea</h3>
                  <p className="text-muted-foreground mb-2 font-medium">Chief Technology Officer</p>
                  <Badge className="mb-4 bg-accent text-accent-foreground">Certified Ubiquiti Full Stack Professional</Badge>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Product owner, sales engineer, and strategist bridging development, clients, and business operations. Expert in software design, process flow, and technology efficiency with operational leadership across real estate and national rollout coordination.
                  </p>
                  <Button 
                    onClick={() => { setSelectedLeader('john'); setLeadershipModalOpen(true); }} 
                    variant="outline"
                    className="w-full"
                  >
                    Read Full Bio
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="market-analysis" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Market Intelligence & Sensitivity Analysis</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium">
              Comprehensive competitive analysis with interactive what-if scenario modeling
            </p>
          </div>
          
          <Card className="p-8 bg-gradient-to-br from-accent/5 to-secondary/5">
            <p className="text-center text-muted-foreground mb-4">
              <strong className="text-foreground">New Features Coming Soon:</strong> Real-time market data integration and advanced sensitivity analysis tools are currently in development.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-card rounded-lg">
                <ChartLine size={32} className="text-secondary mb-3" weight="duotone" />
                <h3 className="text-lg font-semibold mb-2">Market Intelligence Dashboard</h3>
                <p className="text-sm text-muted-foreground">
                  Real-time competitive landscape analysis with industry benchmarks and market trend data
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg">
                <Target size={32} className="text-accent mb-3" weight="duotone" />
                <h3 className="text-lg font-semibold mb-2">Sensitivity Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Interactive what-if scenario builder showing impact of variable changes on financial outcomes
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg">
                <ChartBar size={32} className="text-success mb-3" weight="duotone" />
                <h3 className="text-lg font-semibold mb-2">Tornado Charts</h3>
                <p className="text-sm text-muted-foreground">
                  Visual ranking of variables by impact to identify highest-leverage business drivers
                </p>
              </div>
            </div>
          </Card>
        </div>
      <section id="sba-community-win" className="py-20 px-6 bg-gradient-to-br from-success/10 via-secondary/5 to-accent/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">SBA Community Win</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium">
                This investment creates ripples far beyond our business
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-xl transition-shadow">
                <Users size={40} className="text-secondary mb-4" weight="duotone" />
                <h3 className="text-xl font-semibold mb-3">Job Creation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The Experience Center will create 8-12 full-time positions within the first year, including instructors, technical staff, retail specialists, and administrative roles.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card className="p-6 h-full hover:shadow-xl transition-shadow">
                <GraduationCap size={40} className="text-accent mb-4" weight="duotone" />
                <h3 className="text-xl font-semibold mb-3">Workforce Development</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Training programs will upskill 200+ professionals annually in cutting-edge network infrastructure, creating pathways to high-paying tech careers.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Card className="p-6 h-full hover:shadow-xl transition-shadow">
                <Building size={40} className="text-success mb-4" weight="duotone" />
                <h3 className="text-xl font-semibold mb-3">Local Business Support</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Affordable retrofit services and consulting help small businesses access enterprise-grade technology, strengthening Atlanta's business ecosystem.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Card className="p-6 h-full hover:shadow-xl transition-shadow">
                <Heart size={40} className="text-destructive mb-4" weight="duotone" />
                <h3 className="text-xl font-semibold mb-3">Community Hub</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Free meetups, workshops, and tech events create gathering spaces for enthusiasts, fostering innovation and knowledge sharing.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <Card className="p-6 h-full hover:shadow-xl transition-shadow">
                <TrendUp size={40} className="text-secondary mb-4" weight="duotone" />
                <h3 className="text-xl font-semibold mb-3">Economic Multiplier</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every dollar invested generates additional economic activity through vendor relationships, student spending, and business growth.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <Card className="p-6 h-full hover:shadow-xl transition-shadow">
                <Target size={40} className="text-accent mb-4" weight="duotone" />
                <h3 className="text-xl font-semibold mb-3">Technology Access</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Democratizing access to premium network technology reduces the digital divide and empowers underserved markets.
                </p>
              </Card>
            </motion.div>
          </div>

          <Card className="p-8 bg-gradient-to-r from-success/20 to-secondary/20 border-2 border-success/30">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Community Impact by the Numbers</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                <div>
                  <p className="text-4xl font-bold font-mono text-success mb-2">
                    <AnimatedCounter end={12} suffix="+" duration={2000} />
                  </p>
                  <p className="text-sm text-muted-foreground">New Jobs Created</p>
                </div>
                <div>
                  <p className="text-4xl font-bold font-mono text-secondary mb-2">
                    <AnimatedCounter end={200} suffix="+" duration={2000} />
                  </p>
                  <p className="text-sm text-muted-foreground">Professionals Trained</p>
                </div>
                <div>
                  <p className="text-4xl font-bold font-mono text-accent mb-2">
                    <AnimatedCounter end={500} suffix="+" duration={2000} />
                  </p>
                  <p className="text-sm text-muted-foreground">Businesses Served</p>
                </div>
                <div>
                  <p className="text-4xl font-bold font-mono text-success mb-2">
                    <AnimatedCounter end={77} suffix="%" duration={2000} />
                  </p>
                  <p className="text-sm text-muted-foreground">Cost Savings</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="fuel-disruption" className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Fuel the Disruption</h2>
              <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto font-medium">
                Join us in revolutionizing network infrastructure accessibility
              </p>
            </motion.div>
          </div>

          <Card className="p-8 mb-8 bg-card text-foreground">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold mb-4">Be Part of the Movement</h3>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">
                While we pursue traditional SBA financing, community support accelerates our mission. Your contribution helps us build the Experience Center faster, train more professionals, and serve more businesses with affordable technology solutions.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-muted/50 rounded-lg">
                <Sparkle size={32} className="text-accent mx-auto mb-3" weight="fill" />
                <h4 className="font-semibold mb-2">Accelerate Launch</h4>
                <p className="text-sm text-muted-foreground">Fast-track equipment purchases and facility improvements</p>
              </div>
              <div className="text-center p-6 bg-muted/50 rounded-lg">
                <GraduationCap size={32} className="text-secondary mx-auto mb-3" weight="duotone" />
                <h4 className="font-semibold mb-2">Expand Training</h4>
                <p className="text-sm text-muted-foreground">Add scholarship programs for underserved communities</p>
              </div>
              <div className="text-center p-6 bg-muted/50 rounded-lg">
                <Heart size={32} className="text-success mx-auto mb-3" weight="fill" />
                <h4 className="font-semibold mb-2">Grow Impact</h4>
                <p className="text-sm text-muted-foreground">Increase free community events and resources</p>
              </div>
            </div>

            <div className="bg-background p-6 rounded-lg border-2 border-accent/20">
              <h4 className="text-xl font-semibold mb-4 text-center">Support Our Mission</h4>
              <div 
                className="gfm-embed mx-auto" 
                data-url="https://www.gofundme.com/f/empowering-careers-with-new-training-space/widget/large?sharesheet=undefined&attribution_id=sl:3eedc2e2-7c77-4381-a5be-41c3cf3692a8"
              />
            </div>
          </Card>

          <Card className="p-6 bg-card/95 text-foreground">
            <div className="flex items-start gap-4">
              <CheckCircle size={24} className="text-success flex-shrink-0 mt-1" weight="fill" />
              <div>
                <h4 className="font-semibold mb-2">100% Transparency</h4>
                <p className="text-sm text-muted-foreground">
                  Every dollar is allocated to facility improvements, training equipment, and community programming. We provide regular updates on progress and impact.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      </section>

      <section id="lender" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Lender Checklist</h2>
            <p className="text-xl text-muted-foreground font-medium">Comprehensive documentation for underwriting review</p>
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
            <DialogTitle className="text-2xl">
              {selectedLeader === 'cameron' ? 'Canvas Letter from Cameron Champion' : 'John Shea - Full Biography'}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-4 pr-4">
              {selectedLeader === 'cameron' ? (
                <>
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b">
                    <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-secondary/20">
                      <img src={cameronHeadshot} alt="Cameron Champion" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">Cameron Champion</h4>
                      <p className="text-sm text-muted-foreground">Founder & CEO</p>
                    </div>
                  </div>
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
                </>
              ) : (
                <>
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b">
                    <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-accent/20 bg-gradient-to-br from-accent/30 to-secondary/30 flex items-center justify-center">
                      <Users size={40} className="text-accent/40" weight="duotone" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">John Shea</h4>
                      <p className="text-sm text-muted-foreground">Chief Technology Officer</p>
                      <Badge className="mt-1 bg-accent text-accent-foreground text-xs">Certified Ubiquiti Full Stack Professional</Badge>
                    </div>
                  </div>

                  <p className="leading-relaxed">
                    John Shea is a Certified Ubiquiti Full Stack Professional with a distinguished background as a product owner, sales engineer, and strategist. His expertise spans software design, process flow optimization, industry best practices, and technology efficiency—making him an invaluable bridge between development teams, client and business stakeholders, sales, and support functions.
                  </p>

                  <p className="leading-relaxed">
                    With a deep technical understanding of product capabilities paired with a strong client-facing approach, John consistently delivers end-to-end solutions that exceed expectations. His ability to translate complex technical concepts into actionable business strategies has made him a trusted advisor across multiple industries.
                  </p>

                  <p className="leading-relaxed">
                    Beyond his technical acumen, John brings operational leadership and strategic vision to OverIT. He ensures flawless execution across critical initiatives including real estate acquisition and national rollout coordination. His extensive network of relationships across multiple industries enables him to tailor solutions to diverse stakeholders and drive initiatives from initial concept through to scalable deployment.
                  </p>

                  <p className="leading-relaxed">
                    At the 455 Glen Iris Experience Center, John oversees the technical training programs, retrofit service delivery, and technology infrastructure that form the backbone of our competitive advantage. His certification as a Ubiquiti Full Stack Professional positions him at the forefront of network technology, ensuring our team remains ahead of industry trends and maintains the highest standards of technical excellence.
                  </p>

                  <p className="leading-relaxed">
                    John's leadership style emphasizes collaboration, continuous improvement, and measurable results. He champions a culture of innovation while maintaining the operational discipline necessary for successful scaling and sustainable growth.
                  </p>
                </>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={comparisonModalOpen} onOpenChange={setComparisonModalOpen}>
        <DialogContent className="max-w-[95vw] md:max-w-6xl max-h-[95vh] overflow-hidden">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-xl md:text-2xl flex items-center gap-2">
              <ArrowsLeftRight size={24} weight="bold" className="text-secondary" />
              Scenario Comparison Analysis
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[calc(95vh-8rem)] pr-4">
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                <Card className="p-4 md:p-5 border-2 border-muted">
                  <div className="flex flex-col gap-3 mb-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base md:text-lg font-semibold">Conservative</h3>
                      <Badge variant="outline" className="text-xs">Floor</Badge>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-baseline gap-3">
                      <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">Revenue</span>
                      <span className="font-mono text-base md:text-lg font-bold">${(floorFinancials.revenue / 1000).toFixed(0)}K</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-baseline gap-3">
                      <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">Gross Profit</span>
                      <span className="font-mono text-sm md:text-base font-semibold">${(floorFinancials.grossProfit / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between items-baseline gap-3">
                      <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">Gross Margin</span>
                      <span className="font-mono text-sm md:text-base font-semibold">{floorFinancials.grossMargin.toFixed(1)}%</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-baseline gap-3">
                      <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">NOI</span>
                      <span className="font-mono text-sm md:text-base font-semibold">${(floorFinancials.noi / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between items-baseline gap-3">
                      <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">Net Margin</span>
                      <span className="font-mono text-sm md:text-base font-semibold">{floorFinancials.netMargin.toFixed(1)}%</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between items-center gap-3 p-2.5 md:p-3 bg-muted/50 rounded-lg">
                      <span className="text-xs md:text-sm font-semibold whitespace-nowrap">DSCR</span>
                      <span className="font-mono text-lg md:text-xl font-bold text-success">{floorFinancials.dscr}×</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 md:p-5 border-2 border-secondary shadow-lg bg-secondary/5">
                  <div className="flex flex-col gap-3 mb-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base md:text-lg font-semibold">Base Case</h3>
                      <Badge className="bg-secondary text-secondary-foreground text-xs">Recommended</Badge>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-baseline gap-3">
                      <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">Revenue</span>
                      <span className="font-mono text-base md:text-lg font-bold">${(baseFinancials.revenue / 1000).toFixed(0)}K</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-baseline gap-3">
                      <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">Gross Profit</span>
                      <span className="font-mono text-sm md:text-base font-semibold">${(baseFinancials.grossProfit / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between items-baseline gap-3">
                      <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">Gross Margin</span>
                      <span className="font-mono text-sm md:text-base font-semibold">{baseFinancials.grossMargin.toFixed(1)}%</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-baseline gap-3">
                      <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">NOI</span>
                      <span className="font-mono text-sm md:text-base font-semibold">${(baseFinancials.noi / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between items-baseline gap-3">
                      <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">Net Margin</span>
                      <span className="font-mono text-sm md:text-base font-semibold">{baseFinancials.netMargin.toFixed(1)}%</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between items-center gap-3 p-2.5 md:p-3 bg-success/10 rounded-lg border border-success/20">
                      <span className="text-xs md:text-sm font-semibold whitespace-nowrap">DSCR</span>
                      <span className="font-mono text-lg md:text-xl font-bold text-success">{baseFinancials.dscr}×</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 md:p-5 border-2 border-muted">
                  <div className="flex flex-col gap-3 mb-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base md:text-lg font-semibold">Growth</h3>
                      <Badge variant="outline" className="text-xs">Stretch</Badge>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-baseline gap-3">
                      <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">Revenue</span>
                      <span className="font-mono text-base md:text-lg font-bold">${(stretchFinancials.revenue / 1000).toFixed(0)}K</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-baseline gap-3">
                      <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">Gross Profit</span>
                      <span className="font-mono text-sm md:text-base font-semibold">${(stretchFinancials.grossProfit / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between items-baseline gap-3">
                      <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">Gross Margin</span>
                      <span className="font-mono text-sm md:text-base font-semibold">{stretchFinancials.grossMargin.toFixed(1)}%</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-baseline gap-3">
                      <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">NOI</span>
                      <span className="font-mono text-sm md:text-base font-semibold">${(stretchFinancials.noi / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between items-baseline gap-3">
                      <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">Net Margin</span>
                      <span className="font-mono text-sm md:text-base font-semibold">{stretchFinancials.netMargin.toFixed(1)}%</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between items-center gap-3 p-2.5 md:p-3 bg-muted/50 rounded-lg">
                      <span className="text-xs md:text-sm font-semibold whitespace-nowrap">DSCR</span>
                      <span className="font-mono text-lg md:text-xl font-bold text-success">{stretchFinancials.dscr}×</span>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold mb-4">Revenue Driver Assumptions</h3>
                <div className="overflow-x-auto -mx-4 md:mx-0">
                  <table className="w-full text-xs md:text-sm min-w-[500px]">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold">Revenue Stream</th>
                        <th className="text-center py-2 md:py-3 px-2 md:px-4 font-semibold">Conservative</th>
                        <th className="text-center py-2 md:py-3 px-2 md:px-4 font-semibold bg-secondary/10">Base Case</th>
                        <th className="text-center py-2 md:py-3 px-2 md:px-4 font-semibold">Growth</th>
                      </tr>
                    </thead>
                    <tbody className="font-mono">
                      <tr className="border-b">
                        <td className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap">Training Seats/Quarter</td>
                        <td className="text-center py-2 md:py-3 px-2 md:px-4">{scenarios.floor.training}</td>
                        <td className="text-center py-2 md:py-3 px-2 md:px-4 bg-secondary/10 font-semibold">{scenarios.base.training}</td>
                        <td className="text-center py-2 md:py-3 px-2 md:px-4">{scenarios.stretch.training}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap">Retrofit Projects/Year</td>
                        <td className="text-center py-2 md:py-3 px-2 md:px-4">{scenarios.floor.retrofit}</td>
                        <td className="text-center py-2 md:py-3 px-2 md:px-4 bg-secondary/10 font-semibold">{scenarios.base.retrofit}</td>
                        <td className="text-center py-2 md:py-3 px-2 md:px-4">{scenarios.stretch.retrofit}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap">Retail Locations</td>
                        <td className="text-center py-2 md:py-3 px-2 md:px-4">{scenarios.floor.retail}</td>
                        <td className="text-center py-2 md:py-3 px-2 md:px-4 bg-secondary/10 font-semibold">{scenarios.base.retail}</td>
                        <td className="text-center py-2 md:py-3 px-2 md:px-4">{scenarios.stretch.retail}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap">Consulting Hours/Month</td>
                        <td className="text-center py-2 md:py-3 px-2 md:px-4">{scenarios.floor.consulting}</td>
                        <td className="text-center py-2 md:py-3 px-2 md:px-4 bg-secondary/10 font-semibold">{scenarios.base.consulting}</td>
                        <td className="text-center py-2 md:py-3 px-2 md:px-4">{scenarios.stretch.consulting}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap">Maintenance Contracts</td>
                        <td className="text-center py-2 md:py-3 px-2 md:px-4">{scenarios.floor.maintenance}</td>
                        <td className="text-center py-2 md:py-3 px-2 md:px-4 bg-secondary/10 font-semibold">{scenarios.base.maintenance}</td>
                        <td className="text-center py-2 md:py-3 px-2 md:px-4">{scenarios.stretch.maintenance}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 md:py-3 px-2 md:px-4 whitespace-nowrap">Affiliate Partnerships</td>
                        <td className="text-center py-2 md:py-3 px-2 md:px-4">{scenarios.floor.affiliate}</td>
                        <td className="text-center py-2 md:py-3 px-2 md:px-4 bg-secondary/10 font-semibold">{scenarios.base.affiliate}</td>
                        <td className="text-center py-2 md:py-3 px-2 md:px-4">{scenarios.stretch.affiliate}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card className="p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold mb-4">Revenue Mix Comparison</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                  <div>
                    <p className="text-xs md:text-sm font-medium text-muted-foreground mb-3 text-center">Conservative</p>
                    <div className="space-y-1.5 md:space-y-2">
                      {[
                        { label: 'Training', value: floorFinancials.revenueByStream.training, icon: <GraduationCap size={14} weight="duotone" /> },
                        { label: 'Retrofit', value: floorFinancials.revenueByStream.retrofit, icon: <Wrench size={14} weight="duotone" /> },
                        { label: 'Retail', value: floorFinancials.revenueByStream.retail, icon: <Storefront size={14} weight="duotone" /> },
                        { label: 'Consulting', value: floorFinancials.revenueByStream.consulting, icon: <Headset size={14} weight="duotone" /> },
                        { label: 'Maintenance', value: floorFinancials.revenueByStream.maintenance, icon: <CirclesThreePlus size={14} weight="duotone" /> },
                        { label: 'Affiliate', value: floorFinancials.revenueByStream.affiliate, icon: <Handshake size={14} weight="duotone" /> }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-1.5 md:p-2 bg-muted/30 rounded text-xs md:text-sm">
                          <div className="flex items-center gap-1.5 md:gap-2">
                            {item.icon}
                            <span className="whitespace-nowrap">{item.label}</span>
                          </div>
                          <span className="font-mono font-semibold whitespace-nowrap">${(item.value / 1000).toFixed(0)}K</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs md:text-sm font-medium text-muted-foreground mb-3 text-center">Base Case</p>
                    <div className="space-y-1.5 md:space-y-2">
                      {[
                        { label: 'Training', value: baseFinancials.revenueByStream.training, icon: <GraduationCap size={14} weight="duotone" /> },
                        { label: 'Retrofit', value: baseFinancials.revenueByStream.retrofit, icon: <Wrench size={14} weight="duotone" /> },
                        { label: 'Retail', value: baseFinancials.revenueByStream.retail, icon: <Storefront size={14} weight="duotone" /> },
                        { label: 'Consulting', value: baseFinancials.revenueByStream.consulting, icon: <Headset size={14} weight="duotone" /> },
                        { label: 'Maintenance', value: baseFinancials.revenueByStream.maintenance, icon: <CirclesThreePlus size={14} weight="duotone" /> },
                        { label: 'Affiliate', value: baseFinancials.revenueByStream.affiliate, icon: <Handshake size={14} weight="duotone" /> }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-1.5 md:p-2 bg-secondary/10 rounded text-xs md:text-sm">
                          <div className="flex items-center gap-1.5 md:gap-2">
                            {item.icon}
                            <span className="whitespace-nowrap">{item.label}</span>
                          </div>
                          <span className="font-mono font-semibold whitespace-nowrap">${(item.value / 1000).toFixed(0)}K</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs md:text-sm font-medium text-muted-foreground mb-3 text-center">Growth</p>
                    <div className="space-y-1.5 md:space-y-2">
                      {[
                        { label: 'Training', value: stretchFinancials.revenueByStream.training, icon: <GraduationCap size={14} weight="duotone" /> },
                        { label: 'Retrofit', value: stretchFinancials.revenueByStream.retrofit, icon: <Wrench size={14} weight="duotone" /> },
                        { label: 'Retail', value: stretchFinancials.revenueByStream.retail, icon: <Storefront size={14} weight="duotone" /> },
                        { label: 'Consulting', value: stretchFinancials.revenueByStream.consulting, icon: <Headset size={14} weight="duotone" /> },
                        { label: 'Maintenance', value: stretchFinancials.revenueByStream.maintenance, icon: <CirclesThreePlus size={14} weight="duotone" /> },
                        { label: 'Affiliate', value: stretchFinancials.revenueByStream.affiliate, icon: <Handshake size={14} weight="duotone" /> }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-1.5 md:p-2 bg-muted/30 rounded text-xs md:text-sm">
                          <div className="flex items-center gap-1.5 md:gap-2">
                            {item.icon}
                            <span className="whitespace-nowrap">{item.label}</span>
                          </div>
                          <span className="font-mono font-semibold whitespace-nowrap">${(item.value / 1000).toFixed(0)}K</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold mb-4">Key Metrics Comparison</h3>
                <div className="h-64 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      {
                        name: 'Revenue',
                        Conservative: floorFinancials.revenue / 1000,
                        'Base Case': baseFinancials.revenue / 1000,
                        Growth: stretchFinancials.revenue / 1000
                      },
                      {
                        name: 'Gross Profit',
                        Conservative: floorFinancials.grossProfit / 1000,
                        'Base Case': baseFinancials.grossProfit / 1000,
                        Growth: stretchFinancials.grossProfit / 1000
                      },
                      {
                        name: 'NOI',
                        Conservative: floorFinancials.noi / 1000,
                        'Base Case': baseFinancials.noi / 1000,
                        Growth: stretchFinancials.noi / 1000
                      }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip 
                        formatter={(value) => `$${Number(value).toFixed(0)}K`}
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }}
                      />
                      <Legend wrapperStyle={{ fontSize: '12px' }} />
                      <Bar 
                        dataKey="Conservative" 
                        fill="hsl(var(--muted-foreground))" 
                        radius={[4, 4, 0, 0]}
                        animationDuration={1000}
                        animationBegin={0}
                      />
                      <Bar 
                        dataKey="Base Case" 
                        fill="hsl(var(--secondary))"
                        radius={[4, 4, 0, 0]}
                        animationDuration={1000}
                        animationBegin={100}
                      />
                      <Bar 
                        dataKey="Growth" 
                        fill="hsl(var(--accent))"
                        radius={[4, 4, 0, 0]}
                        animationDuration={1000}
                        animationBegin={200}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 pt-4">
                <Button onClick={() => { setScenarioValues('floor'); setComparisonModalOpen(false); }} variant="outline" className="text-sm md:text-base">
                  Apply Conservative
                </Button>
                <Button onClick={() => { setScenarioValues('base'); setComparisonModalOpen(false); }} className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-sm md:text-base">
                  Apply Base Case
                </Button>
                <Button onClick={() => { setScenarioValues('stretch'); setComparisonModalOpen(false); }} variant="outline" className="text-sm md:text-base">
                  Apply Growth
                </Button>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <PropertyGalleryModal 
        open={galleryModalOpen} 
        onOpenChange={setGalleryModalOpen}
        initialIndex={galleryInitialIndex}
      />
    </div>
  )
}

export default App