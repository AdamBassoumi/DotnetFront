import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { RentBookComponent } from './rent-book/rent-book.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FilterByAuthorPipe } from './Pipes/filter-by-author.pipe';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [AppComponent, RentBookComponent, FilterByAuthorPipe, NavbarComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule,HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
