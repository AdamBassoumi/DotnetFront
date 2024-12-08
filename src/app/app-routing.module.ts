import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RentBookComponent } from './rent-book/rent-book.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'rent-book', component: RentBookComponent }, // Route for RentBookComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
