import { Component, OnInit } from '@angular/core';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { Profile } from '../classes/Profile';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userData: any;
  userid: any = sessionStorage.getItem("userID");

  constructor(private api: ApiService, private dialog: MatDialog) { }

  ngOnInit(): void {
    //console.log(this.userid);
    this.api.getProfile(this.userid)
      .subscribe(res => {
        this.userData = res;
        console.log(this.userData);
      }, err => {
        alert("Something went wrong");
      })
  }

  editProfile() {
    this.dialog.open(EditProfileComponent, {
      width: '50%',
      data: this.userData,
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.api.getProfile(this.userid);
        location.reload();
      }
    })
  }
}
