import Image from "next/image";

interface DailyForecastProps {
    data: {
        dt: number;
        temp_max: number;
        temp_min: number;
        icon: string;
        condition: string;
    }[];
}

export default function DailyForecast({ data }: DailyForecastProps) {
    // Calculate global min/max for the bar scaling
    const minTemp = Math.min(...data.map((d) => d.temp_min));
    const maxTemp = Math.max(...data.map((d) => d.temp_max));
    const range = maxTemp - minTemp;

    return (
        <div className="w-full">
            <div className="bg-blue-600/20 backdrop-blur-md border border-white/10 rounded-3xl p-4">
                <div className="text-sm text-white/70 mb-3 font-medium uppercase border-b border-white/10 pb-2 flex items-center gap-2">
                    <span>📅</span> 5-Day Forecast
                </div>
                <div className="flex flex-col gap-4">
                    {data.map((item, index) => {
                        const date = new Date(item.dt * 1000);
                        const dayName =
                            index === 0
                                ? "Today"
                                : date.toLocaleDateString("en-US", { weekday: "short" });

                        // Calculate bar position and width
                        const left = ((item.temp_min - minTemp) / range) * 100;
                        const width = ((item.temp_max - item.temp_min) / range) * 100;

                        return (
                            <div
                                key={index}
                                className="flex items-center justify-between text-white"
                            >
                                <div className="w-16 font-medium text-lg">{dayName}</div>
                                <div className="relative w-8 h-8">
                                    <Image
                                        src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                                        alt={item.condition}
                                        fill
                                        sizes="32px"
                                        className="object-contain"
                                    />
                                </div>
                                <div className="flex-1 flex items-center gap-2 px-4">
                                    <span className="text-white/60 w-8 text-right">
                                        {item.temp_min}°
                                    </span>
                                    <div className="flex-1 h-1.5 bg-black/20 rounded-full relative overflow-hidden">
                                        <div
                                            className="absolute h-full rounded-full bg-gradient-to-r from-green-300 to-yellow-400"
                                            style={{
                                                left: `${left}%`,
                                                width: `${width}%`,
                                                minWidth: "10%", // Ensure visibility
                                            }}
                                        />
                                    </div>
                                    <span className="text-white w-8">{item.temp_max}°</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
