export interface Match{
    target?:{
        age?:number;
        gender?:string;
        bodyType?:string;
        preference?:string;
        photos?:string[];
        _id?:string;
    };
    wouldYouDate?:string;
    wouldTheyDate?:string;
    dateAdded?:Date;
    dateCompleted?:Date;
    error?:string;
    lastOnline?:Date;
}

export interface MatchLoad{
    matches?:Match[];
    loaded:boolean;
}
