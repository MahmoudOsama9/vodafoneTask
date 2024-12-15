import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherData, Forecast } from '../../Interfaces/WeatherData';
import { WeatherDataService } from '../../Services/weather-data.service';
import { TopTempCardComponent } from '../top-temp-card/top-temp-card.component';
import { LowTempCardComponent } from '../low-temp-card/low-temp-card.component';
import { SearchContainerComponent } from '../search-container/search-container.component';

interface TemperatureResult {
    temperature: number;
    date: string;
}

@Component({
    selector: 'app-weather-list',
    standalone: true,
    imports: [CommonModule, TopTempCardComponent, LowTempCardComponent, SearchContainerComponent],
    templateUrl: './weather-list.component.html',
    styleUrl: './weather-list.component.css',
})
export class WeatherListComponent implements OnInit {
    weatherData: WeatherData[] = [];
    cityWithHighestMaxTemp: WeatherData | null = null;
    cityWithLowestMinTemp: WeatherData | null = null;

    highestTemperature: number = 0;
    highestTemperatureDate: string = '';
    lowestTemperature: number = 0;
    lowestTemperatureDate: string = '';

    filteredWeatherData: WeatherData[] = [];
    loading: boolean = false;
    errorMessage: string | null = null;
    allWeatherData: WeatherData[] = [];
    currentSearch: { cityName: string, date: string } = { cityName: '', date: '' };

    weatherDataService = inject(WeatherDataService);

    ngOnInit(): void {
        this.getCitiesWeather();
    }

    sortForecastByDate(forecasts: Forecast[]): Forecast[] {
        return forecasts.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }

    getCitiesWeather() {
        this.loading = true;
        this.weatherDataService.getCitiesWeather().subscribe({
            next: (data) => {
                this.weatherData = data.map((city) => ({
                    ...city,
                    selectedUnit: city.selectedUnit ?? 'fahrenheit',
                    forecast: this.sortForecastByDate(city.forecast),
                }));

                this.setHighestAndLowestTempCities();

                this.allWeatherData = [...this.weatherData];

                this.filterWeatherData();

                this.loading = false;
            },
            error: (err) => {
                this.errorMessage =
                    'Error fetching weather data. Please try again later';
                console.error('Error fetching weather data:', err);

                this.loading = false;
            },
        });
    }

    setHighestAndLowestTempCities() {
        if (!this.weatherData || this.weatherData.length === 0) {
            this.cityWithHighestMaxTemp = null;
            this.cityWithLowestMinTemp = null;
            return;
        }

        this.cityWithHighestMaxTemp = this.weatherData.reduce((prev, current) => {
            const prevMaxTemp = this.getMaxTemperatureResult(prev.forecast);
            const currMaxTemp = this.getMaxTemperatureResult(current.forecast);
            return prevMaxTemp.temperature > currMaxTemp.temperature ? prev : current;
        });
        this.cityWithLowestMinTemp = this.weatherData.reduce((prev, current) => {
            const prevMinTemp = this.getMinTemperatureResult(prev.forecast);
            const currMinTemp = this.getMinTemperatureResult(current.forecast);
            return prevMinTemp.temperature < currMinTemp.temperature ? prev : current;
        });

        const highestTempResult = this.getMaxTemperatureResult(this.cityWithHighestMaxTemp?.forecast);
        this.highestTemperature = highestTempResult.temperature;
        this.highestTemperatureDate = highestTempResult.date;

        const lowestTempResult = this.getMinTemperatureResult(this.cityWithLowestMinTemp?.forecast);
        this.lowestTemperature = lowestTempResult.temperature;
        this.lowestTemperatureDate = lowestTempResult.date;
    }

    onSearchUpdated(searchParams: { cityName: string; date: string }) {
        this.currentSearch = searchParams;
        this.filterWeatherData();
    }

    filterWeatherData() {
        this.filteredWeatherData = [...this.allWeatherData];
        if (this.currentSearch.cityName) {
            this.filteredWeatherData = this.filteredWeatherData.filter(city =>
                city.city.toLowerCase().includes(this.currentSearch.cityName.toLowerCase())
            );
        }
        if (this.currentSearch.date) {
            this.filteredWeatherData = this.filteredWeatherData.map(city => {
                const filteredForecast = city.forecast?.filter(forecast => forecast.date === this.currentSearch.date) || [];
                return {
                    ...city,
                    forecast: filteredForecast
                };
            }).filter(city => city.forecast && city.forecast.length > 0);
        }
    }

    getMaxTemperatureResult(forecast: Forecast[] | undefined): TemperatureResult {
        return this.getTemperatureResult(forecast, 'max');
    }

    getMinTemperatureResult(forecast: Forecast[] | undefined): TemperatureResult {
        return this.getTemperatureResult(forecast, 'min');
    }

    private getTemperatureResult(forecast: Forecast[] | undefined, type: 'max' | 'min'): TemperatureResult {
        if (!forecast || forecast.length === 0) {
            return { temperature: type === 'max' ? 0 : Infinity, date: '' };
        }

        const result = forecast.reduce((acc, current) => {
            if (type === 'max') {
                return current.temperatureCelsius > acc.temperatureCelsius ? current : acc;
            } else {
                return current.temperatureCelsius < acc.temperatureCelsius ? current : acc;
            }
        }, { temperatureCelsius: type === 'max' ? 0 : Infinity, date: '' });

        return { temperature: result.temperatureCelsius, date: result.date };
    }

    trackCityId(index: number, weatherData: WeatherData) {
        return weatherData.id;
    }
    trackForecastIndex(index: number) {
        return index;
    }

    handleUnitChange(unit: "celsius" | "fahrenheit", city: WeatherData) {
        city.selectedUnit = unit;
    }

    getTemperatureByUnit(
        temperatureCelsius: number,
        temperatureFahrenheit: number,
        city: WeatherData
    ): number {
        const unit = city.selectedUnit;
        return unit === "celsius" ? temperatureCelsius : temperatureFahrenheit;
    }
}