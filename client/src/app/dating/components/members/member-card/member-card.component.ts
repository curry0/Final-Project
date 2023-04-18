import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DatingService } from 'src/app/dating/dating.service';
import { Member } from 'src/app/shared/models/member';

@Component({
    selector: 'app-member-card',
    templateUrl: './member-card.component.html',
    styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent {
    @Input() member?: Member;

    constructor(private datingService: DatingService, private toastr: ToastrService) { }

    addLike(member: Member) {
        this.datingService.addLike(member.userName).subscribe({
            next: () => this.toastr.success('You have liked ' + member.displayName),
        })
    }
}
