import { Component } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';

@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent {

    constructor(public accountService: AccountService) { }
}
