import { AccountService } from './../account/account.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../shared/models/member';
import { map, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DatingService {
    baseUrl = environment.apiUrl;
    members: Member[] = [];

    constructor(private http: HttpClient, private accountService: AccountService) { }

    getMembers() {
        if (this.members.length > 0) return of(this.members);
        return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
            map(members => {
                this.members = members;
                return members;
            })
        )
    }

    getMember(username: string) {
        const member = this.members.find(x => x.userName === username);
        if (member) return of(member);
        return this.http.get<Member>(this.baseUrl + 'users/' + username);
    }

    updateMember(member: Member) {
        return this.http.put<Member>(this.baseUrl + 'users', member);
    }

}
