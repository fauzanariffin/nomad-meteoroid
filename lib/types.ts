export interface WeatherData {
    current: {
        temp: number;
        condition: string;
        description: string;
        high: number;
        low: number;
        city: string;
        feelsLike: number;
        humidity: number;
        pressure: number;
        windSpeed: number;
        windDeg: number;
        visibility: number;
    };
    hourly: {
        dt: number;
        temp: number;
        icon: string;
    }[];
    daily: {
        dt: number;
        temp_max: number;
        temp_min: number;
        icon: string;
        condition: string;
    }[];
    timezoneOffset: number; // in seconds
}
