import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.scss']
})
export class RolesModalComponent {

    constructor(public bsModalRef: BsModalRef) { }
    title = ''
    list: any;
    closeBtnName = ''

}
