
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import {WeatherService} from '../../services/weather.service';
import { HomeComponent } from './home.component';
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const routerStub = {
    navigateByUrl: jest.fn().mockReturnValue(true),
  };
  const WeatherServiceMock = {
    getWeather: jest.fn().mockReturnValue(of([])),
    getForecast: jest.fn().mockReturnValue(of([])),
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers:[
        {provide: WeatherService, useValue:WeatherServiceMock},
        { provide: Router, useValue: routerStub },
      ]
    })
    .compileComponents()
  }));
  beforeEach(()=>{
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('component functions',() => {
    test('should call oninit fn',()=>{
      const spyon = jest.spyOn(component,'fetchWeatherReport');
      component.ngOnInit();
      expect(spyon).toBeCalled();
    });
    test('should call fetchWeatherReport fn',()=>{
      const spyon = jest.spyOn(WeatherServiceMock,'getWeather');
      component.fetchWeatherReport();
      expect(spyon).toBeCalled();
    });
    it('should navigate to details Page', () => {
      component.redirectToDetails('Amsterdam');
      const routerSpy = jest.spyOn(routerStub, 'navigateByUrl');
      expect(routerSpy).toHaveBeenCalled();
    });

    it('should convert the unix time',()=>{
      const timeSpyon = jest.spyOn(component,'getFormattedTime');
      component.getFormattedTime(1622951143);
      expect(timeSpyon).toBeCalledWith(1622951143)
    })
  });
});
