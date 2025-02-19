import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [RouterOutlet, RouterLink],
  standalone: true
})
export class DashboardComponent {
  constructor(private router: Router) {}

  logout(): void {
    // Clear tokens and user-related data
    sessionStorage.removeItem('jwt_token'); // Or sessionStorage.removeItem() if used
    sessionStorage.removeItem('user_role'); // Optional: Clear cached role if stored

    // Redirect to the login page
    this.router.navigate(['/auth']);
  }
}
