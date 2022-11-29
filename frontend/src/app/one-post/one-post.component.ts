import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Post } from '../classes/Post';

@Component({
  selector: 'app-one-post',
  templateUrl: './one-post.component.html',
  styleUrls: ['./one-post.component.css']
})
export class OnePostComponent implements OnInit {
  @Input()
  post!: Post;

  constructor(@Inject(MAT_DIALOG_DATA) public printedPost: Post, private dialogRef: MatDialogRef<OnePostComponent>) { }

  ngOnInit(): void {
    console.log(this.printedPost);
  }
}
