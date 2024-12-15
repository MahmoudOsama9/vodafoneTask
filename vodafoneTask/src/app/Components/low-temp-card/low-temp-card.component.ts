import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherData } from '../../Interfaces/WeatherData';

@Component({
  selector: 'app-low-temp-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './low-temp-card.component.html',
  styleUrl: './low-temp-card.component.css'
})
export class LowTempCardComponent {
  @Input() weatherData!: WeatherData;
  @Input() lowestTemp!: number;
  @Input() lowestTempDate!: string;
}