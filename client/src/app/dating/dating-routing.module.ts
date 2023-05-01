import { PreventUnsavedChangesGuard } from './../core/guards/prevent-unsaved-changes.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DatingComponent } from './dating.component';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { MemberDetailComponent } from './components/members/member-detail/member-detail.component';
import { ListsComponent } from './components/lists/lists.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { MemberEditComponent } from './components/members/member-edit/member-edit.component';
import { MemberDetailedResolver } from '../core/resolvers/member-detailed.resolver';

const routes: Routes = [
    { path: '', component: DatingComponent },
    { path: '', runGuardsAndResolvers: 'always', canActivate:[AuthGuard], children: [
        { path: 'members', component: MemberListComponent },
        { path: 'members/:email', component: MemberDetailComponent, resolve: { member: MemberDetailedResolver } },
        { path: 'member/edit', component: MemberEditComponent, canDeactivate: [PreventUnsavedChangesGuard] },
        { path: 'lists', component: ListsComponent },
        { path: 'messages', component: MessagesComponent },
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
