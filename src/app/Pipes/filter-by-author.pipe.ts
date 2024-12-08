import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../models/Book';
import { Author } from '../models/Author';


@Pipe({
  name: 'filterByAuthor'
})
export class FilterByAuthorPipe implements PipeTransform {
  transform(books: Book[], selectedAuthorId: number, selectedMemberId: number, authors: Author[]): Book[] {
    if (!books) {
      return [];
    }

    // Ensure selectedAuthorId and selectedMemberId are numbers, default to 0 if undefined
    selectedAuthorId = selectedAuthorId || 0;
    selectedMemberId = selectedMemberId || 0;

    if (selectedAuthorId > 0) {
      // Filter by author
      const selectedAuthor = authors.find(author => author.id === selectedAuthorId);
      if (!selectedAuthor) {
        return []; // Return an empty array if no author matches the selected ID
      }
      return books.filter(book => book.authorId === selectedAuthor.id);
    } else if (selectedMemberId > 0) {
      // Filter by member
      return books.filter(book => book.rentedById === selectedMemberId);
    }

    // Return all books if no filter is applied
    return books;
  }
}
