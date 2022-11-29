import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../classes/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(data: User) {
    return this.http.post<User[]>("http://localhost:3000/users/", data)
  }

  loginUser() {
    return this.http.get<User[]>("http://localhost:3000/users/");
  }

  isLoggedIn() {
    return !!sessionStorage.getItem('token');
  }

  getUserName() {
    return !!sessionStorage.getItem('userName');
  }
}
