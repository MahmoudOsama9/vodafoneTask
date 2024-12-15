export interface Forecast {
  date: string;
  temperatureCelsius: number;
  temperatureFahrenheit: number;
  humidity: number;
}

export interface WeatherData {
  id: number;
  city: string;
  forecast: Forecast[];
  selectedUnit?: "celsius" | "fahrenheit";
}

export type TemperatureUnit = "celsius" | "fahrenheit";