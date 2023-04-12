import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DeliveryMethod } from '../shared/models/deliveryMethod';
import { map } from 'rxjs';
import { Order, OrderToCreate } from '../shared/models/order';

@Injectable({
    providedIn: 'root'
})
export class CheckoutService {
    baseUrl = environment.apiUrl

    constructor(private http: HttpClient) { }

    checkoutOrder(order: OrderToCreate) {
        return this.http.post<Order>(this.baseUrl + 'orders', order);
    }

    getDelvieryMethods() {
        return this.http.get<DeliveryMethod>(this.baseUrl + 'orders/deliveryMethods').pipe(
            map((dm: DeliveryMethod) => {
                return dm['sort']((a: { price: number; }, b: { price: number; }) => b.price - a.price);
            })
        );
    }
}
