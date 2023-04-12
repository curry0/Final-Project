import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'GymApp';

    constructor(private basketSerivce: BasketService, private accountService: AccountService) { }

    ngOnInit(): void {
        this.loadBasket();
        this.loadCurrentUser();
    }

    private loadBasket() {
        const basketId = localStorage.getItem('basket_id');
        if (basketId) this.basketSerivce.getBasket(basketId);
    }

    private loadCurrentUser() {
        const token = localStorage.getItem('token');
        this.accountService.loadCurrentUser(token).subscribe();
    }

}
