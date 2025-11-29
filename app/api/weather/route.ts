import { NextResponse } from "next/server";
import { WeatherData } from "@/lib/types";

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city") || "San Francisco";

    if (!API_KEY) {
        console.warn("No API key found, returning mock data");
        return NextResponse.json(getMockData(city));
    }

    try {
        // Fetch Current Weather
        const currentRes = await fetch(
            `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!currentRes.ok) {
            if (currentRes.status === 404) {
                return NextResponse.json({ error: "City not found" }, { status: 404 });
            }
            throw new Error("Failed to fetch current weather");
        }

        const currentData = await currentRes.json();

        // Fetch Forecast
        const forecastRes = await fetch(
            `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!forecastRes.ok) {
            throw new Error("Failed to fetch forecast");
        }

        const forecastData = await forecastRes.json();

        // The forecast API returns data in chronological order starting from the nearest available time
        // Take the first 7 entries (we'll add current weather as the first entry)
        const upcomingForecasts = forecastData.list.slice(0, 7);

        // Create current weather entry for "Now"
        const currentHourly = {
            dt: Math.floor(Date.now() / 1000), // current timestamp
            temp: Math.round(currentData.main.temp),
            icon: currentData.weather[0].icon,
        };

        // Process Data
        const weatherData: WeatherData = {
            current: {
                temp: Math.round(currentData.main.temp),
                condition: currentData.weather[0].main,
                description: currentData.weather[0].description,
                high: Math.round(currentData.main.temp_max),
                low: Math.round(currentData.main.temp_min),
                city: currentData.name,
                feelsLike: Math.round(currentData.main.feels_like),
                humidity: currentData.main.humidity,
                pressure: currentData.main.pressure,
                windSpeed: currentData.wind.speed,
                windDeg: currentData.wind.deg,
                visibility: currentData.visibility,
            },
            hourly: [
                currentHourly, // Add current weather as first entry
                ...upcomingForecasts.map((item: any) => ({
                    dt: item.dt,
                    temp: Math.round(item.main.temp),
                    icon: item.weather[0].icon,
                }))
            ],
            daily: processDailyForecast(forecastData.list),
            timezoneOffset: currentData.timezone, // timezone offset in seconds
        };
        return NextResponse.json(weatherData);
    } catch (error) {
        console.error("Weather API Error:", error);
        // Fallback to mock data on error if it's not a 404
        return NextResponse.json(getMockData(city));
    }
}

function processDailyForecast(list: any[]) {
    const dailyMap = new Map();

    list.forEach((item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!dailyMap.has(date)) {
            dailyMap.set(date, {
                dt: item.dt,
                temp_max: item.main.temp_max,
                temp_min: item.main.temp_min,
                icon: item.weather[0].icon,
                condition: item.weather[0].main,
            });
        } else {
            const existing = dailyMap.get(date);
            existing.temp_max = Math.max(existing.temp_max, item.main.temp_max);
            existing.temp_min = Math.min(existing.temp_min, item.main.temp_min);
            // Update icon to midday if possible, or just keep first
        }
    });

    return Array.from(dailyMap.values()).slice(0, 5).map((item: any) => ({
        ...item,
        temp_max: Math.round(item.temp_max),
        temp_min: Math.round(item.temp_min)
    }));
}

function getMockData(city: string): WeatherData {
    return {
        current: {
            temp: 72,
            condition: "Clear",
            description: "clear sky",
            high: 78,
            low: 65,
            city: city,
            feelsLike: 70,
            humidity: 60,
            pressure: 1013,
            windSpeed: 2.1,
            windDeg: 180,
            visibility: 10000,
        },
        hourly: Array.from({ length: 8 }).map((_, i) => ({
            dt: Math.floor(Date.now() / 1000) + i * 3600,
            temp: 70 + Math.floor(Math.random() * 10),
            icon: "01d",
        })),
        daily: Array.from({ length: 5 }).map((_, i) => ({
            dt: Math.floor(Date.now() / 1000) + i * 86400,
            temp_max: 80 + Math.floor(Math.random() * 5),
            temp_min: 60 + Math.floor(Math.random() * 5),
            icon: "01d",
            condition: "Clear",
        })),
        timezoneOffset: 0, // UTC for mock data
    };
}
