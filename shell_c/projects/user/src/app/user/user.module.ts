import {NgModule} from '@angular/core';
import {CommonModule, NgIf, NgForOf} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MainComponentComponent} from './main-component/main-component.component';
import {AddBikeComponent} from './add-bike/add-bike.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, provideHttpClient} from '@angular/common/http';


@NgModule({
  declarations: [MainComponentComponent, AddBikeComponent],
  providers: [provideHttpClient()],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      {path: '', component: MainComponentComponent},
    ]),
    FormsModule,
    NgForOf,
    NgIf,
  ]})

export class UserModule {
}
