import { BookService } from './services/book.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {SelectButtonModule} from 'primeng/selectbutton';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BooksPageComponent } from './books-page/books-page.component';
import { RatingModule } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import { BookItemComponent } from './book-item/book-item.component';
import {ScrollerModule} from 'primeng/scroller';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookEditComponent } from './book-edit/book-edit.component';

@NgModule({
  declarations: [						
    AppComponent,
      BooksPageComponent,
      BookItemComponent,
      BookCreateComponent,
      BookEditComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RatingModule,
    SelectButtonModule,
    ButtonModule,
    FormsModule,
    ScrollerModule,
    ReactiveFormsModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
