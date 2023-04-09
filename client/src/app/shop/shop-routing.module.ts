import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductViewComponent } from './product-view/product-view.component';
import { ShopComponent } from './shop.component';

const routes: Routes = [
    { path: '', component: ShopComponent },
    { path: ':id', component: ProductViewComponent, data: { breadcrumb: { alias: 'productView'}} },
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
