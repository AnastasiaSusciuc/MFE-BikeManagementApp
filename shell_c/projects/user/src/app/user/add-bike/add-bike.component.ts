import { Component, EventEmitter, Output } from '@angular/core';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-add-bike',
  standalone: false,
  templateUrl: './add-bike.component.html',
  styleUrl: './add-bike.component.css'
})
export class AddBikeComponent {
  newBike = {
    brand: '',
    model: '',
    serial_number: '',
    available_units: 1,
  };

  @Output() bikeAdded = new EventEmitter<void>();

  constructor(private service: UserService) {}

  onSubmit() {
    this.service.addBike(this.newBike).subscribe(
      (response) => {
        // alert('Bike added successfully!');
        this.bikeAdded.emit(); // Notify the parent component
        this.newBike = {
          brand: '',
          model: '',
          serial_number: '',
          available_units: 1,
        };
      },
      (error) => {
        alert('Failed to add Bike: ' + error.error.msg);
      }
    );
  }
}
