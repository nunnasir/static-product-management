import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product-service";

@Component({
    selector: 'pm-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string = '';
    sub!: Subscription;
    products: IProduct[] = [];
    filterProduct: IProduct[] = [];
    
    private _listFilter: string = '';
    get listFilter() {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        // console.log('In Setter: ' + value)
        this.filterProduct = this.performFilter(value);
    }
    
    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.sub = this.productService.getProducts().subscribe({
            next: products => {
                this.products = products,
                this.filterProduct = products
            },
            error: err => this.errorMessage = err
        });
    }

    showToggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterValue: string): IProduct[] {
        filterValue = filterValue.toLocaleLowerCase();
        return this.products.filter((x: IProduct) => 
                x.productName.toLocaleLowerCase().includes(filterValue));
    }

    onRatingClicked(message: string): void {
        this.pageTitle = "Product List " + message;
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}