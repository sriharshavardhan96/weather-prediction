import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import {WeatherService} from '../../services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  europeCountries;
  constructor(
    private weatherServ: WeatherService,
    public router: Router) { }
  ngOnInit() {
    this.fetchWeatherReport();
  }

  /**
   * Fetchs weather report
   */
  fetchWeatherReport(): void {
    const citiesArr = [
      this.weatherServ.getWeather('London'),
      this.weatherServ.getWeather('Amsterdam'),
      this.weatherServ.getWeather('Paris'),
      this.weatherServ.getWeather('Port of Spain'),
      this.weatherServ.getWeather('Rome'),
    ];
    forkJoin(citiesArr).subscribe((res)=>{
      this.europeCountries = res;
    });
  }

  /**
   * Redirects to detail page
   * @param cityName: string 
   */
  redirectToDetails(cityName: string): void {
    this.router.navigateByUrl(`/details/${cityName}`);
  }

  /**
   * formats time from unix time stamp
   * @param unixDate 
   * @returns formatted time 
   */
  getFormattedTime(unixDate): string {
    return new Date(unixDate * 1000).toLocaleTimeString();
  }

}
