import { ContentChild } from "@angular/core";

export interface IBookCreate{
    id: number;
    title: string;
    cover: string;
    content: string;
    author: string;
    genre: string;
}