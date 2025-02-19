import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user.service';
import {User} from '../model/user.model';

interface BorrowingsResponse {
  hostname: string | null;
  rented_bikes: any[]; // Replace 'any' with a proper bike type if known
}

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrl: './main-component.component.css',
  standalone: false
})
export class MainComponentComponent implements OnInit{
  userProfile: any;
  userRole: string | null = '';
  showAddBikeForm = false;
  users: User[] = [];
  showUsers = false;
  showBorrowings = false;
  borrowings: any[] = [];
  errorMessage: string | null = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('user_role');
    this.userProfile = {
      name: "",
      username: "",
    };
    console.log("User role? ", this.userRole)
    this.userService.getUserProfile().subscribe(
      (response: any) => {
        this.userProfile = response;
        console.log('User Profile:', this.userProfile);
      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  toggleAddBikeForm() {
    this.showAddBikeForm = !this.showAddBikeForm;
  }

  onBikeAdded() {
    alert('Bike has been added successfully!');
    this.showAddBikeForm = false; // Close the form after successful submission
  }

  fetchUsers() {
    this.userService.getUsers().subscribe(
      (response) => {
        console.log('Full response:', response);
        this.users = response.users;
        console.log(this.users)
        this.showUsers = true;
      },
      (error) => {
        console.error('Failed to fetch users:', error);
        alert('Could not fetch users. Please try again.');
      }
    );
  }

  fetchUserBorrowings(user_id : number) {
    this.userService.getBorrowings(user_id).subscribe(
      (response) => {
        if (response.rented_bikes)

        this.borrowings = response.rented_bikes;  // Store borrowings in the local variable
        console.log('Borrowings:', response);
        this.showBorrowings = true;
      },
      (error) => {
        console.error('Failed to fetch borrowings:', error);
        this.errorMessage = error.error?.msg || 'An error occurred while fetching borrowings';
      }
    );
  }

  returnBike(bike: any){
    this.userService.returnBike(bike.bike_id).subscribe(
      (response) => {
        alert(`You have successfully returned the bike: ${bike.brand}`);
        // Update the bike's available copies count locally
        bike.available_copies++;
        this.fetchUserBorrowings(this.userProfile.id);
      },
      (error) => {
        console.error('Failed to return bike:', error);
        alert('Could not return the bike. Please try again.');
      }
    );
  }

}
