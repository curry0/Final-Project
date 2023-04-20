import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { User } from 'src/app/shared/models/user';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { RolesModalComponent } from 'src/app/shared/modals/roles-modal/roles-modal.component';
import { initialState } from 'ngx-bootstrap/timepicker/reducer/timepicker.reducer';

@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
    users: User[] = [];
    bsModalRef: BsModalRef<RolesModalComponent> = new BsModalRef<RolesModalComponent>();

    constructor(private adminService: AdminService, private modalService: BsModalService) {}

    ngOnInit(): void {
        this.getUsersWithRoles();
    }

    getUsersWithRoles() {
        this.adminService.getUsersWithRoles().subscribe({
            next: users => {
                this.users = users;
                console.log(this.users);
            },
        })
    }

    openRolesModal() {
        const initialState: ModalOptions = {
            initialState: {
                list: [
                    'Do thing',
                    'Do thing',
                    'Do thing'
                ],
                title: 'Test modal'
            }
        }
        this.bsModalRef = this.modalService.show(RolesModalComponent, initialState);
        this.bsModalRef.content!.closeBtnName = 'Close';
    }
}
