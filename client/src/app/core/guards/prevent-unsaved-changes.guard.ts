import { Injectable } from '@angular/core';
import { MemberEditComponent } from 'src/app/dating/components/members/member-edit/member-edit.component';

@Injectable({
    providedIn: 'root'
})
export class PreventUnsavedChangesGuard {

    canDeactivate(component: MemberEditComponent): boolean {
        if (component.memberForm?.dirty) {
            return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
        }
        return true;
    }

}
