import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductViewComponent } from './product-view/product-view.component';
import { ShopComponent } from './shop.component';
import { CreateProductComponent } from './modals/create-product/create-product.component';

const routes: Routes = [
    { path: '', component: ShopComponent },
    { path: 'listProduct', component: CreateProductComponent },
    { path: ':id', component: ProductViewComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
]

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ShopRoutingModule { }
