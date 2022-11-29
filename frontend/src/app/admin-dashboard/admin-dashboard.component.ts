import { Component, ViewChild, OnInit } from '@angular/core';
import { AddPostComponent } from '../add-post/add-post.component';
import { MatDialog } from
  '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { DeletePostComponent } from '../delete-post/delete-post.component';
import { NgToastService } from 'ng-angular-popup';
import { Post } from '../classes/Post';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  displayedColumns: string[] = ['title', 'category', 'content', 'data', 'author', 'action'];
  dataSource!: MatTableDataSource<Post>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService, private toast: NgToastService) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

  addPost() {
    this.dialog.open(AddPostComponent, {
      width: '30%',
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllPosts();
      }
    })
  }

  getAllPosts() {
    this.api.getPost()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          this.toast.error({ detail: "Error", summary: "Error while fetching the data.", duration: 5000 })
        }
      })
  }

  editPost(row: any) {
    this.dialog.open(EditPostComponent, {
      width: '30%',
      data: row,
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllPosts();
      }
    })
  }

  deletePost(row: any) {
    this.dialog.open(DeletePostComponent, {
      width: '30%',
      data: row,
    }).afterClosed().subscribe(val => {
      if (val === 'delete') {
        this.getAllPosts();
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

