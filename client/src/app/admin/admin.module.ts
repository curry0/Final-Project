import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserManagementComponent } from './user-management/user-management.component';
import { PhotoManagementComponent } from './photo-management/photo-management.component';



@NgModule({
    declarations: [AdminPanelComponent, UserManagementComponent, PhotoManagementComponent],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule
    ]
})
export class AdminModule { }
