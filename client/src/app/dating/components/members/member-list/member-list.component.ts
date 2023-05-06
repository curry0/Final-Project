import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, take } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { DatingService } from 'src/app/dating/dating.service';
import { Member } from 'src/app/shared/models/member';
import { Pagination } from 'src/app/shared/models/pagination';
import { User } from 'src/app/shared/models/user';
import { UserParams } from 'src/app/shared/models/userParams';

@Component({
    selector: 'app-member-list',
    templateUrl: './member-list.component.html',
    styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
    // members$: Observable<Member[]> | undefined;
    @ViewChild('search') searchTerm?: ElementRef;
    members: Member[] = [];
    pagination?: Pagination;
    userParams?: UserParams
    genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }]

    constructor(private datingService: DatingService) {
        this.userParams = this.datingService.getUserParams();
    }

    ngOnInit(): void {
        this.loadMembers();
    }

    loadMembers() {
        if (this.userParams) {
            this.datingService.setUserParams(this.userParams);
            this.userParams.search = this.searchTerm?.nativeElement.value;
            this.datingService.getMembers(this.userParams).subscribe({
                next: (response: any) => {
                    if (response.result && response.pagination) {
                        this.members = response.result;
                        this.pagination = response.pagination;
                    }
                }
            });
        }
    }

    onSearch() {
        if (this.userParams)
        {
            this.userParams.search = this.searchTerm?.nativeElement.value;
            this.userParams.pageNumber = 1;
            this.loadMembers();
        }
    }

    resetFilters() {
        if (this.searchTerm) this.searchTerm.nativeElement.value = '';
        this.userParams = this.datingService.resetUserParams();
        this.loadMembers();

    }

    pageChanged(event: any) {
        if (this.userParams && this.userParams?.pageNumber !== event.page) {
            this.userParams.pageNumber = event.page;
            this.datingService.setUserParams(this.userParams);
            this.loadMembers();
        }
    }

}
