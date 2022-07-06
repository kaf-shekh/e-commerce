import { Injectable } from "@angular/core";
import firebase from "firebase";
import { Observable, of } from "rxjs";
import { User } from "src/app/model/User.model";
@Injectable({ providedIn: 'root' })

export class MockAngularFireAuth {
  public currentUser: Observable<User> = of({
    refreshToken: 'Token',
    email: 'test@email.com',
    uid: 'userIDUUID',
    emailVerified: true,
  });

  //   currentUser = ((): Promise<firebase.User> => {
  //     return of ({
  //       refreshToken: 'Token',
  //       email: 'test@email.com',
  //       uid: 'userIDUUID',
  //       emailVerified: true,
  //     })
  //   };
  // )

  mockSignUp = (() => {
    return Promise.resolve({
      user: {
        uid: "fakeuid",
      },
    });
  })

  public checkUser() {
    return {
      refreshToken: 'Token',
      email: 'test@email.com',
      uid: 'userIDUUID',
      emailVerified: true,
    }
  }
  public authState = ((): Observable<any> => {
    return Observable.of({
      refreshToken: 'Token',
      email: 'test@email.com',
      uid: 'userIDUUID',
      emailVerified: true,
    })
  })

  /* Sign up */
  public createUserWithEmailAndPassword = ((email?: string, password?: string): Promise<firebase.auth.UserCredential> => {
    return;
  })

  public sendEmailVerification = ((): Promise<void> => {
    return;
  })

  /* Sign in */
  public signInWithEmailAndPassword = ((email?: string, password?: string): Promise<firebase.auth.UserCredential> => {
    return;
  })

  /* Sign out */
  public signOut = ((): Promise<void> => {
    return;
  })
  /***
   * reset password
   */
  public verifyPasswordResetCode = ((email: string): Promise<string> => {
    return;
  })

  /***
   * send password
   */
  public sendPasswordResetEmail = ((passwordResetEmail: string): Promise<void> => {
    return;
  })
}
