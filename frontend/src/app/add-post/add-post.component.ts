import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Post } from '../classes/Post';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categories } from '../classes/categories-mock';
import { Authors } from '../classes/authors-mock';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  categoryList!: string[];
  authorsList!: string[];

  newPost: Post = new Post(0, "", "", "", new Date(), "", "");

  postForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private api: ApiService, @Inject(MAT_DIALOG_DATA) public addData: Post, private dialogRef: MatDialogRef<AddPostComponent>, private toast: NgToastService) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      category: ['', Validators.required],
      content: ['', [Validators.required, Validators.minLength(200)]],
      date: [new Date(), Validators.required],
      author: ['', Validators.required],
      image: ['https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg', Validators.required],
    })
    this.categoryList = Categories;
    this.authorsList = Authors;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addPost(): void {
    if (this.postForm.valid) {
      this.api.postPost(this.postForm.value)
        .subscribe({
          next: (res) => {
            this.toast.success({
              detail: "Success", summary: "Post added successfully!", duration: 5000
            });
            this.postForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            this.toast.error({ detail: "Error", summary: "Error while adding the post. Try again.", duration: 5000 })
          }
        })
    }
  }
}
