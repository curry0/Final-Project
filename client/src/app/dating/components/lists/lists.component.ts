import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/shared/models/member';
import { DatingService } from '../../dating.service';
import { Pagination } from 'src/app/shared/models/pagination';

@Component({
    selector: 'app-lists',
    templateUrl: './lists.component.html',
    styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
    members?: Member[];
    predicate = 'liked';
    pageNumber = 1;
    pageSize = 5;
    pagination?: Pagination;

    constructor(private datingService: DatingService) {}

    ngOnInit(): void {
        this.loadLikes();
    }

    loadLikes() {
        this.datingService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe({
            next: response => {
                this.members = response.result;
                this.pagination = response.pagination;
            }
        })
    }

    pageChanged(event: any) {
        if (this.pageNumber !== event.page) {
            this.pageNumber = event.page;
            this.loadLikes();
        }
    }
}
