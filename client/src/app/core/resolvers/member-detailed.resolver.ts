import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DatingService } from 'src/app/dating/dating.service';
import { Member } from 'src/app/shared/models/member';

@Injectable({
    providedIn: 'root'
})
export class MemberDetailedResolver {

    constructor(private datingService: DatingService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<Member> {
        return this.datingService.getMember(route.paramMap.get('username')!);
    }
}
