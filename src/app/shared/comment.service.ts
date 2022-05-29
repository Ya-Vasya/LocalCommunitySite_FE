import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommentDto, CommentRequest } from './components/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  
  baseUrl = environment.baseUrl

  private readonly API_ROUTES = {
      default: `/comments/`,
      byPost: "/comments/post/"
  }

  constructor(private http: HttpClient) { }

  createComment(comment: CommentRequest){
    return this.http.post(this.baseUrl + this.API_ROUTES.default, comment);
  }

  getCommentsByPostId(postId: number) : Observable<CommentDto[]>{
    return this.http.get<CommentDto[]>(this.baseUrl + this.API_ROUTES.byPost + postId);
  }

}
