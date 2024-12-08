import { Book } from "./Book";

export interface Member {
    id: number;
    fullName: string;
    borrowedBooks?: Book[];
  }
  