import { Component, OnInit } from '@angular/core';
import { DatingService } from 'src/app/dating/dating.service';
import { Member } from 'src/app/shared/models/member';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
    members: Member[] = []

    constructor(private datingService: DatingService) { }

    ngOnInit(): void {
        this.loadMembers();
    }

    loadMembers() {
        this.datingService.getMembers().subscribe({
            next: members => this.members = members
        })
    }

}
