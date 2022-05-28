import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { Post, PostFilterRequest } from "./components/interfaces";

@Injectable({providedIn: 'root'})
export class PostsService {
    constructor(private http: HttpClient)
    {
    }

    baseUrl = environment.baseUrl

    private readonly API_ROUTES = {
        default: `/post`,
        filters: `/post/filter`
      }

    create(post: Post): Observable<Post> {
        const url: string = `${this.baseUrl}${this.API_ROUTES.default}`
        return this.http.post<Post>(url, post);
    }

    getAll(): Observable<Array<Post>> {
        const url: string = `${this.baseUrl}${this.API_ROUTES.default}`
        return this.http.get<Array<Post>>(url);
    }

    remove(postId: Number) {
        const url: string = `${this.baseUrl}${this.API_ROUTES.default}/${postId}`
        return this.http.delete<void>(url);
    }

    getFiltered(req: PostFilterRequest)
    {
        const url: string = `${this.baseUrl}${this.API_ROUTES.filters}`
        return this.http.post<Array<Post>>(url, req);
    }

    getById(id: Number) : Observable<Post>
    {
        const url: string = `${this.baseUrl}${this.API_ROUTES.default}/${id}`
        return this.http.get<Post>(url);
    }

    update(post: Post) {
        const url: string = `${this.baseUrl}${this.API_ROUTES.default}/${post.id}`
        return this.http.put<Post>(url, post);
    }
}
