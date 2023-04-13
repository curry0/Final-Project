import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatingComponent } from './dating.component';
import { DatingRoutingModule } from './dating-routing.module';
import { MessagesComponent } from './components/messages/messages.component';
import { MemberDetailComponent } from './components/members/member-detail/member-detail.component';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { ListsComponent } from './components/lists/lists.component';



@NgModule({
    declarations: [
        DatingComponent,
        MessagesComponent,
        MemberDetailComponent,
        MemberListComponent,
        ListsComponent
    ],
    imports: [
        CommonModule,
        DatingRoutingModule
    ]
})
export class DatingModule { }
