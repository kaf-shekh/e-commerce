import { Observable, of } from "rxjs";
import { ArticleModel } from "src/app/model/article.model";


export class AuthMock {

  // constructor() { }

  public checkUser() {
  }

  SignUp(email?: string, password?: string, isAdmin?: boolean) {

  }

  sendEmailVerification() {
  }

  /* Sign in */
  SignIn(email?: string, password?: string, isAdmin?: boolean): Observable<any> {
    return of({
      refreshToken: "dgfsdherwjhfb",
      email: 'testW@email.com',
      userId: 'userUUID',
      emailVerified: true
    })
  }

  /* Sign out */
  SignOut() {
  }
  /***
   * reset password
   */
  resetPassword(email: string) {
  }

  /***
   * send passsss
   */
  sendPasswordResetEmail(passwordResetEmail: string) {
  }


}
