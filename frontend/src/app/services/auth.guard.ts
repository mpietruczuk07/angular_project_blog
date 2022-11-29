import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private toast: NgToastService) { }

  canActivate() {
    if (this.auth.isLoggedIn()) {
      return false;
    }
    else {
      return true;
    }
  }

  deActivate() {
    this.toast.success({ detail: "Success", summary: "Logged out successfully!", duration: 5000 })
    sessionStorage.clear();
    return;
  }
}
