import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatingService } from 'src/app/dating/dating.service';
import { Member } from 'src/app/shared/models/member';
import { Pagination } from 'src/app/shared/models/pagination';

@Component({
    selector: 'app-member-list',
    templateUrl: './member-list.component.html',
    styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
    // members$: Observable<Member[]> | undefined;
    members: Member[] = [];
    pagination?: Pagination;
    pageNumber = 1;
    pageSize = 5;

    constructor(private datingService: DatingService) { }

    ngOnInit(): void {
        // this.members$ = this.datingService.getMembers();
        this.loadMembers();
    }

    loadMembers() {
        this.datingService.getMembers(this.pageNumber, this.pageSize).subscribe({
            next: (response: any) => {
                if (response.result && response.pagination) {
                    this.members = response.result;
                    this.pagination = response.pagination;
                }
            }
        });
    }

    pageChanged(event: any) {
        if (this.pageNumber !== event.page) {
            this.pageNumber = event.page;
            this.loadMembers();
        }

    }


}
