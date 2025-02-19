import { Routes } from '@angular/router';
import {DashboardComponent} from './shell/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('auth/AuthModule').then(m => m.AuthModule)
  },
  {
    path: 'bike',
    loadChildren: () => import('bike/BikeModule').then(m => m.BikeModule)
  },
  {
    path: 'user',
    loadChildren: () => import('user/UserModule').then(m => m.UserModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      // {
      //   path: '',
      //   pathMatch: 'full',
      //   redirectTo: 'user',
      // },
      {
        path: 'bike',
        loadChildren: () => import('bike/BikeModule').then(m => m.BikeModule)
      },
      {
        path: 'user',
        loadChildren: () => import('user/UserModule').then(m => m.UserModule)
      },
    ],
  },
];
