import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {BikeListComponent} from './bike-list/bike-list.component';
import {HttpClientModule, provideHttpClient} from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: '', component: BikeListComponent },
    ]),
  ],
  providers: [provideHttpClient()],
})
export class BikeModule { }
