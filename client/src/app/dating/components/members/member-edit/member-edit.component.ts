import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { DatingService } from 'src/app/dating/dating.service';
import { Member } from 'src/app/shared/models/member';
import { User } from 'src/app/shared/models/user';

@Component({
    selector: 'app-member-edit',
    templateUrl: './member-edit.component.html',
    styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
    @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
        if (this.memberForm.dirty) $event.returnValue = true;
    }

    memberForm = this.fb.group({
        introduction: [''],
        lookingFor: [''],
        interests: [''],
        city: [''],
        country: ['']
    });
    member?: Member;
    user: User | null = null;

    constructor(private fb: FormBuilder, private accountService: AccountService, private datingService: DatingService, private toastr: ToastrService) {
        this.accountService.currentUser$.pipe(take(1)).subscribe({
            next: user => this.user = user
        })
    }

    ngOnInit(): void {
        this.loadMember();
    }

    updateMember() {
        this.datingService.updateMember(<Member>this.memberForm.value).subscribe({
            next: member => {
                this.member = { ...this.member, ...member };
                this.toastr.success('Profile updated successfully');
                this.memberForm?.reset(member)
            }
        })

    }



    private loadMember() {
        if (!this.user) return;
        this.datingService.getMember(this.user.email).subscribe({
            next: member => {
                this.member = member;
                this.memberForm.patchValue(member);
                this.memberForm?.get('city')?.setValue(member.address?.city);
                this.memberForm?.get('country')?.setValue(member.address?.country);
            }
        })
    }

}
