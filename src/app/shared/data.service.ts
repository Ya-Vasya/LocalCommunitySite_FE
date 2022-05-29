import { Injectable } from "@angular/core";
import { PostStatus } from "./components/interfaces";

@Injectable( {providedIn: 'root'} )
export class DataService {

    public SHARED_STATUSES: PostStatus[] = [
        {id: 0, name: "Чернетка"},
        {id: 1, name: "Заплановано"},
        {id: 2, name: "Активний"}
    ] 

    public Dictionary: {engName: string, name: string}[] = [
        {engName: "Draft", name: "Чернетка"},
        {engName: "Planned", name: "Заплановано"},
        {engName: "Active", name: "Активний"}
    ] 

    constructor()
    {
    }

    getPostStatusName(engName: string)
    {
        return this.Dictionary.find(x => x.engName === engName).name;
    }

    getPostStatusId(engName: string)
    {
        let ukrName = this.Dictionary.find(x => x.engName === engName).name;
        return this.SHARED_STATUSES.find(x => x.name == ukrName).id;
    }
}