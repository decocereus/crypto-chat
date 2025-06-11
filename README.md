# 🚀 CryptoChat - AI-Powered Cryptocurrency Assistant

A modern, intelligent cryptocurrency chat bot built with Next.js, TypeScript, and React. Get real-time crypto data, track your portfolio, and interact using voice commands - all through a beautiful, responsive chat interface with smooth theme transitions.

![CryptoChat Demo](https://img.shields.io/badge/Status-Live-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8)

## ✨ Features

### 💬 **Intelligent Chat Interface**

- Natural language processing for crypto queries
- Real-time responses with loading states
- Error handling with helpful feedback
- Message history and timestamps
- **Mobile-optimized**: Perfect on 320px+ devices

### 🎨 **Advanced Theme System**

- **Smart Theme Toggle**: Light/Dark mode switching
- **Smooth Transitions**: 300ms animated theme changes
- **Flash Effects**: Subtle visual feedback during theme switches
- **Auto Theme Detection**: Follows system preferences
- **Persistent Settings**: Remembers your theme choice

### 📊 **Enhanced Interactive Charts**

- **Crystal Clear Visualization**: Visible grid lines and axes
- **Theme-Aware Colors**: Charts adapt to light/dark mode
- **Responsive Design**: Perfect on all screen sizes
- **Better Typography**: Larger, more readable labels
- **Smooth Animations**: Chart elements transition with themes
- **Professional Grid**: Horizontal guidelines for easy reading

### 🎤 **Voice Commands**

- **Speech-to-Text**: Speak your queries naturally
- **Text-to-Speech**: Bot responses read aloud
- HTTPS support with microphone permissions
- Cross-browser compatibility (Chrome, Edge optimized)

### 📈 **Real-Time Market Data**

- Live cryptocurrency prices from CoinGecko API
- Trending coins and market rankings
- 7-day price charts with interactive tooltips
- Market cap and 24h change data

### 💼 **Portfolio Tracking**

- Add holdings: _"I have 2.5 ETH"_
- View portfolio: _"Show my portfolio"_
- Persistent storage with localStorage
- Real-time portfolio valuation

### 📱 **Responsive Design**

- **Mobile-First**: Optimized for 320px and up
- **Adaptive Layout**: Smart spacing and typography scaling
- **Touch-Friendly**: Large tap targets and smooth scrolling
- **Flexible Components**: Everything scales beautifully
- **No Horizontal Scroll**: Perfect width handling on all devices

## 🎯 Example Queries

```
💰 "What's BTC trading at?"
🔥 "Show me trending coins"
📊 "I have 2 ETH and 0.5 BTC"
📈 "Show me Bitcoin chart"
📋 "Tell me about Ethereum"
❓ "Help" - see all commands
```

## 🎨 Design & User Experience

### **Modern Design System**

- **Shadcn/UI**: Modern, accessible components
- **Tailwind CSS 4.0**: Latest utility-first styling
- **Animated Transitions**: Smooth 300ms theme changes
- **Professional Charts**: Clear grid lines and readable axes
- **Responsive Typography**: Scales from 13px to larger sizes

### **Theme System Features**

- **Instant Visual Feedback**: Flash effect on theme change
- **Rotating Icons**: Sun/moon icons animate during switch
- **Button States**: Hover and click animations
- **Disabled Protection**: Prevents rapid theme switching
- **Smooth Color Transitions**: All colors fade smoothly

### **Chart Enhancements**

- **Visible Grid Lines**: Clear horizontal guidelines
- **Theme-Aware Colors**: Borders and text match your theme
- **Larger Margins**: Better spacing around chart elements
- **Readable Labels**: 13px font size with proper contrast
- **Professional Styling**: Matches your app's design system

## 🏗️ Architecture

### **Enhanced Component Structure**

```
src/
├── app/
│   ├── globals.css        # Theme system & animations
│   ├── layout.tsx         # Root layout with theme provider
│   └── page.tsx           # Main page component
├── components/
│   ├── message/           # Message components
│   │   ├── MessageContent.tsx  # Message text & chart rendering
│   │   ├── MessageAvatar.tsx   # User/bot avatars
│   │   └── MessageTimestamp.tsx # Time display
│   ├── chart/             # Enhanced chart components
│   │   ├── ChartConfig.ts      # Chart styling & configuration
│   │   ├── ChartHeader.tsx     # Chart title & metrics
│   │   └── ChartTooltip.tsx    # Interactive chart tooltips
│   ├── ui/                # Shadcn/UI components
│   │   ├── button.tsx          # Themed button component
│   │   ├── card.tsx            # Card layouts
│   │   ├── input.tsx           # Form inputs
│   │   ├── badge.tsx           # Status badges
│   │   ├── avatar.tsx          # User avatars
│   │   ├── scroll-area.tsx     # Custom scrollbars
│   │   ├── sonner.tsx          # Toast notifications
│   │   └── ...                 # Other UI components
│   ├── theme-provider.tsx # Next-themes integration
│   ├── theme-toggle.tsx   # Animated theme switcher
│   ├── Chat.tsx           # Main responsive chat interface
│   ├── ChatMessage.tsx    # Message wrapper component
│   ├── ChatInput.tsx      # Voice + text input with UI
│   └── PriceChart.tsx     # Enhanced interactive charts
├── lib/
│   ├── chart-utils.ts     # Advanced chart calculations
│   └── utils.ts           # Utility functions & helpers
├── types/
│   └── crypto.ts          # TypeScript interfaces
└── services/
    ├── crypto/
    │   ├── cryptoApi.ts        # CoinGecko API service
    │   ├── base/               # Base API configurations
    │   ├── clients/            # API client implementations
    │   ├── config/             # Service configurations
    │   └── mappers/            # Data transformation
    └── chat-processor/
        ├── chatProcessor.ts    # Main chat logic
        ├── extractors/         # Data extraction utilities
        ├── parsers/            # Query parsing logic
        ├── patterns/           # Text pattern matching
        └── responses/          # Response generation
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- HTTPS environment (for voice features)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/decocereus/crypto-chat-bot.git
cd crypto-chat-bot
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

4. **Open your browser**

```
https://localhost:3000
```

> **Note**: Voice features require HTTPS. Use `ngrok` or similar for local HTTPS testing.

## 🔧 Configuration

### **API Configuration**

The app uses the free CoinGecko API (no key required):

- Rate limit: 10-30 requests/minute
- Data: Real-time prices, trending coins, charts
- Endpoints: Prices, search, trending, market data

### **Theme System**

```typescript
// Automatic theme detection and persistence
defaultTheme: "system"; // Follows OS preference
enableSystem: true; // System preference detection
disableTransitionOnChange: false; // Smooth transitions enabled
```

### **Enhanced Chart Configuration**

```typescript
// src/components/chart/ChartConfig.ts
export const CHART_CONFIG = {
  DIMENSIONS: { HEIGHT: 192, WIDTH: "100%" },
  COLORS: {
    POSITIVE: "#16a34a",
    NEGATIVE: "#dc2626",
  },
  CHART_SETTINGS: {
    STROKE_WIDTH: 3, // Thicker lines
    Y_AXIS_PADDING: 0.1,
    ACTIVE_DOT_RADIUS: 7, // Larger interaction dots
  },
};
```

### **Responsive Breakpoints**

```css
/* Enhanced responsive design */
xs: 320px   /* Extra small devices */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
```

## 🎨 UI/UX Features

### **Advanced Design System**

- **Next-Themes**: Seamless theme switching with persistence
- **Smooth Animations**: 300ms cubic-bezier transitions
- **Theme-Aware Charts**: Charts adapt colors to current theme
- **Mobile-First Responsive**: Perfect from 320px to desktop
- **Professional Typography**: Readable fonts and proper scaling

### **Enhanced User Experience**

- **Animated Loading States**: Smooth transitions and feedback
- **Smart Error Handling**: Clear, actionable error messages
- **Full Accessibility**: Screen reader friendly with proper ARIA
- **Optimized Performance**: Efficient rendering and API calls
- **Theme Persistence**: Remembers your preference across sessions

### **Chart Improvements**

- **Visible Grid Lines**: Clear horizontal reference lines
- **Theme Integration**: Colors automatically match your theme
- **Better Readability**: Larger fonts and improved contrast
- **Professional Styling**: Consistent with app design language
- **Smooth Transitions**: Charts animate with theme changes

## 🔊 Voice Features

### **Speech Recognition**

- Natural language input
- Multiple browser support
- Error handling for permissions
- Real-time feedback

### **Text-to-Speech**

- Bot responses read aloud
- Configurable voice settings
- Automatic for short responses
- Skip for chart/complex data

### **Browser Support**

- ✅ **Chrome/Edge**: Full support
- ⚠️ **Firefox**: Limited support
- ❌ **Safari**: Basic support

## 📱 Enhanced Responsive Design

### **Mobile Optimization**

- **320px Support**: Perfect on smallest devices
- **Touch-Optimized**: Large tap targets and smooth scrolling
- **Adaptive Typography**: Text scales appropriately
- **Smart Spacing**: Responsive padding and margins
- **No Overflow**: Proper width handling prevents horizontal scroll

### **Responsive Features**

- **Adaptive Header**: Logo and badges scale on mobile
- **Flexible Charts**: Charts resize perfectly on all screens
- **Smart Navigation**: Theme toggle accessible on all devices
- **Progressive Enhancement**: Features scale with screen size

### **Screen Size Support**

- **Mobile (320px+)**: Optimized compact layout
- **Tablet (768px+)**: Enhanced spacing and larger elements
- **Desktop (1024px+)**: Full feature set with optimal spacing
- **Large Screens (1280px+)**: Maximum content width with centering

## 🛡️ Error Handling

### **API Errors**

- Rate limiting detection
- Network error recovery
- Coin not found fallbacks
- Service unavailable handling

### **Voice Errors**

- Microphone permission issues
- Speech recognition failures
- HTTPS requirement warnings
- Browser compatibility alerts

### **Theme System Errors**

- Graceful fallbacks for unsupported browsers
- Smooth transitions even with CSS variable issues
- Safe hydration for server-side rendering

## 📊 Supported Cryptocurrencies

### **Major Coins**

Bitcoin (BTC), Ethereum (ETH), Cardano (ADA), Solana (SOL), Polkadot (DOT), Avalanche (AVAX), Polygon (MATIC), Chainlink (LINK), Uniswap (UNI), Dogecoin (DOGE), Shiba Inu (SHIB), Ripple (XRP)

### **Query Examples**

- Symbol: `BTC`, `ETH`, `ADA`
- Name: `Bitcoin`, `Ethereum`, `Cardano`
- Aliases: Auto-detected and normalized

## 🔮 Potential Enhancements

- [ ] **News Integration**: Crypto news and alerts
- [ ] **Portfolio Analytics**: Performance tracking with enhanced charts
- [ ] **Price Alerts**: Custom notifications with theme-aware styling
- [ ] **Social Features**: Share charts and insights
- [ ] **Advanced Charts**: Technical indicators with theme support
- [ ] **Mobile App**: React Native version with theme sync
- [ ] **Multi-language**: International support
- [ ] **AI Insights**: Market analysis and predictions
- [ ] **Custom Themes**: User-created color schemes
- [ ] **Chart Customization**: User-selectable chart styles

## 🎯 Recent Updates

### **v2.0 - Enhanced UI & Responsiveness**

- ✅ **Mobile-First Responsive Design**: Perfect 320px+ support
- ✅ **Advanced Theme System**: Smooth transitions with flash effects
- ✅ **Enhanced Charts**: Visible grids, theme colors, better readability
- ✅ **Improved Typography**: Larger fonts and better contrast
- ✅ **Animated Interactions**: Smooth theme switching with visual feedback
- ✅ **Performance Optimizations**: Faster rendering and smoother animations

---

**Built with ❤️ by [Amartya Singh](https://github.com/decocereus)**

_Star ⭐ this repository if you found it helpful!_
