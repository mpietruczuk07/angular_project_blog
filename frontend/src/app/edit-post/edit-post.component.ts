import { Component, Inject, OnInit, } from '@angular/core';
import { Post } from '../classes/Post';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categories } from '../classes/categories-mock';
import { Authors } from '../classes/authors-mock';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  categoryList!: string[];
  authorsList!: string[];

  postForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private api: ApiService, @Inject(MAT_DIALOG_DATA) public editData: Post, private dialogRef: MatDialogRef<EditPostComponent>, private toast: NgToastService) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      category: ['', Validators.required],
      content: ['', [Validators.required, Validators.minLength(200)]],
      date: ['', Validators.required],
      author: ['', Validators.required],
      image: ['', Validators.required],
    });

    this.categoryList = Categories;
    this.authorsList = Authors;

    console.log(this.editData);

    if (this.editData) {
      this.postForm.controls['title'].setValue(this.editData.title);
      this.postForm.controls['category'].setValue(this.editData.category);
      this.postForm.controls['image'].setValue(this.editData.image);
      this.postForm.controls['content'].setValue(this.editData.content);
      this.postForm.controls['date'].setValue(this.editData.date);
      this.postForm.controls['author'].setValue(this.editData.author);
    }
  }

  updatePost(): void {
    this.api.putPost(this.postForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          this.toast.success({ detail: "Success", summary: "Post updated successfully!", duration: 5000 });
          this.postForm.reset();
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

