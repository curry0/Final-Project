import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DatingComponent } from './dating.component';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { MemberDetailComponent } from './components/members/member-detail/member-detail.component';
import { ListsComponent } from './components/lists/lists.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AuthGuard } from '../core/gurads/auth.guard';

const routes: Routes = [
    { path: '', component: DatingComponent },
    { path: '', runGuardsAndResolvers: 'always', canActivate:[AuthGuard], children: [
        { path: 'members', component: MemberListComponent },
        { path: 'members/:id', component: MemberDetailComponent },
        { path: 'lists', component: ListsComponent },
        { path: 'messages', component: MessagesComponent }
    ]},
    { path: '**', component: DatingComponent, pathMatch: 'full' }
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
export class DatingRoutingModule { }
