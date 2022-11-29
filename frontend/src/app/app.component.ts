import { Component } from '@angular/core';
import { AuthGuard } from './services/auth.guard';
import { RoleGuard } from './services/role.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Blog';
  username: any = sessionStorage.getItem("userName");
  userid: any = sessionStorage.getItem("userID");

  constructor(public authGuard: AuthGuard, public roleGuard: RoleGuard) {
  }
}


