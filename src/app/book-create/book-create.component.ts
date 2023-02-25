import { BookService } from './../services/book.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {

  public bookForm: FormGroup;
  public bookCover: string = '';

  constructor(private fb: FormBuilder, private bookService: BookService) 
  {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

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
    this.getBase64(file).then(data => this.bookCover = data as string);
    console.log(this.bookCover);
  }

  onSubmit()
  {
    console.log("onSubmit");
    this.bookService.createBook({
      ...this.bookForm.value,
      cover: this.bookCover
    }).subscribe(response => this.bookService.setRefresh(true));
  }

  ngOnInit() {
  }

}
