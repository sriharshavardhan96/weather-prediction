import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import {WeatherService} from '../../services/weather.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  city: string;
  state: string;
  temp: number;
  today: string;
  daysForecast: Object;
  cityIllustrationPath: string;
  sub1: Subscription;
  sub2: Subscription;
  errorMessage: string;
  constructor(
    public weather: WeatherService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.fetchAPIDetails();
  }
  /**
   * Fetchs api details based on the router param;
   */
  fetchAPIDetails(): void{
    this.city = this.activatedRoute.snapshot.paramMap.get('city');
    const todayNumberInWeek = new Date().getDay();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.today = days[todayNumberInWeek];
    this.getCityImagePath(this.city.toLowerCase());
    forkJoin(this.weather.getWeather(this.city), this.weather.getForecast(this.city)).subscribe((res: any) => {
      const [weatherData,foreCastData] = res;
      this.state = weatherData.weather[0].main;
      this.temp = Math.ceil(Number(weatherData.main.temp));
      this.getForecast(foreCastData);
    });
  }
  /**
   * Gets forecast details for the next 5 days;
   * @param foreCastData 
   */
  getForecast(foreCastData): void{
    const dates = {};
    for (const res of foreCastData) {
      const date = new Date(res.dt_txt).toDateString().split(' ')[0];
      if (dates[date]) {
        dates[date].counter += 1;
        dates[date].temp += res.main.temp;
      } else {
        dates[date] = {
          state: res.weather[0].main,
          temp: res.main.temp,
          counter: 1,
          seaLevel:res.main.sea_level
        };
      }
    }
    Object.keys(dates).forEach((day) => {
      dates[day].temp = Math.round(dates[day].temp / dates[day].counter);
    });
    delete dates[Object.keys(dates)[0]];
    this.daysForecast = dates;
  }
  /**
   * Gets city image path based on the cityname
   * @param city 
   */
  getCityImagePath(city): void{
    switch (city) {
      case 'paris':
        this.cityIllustrationPath = '../../../assets/cities/paris.svg';
        break;
      case 'london':
        this.cityIllustrationPath = '../../assets/cities/london.svg';
        break;
      case 'amsterdam':
        this.cityIllustrationPath = '../../assets/cities/amsterdam.svg';
        break;
      case 'rome':
        this.cityIllustrationPath = '../../assets/cities/rome.svg';
        break;
      default:
        this.cityIllustrationPath = '../../assets/cities/default.svg';
    }
  }
}
