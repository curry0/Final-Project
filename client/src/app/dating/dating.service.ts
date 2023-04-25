import { AccountService } from './../account/account.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../shared/models/member';
import { map, of, take } from 'rxjs';
import { PaginatedResult } from '../shared/models/pagination';
import { UserParams } from '../shared/models/userParams';
import { User } from '../shared/models/user';
import { getPaginatedResult, getPaginationHeaders } from '../shared/functions/paginationHelper';

@Injectable({
    providedIn: 'root'
})
export class DatingService {
    baseUrl = environment.apiUrl;
    members: Member[] = [];
    memberCache = new Map();
    user?: User;
    userParams?: UserParams;

    constructor(private http: HttpClient, private accountService: AccountService) {
        this.accountService.currentUser$.pipe(take(1)).subscribe({
            next: user => {
                if (user) {
                    this.userParams = new UserParams(user);
                    this.user = user;
                }
            }
        })
    }

    getUserParams() {
        return this.userParams;
    }

    setUserParams(params: UserParams) {
        this.userParams = params;
    }

    resetUserParams() {
        if (this.user) {
            this.userParams = new UserParams(this.user);
            return this.userParams;
        }
        return;
    }

    getMembers(userParams: UserParams) {
        const response = this.memberCache.get(Object.values(userParams).join('-'));
        if (response) return of(response)
        let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

        params = params.append('minAge', userParams.minAge);
        params = params.append('maxAge', userParams.maxAge);
        params = params.append('gender', userParams.gender);
        params = params.append('orderBy', userParams.orderBy);

        return getPaginatedResult<Member[]>(this.baseUrl + 'users', params, this.http).pipe(
            map(response => {
                this.memberCache.set(Object.values(userParams).join('-'), response);
                return response;
            })
        )
    }

    getMember(email: string) {
        const member = [...this.memberCache.values()].reduce((arr, elem) => arr.concat(elem.result), []).find((member: Member) => member.email === email);
        if (member) return of(member);
        return this.http.get<Member>(this.baseUrl + 'users/' + email);
    }

    updateMember(member: Member) {
        return this.http.put<Member>(this.baseUrl + 'users', member);
    }

    setMainPhoto(photoId: number) {
        return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
    }

    deletePhoto(photoId: number) {
        return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
    }

    addLike(username: string) {
        return this.http.post(this.baseUrl + 'likes/' + username, {});
    }

    getLikes(predicate: string, pageNumber: number, pageSize: number) {
        let params = getPaginationHeaders(pageNumber, pageSize);
        params = params.append('predicate', predicate);
        return getPaginatedResult<Member[]>(this.baseUrl + 'likes', params, this.http);
    }

}
