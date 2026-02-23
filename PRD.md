# OverIT SBA 7(a) Loan Prospectus Dashboard

A professional, interactive digital prospectus designed to secure SBA 7(a) loan approval for the 455 Glen Iris Experience Center acquisition and build-out.

**Experience Qualities**:
1. **Trustworthy** - Inspires confidence through professional design, clear data visualization, and comprehensive documentation that demonstrates business viability
2. **Impressive** - Commands attention with modern aesthetics, interactive financial models, and compelling visual storytelling that sets it apart from traditional loan applications
3. **Transparent** - Makes complex financial projections and business strategy immediately accessible through intuitive navigation and clear information hierarchy

**Complexity Level**: Complex Application (advanced functionality, likely with multiple views)
This is a sophisticated financial presentation tool with multiple interactive features: live repayment calculators with scenario modeling, dynamic charts, image carousels, modal overlays for detailed content, and extensive document references - all while maintaining print-friendly capabilities for traditional underwriting processes.

## Essential Features

### Hero Loan Request Dashboard
- **Functionality**: Display key loan metrics at a glance with animated counters and prominent call-to-action
- **Purpose**: Immediately communicate the core ask and business fundamentals to busy underwriters
- **Trigger**: Page load
- **Progression**: Page loads → Hero animates in → Key metrics cards reveal ($640K loan, $850K appraisal, 2.61× DSCR) → CTA buttons pulse
- **Success criteria**: All critical numbers visible above fold, DSCR prominently featured, professional first impression

### Interactive Property Showcase
- **Functionality**: Full-screen image carousel with property details and location information
- **Purpose**: Visualize the collateral asset and demonstrate property quality
- **Trigger**: User scrolls to property section or clicks property nav link
- **Progression**: Section enters viewport → Carousel auto-plays → User can navigate images → Property specs display alongside
- **Success criteria**: All uploaded property images display, smooth transitions, mobile-responsive layout

### Four Synergistic Pillars
- **Functionality**: Visual breakdown of business model into 4 revenue streams with icons and descriptions
- **Purpose**: Demonstrate revenue diversification and strategic positioning
- **Trigger**: Scroll into view
- **Progression**: User scrolls → Cards animate in sequentially → Hover states reveal additional details → Each pillar links to deeper content
- **Success criteria**: Clear visual hierarchy, digestible descriptions, reinforces business strategy

### Interactive Financial Modeler
- **Functionality**: Live calculator with sliders for six revenue drivers (training seats, retrofit projects, retail locations, consulting hours, maintenance contracts, affiliate partnerships) that updates comprehensive financial metrics and charts in real-time, plus a side-by-side scenario comparison modal
- **Purpose**: Allow lender to explore scenarios, validate projections independently, and understand full P&L including revenue mix, expenses, margins, break-even analysis, and compare all three scenarios simultaneously
- **Trigger**: User interacts with slider controls or scenario buttons (Floor/Base/Stretch), or clicks "Compare Scenarios" button
- **Progression**: Default loads Base scenario → User adjusts sliders → Revenue, Gross Profit, Gross Margin, NOI, Net Margin, and DSCR update instantly → Multiple charts re-render (5-year projections, revenue mix pie chart, expense breakdown, revenue driver details) → Scenario buttons allow quick comparison → "Compare Scenarios" button opens modal → Modal displays all three scenarios side-by-side with detailed metrics, revenue driver assumptions table, revenue mix breakdown, and comparison chart → User can apply any scenario from modal
- **Success criteria**: Smooth real-time updates (<100ms), accurate calculations match business plan, intuitive controls, DSCR always prominently displayed, all six revenue streams visible and adjustable, expense breakdown shows COGS/fixed/variable costs, break-even analysis clearly displayed, comparison modal provides clear visual differentiation between scenarios with actionable buttons

### TCO Comparison Charts
- **Functionality**: Visual comparison charts showing 77% cost savings vs competitors
- **Purpose**: Demonstrate market disruption and competitive advantage
- **Trigger**: Scroll into market disruption section
- **Progression**: Section enters view → Bar charts animate in → Hover shows exact figures → Savings percentage highlights
- **Success criteria**: Clear visual impact, numbers match business plan PDFs, savings immediately obvious

### Leadership & Canvas Letter Modal
- **Functionality**: Modal overlay displaying Cameron Champion's full background and vision letter
- **Purpose**: Humanize the application and demonstrate founder credibility
- **Trigger**: Click on leadership card or "Read Full Canvas Letter" button
- **Progression**: User clicks trigger → Modal fades in → Full letter displays with photo → Smooth scroll within modal → Close button or outside click dismisses
- **Success criteria**: Professional typography, easy to read, modal doesn't disrupt page state

### Lender Checklist Section
- **Functionality**: Structured display of every item requested in Mark's email with status and document links
- **Purpose**: Make underwriter's job easier by organizing exactly what was requested
- **Trigger**: Navigate to "For the Lender" section
- **Progression**: Section loads → Checklist displays with checkmarks → Use of Funds table shows → Document links are accessible
- **Success criteria**: Every item from SBA_Mark's_Email.pdf addressed, clean table formatting, clear document references

### Print-Optimized Export
- **Functionality**: CSS print styles that create professional PDF when printing
- **Purpose**: Generate traditional document format for file submission
- **Trigger**: User prints page (Ctrl+P or File > Print)
- **Progression**: Print dialog opens → Page reformats → Navigation hides → Interactive elements flatten → Page breaks optimized → Clean PDF exports
- **Success criteria**: Readable print output, no cut-off content, maintains professional appearance

## Edge Case Handling
- **Missing Images**: Display placeholder with descriptive text if image fails to load
- **Calculation Errors**: Validate slider inputs to prevent division by zero or negative values in DSCR calculations
- **Mobile Narrow Viewports**: Stack charts vertically, simplify modeler to essential controls, ensure touch targets are 44px minimum
- **Print from Mobile**: Detect print media query and optimize regardless of device
- **Long Content in Modals**: Enable internal scroll when content exceeds viewport height
- **Browser without JS**: Display static version with critical information still accessible
- **Slow Network**: Show loading states for images, lazy load below-fold content

## Design Direction
The design should evoke trust, sophistication, and innovation - feeling like a fintech startup meets enterprise SaaS. It must balance being visually modern (to show the business understands technology) while maintaining financial gravitas (to inspire confidence in loan underwriters). The aesthetic should whisper "we know what we're doing" through attention to detail, smooth interactions, and data-driven storytelling.

## Color Selection
A professional tech-finance palette inspired by UniFi's brand with financial credibility:

- **Primary Color**: `oklch(0.25 0.04 255)` - Deep navy blue that communicates trust, stability, and financial expertise
- **Secondary Colors**: 
  - Sky Blue `oklch(0.65 0.15 230)` - UniFi-inspired technology blue for interactive elements and data visualization
  - Emerald `oklch(0.65 0.15 165)` - Success color for positive metrics (DSCR, profitability, savings)
- **Accent Color**: `oklch(0.70 0.18 50)` - Warm amber for calls-to-action and important highlights that demand attention
- **Foreground/Background Pairings**: 
  - Primary Navy (#0A0F1E): White text (#FFFFFF) - Ratio 16.2:1 ✓
  - Sky Blue (#3B9ED8): White text (#FFFFFF) - Ratio 5.1:1 ✓
  - Emerald (#2DB884): White text (#FFFFFF) - Ratio 4.8:1 ✓
  - Background Light (#F8FAFC): Dark Navy (#0A0F1E) - Ratio 15.8:1 ✓

## Font Selection
Typography should convey modern professionalism with a hint of editorial sophistication to elevate beyond typical business presentations.

- **Typographic Hierarchy**:
  - H1 (Main Title): Playfair Display Bold/48px/tight - Editorial gravitas for hero headline
  - H2 (Section Headers): Inter Bold/32px/normal - Clean modern hierarchy
  - H3 (Card Headers): Inter SemiBold/24px/normal - Clear subsection definition
  - Body (Primary): Inter Regular/16px/relaxed (1.6 line-height) - Maximum readability for financial details
  - Body (Small): Inter Regular/14px/relaxed - Supporting text and captions
  - Numbers (Large Metrics): Inter Bold/40px/tight - Tabular numerals for financial figures
  - Numbers (Data): JetBrains Mono Medium/14px/normal - Monospace for tables and precise figures

## Animations
Animations should feel purposeful and professional, never gratuitous. Use motion to guide attention to key metrics, provide feedback on interactions, and create smooth transitions between states. The repayment modeler should update in real-time (<100ms) to feel responsive. Section entrances should use subtle fade-up animations (300ms ease-out) to create rhythm without slowing comprehension. Hover states on cards and buttons should provide immediate tactile feedback (150ms). Chart animations should draw attention to data relationships through thoughtful sequencing (stagger by 50ms per element).

## Component Selection
- **Components**: 
  - Card (shadcn) - Primary container for all content sections with subtle shadows
  - Button (shadcn) - CTAs with variant="default" for primary actions, variant="outline" for secondary
  - Slider (shadcn) - Financial model input controls with real-time value display
  - Dialog (shadcn) - Modal overlays for Canvas letter and detailed content
  - Tabs (shadcn) - Scenario switching (Floor/Base/Stretch) in financial modeler
  - Badge (shadcn) - Status indicators and metric labels
  - Separator (shadcn) - Visual section breaks
  - Carousel (embla-carousel-react) - Property image showcase
  - Charts (recharts) - All financial visualizations (bar charts for TCO, line charts for projections, composed charts for modeler)
  - Scroll Area (shadcn) - Modal content when exceeding viewport

- **Customizations**: 
  - Custom animated counter component for hero metrics using framer-motion
  - Custom print stylesheet that hides navigation and flattens interactive elements
  - Custom gradient backgrounds for hero section (navy to slate with subtle texture)
  - Custom table component for Use of Funds with alternating row colors

- **States**: 
  - Buttons: Default (solid), Hover (lifted with shadow), Active (pressed), Disabled (muted)
  - Sliders: Default, Hover (thumb enlarges), Dragging (strong accent color), Disabled
  - Cards: Default (subtle shadow), Hover (elevated shadow + border glow)
  - Modals: Closed (opacity 0, scale 0.95), Opening (smooth fade + scale to 1), Open, Closing (reverse)

- **Icon Selection**: 
  - @phosphor-icons/react throughout
  - Building (for property)
  - ChartLine (for projections)
  - Target (for pillars)
  - CurrencyDollar (for financial)
  - Users (for training)
  - TrendUp (for growth metrics)
  - CheckCircle (for checklist items)
  - FileText (for documents)

- **Spacing**: 
  - Section padding: py-20 px-6 (large breathing room between major sections)
  - Card padding: p-8 (generous internal space)
  - Card gaps: gap-6 (clear separation without distance)
  - Grid gaps: gap-8 (desktop), gap-6 (mobile)
  - Component spacing: space-y-4 for vertical stacks

- **Mobile**: 
  - Hero: Stack metrics vertically, reduce font sizes (H1 to 36px)
  - Property carousel: Full-width swipe, reduce height to 60vh
  - Financial modeler: Stack controls vertically, simplify to 2 key sliders, show charts in tabs instead of side-by-side
  - Pillars: Single column on mobile, two columns on tablet, four columns on desktop
  - Tables: Horizontal scroll with sticky first column
  - Navigation: Hamburger menu with slide-in drawer
