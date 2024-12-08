import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // For ngModel
import { CommonModule } from '@angular/common'; // For directives like *ngFor and *ngIf
import { AuthorService } from './services/author.service';
import { BookService } from './services/book.service';
import { MemberService } from './services/member.service';
import { Member } from './models/Member';
import { Book } from './models/Book';
import { Author } from './models/Author';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  authors: Author[] = [
    {id: 1,name: 'Author 1'},
    {id: 2,name: 'Author 2'},
    {id: 3,name: 'Author 3'}
  ];

  exmembers: Member[] = [
    { id: 1, fullName: 'John Doe' },
    { id: 2, fullName: 'Jane Smith' },
    { id: 3, fullName: 'Alice Johnson'}
  ];

  books = [
    { title: 'Acotar', author: 'Author 1', genre: 'Fiction', description: 'A great story.', isBorrowed: true, authorId: 1 ,rentedById:1 },
    { title: 'Book 2', author: 'Author 2', genre: 'Non-Fiction', description: 'An insightful read.', isBorrowed: false, authorId: 2 ,rentedById:null },
  ];

  Allauthors: Author[] = [];
  Allbooks: Book[] = [];
  members: Member[] = [];

  newBook = { title: '', genre: '', description: '', author: '', isBorrowed: false, authorId: 2 ,rentedById:null};
  newBookDom?: any

  selectedBook: any = null;
  selectedAuthorId = 0;

  // Rent book form details
  rentDetails = {
    memberName: '',
    duration: 0,
  };

  constructor(
    private authorService: AuthorService,
    private bookService: BookService,
    private memberService: MemberService
  ) { }

  ngOnInit() {
    this.loadAuthors();
    this.loadBooks();
    this.loadMembers();
  }

  loadAuthors() {
    this.authorService.getAllAuthors().subscribe((data) => {
      this.Allauthors = data;
      console.log(this.Allauthors)
    });
  }

  loadBooks() {
    this.bookService.getAllBooks().subscribe((data) => {
      this.Allbooks = data;
      console.log(this.Allbooks)
    });
  }

  loadMembers() {
    this.memberService.getAllMembers().subscribe((data) => {
      this.members = data;
      console.log(this.members)
    });
  }

  addBook() {

    //this.books.push({ ...this.newBook });

    this.newBookDom = {
      ...this.newBookDom,
      title: this.newBook.title,
      isBorrowed: false,
    };

    var auth = this.newBook.author

    console.log(this.newBookDom, auth)

    this.newBook = { title: '', genre: '', description: '', author: '', isBorrowed: false, authorId: 2 ,rentedById:null};

    if (auth) {
      // Use the BookService to add the book
      this.bookService.addBook(this.newBookDom, auth).subscribe(
        () => {
          console.log('Book added successfully');
          this.closeAddBookPopup();
        },
      );
    } else {
      console.error('Author name is missing!');
    }

    this.closeAddBookPopup();
  }

  rentBook() {
    if (this.selectedBook && this.rentDetails.memberName && this.rentDetails.duration > 0) {
      this.bookService.rentBook(this.selectedBook.id!, this.rentDetails.memberName).subscribe(
        (response) => {
          console.log('Book rented successfully:', response);
          this.closeRentBookPopup();
        },
        (error) => {
          console.error('Error renting the book:', error);
        }
      );
    } else {
      console.log('Please fill all fields correctly!');
    }
  }

  returnBook() {
    if (this.selectedBook && this.selectedBook.isBorrowed === true) {

      const member = this.members.find(m => m.id === this.selectedBook.rentedById);
  
      if (member) {

        this.bookService.returnBook(this.selectedBook.id!, member.fullName).subscribe(
          (response) => {
            console.log('Book returned successfully:', response);
            this.closeBookDetailsPopup(); // Optionally close the return book popup
          },
          (error) => {
            console.error('Error returning the book:', error);
          }
        );
        console.log('Baw!');
      } else {
        console.log('Member not found!');
      }
    } else {
      console.log('Please select a book that is currently borrowed!');
    }
  }

  ///////////////////////////////////////////////////         POPUPS           /////////////////////////////////////////////////////////////

  // State for popups
  showAddBookPopup = false;
  showBookDetailsPopup = false;
  showRentBookPopup = false;

  // Method to open the Add Book popup
  openAddBookPopup() {
    this.showAddBookPopup = true;
  }

  // Method to close the Add Book popup
  closeAddBookPopup() {
    this.showAddBookPopup = false;
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

}
