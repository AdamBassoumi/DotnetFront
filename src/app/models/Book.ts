import { Author } from "./Author";
import { Member } from "./Member";

export interface Book {
    id?: number;
    title: string;
    authorId?: number;
    author?: Author;
    isBorrowed: boolean;
    rentedById?: number;
    rentedBy?: Member; 
    genre?: string;
    description?:string
  }
  