import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import {WeatherService} from '../../services/weather.service';
import { DetailsComponent } from './details.component';
import { MockData } from '../../mockData/MockData';
import { Data } from '../../mockData/forcastWeatherData';
describe('DetailsComponent', () => {
  const weatherdata = MockData.weatherData;
  const forecastData = Data.forcastData;
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  const routerStub = {
    navigate: (commands: any[]) => { Promise.resolve(true); },
  };
  const WeatherServiceMock = {
    getWeather: jest.fn().mockReturnValue(of(weatherdata)),
    getForecast: jest.fn().mockReturnValue(of(forecastData)),
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsComponent ],
      providers:[
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                city: 'Amsterdam',
              }),
            },
          },
        },
        {provide: WeatherService, useValue:WeatherServiceMock},
        { provide: Router, useValue: routerStub },
      ]
    })
    .compileComponents()
  }));
  beforeEach(()=>{
      fixture = TestBed.createComponent(DetailsComponent);
      component = fixture.componentInstance;
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('test component functions', () => {
    
    test('should call on init fn',()=>{
      const fnSpy = jest.spyOn(component,'fetchAPIDetails');
      component.ngOnInit();
      expect(fnSpy).toBeCalled();
    });
    test('should call fetchAPIDetails',()=>{
      const weatherAPISpy = jest.spyOn(WeatherServiceMock,'getWeather');
      const forecastAPISpy = jest.spyOn(WeatherServiceMock,'getForecast');
      const getImagePathSpy = jest.spyOn(component,'getCityImagePath');
      component.fetchAPIDetails();
      expect(component.city).toEqual('Amsterdam')
      expect(getImagePathSpy).toBeCalled();
      expect(weatherAPISpy).toBeCalled();
      expect(forecastAPISpy).toBeCalled();
    });
    test('it should test forecast method', () => {
      component.getForecast(forecastData);
      expect(Object.keys(component.daysForecast).length).toEqual(5);
    })
    test('should call getCityImagePath',()=>{
      component.getCityImagePath('paris');
      expect(component.cityIllustrationPath).toEqual('../../../assets/cities/paris.svg');
      component.getCityImagePath('london');
      expect(component.cityIllustrationPath).toEqual('../../assets/cities/london.svg');
      component.getCityImagePath('amsterdam');
      expect(component.cityIllustrationPath).toEqual('../../assets/cities/amsterdam.svg');
      component.getCityImagePath('rome');
      expect(component.cityIllustrationPath).toEqual('../../assets/cities/rome.svg');
      component.getCityImagePath('');
      expect(component.cityIllustrationPath).toEqual('../../assets/cities/default.svg');
    });
  });
});
