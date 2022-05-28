import { Injectable } from "@angular/core";
import { PostStatus } from "./components/interfaces";

@Injectable( {providedIn: 'root'} )
export class DataService {

    public SHARED_STATUSES: PostStatus[] = [
        {id: 0, name: "Чернетка"},
        {id: 1, name: "Заплановано"},
        {id: 2, name: "Активний"}
    ] 

    constructor()
    {
    }

    getPostStatusName(id: Number)
    {
        return this.SHARED_STATUSES.find(x => x.id == id).name
    }
}