import { IDetailedBook } from './../models/IDetailedBook';
import { Component, OnInit } from '@angular/core';
import { IBook } from '../models/IBook';
import { BookService } from '../services/book.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.css']
})
export class BooksPageComponent implements OnInit {

  public selectedBook: IDetailedBook = { id: 0, author: '', genre: '', cover: '', content: '', title: '', reviews: [], rating: 0 };
  public selectedEditBook: IDetailedBook = { id: 0, author: '', genre: '', cover: '', content: '', title: '', reviews: [], rating: 0 };
  public showViewModal: boolean = false;
  public showEditModal: boolean = false;
  public shownBooks: IBook[] = [];
  public books: IBook[] = [];
  public recommendedBooks: IBook[] = [];
  public showOptions: string[] = ['All', 'Recommended'];
  public selectedShowOption: string = this.showOptions[0];
  private subscriptionName: Subscription;

  constructor(private bookService: BookService) 
  { 
    this.subscriptionName = this.bookService.getRefresh().subscribe(data => {
      this.bookService.getBooks(null).subscribe(data => {
        this.shownBooks = data;
        if(this.selectedShowOption === 'All')
        {
          this.books = data;
        }
      });
  
      this.bookService.getRecommendedBooks(null).subscribe(data => {
        this.recommendedBooks = data;
        if(this.selectedShowOption === 'Recommended')
        {
          this.books = data;
        }
      });
    })
  }

  handleSelectChange(){
    if(this.selectedShowOption === this.showOptions[0]){
      this.shownBooks = this.books;
      return;
    }
    this.shownBooks = this.recommendedBooks;
  }

  handleShowViewModal(id: number){
    this.showViewModal = true;
    this.bookService.getDetailedBookById(id).subscribe(data => this.selectedBook = data);
  }

  handleShowEditModal(id: number){
    this.showEditModal = true;
    this.bookService.getDetailedBookById(id).subscribe(data => this.selectedEditBook = data);
  }

  handleCloseViewModal(event: boolean){
    this.showViewModal = event;
  }

  handleCloseEditModal(event: boolean){
    this.showEditModal = event;
  }

  ngOnInit() 
  {
    this.bookService.getBooks(null).subscribe(data => {
      this.shownBooks = data;
      this.books = data;
    });

    this.bookService.getRecommendedBooks(null).subscribe(data => {
      this.recommendedBooks = data;
    });
    
  }
}
