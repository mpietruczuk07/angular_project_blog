import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { Profile } from '../classes/Profile';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  profileForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private api: ApiService, @Inject(MAT_DIALOG_DATA) public editData: Profile, private dialogRef: MatDialogRef<EditProfileComponent>, private toast: NgToastService) { }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      photo_url: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(20)]],
    });

    console.log(this.editData);

    if (this.editData) {
      this.profileForm.controls['photo_url'].setValue(this.editData.photo_url);
      this.profileForm.controls['description'].setValue(this.editData.description);
    }
  }

  updateProfile(): void {
    this.api.putProfile(this.profileForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          console.log(this.profileForm.value);
          this.toast.success({ detail: "Success", summary: "Profile updated successfully!", duration: 5000 });
          this.profileForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          this.toast.error({ detail: "Error", summary: "Error while updating the record!", duration: 5000 });
        }
      })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

