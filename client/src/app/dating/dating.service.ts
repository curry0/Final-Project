import { AccountService } from './../account/account.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../shared/models/member';

@Injectable({
    providedIn: 'root'
})
export class DatingService {
    baseUrl = environment.apiUrl

    constructor(private http: HttpClient, private accountService: AccountService) { }

    getMembers() {
        const token = localStorage.getItem('token');
        return this.http.get<Member[]>(this.baseUrl + 'users');
    }

    getMember(username: string) {
        return this.http.get<Member>(this.baseUrl + 'users/' + username);
    }

}
