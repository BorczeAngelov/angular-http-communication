import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpContextToken } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpCacheService } from './http-cache.service';
import { tap } from 'rxjs/operators';

export const CACHEABLE = new HttpContextToken(() => true);

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

    constructor(private cacheService: HttpCacheService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!req.context.get(CACHEABLE)) {
            return next.handle(req);
        }

        if (req.method !== 'GET') {
            console.log(`Invalidating cache: ${req.method} ${req.url} `);
            this.cacheService.invalidateCache();
            return next.handle(req);
        }

        const cachedRespone: HttpResponse<any> = this.cacheService.get(req.url);

        if (cachedRespone) {
            console.log(`Returning a cached respone: ${cachedRespone.url}`, cachedRespone);;
            return of(cachedRespone);
        }

        return next.handle(req).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    console.log(`Adding item to cache: ${req.url} `);
                    this.cacheService.put(req.url, event);
                }
            })
        );
    }
}
