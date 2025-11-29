interface WeatherDetailsProps {
    feelsLike: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    windDeg: number;
    visibility: number;
}

export default function WeatherDetails({
    feelsLike,
    humidity,
    pressure,
    windSpeed,
    windDeg,
    visibility,
}: WeatherDetailsProps) {
    // Convert wind degree to direction
    const getWindDirection = (deg: number) => {
        const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        const index = Math.round(deg / 22.5) % 16;
        return directions[index];
    };

    const details = [
        { label: 'Feels like', value: `${feelsLike}°`, icon: '🌡️' },
        { label: 'Humidity', value: `${humidity}%`, icon: '💧' },
        { label: 'Pressure', value: `${pressure}hPa`, icon: '🔽' },
        { label: 'Wind', value: `${windSpeed}m/s ${getWindDirection(windDeg)}`, icon: '💨' },
        { label: 'Visibility', value: `${(visibility / 1000).toFixed(1)}km`, icon: '👁️' },
    ];

    return (
        <div className="w-full mb-6">
            <div className="bg-blue-600/20 backdrop-blur-md border border-white/10 rounded-3xl p-4">
                <div className="grid grid-cols-2 gap-4">
                    {details.map((detail, index) => (
                        <div key={index} className="flex flex-col text-white">
                            <div className="text-xs text-white/70 mb-1 flex items-center gap-1">
                                <span>{detail.icon}</span>
                                <span className="uppercase font-medium">{detail.label}</span>
                            </div>
                            <div className="text-lg font-semibold">{detail.value}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
