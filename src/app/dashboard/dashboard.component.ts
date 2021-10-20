import { Component, OnInit } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { tap } from 'rxjs/operators'

import { Book } from "app/models/book";
import { Reader } from "app/models/reader";
import { DataService } from 'app/core/data.service';
import { BookTrackerError } from 'app/models/bookTrackerError';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(private dataService: DataService,
    private title: Title,
    private route: ActivatedRoute) { }

  ngOnInit() {
    let resolvedData: Book[] | BookTrackerError = this.route.snapshot.data['resolvedBooks'];

    if (resolvedData instanceof BookTrackerError) {
      console.log(`Dashboard component: ${resolvedData.friendlyMessage}`);
    }
    else {
      this.allBooks = resolvedData;
    }
    // this.dataService.getAllBooks().subscribe(
    //   (data: Book[] | BookTrackerError) => this.allBooks = <Book[]>data,
    //   (err: BookTrackerError) => console.log(err.friendlyMessage),
    //   () => console.log('getAllBooks completed')
    // );


    this.allReaders = this.dataService.getAllReaders();
    this.mostPopularBook = this.dataService.mostPopularBook;

    this.title.setTitle(`Book Tracker`);
  }

  deleteBook(bookID: number): void {
    this.dataService.deleteBook(bookID)
      .subscribe(
        () => {
          let index: number = this.allBooks.findIndex(item => item.bookID === bookID);
          this.allBooks.splice(index, 1);
        },
        err => console.log(err)
      );
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }

}
