import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'test-error', component: TestErrorComponent},
    { path: 'not-found', component: NotFoundComponent},
    { path: 'server-error', component: ServerErrorComponent},
    { path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)},
    { path: 'basket', loadChildren: () => import('./basket/basket.module').then(m => m.BasketModule)},
    {
        path: 'checkout',
        canActivate: [AuthGuard],
        loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule)},
    { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},
    { path: 'dating', loadChildren: () => import('./dating/dating.module').then(m => m.DatingModule)},
    { path: 'admin', canActivate: [AuthGuard, AdminGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
    { path: 'orders', canActivate:[AuthGuard], loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)},
    { path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
