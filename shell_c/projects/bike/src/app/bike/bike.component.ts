import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from "@angular/common";
import {BrowserModule} from '@angular/platform-browser';

@Component({
  selector: 'app-bike',
  standalone: true,
  imports: [
    RouterOutlet, CommonModule, BrowserModule
  ],
  templateUrl: 'bike.component.html'
})
export class BikeComponent { }
