interface CurrentWeatherProps {
    city: string;
    temp: number;
    condition: string;
    high: number;
    low: number;
}

export default function CurrentWeather({
    city,
    temp,
    condition,
    high,
    low,
}: CurrentWeatherProps) {
    return (
        <div className="flex flex-col items-center justify-center pt-20 pb-10 text-white">
            <h1 className="text-3xl font-medium mb-2 drop-shadow-md">{city}</h1>
            <div className="text-8xl font-thin mb-2 drop-shadow-md">
                {temp}°
            </div>
            <div className="text-xl font-medium text-white/90 mb-1 drop-shadow-md">
                {condition}
            </div>
            <div className="text-lg font-medium text-white/90 drop-shadow-md">
                H:{high}° L:{low}°
            </div>
        </div>
    );
}
