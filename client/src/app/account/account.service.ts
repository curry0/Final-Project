import { Injectable } from '@angular/core';
import { ReplaySubject, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address, User } from '../shared/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    baseUrl = environment.apiUrl;
    private currentUserSource = new ReplaySubject<User | null>(1);
    currentUser$ = this.currentUserSource.asObservable();

    constructor(private http: HttpClient, private router: Router) { }

    loadCurrentUser(token: string | null) {
        if (token === null) {
            this.currentUserSource.next(null);
            return of(null);
        }

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Bearer ${token}`);

        return this.http.get<User>(this.baseUrl + 'account', { headers }).pipe(
            map(user => {
                if (user) {
                    this.setCurrentUser(user);
                    return user;
                } else return null;
            })
        )
    }

    login(values: any) {
        return this.http.post<User>(this.baseUrl + 'account/login', values).pipe(
            map(user => {
                if (user)
                    this.setCurrentUser(user);
            })
        )
    }

    register(values: any) {
        return this.http.post<User>(this.baseUrl + 'account/register', values).pipe(
            map(user => {
                this.setCurrentUser(user);
            })
        )
    }

    logout() {
        localStorage.removeItem('token');
        this.currentUserSource.next(null);
        this.router.navigateByUrl('/');
    }

    checkEmailExists(email: string) {
        return this.http.get<boolean>(this.baseUrl + 'account/emailExists?email=' + email);
    }

    getUserAddress() {
        return this.http.get<Address>(this.baseUrl + 'account/address');
    }

    updateUserAddress(address: Address) {
        return this.http.put<Address>(this.baseUrl + 'account/address', address);
    }

    setCurrentUser(user: User) {
        user.roles = [];
        const roles = this.getDecodedToken(user.token).role;
        Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
    }

    getDecodedToken(token: string) {
        return JSON.parse(atob(token.split('.')[1]));
    }
}
