import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Feedback, FeedbackFilterRequest, FeedbackRequest } from "./components/interfaces";

@Injectable({providedIn: 'root'})
export class FeedbackService {
    constructor(private http: HttpClient)
    {
    }

    baseUrl = environment.baseUrl

    private readonly API_ROUTES = {
        default: `/feedback`,
        filters: `/feedback/filter`
    }

    create(req: FeedbackRequest) {
        const url: string = `${this.baseUrl}${this.API_ROUTES.default}`
        return this.http.post<FeedbackRequest>(url, req);
    }

    getAll(): Observable<Array<Feedback>> {
        const url: string = `${this.baseUrl}${this.API_ROUTES.default}`
        return this.http.get<Array<Feedback>>(url);
    }

    remove(postId: Number) {
        const url: string = `${this.baseUrl}${this.API_ROUTES.default}/${postId}`
        return this.http.delete<void>(url);
    }

    getFiltered(req: FeedbackFilterRequest)
    {
        const url: string = `${this.baseUrl}${this.API_ROUTES.filters}`
        return this.http.post<Array<Feedback>>(url, req);
    }

    getById(id: Number) : Observable<Feedback>
    {
        const url: string = `${this.baseUrl}${this.API_ROUTES.default}/${id}`
        return this.http.get<Feedback>(url);
    }
}