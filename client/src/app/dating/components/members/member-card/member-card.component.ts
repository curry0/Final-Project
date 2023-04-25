import { Component, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PresenceService } from 'src/app/core/services/presence.service';
import { DatingService } from 'src/app/dating/dating.service';
import { Member } from 'src/app/shared/models/member';

@Component({
    selector: 'app-member-card',
    templateUrl: './member-card.component.html',
    styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent {
    @Input() member?: Member;

    constructor(private datingService: DatingService, private toastr: ToastrService, public presenceService: PresenceService
                ,private router: Router) { }

    addLike(member: Member) {
        this.datingService.addLike(member.email).subscribe({
            next: () => this.toastr.success('You have liked ' + member.displayName),
        })
    }
}
