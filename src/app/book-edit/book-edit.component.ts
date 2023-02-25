import { IDetailedBook } from './../models/IDetailedBook';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  @Input() book: IDetailedBook = { id: 0, author: '', genre: '', cover: '', content: '', title: '', reviews: [], rating: 0 };
  @Input() public isEditModalVisible: boolean = false;
  @Output() closeModalEvent = new EventEmitter<boolean>();
  public bookCover: string = '';
  
  constructor(private bookService: BookService) { }

  getBase64(file: File) 
  {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  
  setFormFile(event: Event)
  {
    const target = event.target as HTMLInputElement;
    const file = (target.files as FileList)[0];
    this.getBase64(file).then(data => this.book.cover = data as string);
    console.log(this.bookCover);
  }

  onSubmit()
  {
    this.bookService.createBook({
      id: this.book.id,
      title: this.book.title,
      author: this.book.author,
      genre: this.book.genre,
      cover: this.book.cover,
      content: this.book.content
    }).subscribe(response => {
      this.bookService.setRefresh(true);
    });
  }

  ngOnInit() 
  {

  }
}