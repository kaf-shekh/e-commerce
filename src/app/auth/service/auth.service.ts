import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { MainAppState } from 'src/app/store/reducers/auth.reducers';
import { Store } from '@ngrx/store';
import { User } from '@firebase/auth';
import { LogInSuccess } from 'src/app/store/actions/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {


  constructor(
    private router: Router,
    public angularFireAuth: AngularFireAuth,
    private store: Store<MainAppState>) {
    this.checkUser();

  }

  public checkUser(): void {
    this.angularFireAuth.authState.subscribe((user: User) => {
      if (user !== null && user !== undefined) {
        let userData = {
          token: user.refreshToken,
          email: user.email,
          userId: user.uid,
          isAdmin: user.email === 'kaf.shekh9@gmail.com' ? true : false,
          emailVerified: user.emailVerified,
        }
        this.store.dispatch(new LogInSuccess(userData))
      }
    })
  }

  /* Sign up */
  async SignUp(email?: string, password?: string, isAdmin?: boolean) {
    await this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.sendEmailVerification();

      })
  }

  async sendEmailVerification() {
    let user = await this.angularFireAuth.currentUser;
    if (user !== null) {
      (user).sendEmailVerification();
    }
  }

  /* Sign in */
  async SignIn(email?: string, password?: string, isAdmin?: boolean) {
    return await this.angularFireAuth.signInWithEmailAndPassword(email, password).then(res => {
      return res;
    })
  }

  /* Sign out */
  async SignOut() {
    await this.angularFireAuth.signOut();
    this.router.navigate([''])
    return;
  }
  /***
   * reset password
   */
  async resetPassword(email: string) {
    await this.angularFireAuth.verifyPasswordResetCode(email);
  }

  /***
   * send passsss
   */
  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.angularFireAuth.sendPasswordResetEmail(passwordResetEmail);
  }
}
