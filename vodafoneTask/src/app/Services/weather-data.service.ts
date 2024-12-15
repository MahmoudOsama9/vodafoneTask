import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WeatherData } from '../Interfaces/WeatherData';
import { environment } from '../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCitiesWeather(): Observable<WeatherData[]> {
    return this.http.get<WeatherData[]>(`${this.apiUrl}/forecast`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCityWeather(weatherId: number): Observable<WeatherData> {
    return this.http.get<WeatherData>(`${this.apiUrl}/cityForecast/${weatherId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

}