import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators"
import { IProduct } from "./product";

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    private productUrl = 'api/products/products.json';

    constructor(private http: HttpClient) {}
    
    getProducts() : Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            // tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getProduct(id: number): Observable<IProduct | undefined> {
        return this.getProducts().pipe(
            map((products: IProduct[]) => products.find(p => p.productId === id)),
            // tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
        )
    }

    // getProducts() : Observable<IProduct[]> {
    //     return this.http.get<IProduct[]>(this.productUrl);
    // }

    private handleError(err: HttpErrorResponse): Observable<never> {
        let errorMessage = '';
        if(err.error instanceof ErrorEvent) {
            errorMessage = `An error occured ${err.message}`;
        }
        else {
            errorMessage = `Server returen code ${err.status}, error message ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}