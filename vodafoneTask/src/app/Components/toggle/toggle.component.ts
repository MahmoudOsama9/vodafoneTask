import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TemperatureUnit } from '../../Interfaces/WeatherData';

@Component({
  selector: 'app-toggle',
  imports: [CommonModule],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.css'
})
export class ToggleComponent {
  @Input() unit: TemperatureUnit = "fahrenheit";
  @Input() cityIndex!: number;
  @Output() unitChange = new EventEmitter<TemperatureUnit>();

  toggleUnit(unit: TemperatureUnit) {
    this.unitChange.emit(unit);
  }
}
