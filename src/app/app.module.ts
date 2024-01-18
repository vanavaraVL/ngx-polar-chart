import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NgxPolarChartModule} from 'NgxPolarChart';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxPolarChartModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
