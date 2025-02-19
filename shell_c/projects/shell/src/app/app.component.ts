import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
<!--    <nav>-->
<!--      <ul>-->
<!--        <li><a routerLink="/auth">Auth</a></li>-->
<!--        <li><a routerLink="/bike">Bike</a></li>-->
<!--        <li><a routerLink="/user">User</a></li>-->
<!--      </ul>-->
<!--    </nav>-->
    <router-outlet></router-outlet>
  `
})
export class AppComponent { }
