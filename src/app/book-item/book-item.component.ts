import { BookService } from './../services/book.service';
import { IDetailedBook } from './../models/IDetailedBook';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {

  @Input() public book: IDetailedBook = { id: 0, author: '', genre: '', cover: '', content: '', title: '', reviews: [], rating: 0 };
  @Input() public isViewModalVisible: boolean = false;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  constructor(private bookService: BookService) { }

  closeModal() {
    this.closeModalEvent.emit(false);
  }

  ngOnInit() 
  {
    
  }

}
