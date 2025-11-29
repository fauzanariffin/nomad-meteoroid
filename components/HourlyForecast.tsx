import Image from "next/image";

interface HourlyForecastProps {
    data: {
        dt: number;
        temp: number;
        icon: string;
    }[];
    timezoneOffset: number; // in seconds
}

export default function HourlyForecast({ data, timezoneOffset }: HourlyForecastProps) {
    return (
        <div className="w-full mb-6">
            <div className="bg-blue-600/20 backdrop-blur-md border border-white/10 rounded-3xl p-4">
                <div className="text-sm text-white/70 mb-3 font-medium uppercase border-b border-white/10 pb-2 flex items-center gap-2">
                    <span>🕒</span> Hourly Forecast
                </div>
                <div className="flex overflow-x-auto scrollbar-hide gap-6 pb-2">
                    {data.map((item, index) => {
                        // Convert UTC timestamp to city's local time
                        const utcDate = new Date(item.dt * 1000);
                        const localTime = new Date(utcDate.getTime() + timezoneOffset * 1000);
                        const hours = localTime.getUTCHours();
                        const isPM = hours >= 12;
                        const displayHours = hours % 12 || 12;
                        const time = `${displayHours}${isPM ? 'PM' : 'AM'}`;

                        return (
                            <div
                                key={index}
                                className="flex flex-col items-center min-w-[60px] text-white"
                            >
                                <span className="text-sm font-medium mb-2">
                                    {index === 0 ? "Now" : time}
                                </span>
                                <div className="relative w-8 h-8 mb-2">
                                    <Image
                                        src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                                        alt="weather icon"
                                        fill
                                        sizes="32px"
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-lg font-semibold">{item.temp}°</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
