interface Book {
  id: string;
  title: string;
  authors: string[]; 
  description?: string; 
  publishedDate?: string; 
  pageCount?: number;
  categories?: string[]; 
  language?: string; 
  thumbnail?: string; 
  previewLink?: string; 
  isbn?: string; 
}
type searchType = 'searchByAuthor' | 'searchBook'

export type {Book, searchType}

