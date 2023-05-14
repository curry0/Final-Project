"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[481],{3481:(I,m,i)=>{i.r(m),i.d(m,{AccountModule:()=>A});var u=i(6895),a=i(9383),n=i(433),t=i(1571),p=i(9479),c=i(4015);let d=(()=>{class r{constructor(e,o,l){this.accountService=e,this.router=o,this.activatedRoute=l,this.loginForm=new n.cw({email:new n.NI("",[n.kI.required,n.kI.email]),password:new n.NI("",n.kI.required)}),this.returnUrl=this.activatedRoute.snapshot.queryParams.returnUrl||"/home"}onSubmit(){this.accountService.login(this.loginForm.value).subscribe({next:()=>this.router.navigateByUrl(this.returnUrl)})}}return r.\u0275fac=function(e){return new(e||r)(t.Y36(p.B),t.Y36(a.F0),t.Y36(a.gz))},r.\u0275cmp=t.Xpm({type:r,selectors:[["app-login"]],decls:11,vars:7,consts:[[1,"d-flex","justify-content-center","mt-5"],[1,"col-3"],[3,"formGroup","ngSubmit"],[1,"text-center","mb-4"],[1,"mb-3"],[3,"formControl","label"],[3,"formControl","type","label"],[1,"d-grid"],["type","submit",1,"btn","btn-lg","btn-primary","mt-3",3,"disabled"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"form",2),t.NdJ("ngSubmit",function(){return o.onSubmit()}),t.TgZ(3,"div",3)(4,"h1",4),t._uU(5,"Login"),t.qZA()(),t._UZ(6,"app-text-input",5)(7,"app-text-input",6),t.TgZ(8,"div",7)(9,"button",8),t._uU(10,"Sign In"),t.qZA()()()()()),2&e&&(t.xp6(2),t.Q6J("formGroup",o.loginForm),t.xp6(4),t.Q6J("formControl",o.loginForm.controls.email)("label","Email"),t.xp6(1),t.Q6J("formControl",o.loginForm.controls.password)("type","password")("label","Password"),t.xp6(2),t.Q6J("disabled",o.loginForm.invalid))},dependencies:[n._Y,n.JJ,n.JL,n.oH,n.sg,c.t]}),r})();var f=i(8372),h=i(5698),v=i(3900),b=i(4004),y=i(8746);function C(r,s){if(1&r&&(t.TgZ(0,"li"),t._uU(1),t.qZA()),2&r){const e=s.$implicit;t.xp6(1),t.hij(" ",e," ")}}function F(r,s){if(1&r&&(t.TgZ(0,"ul",15),t.YNc(1,C,2,1,"li",16),t.qZA()),2&r){const e=t.oxw();t.xp6(1),t.Q6J("ngForOf",e.errors)}}const x=[{path:"login",component:d},{path:"register",component:(()=>{class r{constructor(e,o,l){this.fb=e,this.accountService=o,this.router=l,this.errors=null,this.regEx="(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$",this.registerForm=this.fb.group({displayName:["",n.kI.required],gender:["male"],dateOfBirth:["",n.kI.required],city:["",n.kI.required],country:["",n.kI.required],email:["",[n.kI.required,n.kI.email],[this.validateEmail()]],password:["",[n.kI.required,n.kI.pattern(this.regEx)]],confirmPassword:["",[n.kI.required,n.kI.pattern(this.regEx),this.matchValues("password")]]})}ngOnInit(){this.registerForm.controls.password.valueChanges.subscribe({next:()=>this.registerForm.controls.confirmPassword.updateValueAndValidity()})}onSubmit(){this.getDateOnly(this.registerForm.controls.dateOfBirth?.value??void 0);this.accountService.register(this.registerForm.value).subscribe({next:()=>this.router.navigateByUrl("/dating/member/edit"),error:l=>this.errors=l.errors})}matchValues(e){return o=>{const l=o.parent;if(!l)return null;const g=l.get(e);return g?o.value===g.value?null:{isMatching:!0}:null}}validateEmail(){return e=>e.valueChanges.pipe((0,f.b)(1e3),(0,h.q)(1),(0,v.w)(()=>this.accountService.checkEmailExists(e.value).pipe((0,b.U)(o=>o?{emailExists:!0}:null),(0,y.x)(()=>e.markAsTouched()))))}getDateOnly(e){if(!e)return null;const o=new Date(e);return new Date(o.setMinutes(o.getMinutes()-o.getTimezoneOffset())).toISOString().slice(0,10)}}return r.\u0275fac=function(e){return new(e||r)(t.Y36(n.qu),t.Y36(p.B),t.Y36(a.F0))},r.\u0275cmp=t.Xpm({type:r,selectors:[["app-register"]],decls:27,vars:20,consts:[[1,"d-flex","justify-content-center","mt-5"],[1,"col-3"],[3,"formGroup","ngSubmit"],[1,"text-center","mb-4"],[1,"mb-3"],[2,"margin-right","10px"],[1,"form-check-label"],["type","radio","value","male","formControlName","gender",1,"form-check-input"],["type","radio","value","female","formControlName","gender",1,"form-check-input","ms-3"],[3,"formControl","label"],[3,"formControl","type","label"],[3,"formControl","label","type"],["class","text-danger list-unstyled",4,"ngIf"],[1,"d-grid"],["type","submit",1,"btn","btn-lg","btn-primary","mt-3",3,"disabled"],[1,"text-danger","list-unstyled"],[4,"ngFor","ngForOf"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"form",2),t.NdJ("ngSubmit",function(){return o.onSubmit()}),t.TgZ(3,"div",3)(4,"h1",4),t._uU(5,"Register"),t.qZA()(),t._UZ(6,"hr"),t.TgZ(7,"div",4)(8,"label",5),t._uU(9,"I am a:"),t.qZA(),t.TgZ(10,"label",6),t._UZ(11,"input",7),t._uU(12,"Male "),t.qZA(),t.TgZ(13,"label",6),t._UZ(14,"input",8),t._uU(15,"Female "),t.qZA()(),t._UZ(16,"app-text-input",9)(17,"app-text-input",9)(18,"app-text-input",10)(19,"app-text-input",10)(20,"app-text-input",11)(21,"app-text-input",9)(22,"app-text-input",9),t.YNc(23,F,2,1,"ul",12),t.TgZ(24,"div",13)(25,"button",14),t._uU(26,"Sign Up"),t.qZA()()()()()),2&e&&(t.xp6(2),t.Q6J("formGroup",o.registerForm),t.xp6(14),t.Q6J("formControl",o.registerForm.controls.displayName)("label","Display Name"),t.xp6(1),t.Q6J("formControl",o.registerForm.controls.email)("label","Email"),t.xp6(1),t.Q6J("formControl",o.registerForm.controls.password)("type","password")("label","Password"),t.xp6(1),t.Q6J("formControl",o.registerForm.controls.confirmPassword)("type","password")("label","Confirm Password"),t.xp6(1),t.Q6J("formControl",o.registerForm.controls.dateOfBirth)("label","Date Of Birth")("type","dateOnly"),t.xp6(1),t.Q6J("formControl",o.registerForm.controls.city)("label","City"),t.xp6(1),t.Q6J("formControl",o.registerForm.controls.country)("label","Country"),t.xp6(1),t.Q6J("ngIf",o.errors),t.xp6(2),t.Q6J("disabled",o.registerForm.invalid))},dependencies:[u.sg,u.O5,n._Y,n.Fj,n._,n.JJ,n.JL,n.oH,n.sg,n.u,c.t]}),r})()}];let Z=(()=>{class r{}return r.\u0275fac=function(e){return new(e||r)},r.\u0275mod=t.oAB({type:r}),r.\u0275inj=t.cJS({imports:[a.Bz.forChild(x),a.Bz]}),r})();var J=i(4466);let A=(()=>{class r{}return r.\u0275fac=function(e){return new(e||r)},r.\u0275mod=t.oAB({type:r}),r.\u0275inj=t.cJS({imports:[u.ez,Z,J.m]}),r})()}}]);