import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
    selector: 'app-product-view',
    templateUrl: './product-view.component.html',
    styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
    product?: Product;

    constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute, private bcService: BreadcrumbService) {
        this.bcService.set('@productView', ' ')
    }

    ngOnInit(): void {
        this.getProduct();
    }

    getProduct() {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        if (id) this.shopService.getProduct(+id).subscribe({
            next: product => {
                this.product = product;
                this.bcService.set('@productView', product.name)
            },
            error: error => console.log(error)
        })
    }

}
