import { Component, OnInit } from '@angular/core';
import { Post } from '../classes/Post';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { OnePostComponent } from '../one-post/one-post.component';

@Component({
  selector: 'app-print-posts',
  templateUrl: './print-posts.component.html',
  styleUrls: ['./print-posts.component.css']
})

export class PrintPostsComponent implements OnInit {
  postsList: Post[] = [];
  selectedPost!: Post;
  newPost!: Post;
  selected = false;
  searchText: string = '';
  selectedCategory: string = '';

  constructor(public dialog: MatDialog, private service: ApiService) { }

  ngOnInit(): void {
    this.service.getPost()
      .subscribe(res => {
        this.postsList = res;
      })
  }

  onSelect(post: Post): void {
    if (!this.selected)
      this.selectedPost = post;

    this.dialog.open(OnePostComponent, {
      width: '50%',
      data: this.selectedPost,
    }).afterClosed().subscribe(result => {
      console.log(this.selectedPost);
      console.log(result);
    })
  }

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
  }

  onChosenCat(selectedCat: string) {
    this.selectedCategory = selectedCat;
  }
}
