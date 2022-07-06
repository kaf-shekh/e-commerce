import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppStateModel } from 'src/app';
import { User } from 'src/app/model/User.model';
import { AuthenticationService } from '../service/auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  currentUser: User;
  constructor(
    private router: Router,
    private store: Store<AppStateModel>,
    private authenticationService: AuthenticationService
  ) {
    // this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
    store.select('MainStates').select('user').subscribe((user: User) => {
      if (user !== undefined) {
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    })
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.currentUser?.emailVerified) {
      return true;
    }

    if (state.url.includes('login') || state.url.includes('signup')) {
      return;
    }

    this.router.navigate(['/login']);
    return false;
  }
}

@Injectable({ providedIn: "root" })
export class AdminGuard implements CanActivate {
  currentUser: User = null;
  constructor(
    private router: Router,
    private store: Store<AppStateModel>,
    private authenticationService: AuthenticationService
  ) {
    // this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
    store.select('MainStates').select('user').subscribe((user: User) => {
      if (user !== undefined) {
        this.currentUser = user;
      }
    })
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.currentUser?.emailVerified && this.currentUser.isAdmin) {
      return true;
    }

    if (state.url.includes('login') || state.url.includes('signup')) {
      return;
    }

    this.router.navigate(['/admin', 'login']);

    return false;
  }
}
