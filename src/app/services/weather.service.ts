import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {first, map} from 'rxjs/operators';

@Injectable()
export class WeatherService {
  private readonly baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
  private readonly forcastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=';
  private readonly appID = '671ac7a5d543c9935d09d1a2e6ebfb5b';

  constructor(public http: HttpClient) {
  }
  /**
   * Gets weather for a particular city
   * @param city 
   * @param [metric] 
   * @returns weather 
   */
  getWeather(city: string, metric: 'metric' | 'imperial' = 'metric'): Observable<any> {
    return this.http.get(
      `${this.baseURL}${city}&units=${metric}&APPID=${this.appID}`).pipe((first()));
  }

  /**
   * Fetch forecast for a city
   * @param city 
   * @param [metric] 
   * @returns forecast 
   */
  getForecast(city: string, metric: 'metric' | 'imperial' = 'metric'): Observable<any> {
    return this.http.get(
      `${this.forcastURL}${city}&units=${metric}&APPID=${this.appID}`)
      .pipe(first(), map((weather) => weather['list']));
  }
}

