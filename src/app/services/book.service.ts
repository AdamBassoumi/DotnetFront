import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:5050/api/books'; // Adjust URL if necessary

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  addBook(book: Book, authorName: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}?authorName=${authorName}`, book);
  }

  rentBook(bookId: number, fullName: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/rent?bookId=${bookId}&fullName=${fullName}`, {});
  }

  returnBook(bookId: number, fullName: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/return/${bookId}?fullName=${fullName}`, {});
  }

  updateBook(id: number, book: Book): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
