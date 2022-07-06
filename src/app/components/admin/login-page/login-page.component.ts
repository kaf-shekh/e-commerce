import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/model/User.model';
import { LogIn } from 'src/app/store/actions/auth.actions';
import { MainAppState } from 'src/app/store/reducers/auth.reducers';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup
  submitted: boolean;
  currentUser: User;
  error: string;

  constructor(private fb: FormBuilder,
    public router: Router,
    public store: Store<MainAppState>
  ) {

  }

  ngOnInit(): void {
    this.checkUser();
    this.initializeForm();
  }

  checkUser(): void {
    this.store.select('user').subscribe((user: User) => {
      this.currentUser = user;
    })
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  public loginSubmit(): void {
    this.submitted = true;
    // this.service.SignUp();
    // this.service.checkUser();
    // this.service.SignOut();
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    if (this.form.value.email !== "kaf.shekh9@gmail.com") {
      this.error = 'Admin email id does not match';
      return;
    }
    this.error = '';
    this.store.dispatch(new LogIn(this.form.value))
    // this.service.SignIn(this.form.value.email, this.form.value.password);
    // this.service.SignIn(this.form.value.email, this.form.value.password);
    if (this.currentUser !== null) {
      this.router.navigate(['/admin', 'article-list', true]);
    } else {
      this.router.navigate(['']);
    }

  }


}
