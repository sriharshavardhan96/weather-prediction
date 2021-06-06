import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from './components/layout/layout.module';
import { WeatherService } from './services/weather.service';
import {HttpClientModule} from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'home',
    loadChildren:()=> import('../app/components/home/home.module').then((m)=> m.HomeModuleModule)
  },
  {
    path:'details',
    loadChildren:()=> import('../app/components/details/details.module').then((m)=> m.DetailsModule)
  }
];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


