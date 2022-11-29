import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../classes/User';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup

  constructor(private formBuilder: FormBuilder, private api: AuthService, private router: Router, private toast: NgToastService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  login() {
    this.api.loginUser().subscribe(res => {
      const user = res.find((a: User) => {
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if (user) {
        this.toast.success({ detail: "Success", summary: "Logged in successfully!", duration: 5000 })
        sessionStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
        if (user.role == 'admin') {
          sessionStorage.setItem('userType', 'admin');
          this.router.navigate(['admin']);
        }
        else {
          sessionStorage.setItem('userType', 'user');
          this.router.navigate(['home'])
        }
        sessionStorage.setItem('userName', user.username);
        sessionStorage.setItem('userID', String(user.id));
        this.loginForm.reset();
        this.router.navigate(['home'])
      }
      else {
        this.toast.error({ detail: "Error", summary: "User not found. Check the correctness of typed data.", duration: 5000 })
      }
    }, err => {
      this.toast.error({ detail: "Error", summary: "Something went wrong! Try again.", duration: 5000 })
    })
  }
}
