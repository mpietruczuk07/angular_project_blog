import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../classes/Post';
import { Profile } from '../classes/Profile';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postPost(data: Post) {
    return this.http.post<Post[]>("http://localhost:3000/posts/", data)
  }

  getPost() {
    return this.http.get<Post[]>("http://localhost:3000/posts/");
  }

  putPost(data: Post, id: number) {
    return this.http.put<Post[]>("http://localhost:3000/posts/" + id, data)
  }

  deletePost(id: number) {
    return this.http.delete<Post[]>("http://localhost:3000/posts/" + id);
  }

  postProfile(data: Profile) {
    return this.http.post<Profile[]>("http://localhost:3000/profile/", data);
  }

  getProfile(id: number) {
    return this.http.get<Profile[]>("http://localhost:3000/profile/" + id);
  }

  putProfile(data: Profile, id: number) {
    return this.http.put<Profile[]>("http://localhost:3000/profile/" + id, data);
  }
}
