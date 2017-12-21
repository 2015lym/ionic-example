import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { StockInfoComponent } from './stock-info/stock-info.component';
import { StockHeaderComponent } from './stock-header/stock-header.component';


@NgModule({
  declarations: [
    AppComponent,
    StockInfoComponent,
    StockHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
