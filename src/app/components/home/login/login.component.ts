import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppStateModel } from 'src/app';
import { User } from 'src/app/model/User.model';
import { LogIn, Resend_Password_Link, Reset_Password } from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup
  submitted: boolean;
  currentUser: User;
  timeOver = true;
  timeLimit: number;
  error: string;
  isforgot = false;

  constructor(private fb: FormBuilder,
    private store: Store<AppStateModel>,
    public router: Router) {
    // this.authservice.cacheData();
    // this.getState = this.store.select(selectAuthState);


    // this.service.currentUser.subscribe(user => {
    //   this.currentUser = user;
    //   this.goTohome();
    // });
  }

  ngOnInit(): void {

    this.initializeForm();
    this.checkUser();
  }

  public checkUser(): void {

    this.store.select('MainStates').select('user').subscribe((user: User) => {
      this.currentUser = user;
      if (user !== null && user !== undefined) {
        this.goTohome();

      }
    });
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  public async loginSubmit(): Promise<void> {
    this.submitted = true;
    // this.service.SignUp();

    // this.service.SignOut();
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.error = '';
    // this.store.dispatch(new LogInSuccess(this.form.value));
    await this.store.dispatch(new LogIn(this.form.value));

    // this.service.SignIn(this.form.value.email, this.form.value.password);
  }

  public forgotPassword(): void {
    if (this.form.controls.email.valid === false) {
      this.error = 'Please provide valid email address';
      return;
    }
    this.error = ''
    this.isforgot = true;
    this.store.dispatch(new Reset_Password(this.form.value.email));
    // this.service.resetPassword(this.form.value.email);
    // this.service.SignIn(this.form.value.email, this.form.value.password);
  }

  public resend(): void {
    this.timeOver = false;
    setTimeout(function () { this.timeOver = true }, 12000)
    this.store.dispatch(new Resend_Password_Link());
  }

  public goTohome(): void {
    if (this.currentUser !== null && this.currentUser !== undefined && this.currentUser.emailVerified === true) {
      this.router.navigate(['']);
    } else if (this.currentUser !== null && this.currentUser !== undefined && this.currentUser.emailVerified === false) {
      this.router.navigate(['/sign-up']);
    } else {
      return;
    }
  }
}
