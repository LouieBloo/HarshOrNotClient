export interface ProfileFeedback{
    target:string;
    source?:string;
    feedback?:any;
    error?:string;
    dateAdded?:string;
    wouldYouDate?:string;
    user?:{
        age?:number;
        gender?:string;
        bodyType?:string;
        preference?:string;
    }
    redeemed?:boolean;
    redeemedDate?:Date;
    costToRedeem?:number;
    _id?:string;
}

export interface ProfileMatch{
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
}
