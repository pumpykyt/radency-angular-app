import { IReview } from './IReview';

export interface IDetailedBook{
    id: number;
    title: string;
    cover: string;
    genre: string;
    author: string;
    content: string;
    rating: number;
    reviews: IReview[];
}