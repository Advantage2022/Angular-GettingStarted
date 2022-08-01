import { Component, OnDestroy, OnInit } from "@angular/core";
import { filter, Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector:"pm-products",
    templateUrl:"./product-list.component.html",
    styleUrls:["./product-list.component.css"],
})
export class ProductListComponent implements OnInit, OnDestroy{
    private _productService:ProductService;
    sub!: Subscription;//|undefined or ! =We will handle it sometime later
    errorMessage: any;
    //err: void;
    constructor(productService:ProductService){
        this._productService = productService;
    }
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
    ngOnInit(): void {
//        this.products = this._productService.getProducts();
            this.sub = this._productService.getProducts().subscribe(
            {
                next:products => {
                    this.products = products;
                    this.filteredProducts = this.products;
                },
                error: err => this.errorMessage = err
            });
        //this.listFilter ="cart";
        //this.filteredProducts = this.products; // moved inside subscribe
    }
    productPageTitle:string = "Product List";
    imageWidth: number = 20;
    imageMargin: number =2;

    //listFilter:string = "cart";
    private _listFilter: string='';
    //ngModel
    get listFilter():string{
        return this._listFilter;
    }
    set listFilter(value:string){
        this._listFilter = value;
        this.filteredProducts =this.performFilter(value)

    }

    filteredProducts:IProduct[]=[];

    performFilter(filterBy:string) : IProduct[]{
        filterBy = filterBy.toLowerCase();
        return this.products.filter((product:IProduct)=>{
            return product.productName.toLowerCase().includes(filterBy);
        });
    }

    products:IProduct[] = [];
    showImage :boolean=false;

    toggleImage() : void {
        this.showImage = !this.showImage;
    }

    onNotify(message:string):void{
        console.log("parant received message", message);
        
    }

}