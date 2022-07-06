import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppStateModel } from '..';
import { User } from '../model/User.model';
import { LogOut } from '../store/actions/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  moved = false
  currentUser: User;
  isAdmin = false;

  constructor(private store: Store<AppStateModel>,
    private router: Router) { }

  public checkUser(): void {
    this.store.select('MainStates').select('user').subscribe((user: User) => {
      if (user !== undefined) {
        this.currentUser = user;
        this.router.navigate([''])
      }
    })
  }
  ngOnInit(): void {
    this.checkUser();
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const scrollOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.setwindow(scrollOffset);
  }

  setwindow(scrollOffset: number): void {
    if (scrollOffset > 90) {
      this.moved = true
    } else {
      this.moved = false;
    }
  }

  public logMethode(): void {
    this.store.dispatch(new LogOut());
    this.router.navigate(['/login']);
  }


}
