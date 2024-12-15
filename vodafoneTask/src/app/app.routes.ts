import { Routes } from '@angular/router';
import { WeatherListComponent } from './Components/weather-list/weather-list.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: 'weather-list', pathMatch: 'full' },
    { path: 'weather-list', component: WeatherListComponent, title: 'Weather-list' },
    { path: '**', component: NotFoundComponent }
];
