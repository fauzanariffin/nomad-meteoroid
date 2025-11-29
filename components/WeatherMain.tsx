"use client";

import { useState, useEffect } from "react";
import CurrentWeather from "./CurrentWeather";
import HourlyForecast from "./HourlyForecast";
import DailyForecast from "./DailyForecast";
import WeatherDetails from "./WeatherDetails";
import SearchBar from "./SearchBar";
import { WeatherData } from "@/lib/types";

export default function WeatherMain() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchWeather = async (city: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
            if (!res.ok) {
                throw new Error("Failed to fetch weather data");
            }
            const data = await res.json();
            setWeather(data);
            // Save the city to localStorage
            localStorage.setItem("lastCity", city);
        } catch (err) {
            setError("Could not load weather data. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Load the last searched city from localStorage, or default to San Francisco
        const lastCity = localStorage.getItem("lastCity") || "San Francisco";
        fetchWeather(lastCity);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-900 p-4 md:p-8 overflow-hidden relative">
            <SearchBar onSearch={fetchWeather} />

            <div className="max-w-md mx-auto h-full flex flex-col">
                {loading ? (
                    <div className="animate-pulse flex flex-col items-center pt-20 gap-8">
                        <div className="h-8 w-48 bg-white/20 rounded-lg"></div>
                        <div className="h-32 w-32 bg-white/20 rounded-full"></div>
                        <div className="h-6 w-24 bg-white/20 rounded-lg"></div>
                        <div className="w-full h-40 bg-white/20 rounded-3xl mt-8"></div>
                        <div className="w-full h-64 bg-white/20 rounded-3xl mt-4"></div>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-screen text-white text-center">
                        <div>
                            <p className="text-xl mb-4">⚠️ {error}</p>
                            <button
                                onClick={() => fetchWeather("San Francisco")}
                                className="px-4 py-2 bg-white/20 rounded-full hover:bg-white/30 transition"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                ) : weather ? (
                    <>
                        <CurrentWeather
                            city={weather.current.city}
                            temp={weather.current.temp}
                            condition={weather.current.condition}
                            high={weather.current.high}
                            low={weather.current.low}
                        />
                        <WeatherDetails
                            feelsLike={weather.current.feelsLike}
                            humidity={weather.current.humidity}
                            pressure={weather.current.pressure}
                            windSpeed={weather.current.windSpeed}
                            windDeg={weather.current.windDeg}
                            visibility={weather.current.visibility}
                        />
                        <HourlyForecast data={weather.hourly} timezoneOffset={weather.timezoneOffset} />
                        <DailyForecast data={weather.daily} />
                    </>
                ) : null}
            </div>
        </div>
    );
}
