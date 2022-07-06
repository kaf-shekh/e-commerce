import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  template: `<span class="sidebar-mt">
  <router-outlet></router-outlet>
  </span>`
})
export class AdminComponent {

  constructor() {

  }
}
