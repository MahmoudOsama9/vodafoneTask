import { Component, Input } from '@angular/core';
import { WeatherData } from '../../Interfaces/WeatherData';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-top-temp-card',
    templateUrl: './top-temp-card.component.html',
    styleUrl: './top-temp-card.component.css',
    imports: [CommonModule],
    standalone: true,
})
export class TopTempCardComponent {
    @Input() weatherData!: WeatherData;
    @Input() highestTemp!: number;
    @Input() highestTempDate!: string;
}