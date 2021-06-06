
import { WeatherService } from './weather.service';
import { MockData } from '../mockData/MockData';
import { of } from 'rxjs';
describe('WeatherService', () => {
  let service;
  let httpMock;
  const mockWeatherData = MockData.weatherData;
  const foreCastData = MockData.forcastData;
  let http = {
    get: jest.fn(() => of([mockWeatherData]))
  };;
  const provide = (mock: any): any => mock;
  beforeEach(() => {
    service = new WeatherService(provide(http));
  });
  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should fetch weatherDetails based on city',()=>{
    service.getWeather('Amsterdam').subscribe((weather) => {
      expect(http.get).toBeCalledWith('https://api.openweathermap.org/data/2.5/weather?q=Amsterdam&units=metric&APPID=671ac7a5d543c9935d09d1a2e6ebfb5b');
      expect(weather.length).toBe(1);
    });
  })
  test('should fetch getForecast based on city',()=>{
    const httpMock = { get: jest.fn(() => of([foreCastData])) };
    const service = new WeatherService(provide(httpMock));
    service.getForecast('Amsterdam').subscribe((forecast) => {
      expect(http.get).toBeCalledWith('https://api.openweathermap.org/data/2.5/forecast?q=Amsterdam&units=metric&APPID=671ac7a5d543c9935d09d1a2e6ebfb5b');
      expect(forecast.length).toBe(1);
    });
  })
});
