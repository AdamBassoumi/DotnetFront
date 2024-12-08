import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rent-book',
  templateUrl: './rent-book.component.html',
  styleUrls: ['./rent-book.component.css']
})

export class RentBookComponent implements OnInit {
  book: any;
  rentDetails = { memberName: '', duration: 0 };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
   
  
  }

  onSubmit(): void {
    console.log('Book rented to:', this.rentDetails.memberName);
    console.log('Duration:', this.rentDetails.duration, 'days');
    // Add further logic to store or process the rent details
  }

  cancel(): void {
    // Redirect or handle cancellation logic
  }
}
