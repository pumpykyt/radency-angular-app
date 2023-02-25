import { IRatingCreateResponse } from './../models/responses/IRatingCreateResponse';
import { IReviewCreateResponse } from './../models/responses/IReviewCreateResponse';
import { IDetailedBook } from './../models/IDetailedBook';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBook } from '../models/IBook';
import { IBookCreateResponse } from '../models/responses/IBookCreateResponse';
import { IReview } from '../models/IReview';
import { IRating } from '../models/IRating';
import { IBookCreate } from '../models/IBookCreate';

@Injectable()
export class BookService {

    private baseUrl: string = 'https://localhost:5000/api/'
    private refresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) { }

    public getRefresh(): Observable<boolean> 
    {
        return this.refresh.asObservable();
    }
     
    public setRefresh(value: boolean): void 
    {
        this.refresh.next(value);
    } 

    public getBooks(order: string | null): Observable<IBook[]>
    {
        return this.http.get<IBook[]>(this.baseUrl + 'books' + (order != null ? `?order=${order}` : ''));
    }

    public getRecommendedBooks(genre: string | null): Observable<IBook[]>
    {
        return this.http.get<IBook[]>(this.baseUrl + 'recommended' + (genre != null ? `?genre=${genre}` : ''));
    }

    public getDetailedBookById(id: number): Observable<IDetailedBook>
    {
        return this.http.get<IDetailedBook>(this.baseUrl + 'books/' + id);
    }

    public deleteBookById(id: number, secret: string)
    {
        return this.http.delete(this.baseUrl + 'books/' + id + '?secret=' + secret);
    }

    public createBook(book: IBookCreate): Observable<IBookCreateResponse>
    {
        return this.http.post<IBookCreateResponse>(this.baseUrl + 'books/save', book);
    }

    public reviewBook(bookId: number, review: IReview): Observable<IReviewCreateResponse>
    {
        return this.http.post<IReviewCreateResponse>(this.baseUrl + 'books/' + bookId + '/review', review);
    }

    public rateBook(bookId: number, rating: IRating): Observable<IRatingCreateResponse>
    {
        return this.http.post<IRatingCreateResponse>(this.baseUrl + 'books/' + bookId + '/rate', rating);
    }
}
