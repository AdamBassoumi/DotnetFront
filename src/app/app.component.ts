import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // For ngModel
import { CommonModule } from '@angular/common'; // For directives like *ngFor and *ngIf

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  authors = ['Author 1', 'Author 2', 'Author 3'];
  books = [
    { title: 'Acotar', author: 'Author 1', genre: 'Fiction', description: 'A great story.' },
    { title: 'Book 2', author: 'Author 2', genre: 'Non-Fiction', description: 'An insightful read.' },
  ];

  newBook = { title: '', genre: '', description: '', author: '' };
  selectedBook: any = null;

  // State for popups
  showAddBookPopup = false;
  showBookDetailsPopup = false;
  showRentBookPopup = false; // New state for rent book popup

  // Rent book form details
  rentDetails = {
    memberName: '',
    duration: 0,
  };

  // Method to open the Add Book popup
  openAddBookPopup() {
    this.showAddBookPopup = true;
  }

  // Method to close the Add Book popup
  closeAddBookPopup() {
    this.showAddBookPopup = false;
  }

  // Method to add a new book
  addBook() {
    this.books.push({ ...this.newBook });
    this.newBook = { title: '', genre: '', description: '', author: '' };
    this.closeAddBookPopup();
  }

  // Method to open the Book Details popup
  openBookDetails(book: any) {
    this.selectedBook = book;
    this.showBookDetailsPopup = true;
  }

  // Method to close the Book Details popup
  closeBookDetailsPopup() {
    this.showBookDetailsPopup = false;
    this.showRentBookPopup = false; // Close Rent Book popup if it's open
  }

  // Method to open the Rent Book form as a popup inside Book Details
  openRentBookPopup() {
    this.showRentBookPopup = true;
  }

  // Method to close the Rent Book popup
  closeRentBookPopup() {
    this.showRentBookPopup = false;
  }

  // Method to handle the rent book submission (for now, just logging the details)
  rentBook() {
    console.log('Rent Details:', this.rentDetails);
    this.closeRentBookPopup();
  }
}
