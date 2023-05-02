import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { debounceTime, finalize, map, switchMap, take } from 'rxjs';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    errors: string[] | null = null

    regEx = "(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$"

    registerForm = this.fb.group({
        displayName: ['', Validators.required],
        gender: ['male'],
        dateOfBirth: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        email: ['', [Validators.required, Validators.email], [this.validateEmail()]],
        password: ['', [Validators.required, Validators.pattern(this.regEx)]],
        confirmPassword: ['', [Validators.required, Validators.pattern(this.regEx), this.matchValues('password')]]
    })

    constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) { }

    ngOnInit(): void {
        this.registerForm.controls['password'].valueChanges.subscribe({
            next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
        })
    }

    onSubmit() {
        const dob = this.getDateOnly(this.registerForm.controls['dateOfBirth']?.value ?? undefined);
        const values = { ...this.registerForm.value, dateOfBirth: dob };
        this.accountService.register(this.registerForm.value).subscribe({
            next: () => this.router.navigateByUrl('/dating/member/edit'),
            error: error => this.errors = error.errors
        })
    }

    matchValues(matchTo: string): ValidatorFn {
        return (control: AbstractControl) => {
            const parent = control.parent;
            if (!parent) {
                return null;
            }
            const matchingControl = parent.get(matchTo);
            if (!matchingControl) {
                return null;
            }
            const isMatching = control.value === matchingControl.value;
            return isMatching ? null : { isMatching: true };
        };
    }


    validateEmail(): AsyncValidatorFn {
        return (control: AbstractControl) => {
            return control.valueChanges.pipe(
                debounceTime(1000),
                take(1),
                switchMap(() => {
                    return this.accountService.checkEmailExists(control.value).pipe(
                        map(result => result ? { emailExists: true } : null),
                        finalize(() => control.markAsTouched())
                    )
                })
            )
        }
    }

    private getDateOnly(dob: string | undefined) {
        if (!dob) return null;
        const date = new Date(dob);
        return new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset()))
            .toISOString().slice(0, 10);
    }
}
