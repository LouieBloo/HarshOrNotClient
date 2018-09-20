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

