import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {BikeService} from '../services/bike.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-bike-list',
  standalone: true,
  templateUrl: './bike-list.component.html',
  styleUrl: './bike-list.component.css',
  imports: [
    NgIf,
    NgForOf
  ]
})
export class BikeListComponent implements OnInit{
  bikes: any[] = [];
  errorMessage: string = '';
  userRole: string | null = '';

  constructor(private bikeService: BikeService) {}

  ngOnInit(): void {
    this.fetchBikes();
    this.userRole = sessionStorage.getItem('user_role');
  }

  fetchBikes(): void {
    this.bikeService.getAllBikes().subscribe(
      (response) => {
        this.bikes = response.bikes; // Assume response contains the bikes
        console.log(this.bikes);
      },
      (error) => {
        this.errorMessage = error.error.msg || 'An error occurred while retrieving bikes.';
      }
    );
  }

  borrowBike(bike: any) {
    this.bikeService.borrowBike(bike.id).subscribe(
      (response) => {
        // Handle success or specific status codes from the backend
        this.fetchBikes();
        if (response.msg) {
          if (response.msg.includes("No copies available")) {
            alert(`bike "${bike.title}" is not available for borrowing.`);
          } else if (response.msg.includes("already")) {
            console.log("You have already borrowed the bike")
            alert(`You have already borrowed the bike: ${bike.brand} ${bike.model}.`);
          } else {
            alert(`You have successfully borrowed the bike: ${bike.brand} ${bike.model}.`);
            bike.available_copies--;
          }
        } else {
          alert('An unexpected success response was received.');
        }
      },
      (error) => {
        // Handle failure based on HTTP status codes
        if (error.status === 404) {
          alert('The bike you are trying to borrow was not found.');
        } else if (error.status === 409) {
          alert('You have already borrowed this bike.');
        } else if (error.status === 500) {
          alert('An unexpected error occurred on the server. Please try again later.');
        } else
          if (error.error.msg.includes("waiting"))
          {
            // console.log(error.error.msg)
          alert(`You are on the waitlist for the bike: ${bike.brand} ${bike.model}.`);
        }
        console.error('Failed to borrow bike:', error);
      }
    );
  }

}
