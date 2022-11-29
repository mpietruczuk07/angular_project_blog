import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CustomValidators } from '../classes/custom-validators';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  public signUpForm!: FormGroup;
  public newProfileForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private toast: NgToastService, private api: AuthService, private api2: ApiService) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), CustomValidators.passwordContainsNumber]],
      passwordConfirm: ['', Validators.required],
      role: ['user'],
    }, { validator: CustomValidators.passwordsMatch });

    this.newProfileForm = this.formBuilder.group({
      photo_url: [''],
      description: [''],
    })
  }

  async signUp() {
    console.log(this.newProfileForm.value);
    this.api2.postProfile(this.newProfileForm.value)
      .subscribe(res => {
        this.newProfileForm.reset();
      });
    this.api.registerUser(this.signUpForm.value)
      .subscribe(res => {
        this.toast.success({ detail: "Success", summary: "Signed up successfully! :)", duration: 5000 })
        this.signUpForm.reset();
        this.router.navigate(['login']);
      }, err => {
        this.toast.error({ detail: "Error", summary: "Something went wrong! Try again.", duration: 5000 })
      });
  }
}
