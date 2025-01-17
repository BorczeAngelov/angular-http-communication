import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DataService } from './data.service';

import { Book } from 'app/models/book';
import { BookTrackerError } from 'app/models/bookTrackerError';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BooksResolverService implements Resolve<Book[] | BookTrackerError> {

    constructor(private dataService: DataService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Book[] | BookTrackerError | Observable<Book[] | BookTrackerError> | Promise<Book[] | BookTrackerError> {
        return this.dataService.getAllBooks()
            .pipe(
                catchError(err => of(err))
            );
    }
}