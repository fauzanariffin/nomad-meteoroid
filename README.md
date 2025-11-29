# iOS Weather App Clone

A high-fidelity clone of the iOS Weather App built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Real-time Weather Data**: Fetches data from OpenWeatherMap API.
- **Apple-like Design**: Deep blue gradients, glassmorphism, and smooth animations.
- **Hourly Forecast**: Horizontal scrollable view for the next 24 hours.
- **Daily Forecast**: 5-day forecast with visual temperature bars.
- **Search**: Search for any city worldwide.
- **Responsive**: Optimized for mobile and desktop viewports.

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. **Environment Setup**:
   Create a `.env.local` file in the root directory and add your OpenWeatherMap API key:
   ```env
   OPENWEATHER_API_KEY=your_api_key_here
   ```
   *Note: If no API key is provided, the app will use realistic mock data.*

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```

4. **Open the App**:
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Technologies

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React (Icons)
