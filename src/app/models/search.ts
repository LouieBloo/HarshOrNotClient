export interface SearchQuery{
    name?:string;
    gender?:string;
    preference?:string;
    location?:any;
    bodyType?:string[];
    bodyTypeRaw?:any;//used to make using input checkboxes easier, api wants [string] but checkboxes are single objects
    range?:number;
    useRange?:boolean,
    ageRange?:any;
}

export interface SearchResult{
    name?:string;
    _id?:string;
    sponsored?:boolean;
    error?:any;
}