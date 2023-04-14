import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatingComponent } from './dating.component';
import { DatingRoutingModule } from './dating-routing.module';
import { MessagesComponent } from './components/messages/messages.component';
import { MemberDetailComponent } from './components/members/member-detail/member-detail.component';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { ListsComponent } from './components/lists/lists.component';
import { MemberCardComponent } from './components/members/member-card/member-card.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
    declarations: [
        DatingComponent,
        MessagesComponent,
        MemberDetailComponent,
        MemberListComponent,
        ListsComponent,
        MemberCardComponent
    ],
    imports: [
        CommonModule,
        DatingRoutingModule,
        SharedModule
    ]
})
export class DatingModule { }
