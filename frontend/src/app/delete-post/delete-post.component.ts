import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { Post } from '../classes/Post';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.css']
})
export class DeletePostComponent implements OnInit {

  constructor(private api: ApiService, @Inject(MAT_DIALOG_DATA) public postData: Post, private dialogRef: MatDialogRef<DeletePostComponent>, private toast: NgToastService) { }

  ngOnInit(): void {
  }

  deletePost(): void {
    this.api.deletePost(this.postData.id)
      .subscribe({
        next: (res) => {
          this.toast.success({ detail: "Success", summary: "Post deleted successfully!", duration: 5000 });
          this.dialogRef.close('delete');
        },
        error: () => {
          this.toast.error({ detail: "Error", summary: "Error while deleting the record!", duration: 5000 });
        }
      })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
