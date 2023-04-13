import { Component, Input } from '@angular/core';
import { Member } from 'src/app/shared/models/member';

@Component({
    selector: 'app-member-card',
    templateUrl: './member-card.component.html',
    styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent {
    @Input() member?: Member;

    constructor() { }

}
