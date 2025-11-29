# iOS Weather App Clone

A high-fidelity clone of the iOS Weather App built with Next.js 16, TypeScript, and Tailwind CSS. This project replicates the beautiful design and user experience of Apple's native Weather app, featuring glassmorphic UI elements, smooth animations, and real-time weather data.

![iOS Weather App Clone](https://img.shields.io/badge/Next.js-16.0.5-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ Features

### Core Functionality
- **Real-time Weather Data**: Fetches current weather and forecasts from OpenWeatherMap API (free tier)
- **City Search**: Search for weather in any city worldwide
- **Persistent Storage**: Remembers your last searched city using localStorage
- **Mock Data Fallback**: Works without API key using realistic mock data

### Weather Information
- **Current Weather**: Temperature, condition, high/low, and city name
- **Detailed Metrics**:
  - Feels like temperature
  - Humidity percentage
  - Atmospheric pressure
  - Wind speed and direction
  - Visibility distance
- **Hourly Forecast**: Next 24 hours in 3-hour intervals (displays in city's local timezone)
- **5-Day Forecast**: Daily high/low with visual temperature bars and weather icons

### Design & UX
- **Apple-Style UI**: Deep blue gradient background with glassmorphic cards
- **Responsive Design**: Optimized for mobile and desktop viewports
- **Smooth Animations**: Loading states with skeleton screens
- **Timezone Support**: Displays forecast times in the city's local timezone
- **Metric Units**: Temperature in Celsius, wind speed in m/s

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- OpenWeatherMap API key (optional - app works with mock data)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/fauzanariffin/nomad-meteoroid.git
   cd nomad-meteoroid
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup** (Optional):
   Create a `.env.local` file in the root directory:
   ```env
   OPENWEATHER_API_KEY=your_api_key_here
   ```
   
   > **Note**: Get a free API key from [OpenWeatherMap](https://openweathermap.org/api). If no API key is provided, the app will use realistic mock data.

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open the app**:
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
nomad-meteoroid/
├── app/
│   ├── api/
│   │   └── weather/
│   │       └── route.ts          # API route for weather data
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout with Inter font
│   └── page.tsx                  # Home page
├── components/
│   ├── CurrentWeather.tsx        # Current weather display
│   ├── DailyForecast.tsx         # 5-day forecast component
│   ├── HourlyForecast.tsx        # 24-hour forecast component
│   ├── SearchBar.tsx             # City search component
│   ├── WeatherDetails.tsx        # Additional weather metrics
│   └── WeatherMain.tsx           # Main orchestrator component
├── lib/
│   └── types.ts                  # TypeScript interfaces
├── .env.local                    # Environment variables (not in git)
├── next.config.mjs               # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

## 🛠️ Technologies

- **[Next.js 16.0.5](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[OpenWeatherMap API](https://openweathermap.org/api)** - Weather data provider

## 🎨 Design Details

### Color Palette
- Background: Blue gradient (`from-blue-500 to-blue-900`)
- Glass cards: `bg-blue-600/20` with `backdrop-blur-md`
- Text: White with varying opacity for hierarchy

### Typography
- Font: Inter (via Next.js Font optimization)
- Current temp: 96px, thin weight
- City name: 32px
- Section headers: Uppercase, small, 70% opacity

### Components
- **Glassmorphic Cards**: Rounded corners (24px), subtle borders, backdrop blur
- **Temperature Bars**: Visual representation of daily high/low temperatures
- **Scrollable Hourly**: Horizontal scroll with hidden scrollbar
- **Loading States**: Skeleton screens matching component shapes

## 🌐 API Integration

The app uses OpenWeatherMap's free tier APIs:
- **Current Weather API**: `/weather` endpoint for current conditions
- **5-day/3-hour Forecast API**: `/forecast` endpoint for future predictions

### Data Processing
- Aggregates 3-hour forecast data into daily high/low temperatures
- Converts UTC timestamps to city's local timezone
- Adds current weather as first "hourly" entry for seamless UX
- Handles API errors gracefully with mock data fallback

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Design inspiration from Apple's iOS Weather app
- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons from [Lucide](https://lucide.dev/)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/fauzanariffin/nomad-meteoroid/issues).

---

Built with ❤️ using Next.js 16
