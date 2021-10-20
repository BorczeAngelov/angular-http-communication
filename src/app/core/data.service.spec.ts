import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpContextToken } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing';
import { Book } from 'app/models/book';

describe('DataService Tests', () => {

    let dataService: DataService;
    let httpTestingController: HttpTestingController;

    let testBooks: Book[] = [
        {
            "bookID": 1,
            "title": "Goodnight Moon",
            "author": "Margaret Wise Brown",
            "publicationYear": 1953
        },
        {
            "bookID": 2,
            "title": "Winnie-the-Pooh",
            "author": "A. A. Milne",
            "publicationYear": 1926
        },
        {
            "bookID": 3,
            "title": "Where the Wild Things Are",
            "author": "Maurice Sendak",
            "publicationYear": 1963
        },
    ];


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [DataService]
        });

        dataService = TestBed.get(DataService);
        httpTestingController = TestBed.get(HttpTestingController);
    })


    it('should GET all books', () => {
        dataService.getAllBooks()
            .subscribe(data => {
                console.log(data);
                if (data) {
                    let test = <Book[]>data;
                    expect(test.length).toBe(3);
                }
            });

        let booksRequest: TestRequest = httpTestingController.expectOne('/api/books');
        expect(booksRequest.request.method).toEqual('GET');

        booksRequest.flush(testBooks);
    })

    it('test 2', () => {

    })
});

