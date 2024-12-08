import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // For ngModel
import { CommonModule } from '@angular/common'; // For directives like *ngFor and *ngIf
import { AuthorService } from './services/author.service';
import { BookService } from './services/book.service';
import { MemberService } from './services/member.service';
import { Member } from './models/Member';
import { Book } from './models/Book';
import { Author } from './models/Author';
import { forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // authors: Author[] = [
  //   {id: 1,name: 'Author 1'},
  //   {id: 2,name: 'Author 2'},
  //   {id: 3,name: 'Author 3'}
  // ];

  // exmembers: Member[] = [
  //   { id: 1, fullName: 'John Doe' },
  //   { id: 2, fullName: 'Jane Smith' },
  //   { id: 3, fullName: 'Alice Johnson'}
  // ];

  // books = [
  //   { title: 'Acotar', author: 'Author 1', genre: 'Fiction', description: 'A great story.', isBorrowed: true, authorId: 1 ,rentedById:1 },
  //   { title: 'Book 2', author: 'Author 2', genre: 'Non-Fiction', description: 'An insightful read.', isBorrowed: false, authorId: 2 ,rentedById:null },
  // ];

  Allauthors: Author[] = [];
  Allbooks: Book[] = [];
  members: Member[] = [];

  newBook = { title: '', genre: '', description: '', author: '', isBorrowed: false, authorId: 2 ,rentedById:null};

  newMember:any = {fullName:''}

  selectedBook: any = null;
  selectedAuthorId = 0;
  selectedMemberId =0;

  // Rent book form details
  rentDetails = {
    memberName: '',
    duration: 0,
  };

  errorMessage: string = ''

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

  addMember() {
    if (this.newMember.fullName.trim()) {
      this.memberService.addMember(this.newMember).pipe(
        switchMap(() => this.memberService.getAllMembers()) // Chain the loadMembers call
      ).subscribe(
        (members) => {
          console.log('Members reloaded successfully:', members);
          this.members = members;
  
          // Reset the form and close the popup
          this.newMember = { fullName: '' };
          this.closeAddMemberPopup();
        },
        (error) => {
          console.error('Error during member addition or reloading:', error);
        }
      );
    } else {
      console.log('Please enter a valid full name!');
    }
  }

  addBook() {

    //this.books.push({ ...this.newBook });

    var newBookDom = {
      title: this.newBook.title,
      isBorrowed: false,
      description:this.newBook.description,
      genre:this.newBook.genre
    };

    var auth = this.newBook.author

    console.log(newBookDom, auth)

    this.newBook = { title: '', genre: '', description: '', author: '', isBorrowed: false, authorId: 2 ,rentedById:null};

    if (auth) {
      // Use the BookService to add the book
      this.bookService.addBook(newBookDom, auth).subscribe(
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
  
          // Reload books after renting the book
          this.bookService.getAllBooks().subscribe(
            (books) => {
              console.log('Books reloaded successfully:', books);
              this.Allbooks = books;
  
              this.closeRentBookPopup();
              this.closeBookDetailsPopup();
            },
            (error) => {
              console.error('Error reloading books:', error);
            }
          );
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
  
            // Reload books after returning the book
            this.bookService.getAllBooks().subscribe(
              (books) => {
                this.Allbooks = books;
                console.log('Books reloaded successfully:', books);
  
                this.closeBookDetailsPopup(); // Optionally close the return book popup
              },
              (error) => {
                console.error('Error reloading books:', error);
              }
            );
          },
          (error) => {
            console.error('Error returning the book:', error);
          }
        );
      } else {
        console.log('Member not found!');
      }
    } else {
      console.log('Please select a book that is currently borrowed!');
    }
  }

  deleteBook(bookId: number) {
    const bookToDelete = this.Allbooks.find((book) => book.id === bookId);
  
    if (!bookToDelete) {
      this.errorMessage = `Book with ID ${bookId} not found.`;
      console.warn(this.errorMessage);
      return;
    }
  
    if (bookToDelete.isBorrowed) {
      // Set the error message and exit the function
      this.errorMessage = `The book "${bookToDelete.title}" is currently borrowed and cannot be deleted.`;
      console.warn(this.errorMessage);
      return;
    }
  
    if (confirm(`Are you sure you want to delete the book "${bookToDelete.title}"?`)) {
      this.bookService.deleteBook(bookId).pipe(
        switchMap(() => this.bookService.getAllBooks()) // Reload books after deletion
      ).subscribe(
        (books) => {
          console.log('Book deleted successfully, books reloaded:', books);
          this.Allbooks = books; // Update the books list
          this.errorMessage = ''; // Clear the error message on success
        },
        (error) => {
          console.error('Error deleting the book or reloading books:', error);
          this.errorMessage = 'An error occurred while trying to delete the book.';
        }
      );
    }
  }

  deleteMember(memberId: number) {
    const memberToDelete = this.members.find((member) => member.id === memberId);
  
    if (!memberToDelete) {
      this.errorMessage = `Member with ID ${memberId} not found.`;
      console.warn(this.errorMessage);
      return;
    }
  
    if (memberToDelete.borrowedBooks && memberToDelete.borrowedBooks.length > 0) {
      // Set the error message and exit the function
      this.errorMessage = `The member "${memberToDelete.fullName}" cannot be deleted because they have borrowed books.`;
      console.warn(this.errorMessage);
      return;
    }
  
    if (confirm(`Are you sure you want to delete the member "${memberToDelete.fullName}"?`)) {
      this.memberService.deleteMember(memberId).pipe(
        switchMap(() => this.memberService.getAllMembers()) // Reload members after deletion
      ).subscribe(
        (members) => {
          console.log('Member deleted successfully, members reloaded:', members);
          this.members = members; // Update the members list
          this.errorMessage = ''; // Clear the error message on success
        },
        (error) => {
          console.error('Error deleting the member or reloading members:', error);
          this.errorMessage = 'An error occurred while trying to delete the member.';
        }
      );
    }
  }

  onAuthorClick(authorId: number) {
    this.selectedAuthorId = authorId || 0;
    this.selectedMemberId = 0; // Clear member selection
  }
  
  onMemberClick(memberId: number) {
    this.selectedMemberId = memberId || 0;
    this.selectedAuthorId = 0; // Clear author selection
  }
  
  

  ///////////////////////////////////////////////////         POPUPS           /////////////////////////////////////////////////////////////

  // State for popups
  showAddBookPopup = false;
  showBookDetailsPopup = false;
  showRentBookPopup = false;
  showAddMemberPopup = false

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

  openAddMemberPopup(){
    this.showAddMemberPopup = true
  }

  closeAddMemberPopup(){
    this.showAddMemberPopup = false
  }

}