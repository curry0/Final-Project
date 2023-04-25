import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MemberEditComponent } from 'src/app/dating/components/members/member-edit/member-edit.component';
import { ConfirmService } from 'src/app/shared/services/confirm.service';

@Injectable({
    providedIn: 'root'
})
export class PreventUnsavedChangesGuard {

    constructor(private confirmService: ConfirmService) {}

    canDeactivate(component: MemberEditComponent): Observable<boolean> {
        if (component.memberForm?.dirty) {
            return this.confirmService.confirm('Unsaved changes', 'Are you sure you want to continue? Any unsaved changes will be lost.', 'Yes', 'No');
        }
        return of(true);
    }

}
