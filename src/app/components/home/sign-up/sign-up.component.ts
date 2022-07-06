import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppStateModel } from 'src/app';
import { User } from 'src/app/model/User.model';
import { LogOut, Resend_Password_Link, SignUp } from 'src/app/store/actions/auth.actions';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {


  form: FormGroup
  submitted: boolean;
  currentUser: User;
  timeOver = true;
  timeLimit: number;

  constructor(private fb: FormBuilder,
    private router: Router,
    private store: Store<AppStateModel>) {

  }

  public checkUser(): void {
    this.store.select('MainStates').select('user').subscribe((user: User) => {
      if (user !== undefined) {
        this.currentUser = user;
      }
      this.goTohome()
    })
  }

  ngOnInit(): void {
    this.initializeForm();
    this.checkUser();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }



  public signup(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.store.dispatch(new SignUp(this.form.value))
    // this.service.SignUp(this.form.value.email, this.form.value.password, false);
    // this.service.SignIn(this.form.value.email, this.form.value.password);
  }

  public resend(): void {
    this.timeOver = false;
    // this.service.sendEmailVerification();
    this.store.dispatch(new Resend_Password_Link());
    setTimeout(function () { this.timeOver = true }, 12000)
  }

  public goTohome(): void {
    if (this.currentUser !== null && this.currentUser !== undefined && this.currentUser.emailVerified === true) {
      this.router.navigate(['']);
    }
  }

  async reLogin(): Promise<void> {
    await this.store.dispatch(new LogOut());
    await this.store.dispatch(new LogOut());
    this.router.navigate(['/login']);

  }
}
