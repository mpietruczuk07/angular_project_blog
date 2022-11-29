import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private toast: NgToastService) { }

  canActivate() {
    let role = sessionStorage.getItem("userType");
    if (role == "admin") {
      return true;
    }
    else if (role == "user") {
      this.toast.error({ detail: "Error", summary: "You don't have the permission to access this site.", duration: 5000 })
      return false;
    }
    else {
      return false;
    }
  }

  canSee() {
    let role = sessionStorage.getItem("userType");
    if (role == "admin") {
      return true;
    }
    else if (role == "user") {
      return false;
    }
    else {
      return false;
    }
  }
}

