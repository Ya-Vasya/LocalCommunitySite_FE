import { Injectable } from "@angular/core";
import { PostStatus, Section } from "./components/interfaces";

@Injectable( {providedIn: 'root'} )
export class DataService {

    public ConstStatuses = [
        {Draft: 2},
        {Planned: 2},
        {Active: 2}
    ] 

    public SHARED_STATUSES: PostStatus[] = [
        {id: 0, name: "Чернетка"},
        {id: 2, name: "Активний"}
    ] 

    public Dictionary: {engName: string, name: string}[] = [
        {engName: "Draft", name: "Чернетка"},
        {engName: "Active", name: "Активний"}
    ]

    public SHARED_SECTIONS: Section[] = [
        {id: 0, name: "Новини"},
        {id: 1, name: "Анонси"},
    ]

    public Section_Dictionary: {engName: string, name: string}[] = [
        {engName: "news", name: "Новини"},
        {engName: "announcements", name: "Анонси"}
    ]

    public routeSection: {route: string, sectionId: number}[] = [
        {route: "/news", sectionId: 0 },
        {route: "/announcements", sectionId: 1 },
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

    getSectionId(route: string){
        return this.routeSection.find(x => x.route == route).sectionId;
    }

    getPostSectionName(engName: string)
    {
        return this.Section_Dictionary.find(x => x.engName === engName).name;
    }

    getPostSectionId(engName: string)
    {
        let ukrName = this.Section_Dictionary.find(x => x.engName === engName).name;
        return this.SHARED_SECTIONS.find(x => x.name == ukrName).id;
    }
}