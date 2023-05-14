import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { SharedModule } from '../shared/shared.module';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { ShopRoutingModule } from './shop-routing.module';
import { CreateProductComponent } from './modals/create-product/create-product.component';



@NgModule({
    declarations: [
        ShopComponent,
        ProductItemComponent,
        ProductViewComponent,
        CreateProductComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ShopRoutingModule
    ]
})
export class ShopModule { }
