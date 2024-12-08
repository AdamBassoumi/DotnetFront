import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../models/Book';
import { Author } from '../models/Author';


@Pipe({
  name: 'filterByAuthor'
})
export class FilterByAuthorPipe implements PipeTransform {
  transform(books: any[], selectedAuthorId: number, authors: Author[]): Book[] {
    if (!books || selectedAuthorId === 0) {
      return books; // Return all books if 'All Authors' is selected
    }

    // Find the author's name by ID
    const selectedAuthor = authors.find(author => author.id === selectedAuthorId);
    if (!selectedAuthor) {
      return []; // Return an empty array if no author matches the selected ID
    }

    return books.filter(book => book.authorId === selectedAuthor.id);
  }
}
